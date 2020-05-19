import React from 'react';
//import background from '../assets/images/bg.png'

class Canvas extends React.Component {

    constructor(props) {
        super(props);
        
        this.id = this.props.id
        this.width = window.innerWidth
        this.height = window.innerHeight

        this.bg = 'https://lh3.googleusercontent.com/proxy/cCm7L-tScWQ-EpApONYmNtNQRrHAyMQY3f4bybiQV4Tr8JZkgc4R92fSZrRF4c7V-zOgziaZ_q-uAsoXUQ8hAm-gsb8WIrnr3uN2Tiod9MpoAi8LDVolzA'
        this.img = new Image();
        this.img.src = this.bg;

        this.setContextBgCanvas = this.setContextBgCanvas.bind(this);
        this.setContext = this.setContext.bind(this);
    }

    componentDidMount() {
        this.props.onRef(this)
        this.img.onload = this.drawBg(this.bgCanvas,this.img,this.width,this.height)
    }

    componentWillUnmount() {
        this.props.onRef(undefined)
    }

    setContextBgCanvas(c) {
        this.bgCanvas = c.getContext('2d');
    }

    drawBg(bgCanvas,img,width,height) {
        var ptrn = bgCanvas.createPattern(img, 'repeat');
        bgCanvas.rect(0,0,width,height);
        bgCanvas.fillStyle = ptrn;
        bgCanvas.fill();
        console.log(bgCanvas);
    }

    setContext(c) {
        this.canvas = c.getContext('2d');
    }

    draw(data) {
        this.canvas.clearRect(0, 0, this.width, this.height);
        for(var i=0; i<data.length; i++){
            if(i === this.props.id)
                this.drawCircle(data[i].x * this.width , data[i].y * this.height, "#c82124") //red
            else
                this.drawCircle(data[i].x * this.width , data[i].y * this.height, "#000000") //black
        }   
    }

    drawCircle(a,b,color){
        this.canvas.beginPath();
        this.canvas.fillStyle = color
        this.canvas.arc(a,b,this.props.radius,0,2*Math.PI)
        this.canvas.fill();
    }

    render() {
        return (
          <div>
              <canvas ref={this.setContextBgCanvas} width={this.width} height={this.height} style={{position: "absolute"}}/>
              <canvas ref={this.setContext} width={this.width} height={this.height} style={{position: "absolute", border: "1px solid black"}}/>
          </div>
        );
    }
}

export default Canvas
