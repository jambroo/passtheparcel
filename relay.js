var net = require("net");

var host = process.env.HOST;
var port = process.env.PORT;
var to_host = process.env.TO_HOST;
var to_port = process.env.TO_PORT;

var pass_along = function (payload) {
  var socket = net.Socket();

  socket.connect({
    port: to_port,
    host: to_host
  });
  socket.write(JSON.stringify(payload));
  socket.end();
};

var server = net.createServer((socket) => {
  socket.on('data', function (data) {
    var current_time = new Date().getTime();
    var payload = JSON.parse(data);
    console.log("MESSAGE RECEIVED", {source: payload.source, latency: current_time-payload.time});
    pass_along({source: host, port: port, time: new Date().getTime()});
  });
});

server.listen({
  host: host,
  port: port
});
