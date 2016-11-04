var net = require("net");

const HOST = "0.0.0.0";
const PORT = 8080;

var next = null;

// Need a way of telling where it is going
var pass_along = function (payload) {
  var socket = net.Socket();

  socket.connect({
    port: PORT,
    host: next
  });
  socket.write(JSON.stringify(payload));
  socket.end();
};

var server = net.createServer((socket) => {
  socket.on('data', function (data) {
    var payload = JSON.parse(data);
    if (payload.educate) {
        next = payload.next;
        console.log("EDUCATED:", next);
    } else {
        if (next === null) {
            console.log("EDUCATION REQUIRED.");
        } else {
            var current_time = new Date().getTime();
            console.log("MESSAGE RECEIVED:", {source: payload.source, latency: current_time-payload.time});
            pass_along({source: process.env.NAME, time: new Date().getTime()});
        }
    }
  });
});

server.listen({
  host: HOST,
  port: PORT
});
