import React from 'react';

class Canvas extends React.Component {

    constructor(props) {
        super(props);
        this.state = {x: 640, y: 320};
    }

    componentDidMount() {
       this.drawPlayer(640,320);
    }

    _onMouseMove(e) {
        this.drawPlayer(e.screenX, e.screenY);
        //console.log(e.screenX,e.screenY);
    }

    drawPlayer(a,b){
        this.context.clearRect(this.state.x - 11, this.state.y - 11, this.state.x + 11, this.state.y + 11);
        // this.context.beginPath();
        // this.context.arc(this.state.x,this.state.y,10,0,2*Math.PI);
        // this.context.fillStyle = '#ffffff'
        // this.context.fill();
        // this.context.strokeStyle = '#ffffff'
        // this.context.stroke();
        // this.context.closePath();
        this.context.beginPath();
        this.context.arc(a,b,10,0,2*Math.PI)
        this.context.fill();
        //this.setState({x: a,y: b});
    }

    render() {
        return (
            <div onMouseMove={this._onMouseMove.bind(this)} style={{cursor: "none"}}>
            <canvas ref={(c) => this.context = c.getContext('2d')} width={1280} height={720} style={{border: "1px solid black",}}></canvas>
            </div>
        );
    }
}

export default Canvas