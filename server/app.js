const express = require("express");
const http = require("http")
const socketIo = require("socket.io")

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


io.on('connection', socket => {

  console.log('client connected');
  const id = Date.now().toString()
  players[id] = {}
  socket.emit('id', id);

  socket.on('info', data => {
    players[id].w = data.w
    players[id].h = data.h
    players[id].x = 640
    players[id].y = 320
    players[id].mouseX = players[id].x
    players[id].mouseY = players[id].y
    io.emit('position', {x: players[id].x, y: players[id].y} )
  })

  // socket.on('mouse', data => {
  //   players[id].mouseX = data.mouseX
  //   players[id].mouseY = data.mouseY
  // })

  players[id].interval = setInterval(() => {
    updateMousePosition(id);
    updatePosition(id);
    io.emit('debug', {x: players[id].mouseX, y: players[id].mouseY})
    io.emit('position', {x: players[id].x, y: players[id].y} )
  },16);
  players[id].mouseInterval = setInterval(() => {
    players[id].mouseX = players[id].w * Math.random()
    players[id].mouseY = players[id].h * Math.random()
  },1000);
  socket.on('disconnect', () => {
    console.log('disconnected ');
    clearInterval(players[id].interval);
    clearInterval(players[id].mouseInterval);
    delete players.id
  });

})

function setRandomInterval() {

}

function updatePosition(id){
  const oldX = players[id].x
  const oldY = players[id].y
  const diffX = players[id].mouseX - oldX
  const diffY = players[id].mouseY - oldY
  const angle = Math.atan(diffY/diffX)
  const factor = diffX > 0 ? 1 : -1;

  if(distance(diffX,diffY) > 20){
    //constant speed
    players[id].x += factor * speed * Math.cos(angle)
    players[id].y += factor * speed * Math.sin(angle)
  }

  if(outOfBounds(players[id].x,players[id].w)){
    console.log('oldX')
    players[id].x = oldX
  }
  if(outOfBounds(players[id].y,players[id].h)){
    console.log('oldY')
    players[id].y = oldY
  }
}

function distance(a,b){
  return Math.sqrt(a*a+b*b)
}

function outOfBounds(c,max){
  return c<20 || c>2*(max - 20)
}

function updateMousePosition(id) {
  const oldX = players[id].mouseX
  const oldY = players[id].mouseY
  const rand = Math.random();
  const angle = rand*Math.PI*2;

  const randX = Math.random();
  const randY = Math.random();

  const factorX = (randX < 0.5 ? 1-randX : randX) > 0.75 ? 1 : -1;
  const factorY = (randY < 0.5 ? 1-randY : randY) > 0.75 ? 1 : -1;

  players[id].mouseX += factorX * 10 * Math.cos(angle);
  players[id].mouseY += factorY * 10 * Math.sin(angle);

  if(outOfBounds(players[id].mouseX,players[id].w)){
    players[id].mouseX = oldX
  }
  if(outOfBounds(players[id].mouseY,players[id].h)){
    players[id].mouseY = oldY
  }
  //console.log(distance(players[id].x - oldX, players[id].y - oldY))
}


