import React, { Component } from 'react';
import './App.css';
import Canvas from './Components/Canvas'

import socketIo from "socket.io-client";

class Client extends Component {

  constructor(props){
    super(props)

    this.id = 0
    this.width = window.innerWidth
    this.height = window.innerHeight

    this._onMouseMove = this._onMouseMove.bind(this)
  }

  componentDidMount() {
    this.socket = socketIo("http://localhost:3000");
    
    this.interval = setInterval(()=>this.socket.emit('mouse', {mouseX: this.mouseX/this.width, mouseY: this.mouseY/this.height}),30);

    this.socket.on('position', data => {
      //console.log('calling draw with data: ', data[0].x, data[0].y)
      this.canvas.draw(data);
    })
    // this.socket.on('debug', data => {
    //   console.log(data.x * this.width,data.y * this.height);
    // })
  }

  componentWillUnmount(){
    clearInterval(this.interval)
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

export default Client;