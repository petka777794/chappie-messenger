var express = require('express');
var router = express.Router();

var mongoose = require('../libs/mongoose');
var User = require('../models/users');
var log = require('../libs/log')(module);
var async = require('async');

var Response = function (authenticated, data, authError) {
	this.authenticated = authenticated;
	this.data = data;
	this.authError = authError;
}

router.post('/login', function (req, res, next) {
	User.findOne({username: req.body.username}, function (err, user) {
		var authResponse;
		if(user){

			if(user.checkPassword(req.body.password)){
				saveInSession (req, user);
				authResponse = new Response(req.session.authenticated, {}, null);
			} else{
				authResponse = new Response(req.session.authenticated, {}, 'password');
			}

		} else {
			authResponse = new Response(req.session.authenticated, {}, 'username');
		}

		res.json(authResponse);
	});
});

router.post('/create', function(req, res, next){
	var authResponse;
	var username = req.body.username;
	var password = req.body.password;
	var newUser = new mongoose.models.User({username: username, password: password});
	async.waterfall([checkUsername, saveUser], function(err, user){
		log.info(err)
		if(err) {
			authResponse = new Response(req.session.authenticated, {}, err);
		} else{
			saveInSession (req, user);
			authResponse = new Response(req.session.authenticated, {}, null);
		}
		res.json(authResponse);
	})

	function checkUsername(callback){
		User.findOne({username: username}, function(err, user){
			if(err) callback('Error in database =(');
			if(!user) {
				callback(null);
			} else{
				log.info('wtf')
				callback('username');
			}
		})
	} 

	function saveUser(callback){
		var newUser = new mongoose.models.User({username: username, password: password});
		newUser.save(function(err, user){
			if(err) next(err);
			callback(null, user)
		})
	}
})

router.post('/testLogin', function (req, res, next) {
	var authResponse;
	var password = parseInt(Math.random()*Math.pow(10, 16));

	async.waterfall([checkUsername, saveUser], function(err, user){
		if(err) log.info(err);
		saveInSession (req, user);
		authResponse = new Response(req.session.authenticated, {}, null);
		res.json(authResponse);
	})

	function checkUsername(callback){
		var username = 'test_account' + parseInt(Math.random()*Math.pow(10, 16));
		User.findOne({username: username}, function(err, user){
			if(err) callback('Error in database =(');
			if(!user) {
				callback(null, username);
			} else{
				username = username + ',' + parseInt(Math.random()*10)
				callback(null, username);
			}

		})
	} 
	function saveUser(username, callback){

		var password = '' + parseInt(Math.random()*Math.pow(10, 16));
		var username = '' + username;
		var newUser = new mongoose.models.User({username: username, password: password});
		newUser.save(function(err, user){
			if(err) callback('Error in database =(');
			callback(null, user)
		})
	}
});

router.post('/inspection', function (req, res, next) {
	var authResponse = new Response(req.session.authenticated, {}, null);
	res.json(authResponse);
});

router.post('/log-out', function (req, res, next) {
	req.session.destroy(function(err) {
		if(err) next(err);
		var authResponse = new Response(false, {}, null);
		res.json(authResponse);
	});
});

function saveInSession (req, user) {
	req.session.authenticated = true;
	req.session.userId = user.id;
}


module.exports = router;