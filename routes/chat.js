var express = require('express');
var router = express.Router();

var HttpError = require('../libs/httpError')

var User = require('../models/users');
var async = require('async');
var log = require('../libs/log')(module);


router.post('/userlist', function(req, res, next) {
	var users = [];
	var UserlistItem = function (_id, username) {
		this._id = _id;
		this.username = username
	}
	if(!req.session.authenticated){
		next(new HttpError(403, 'I\'m sorry, but your request was denied =('))
	}

	function getUserlist(callback){
		User.find({}).cursor()
		.on('data', function (user) {

			function userIdCompare () {
				return user._id == req.session.userId;
			}
			function findTestUsers () {
				return ~user.username.indexOf('test_account');
			}
			if(!userIdCompare() && !findTestUsers ()){
				users.push(new UserlistItem(user._id, user.username));
			}
		})
		.on('error', function (err) {
			next(err);
		})
		.on('end', function() { 
			callback(null);
		});
	}

	async.series([getUserlist], function (err, results) {
		if(err) next(err);
		res.json(users);
	});
});

router.post('/user', function(req, res, next){
	User.findById(req.session.userId, function(err, user){
		if (err) next(err);
		var currentUser = {
			username: user.username,
			_id: user.id
		}
		res.json(currentUser);
	})
});

module.exports = router;