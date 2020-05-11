const Express = require("express")();
const Http = require("http").Server(Express);
const Socketio = require("socket.io")(Http);

Http.listen(3000, () => {
  console.log("Listening at :3000...");
});

var position = {
  x: 200,
  y: 200
};

Socketio.on("connection", socket => {
  socket.emit("position", position);
});

Socketio.on("connection", socket => {
  socket.emit("position", position);
  socket.on("move", dir => {
      position.x += dir.x;
      position.y += dir.y;
      Socketio.emit("position", position);
  });
});

