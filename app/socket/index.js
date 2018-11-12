
/**
 * Encapsulates all code for emitting and listening to socket events
 *
 */
var mongoose = require('mongoose');

var ObjectId = mongoose.Types.ObjectId;


var postModel = require("../models/posts");
var userModel = require("../models/users");
var roomModel = require("../models/rooms");
var messageModel = require("../models/messages");


var userSocket = {};

var ioEvents = function(io) {
	// // Chatroom namespace
	io.on('connection', function(socket) {

		var user = socket.request.session.user;

		userSocket[user] = socket.id;
        console.log("A Socket connected");
        
        socket.on('disconnect', function() {

        });

        // 	// When a new message arrives
        socket.on('new-message', function(message) {
			console.log(message);
			var msg = {
				sender: socket.request.session.user,
				time: new Date(),
				body: message,
				room: socket.roomId
			};
			var newMsg = new messageModel(msg);
			newMsg.save(function(err, doc) {
				if(err) throw err;
				console.log(doc);
			});
            io.to(socket.roomId).emit('add-message', {msg: message, user: socket.request.session.user});
		});

		socket.on('join-room', function(data) {
			console.log(data);
			if(data.members) {
				roomModel.findOne({ members: { $size: data.members.length, $all: data.members} })
						.exec(function(err, doc) {
							console.log(doc);
							if(!doc) {
								var members = [];
								for(var i = 0; i < data.members.length; i++) {
									members.push(ObjectId(data.members[i]));
								}
								console.log("Members", members);
								var newRoom = new roomModel({name: "", members: members});
								newRoom.save(function(err, rdoc) {
									console.log("New-room", rdoc);
									socket.roomId = rdoc._id;
									socket.join(socket.roomId);
									io.to(socket.roomId).emit("load-msgs", []);
								});
							} else {
								socket.roomId = doc._id;
								console.log(socket.roomId);
								messageModel.find({ room: ObjectId(socket.roomId) })
											.sort({time: 1})
											.populate("sender", "name")
											.exec(function(err, docs) {
												console.log("Messages", docs);
												socket.join(socket.roomId);
												io.to(socket.roomId).emit("load-msgs", docs);
											});
							}
						});
			} else {

			}
		});
		
        // socket.on('new-like', function(data) {
		// 	console.log(data);
		// 	var id = data.id;
		// 	console.log("action", data.action);
		// 	var t = data.action === true ? 1 : -1;
		// 	postModel.findById(id, function(err, doc) {
		// 		if(err) throw err;
		// 		doc.likes += t;
		// 		doc.save(function(err, doc) {
		// 		if(err) throw err;
		// 		console.log(doc);
		// 		});
		// 	});
        //     socket.broadcast.emit('new-like', data);
        // });

    });
}

/**
 * Initialize Socket.io
 * Uses Redis as Adapter for Socket.io
 *
 */
var init = function(app, sessionMiddleware){

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

	// Allow sockets to access session data
	io.use((socket, next) => {
		require('../session')(socket.request, {}, next);
	});

	// // Define all Events
	ioEvents(io);

	// The server object will be then used to list to a port number
	return server;
}

module.exports = init;