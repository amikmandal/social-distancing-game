const express = require("express");
const http = require("http")
const socketIo = require("socket.io")

const setupData = require('./data/setup.json')
const radius = setupData.radius
const speed = radius/2

var stackIds = [9,8,7,6,5,4,3,2,1,0]
var positions = []

const app = express()
app.get('/', (req,res) => {
  res.send("Server is running ... ");
})

const server = http.Server(app);
server.listen(3000);

const io = socketIo(server);

io.on('connection', socket => {

  console.log('players length: ', positions.length);

  if(stackIds.length==10){
    positions = []
    for(i=0; i<stackIds.length; i++){
      const pos = {x: setupData.positions[i].x, y: setupData.positions[i].y}
      positions.push(pos)
    }

    for(i=0; i<stackIds.length; i++){
      console.log(positions[i])
    }

  }

  console.log('players length: ', positions.length);

  const id = stackIds.pop();
  console.log('client ', id, ' connected');

  socket.on('mouse', data => {
    const mouseX = data.mouseX
    const mouseY = data.mouseY
    //console.log(mouseX,mouseY)
    //io.sockets.emit('debug',{x: mouseX, y: mouseY})
    //console.log('on mouse listener')
    updatePosition(id,mouseX,mouseY);
    io.sockets.emit('position', positions)
  })

  socket.on('disconnect', () => {
    console.log('client ', id, ' disconnected');
    // positions[id] = {x: } //change by bot
    stackIds.push(id)
  });

})

function updatePosition(id,mouseX,mouseY){

  const oldX = positions[id].x
  const oldY = positions[id].y
  var newX = oldX
  var newY = oldY
  
  const diffX = mouseX - oldX
  const diffY = mouseY - oldY
  const angle = Math.atan(diffY/diffX)
  const factor = diffX > 0 ? 1 : -1;

  // console.log('data starts')
  // console.log(oldX,oldY)
  // console.log(mouseX,mouseY)
  // console.log(newX,newY)
  // console.log('data ends')

  if(distance(diffX,diffY) > radius){

    // console.log('updated Position')

    newX += factor * speed * Math.cos(angle)
    newY += factor * speed * Math.sin(angle)
    
    if(outOfBounds(newX)){
      newX = oldX
    }
    if(outOfBounds(newY)){
      newY = oldY
    }
    
    positions[id].x = newX
    positions[id].y = newY

    // console.log('data starts')
    // console.log(oldX,oldY)
    // console.log(mouseX,mouseY)
    // console.log(newX,newY)
    // console.log('data ends')

  }
}

function distance(a,b){
  return Math.sqrt(a*a+b*b)
}

function outOfBounds(c){
  return c<radius || c>(1 - radius)
}