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
			username: 'Jon Snow', password: '111111'
		},
		{
			username: 'Tyrion Lannister', password: '111111'
		},
		{
			username: 'Cersei Lannister', password: '1111111'
		},
		{
			username: 'Jorah Mormont', password: '1111wdwd11'
		},
		{
			username: '	Arya Stark', password: '1111wdwd11'
		},
		{
			username: 'Bran Stark', password: '1111wdwd11'
		},
		{
			username: 'Robert Baratheon', password: '1111wdwd11'
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


