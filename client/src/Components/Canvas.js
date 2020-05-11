import React from 'react';

class Canvas extends React.Component {

    constructor(props) {
        super(props);
        this.state = {w: window.innerWidth, h: window.innerHeight};
        this._onMouseMove = this._onMouseMove.bind(this);
        this.setContext = this.setContext.bind(this);
        //this.state = {time: Date.now()}
    }

    componentDidMount() {
       this.interval = setInterval(this.updateBoard(),16);
       this.drawPlayer(this.state.w/2,this.state.h/2);
       //console.log(this.state.w/2,this.state.h/2);
    }

    updateBoard(){
        ;
    }

    _onMouseMove(e) {
        //this.drawPlayer(e.screenX, e.screenY-75);
        
        console.log(e.screenX,e.screenY-75);
    }

    setContext(c) {
        this.context = c.getContext('2d');
    }

    drawPlayer(a,b){
        this.context.clearRect(0, 0, this.state.w, this.state.h);
        this.context.beginPath();
        this.context.arc(a,b,20,0,2*Math.PI)
        this.context.fill();
    }

    render() {
        return (
            <div onMouseMove={this._onMouseMove}>
            <canvas ref={this.setContext} width={this.state.w} height={this.state.h} style={{border: "1px solid black"}}></canvas>
            </div>
        );
    }
}

export default Canvas