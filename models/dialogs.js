var mongoose  = require('../libs/mongoose');
var Schema = mongoose.Schema;

var dialogSchema = new Schema({
	data: {
		type: [],
		required: true
	} 
})


module.exports = mongoose.model('Dialog', dialogSchema);