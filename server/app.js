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

// players = {
//   '3124325235235235' : {
//     x: 640,
//     y: 320,
//     mouseX: 100,
//     mouseY: 200
//   },
//   '2423532643643643' : {
//     x: 640,
//     y: 200,
//     mouseX: 900,
//     mouseY: 500
//   }
// }

//console.log('hi');


io.on('connection', socket => {

  console.log('client connected');
  const id = Date.now().toString()
  players[id] = {}
  //players[id] = {s: socket};
  socket.emit('id', id);

  socket.on('info', data => {
    players[id].w = data.w
    players[id].h = data.h
    players[id].x = 640
    players[id].y = 320
    io.emit('position', {x: players[id].x, y: players[id].y} )
  })

  socket.on('mouse', data => {
    players[id].mouseX = data.mouseX
    players[id].mouseY = data.mouseY
  })

  setInterval(() => {
    players[id].x += 5
    players[id].y += 5
    io.emit('position', {x: players[id].x, y: players[id].y} )
  },1000);

  socket.on('disconnect', () => {
    console.log('disconnected ', players[id])
    players = {}
    //delete players.id
  });

})

// Socketio.on('connection', socket => {
//   socket.emit('init','Hello Client!')
// })

// Socketio.on('info', data => {
//   console.log('hello')
//   console.log(data.id)
//   Socketio.emit('position', positions[availablePlayer]);
//   availablePlayer++;
// });

// Socketio.on("connection", socket => {
//   socket.emit("position", position);
//   socket.on("move", data => {
//     switch(data) {

//     }
//   });
// });

