const express = require("express");
const http = require("http")
const run = require("./src/engine.js")

const app = express()
app.get('/', (req,res) => {
  res.send("Server is running ... ");
})

const server = http.Server(app);
server.listen(3000);

run(server)