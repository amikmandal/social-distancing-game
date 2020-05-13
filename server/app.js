const express = require("express");
const http = require("http")
const socketIo = require("socket.io")

const setupData = require('./data/setup.json')

const app = express()
app.get('/', (req,res) => {
  res.send("Server is running ... ");
})

const server = http.Server(app);
server.listen(3000);

const io = socketIo(server);

// var positions = [ {x: 640, y: 320}, {x: 120, y: 240} ]
// var availablePlayer = 0

var players = {};
const speed = 10

var stackIds = [9,8,7,6,5,4,3,2,1,0]

io.on('connection', socket => {

  if(stackIds.length==10){
    var data = []
    for(i=0; i<stackIds.length-1; i++){
      data.push({x: setupData.positions[i].x, y: setupData.positions[i].y})
    }
    io.emit('position', data);
  }

  const id = stackIds.pop();

  console.log('client connected');
  players[id] = {}
  socket.emit('id', id);

  socket.on('info', data => {
    players[id].w = data.w
    players[id].h = data.h
    players[id].x = players[id].w * setupData.positions[id].x
    players[id].y = players[id].h * setupData.positions[id].y
    players[id].mouseX = players[id].x
    players[id].mouseY = players[id].y
    io.emit('position', {x: players[id].x, y: players[id].y} )
    io.emit('debug', {id: id})
  })

  socket.on('mouse', data => {
    players[id].mouseX = data.mouseX
    players[id].mouseY = data.mouseY
  })

  players[id].interval = setInterval(() => {
    updatePosition(id);
    io.emit('position', {x: players[id].x, y: players[id].y} )
  },16);

  socket.on('disconnect', () => {
    console.log('disconnected ')
    clearInterval(players[id].interval)
    delete players.id
    stackIds.push(id)
  });

})

function updatePosition(id){
  const oldX = players[id].x
  const oldY = players[id].y
  const diffX = players[id].mouseX - oldX
  const diffY = players[id].mouseY - oldY
  const angle = Math.atan(diffY/diffX)
  const factor = diffX > 0 ? 1 : -1;

  if(distance(diffX,diffY) > 20){
      players[id].x += factor * speed * Math.cos(angle)
      players[id].y += factor * speed * Math.sin(angle)
  }

  if(outOfBounds(players[id].x,players[id].w)){
    players[id].x = oldX
  }
  if(outOfBounds(players[id].y,players[id].h)){
    players[id].y = oldY
  }
}

function distance(a,b){
  return Math.sqrt(a*a+b*b)
}

function outOfBounds(c,max){
  return c<20 || c>2*(max - 20)
}

