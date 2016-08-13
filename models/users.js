var mongoose  = require('../libs/mongoose');
var Schema = mongoose.Schema;

var crypto = require('crypto');



var userSchema = new Schema({
	username: {
		type: String,
		unique: true, 
		required: true
	},
	hashedPassword: {
		type: String,
		required: true
	},
	salt: {
		type: String,
		required: true
	},
	dialogs: {
		type: Schema.Types.Mixed,
		default: {defaulteDialog: 1}
	},
	created: {
		type: Date,
		default: Date.now
	}
});

userSchema.methods.encryptPassword = function(password){
	return crypto.createHmac('sha1', this.salt).update(password).digest('hex');
};
userSchema.methods.checkPassword = function(password){
	return this.encryptPassword(password) === this.hashedPassword;
}
userSchema.virtual('password')
	.set(function(password){
		this._plainPassword = password;
		this.salt = Math.random() + '';
		this.hashedPassword = this.encryptPassword(password);
	})
	.get(function(){
		return this._plainPassword;
	});

module.exports = mongoose.model('User', userSchema);
