var net = require('net');
var socket = net.Socket();

socket.connect(5000);
socket.write('LOCAL');
socket.end();
