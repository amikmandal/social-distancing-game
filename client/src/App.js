import React, { Component } from 'react';
import './App.css';
import Canvas from './Components/Canvas'

import socketIo from "socket.io-client";

class App extends Component {

  constructor(props){
    super(props)

    this.id = 0
    this.info = {
      w: window.innerWidth,
      h: window.innerHeight
    }

    this._onMouseMove = this._onMouseMove.bind(this)
  }

  componentDidMount() {
    this.socket = socketIo("http://localhost:3000");
    
    this.interval = setInterval(()=>this.socket.emit('mouse', {mouseX: this.mouseX, mouseY: this.mouseY}),16);

    this.socket.on('id', data => {
      //console.log(data);
      this.id = data
      this.socket.emit('info',this.info)
    })
    this.socket.on('position', data => {
      //console.log(data.x,data.y);
      this.canvas.draw(data.x,data.y);
    })
    this.socket.on('debug', data => {
      console.log(data.x,data.y);
    })
  }

  _onMouseMove(e) {
    this.mouseX = e.screenX
    this.mouseY = e.screenY - 75
  } 
  
  render() {
    return (
      <div onMouseMove={this._onMouseMove}>
        <Canvas onRef={ref => (this.canvas = ref)}></Canvas>
      </div>
    );
  }
}

export default App;