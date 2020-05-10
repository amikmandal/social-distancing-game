import React from 'react';

class Canvas extends React.Component {

    constructor(props) {
        super(props);
        this.state = {x: 0, y: 0};
        this.state = {w: window.innerWidth, h: window.innerHeight};
    }

    componentDidMount() {
       this.drawPlayer(this.state.x,this.state.y);
    }

    _onMouseMove(e) {
        this.drawPlayer(e.screenX, e.screenY);
        //console.log(e.screenX,e.screenY);
    }

    drawPlayer(a,b){
        this.context.clearRect(0, 0, this.state.w, this.state.h);
        this.context.beginPath();
        this.context.arc(a,b,10,0,2*Math.PI)
        this.context.fill();
    }

    render() {
        return (
            <div onMouseMove={this._onMouseMove.bind(this)} style={{cursor: "none"}}>
            <canvas ref={(c) => this.context = c.getContext('2d')} width={this.state.w} height={this.state.h} style={{border: "1px solid black",}}></canvas>
            </div>
        );
    }
}

export default Canvas