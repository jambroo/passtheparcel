var net = require("net");

var host = 'localhost';
var port = process.argv[2];
var to_host = 'localhost';
var to_port = process.argv[3];

var pass_along = function (data) {
  var socket = net.Socket();

  socket.connect({
    port: to_port,
    host: to_host
  });
  socket.write(host+":"+port);
  socket.end();
};

var server = net.createServer((socket) => {
  socket.on('data', function (data) {
    console.log("MESSAGE RECEIVED FROM", data.toString())
    pass_along(data)
  });
});

server.listen({
  host: host,
  port: port
});
