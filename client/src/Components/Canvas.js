import React from 'react';

class Canvas extends React.Component {

    render() {
        return (
            <div>
            <canvas ref={(c) => this.context = c.getContext('2d')} width={1380} height={720} style={{border: "1px solid black",}}></canvas>
            </div>
        );
    }
}

export default Canvas