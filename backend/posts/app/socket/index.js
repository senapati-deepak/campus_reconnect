
/**
 * Encapsulates all code for emitting and listening to socket events
 *
 */
var ioEvents = function(io) {
    // // Chatroom namespace
	io.on('connection', function(socket) {


        console.log("A Socket connected");
        
        socket.on('disconnect', function() {

        });

        // 	// When a new message arrives
        socket.on('new-message', function(message) {
			console.log(message);
            io.emit('add-message', message);
        });

    });
}

/**
 * Initialize Socket.io
 * Uses Redis as Adapter for Socket.io
 *
 */
var init = function(app){

	var server 	= require('http').Server(app);
	var io 		= require('socket.io')(server);

	// // Force Socket.io to ONLY use "websockets"; No Long Polling.
	// io.set('transports', ['websocket']);

	// // Using Redis
	// let port = config.redis.port;
	// let host = config.redis.host;
	// let password = config.redis.password;
	// let pubClient = redis(port, host, { auth_pass: password });
	// let subClient = redis(port, host, { auth_pass: password, return_buffers: true, });
	// io.adapter(adapter({ pubClient, subClient }));

	// // Allow sockets to access session data
	// io.use((socket, next) => {
	// 	require('../session')(socket.request, {}, next);
	// });

	// // Define all Events
	ioEvents(io);

	// The server object will be then used to list to a port number
	return server;
}

module.exports = init;