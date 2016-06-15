var express = require('express');
var app = express();
var http = require('http').createServer(app);
var io = require('socket.io')(http);

app
	.use(express.static('./client'))
	.get('/', function (req, res) {
		res.sendFile('client/index.html', {"root": "."} );
	});

http.listen(3000, function() {
	console.log('listening on *:3000');
});

io.on('connection', function(socket) {
	console.log('Client connected...');
	socket.on('chat message', function (msg) {
		io.emit('chat message', msg);
	});

	socket.on('disconnect', function () {
		console.log('Client disconnected...');
	});
});
