import React from 'react';
import io from "socket.io-client";

class Canvas extends React.Component {

    constructor(props) {
        super(props);

        this.socket = io("http://localhost:3000");

        this.id = Date.now();

        this.width = window.innerWidth
        this.height = window.innerHeight
        this.radius = 20
        this.frameTime = 32
        this.speed = 10

        this.state = {mouseX: this.width/2, mouseY: this.height/2, x: this.width/2, y: this.height/2}

        this._onMouseMove = this._onMouseMove.bind(this)
        this.setContext = this.setContext.bind(this);
        //this.updateCanvas = this.updateCanvas.bind(this);
    }

    componentDidMount() {
        var info = {
            id: this.id,
            w: this.width,
            h: this.height
        };
        this.socket.on('connection', () => {
            console.log(info.id)
            this.socket.io('info',info)
        })
        this.socket.on('position', data => {
            this.draw(data.x,data.y);
        })



    //    this.interval = setInterval(this.updateCanvas,this.frameTime);
    //    this.drawPlayer()
    }

    // updateCanvas(){
    //     const diffX = this.state.mouseX - this.state.x
    //     const diffY = this.state.mouseY - this.state.y
    //     const angle = Math.atan(diffY/diffX)
    //     const factor = diffX > 0 ? 1 : -1;
    //     var newX = 0.0
    //     var newY = 0.0
    //     if(this.distance(diffX,diffY) > this.radius){
    //         //constant speed
    //         newX = this.state.x + factor * this.speed*Math.cos(angle)
    //         newY = this.state.y + factor * this.speed*Math.sin(angle)

    //         //exponential speed
    //         // newX = this.state.x + 0.016 * diffX
    //         // newY = this.state.y + 0.016 * diffY
    //     }
    //     // } else {
    //     //     newX = this.state.x + diffX*0.016
    //     //     newY = this.state.y + diffY*0.016
    //     // }
    //     if(this.outOfBoundsX(newX)){
    //         newX = this.state.x
    //     }
    //     if(this.outOfBoundsY(newY)){
    //         newY = this.state.y
    //     }
    //     this.setState({x: newX, y: newY})
        
    //     this.drawPlayer()
        
    // }

    // distance(a,b){
    //     return Math.sqrt(a*a+b*b)
    // }

    // outOfBoundsX(x){
    //     return x<this.radius || x>2*(this.width - this.radius)
    // }

    // outOfBoundsY(y){
    //     return y<this.radius || y>2*(this.width - this.radius)
    // }

    _onMouseMove(e) {
        this.setState({mouseX: e.screenX, mouseY: e.screenY - 75})
    }

    setContext(c) {
        this.canvas = c.getContext('2d');
    }

    // drawPlayer(){
    //     this.canvas.clearRect(0, 0, this.width, this.height);
    //     this.canvas.beginPath();
    //     this.canvas.arc(this.state.x,this.state.y,this.radius,0,2*Math.PI)
    //     this.canvas.fill();
    // }

    draw(a,b){
        this.canvas.clearRect(0, 0, this.width, this.height);
        this.canvas.beginPath();
        this.canvas.arc(a,b,this.radius,0,2*Math.PI)
        this.canvas.fill();
    }

    render() {
        return (
            <div onMouseMove={this._onMouseMove}>
            <canvas ref={this.setContext} width={this.width} height={this.height} style={{border: "1px solid black"}}></canvas>
            </div>
        );
    }
}

export default Canvas