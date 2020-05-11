import React from 'react';

class Canvas extends React.Component {

    constructor(props) {
        super(props);
        this.width = window.innerWidth
        this.height = window.innerHeight
        this.mouseX = this.width/2
        this.mouseY = this.height/2
        this.x = this.width/2
        this.y = this.height/2
        //this.state = {x: this.width/2, y: this.height/2};
        this._onMouseMove = this._onMouseMove.bind(this)
        this.setContext = this.setContext.bind(this);
    }

    componentDidMount() {
       this.drawPlayer(this.x,this.y);
       this.interval = setInterval(() => {
            const diffX = this.mouseX - this.x
            const diffY = this.mouseY - this.y
            if((diffX * diffX + diffY * diffY > 400)){ //radius squared
                const newX = this.x+diffX*0.016
                const newY = this.y+diffY*0.016
                console.log(newX,newY);
                this.x = newX
                this.y = newY
            }  
        },16);
    }

    _onMouseMove(e) {
        this.mouseX = e.screenX
        this.mouseY = e.screenY - 75
        //this.setState({mouseX: e.screenX, mouseY: e.screenY - 75})
        //console.log(e.screenX,e.screenY-75);
    }

    setContext(c) {
        this.canvas = c.getContext('2d');
    }

    drawPlayer(a,b){
        this.canvas.clearRect(0, 0, this.width, this.height);
        this.canvas.beginPath();
        this.canvas.arc(a,b,20,0,2*Math.PI)
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