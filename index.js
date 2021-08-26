var express = require("express");
var socket = require("socket.io");

//app setup
var app = express();
var server = app.listen(4000, function () {
  console.log("-------------------------------------");
  console.log("listning for port no. 4000 ");
});

//static files
app.use(express.static("public"));

//Setup socket
var io = socket(server);

//reciveing connection
io.on("connection", function (socket) {
  console.log("made socket connection, ID: ", socket.id);

  //reciving

  socket.on("chat", function (data) {
    // // emit - sending data to all socket connection
    io.sockets.emit("chat", data);
  });

  socket.on("typing", function (data) {
    // // broadcast -- send data to all connection except sender
    socket.broadcast.emit("typing", data);
  });
});
