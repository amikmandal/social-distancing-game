const Express = require("express")();
const Http = require("http").Server(Express);
const Socketio = require("socket.io")(Http);

var positions = [ {x: 640, y: 320}, {x: 120, y: 240} ]
var availablePlayer = 0

var data = {
  players: {
    /*
      id: 124325423
      x: 324325
      y: 1234325325
      mouseX: 124325
      mouseY: 325325
    */
  }
}

Http.listen(3000, () => {
  console.log("Listening at :3000...");
});

Socketio.on('connection', data => {
  console.log('hello')
  console.log(data.id)
  Socketio.emit('position', positions[availablePlayer]);
});

// Socketio.on("connection", socket => {
//   socket.emit("position", position);
//   socket.on("move", data => {
//     switch(data) {

//     }
//   });
// });

