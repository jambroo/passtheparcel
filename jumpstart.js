var net = require('net');
var socket = net.Socket();

var educate = process.argv[2];


socket.connect(8080);
var current_time = new Date().getTime();
if (educate) {
    socket.write('{"educate":"1","next":"10.1.1.1"}');
} else {
    socket.write('{"source":"START","time":"'+current_time+'"}');
}
socket.end();
