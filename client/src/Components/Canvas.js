import React from 'react';
//import background from '../assets/images/bg.png'

class Canvas extends React.Component {

    constructor(props) {
        super(props);

        //this.bg = 'https://www.xmple.com/wallpaper/graph-paper-white-blue-grid-1920x1080-c2-ffffff-add8e6-l2-7-28-a-0-f-20.svg';
        this.bg = 'https://lh3.googleusercontent.com/proxy/cCm7L-tScWQ-EpApONYmNtNQRrHAyMQY3f4bybiQV4Tr8JZkgc4R92fSZrRF4c7V-zOgziaZ_q-uAsoXUQ8hAm-gsb8WIrnr3uN2Tiod9MpoAi8LDVolzA'
        
        this.id = this.props.id
        this.width = window.innerWidth
        this.height = window.innerHeight
        this.radius = 20
        this.frameTime = 32
        this.speed = 10

        this.setContextBgCanvas = this.setContextBgCanvas.bind(this);
        this.setContext = this.setContext.bind(this);
    }

    componentDidMount() {
        this.props.onRef(this)

        // const img = new Image();
        // img.src = this.bg;

        // img.onload = function(){
        //     var ptrn = this.bgCanvas.createPattern(img, 'repeat');
        //     this.bgCanvas.fillStyle = ptrn;
        //     this.bgCanvas.fillRect(0, 0, this.width, this.height);
        // }
    }

    componentWillUnmount() {
        this.props.onRef(undefined)
    }

    setContextBgCanvas(c) {
        this.bgCanvas = c.getContext('2d');

        const img = new Image();
        img.src = this.bg;
        img.onload = this.drawBg (this.bgCanvas,img,this.width,this.height)
    }

    drawBg(bgCanvas,img,width,height) {
        //console.log(img)
        //bgCanvas.drawImage(img,0,0);
        var ptrn = bgCanvas.createPattern(img, 'repeat');
        bgCanvas.rect(0,0,width,height);
        bgCanvas.fillStyle = ptrn;
        bgCanvas.fill();
        //bgCanvas.fillRect(0, 0, width, height);
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
