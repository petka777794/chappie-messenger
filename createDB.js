var mongoose  = require('./libs/mongoose');
var log = require('./libs/log')(module); 
var async = require('async')

async.series([open, dropDatabase, requireModels, createUsers], function(err, results){
		if (err) throw err;
		// close connection
		(function(){
			mongoose.disconnect(function(err){
				if (err) throw err;
			})
		})();	
		// response
		log.info('Database was created. Have a nice day =)');
});

function open (callback) {
	mongoose.connection.on('open', callback);
}

function dropDatabase (callback) {
	var db = mongoose.connection.db;
	db.dropDatabase(callback);
}

function requireModels (callback){
	require('./models/users');
	async.each(Object.keys(mongoose.models), function(modelName, callback){
		mongoose.models[modelName].ensureIndexes(callback);
	}, callback)
}

function createUsers (callback) {
	
	var users = [
		{
			username: 'Your Chappie', password: 'werfv43juRFgctcKGG43YPHBVD8975FYfy'
		},
		{
			username: 'Momo', password: '111111'
		},
		{
			username: 'Kolia', password: '111111'
		},
		{
			username: 'Ira', password: '1111111'
		},
		{
			username: 'Polina', password: '1111wdwd11'
		},
		{
			username: 'Liza', password: '1111wdwd11'
		},
		{
			username: 'Edgar', password: '1111wdwd11'
		},
	];
	async.each(users, function(usersData, callback){
		var newUser = new mongoose.models.User(usersData);
		newUser.save(function(err){
			if (err) {
				log.error('User-' + users.indexOf(usersData) + ' is not valid data =(');
			} 
			callback();
		});
	}, callback)
}


