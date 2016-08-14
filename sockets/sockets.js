var log = require('../libs/log')(module);
var session = require('../libs/session'); 
var mongoose = require('../libs/mongoose');
var async = require('async');
var HttpError = require('../libs/httpError');

var ChappieId = '57af17ae2e31491c1f1b42e2'
// incude models
var User = require('../models/users');
var Dialog = require('../models/dialogs');
var Message = require('../models/message');

var messageStore = require('../chappie/messageStore');

function randomInteger(messageStore) {
	var rand = - 0.5 + Math.random() * (messageStore.length)
	rand = Math.round(rand);
	return rand;
}

module.exports = (function(server) {
	var io = require('socket.io').listen(server);
	
	io.use(function(socket, next) {
		session(socket.handshake, {}, next);
	});

	io.on('connection', function(socket){

		var currentDialog, currentOpponent;

		socket.on('join dialog', function (data) {
			var currentUser = socket.handshake.session.userId;
			currentOpponent = data;
			// leave all rooms
			for(var room in socket.rooms){
				socket.leave(room)
			}
			// join to current room
			async.waterfall([
				findCurrentUsers, getDialogId, getDialogData
				], function(err, dialog){
					if (err) log.error(err);

					currentDialog = dialog;
					socket.join(currentDialog.id);
					io.sockets.connected[socket.id].emit('joined to dialog', currentDialog.data);
				})

			function findCurrentUsers(callback) {
				async.parallel([findCurrentUser, findCurrentOpponent], function(err, results){
					if (err) callback(err);
					callback(null, results[0], results[1]);
				})

				function findCurrentUser(callback){
					User.findById(currentUser, function(err, user){
						if (err) callback('Error in finding user =(');
						callback(null, user);
					});
				}
				function findCurrentOpponent(callback){
					User.findById(currentOpponent, function(err, opponent){
						if (err) callback('Error in finding opponent =(');
						callback(null, opponent);
					});
				}
			}

			function getDialogId(user, opponent, callback){

				if (user.dialogs[currentOpponent]) {
					var dialogId = user.dialogs[currentOpponent];
					callback(null, dialogId);
				}	else{
					
					async.waterfall([createDialog, saveDialogIdToUser], function(err, dialogId){
						if (err) callback(err);
						callback(null, dialogId);
					})

					function createDialog(callback){
						var dialogData = {
							data: [{userId: currentUser, message: ''}, {userId: currentOpponent, message: ''}]
						}
						if(currentOpponent == ChappieId){
							dialogData = {
								data: [{userId: currentUser, message: ''}, 
								{userId: currentOpponent, message: 'Hi, write me)'}]
							}
						}
						var newDialog = new mongoose.models.Dialog(dialogData);
						newDialog.save(function(err, dialog){
							if (err) callback('Error in creating dialog =(');
							var dialogId = dialog.id;
							callback(null, dialogId);
						})
					}

					function saveDialogIdToUser(dialogId, callback){
						async.parallel([saveDialogToCurrentUser, saveDialogToCurrentOpponent], function(err){
							if (err) callback('Error in saveing dialog id to user =(')
								callback(null, dialogId);
						})
						function saveDialogToCurrentUser(callback){
							user.dialogs[currentOpponent] = dialogId;
							user.markModified('dialogs');
							user.save(function(err){
								if (err) callback(err);
								callback(null);
							});
						}
						function saveDialogToCurrentOpponent(callback){
							opponent.dialogs[currentUser] = dialogId;
							opponent.markModified('dialogs');
							opponent.save(function(err){
								if (err) callback(err);
								callback(null);
							});
						}
					}
				}
			}

			function getDialogData(dialogId, callback){
				Dialog.findById(dialogId, function(err, dialog){
					if (err) callback('Error in connecting to dialog'); 	
					callback(null, dialog);
				})
			}
		});

		socket.on('message', function(data){

			let message = data;
			let currentUser = socket.handshake.session.userId;
			let newMessage = new Message(message, currentUser);

			currentDialog.data.push(newMessage);
			currentDialog.markModified('data');
			currentDialog.save(function(err){
				if (err) log.error('Error in saveing dialog =(');
				io.to(currentDialog.id).emit('message', newMessage);
			})

			// messages from chappie www-bot 
			if (currentOpponent == ChappieId){
				let message = messageStore[randomInteger(messageStore)];
				
				let newMessage = new Message(message, currentOpponent);
				currentDialog.data.push(newMessage);
				currentDialog.markModified('data');
				setTimeout(function(){
					currentDialog.save(function(err){
						if (err) log.error('Error in saveing dialog =(');
						io.to(currentDialog.id).emit('message', newMessage);
					})
				}, 1200)
			}
		});

		socket.on('disconnect dialog', function(){
			socket.emit('disconnect dialog');
			socket.disconnect();
		})
	});
	return io;
});
