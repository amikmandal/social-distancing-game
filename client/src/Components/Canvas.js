import React from 'react';

class Canvas extends React.Component {

    constructor(props) {
        super(props);

        this.width = window.innerWidth
        this.height = window.innerHeight
        this.radius = 20
        this.frameTime = 32
        this.speed = 10

        //this.state = {mouseX: this.width/2, mouseY: this.height/2, x: this.width/2, y: this.height/2}

        this.setContext = this.setContext.bind(this);
    }

    componentDidMount() {
        this.props.onRef(this)
    }

    componentWillUnmount() {
        this.props.onRef(undefined)
    }

    setContext(c) {
        this.canvas = c.getContext('2d');
    }

    draw(a,b){
        this.canvas.clearRect(0, 0, this.width, this.height);
        this.canvas.beginPath();
        this.canvas.arc(a,b,this.radius,0,2*Math.PI)
        this.canvas.fill();
    }

    render() {
        return (
          <div>
              <canvas ref={this.setContext} width={this.width} height={this.height} style={{border: "1px solid black"}}/>
          </div>
        );
    }
}

export default Canvas
