var mongoose = require('mongoose')

var User = mongoose.Schema({
	username: String,
	password: String,
	email: String,
	api_key: String
});

module.exports = mongoose.model('User', User);