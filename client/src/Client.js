import React, { Component } from 'react';
import './App.css';
import Canvas from './Components/Canvas'

import socketIo from "socket.io-client";

class Client extends Component {

  constructor(props){
    super(props)

    this.width = window.innerWidth
    this.height = window.innerHeight

    this.state = {id: -1, radius: 0.02*this.height}

    this._onMouseMove = this._onMouseMove.bind(this)
  }

  componentDidMount() {
    this.socket = socketIo("http://localhost:3000");
    this.socket.on('init', data => this.setState({id: data.id, radius: data.radius * this.height}))
    this.socket.on('position', data => this.canvas.draw(data))
    //this.socket.on('gameOver', data => )
    this.interval = setInterval(()=>this.socket.emit('mouse', {mouseX: this.mouseX/this.width, mouseY: this.mouseY/this.height}),24);

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
        <Canvas onRef={ref => (this.canvas = ref)} id={this.state.id} radius={this.state.radius}></Canvas>
      </div>
    );
  }
}

export default Client;
