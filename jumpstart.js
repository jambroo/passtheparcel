var net = require('net');
var socket = net.Socket();

socket.connect(5000);
var current_time = new Date().getTime();
socket.write('{"source":"START","time":"'+current_time+'"}');
socket.end();
