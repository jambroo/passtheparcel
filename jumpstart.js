var net = require('net');
var socket = net.Socket();

var host = process.argv[2];
var educate = process.argv[3];
var next = process.argv[4];

socket.connect({
  port: 8080,
  host: host
});

var current_time = new Date().getTime();
if (educate) {
    socket.write('{"educate":"1","next":"' + next + '"}');
} else {
    socket.write('{"source":"START","time":"'+current_time+'"}');
}
socket.end();

