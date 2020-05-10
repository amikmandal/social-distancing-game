import React from 'react';

class Canvas extends React.Component {

    componentDidMount() {
        this.context.beginPath();
        this.context.arc(640,320,10,0,2*Math.PI)
        this.context.fill();
    }

    _onMouseMove(e) {
        console.log(e.screenX, e.screenY)
    }

    render() {
        return (
            <div onMouseMove={this._onMouseMove.bind(this)}>
            <canvas ref={(c) => this.context = c.getContext('2d')} width={1280} height={720} style={{border: "1px solid black",}}></canvas>
            </div>
        );
    }
}

export default Canvas