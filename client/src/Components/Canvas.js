import React from 'react';

class Canvas extends React.Component {

    constructor(props) {
        super(props);

        this.width = window.innerWidth;
        this.height = window.innerHeight;
        this.radius = 20;
        this.frameTime = 16;
        this.weight = this.frameTime/1000;

        this.state = {mouseX: this.width/2, mouseY: this.height/2, x: this.width/2, y: this.height/2};

        this._onMouseMove = this._onMouseMove.bind(this);
        this.setContext = this.setContext.bind(this);
        this.updateCanvas = this.updateCanvas.bind(this);
    }

    componentDidMount() {
       this.interval = setInterval(this.updateCanvas,this.frameTime);
       this.drawPlayer()
    }

    updateCanvas(){
        const diffX = this.state.mouseX - this.state.x;
        const diffY = this.state.mouseY - this.state.y;
        if((diffX * diffX + diffY * diffY > this.radius * this.radius)){
            var newX = this.state.x + diffX * this.weight;
            var newY = this.state.y + diffY * this.weight;
            if(!this.isInBoundsX(newX)){
                newX = this.state.x
            }
            if(!this.isInBoundsY(newY)){
                newY = this.state.y
            }
            this.setState({x: newX, y: newY});

            this.drawPlayer()
        }

    }

    isInBoundsX(x){
        return !(x < this.radius || x > 2 * (this.width - this.radius));
    }

    isInBoundsY(y){
        return !(y < this.radius || y > 2 * (this.width - this.radius));
    }

    _onMouseMove(e) {
        this.setState({mouseX: e.screenX, mouseY: e.screenY - 75})
    }

    setContext(c) {
        this.canvas = c.getContext('2d');
    }

    drawPlayer(){
        this.canvas.clearRect(0, 0, this.width, this.height);
        this.canvas.beginPath();
        this.canvas.arc(this.state.x,this.state.y,this.radius,0,2*Math.PI)
        this.canvas.fill();
    }

    render() {
        return (
            <div onMouseMove={this._onMouseMove}>
                <canvas ref={this.setContext} width={this.width} height={this.height} style={{border: "1px solid black"}}/>
            </div>
        );
    }
}

export default Canvas
