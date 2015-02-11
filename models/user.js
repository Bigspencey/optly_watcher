var mongoose = require('mongoose')

var User = mongoose.Schema({
	first_name: String,
	username: String,
	password: String,
	email: String,
	api_key: String
});

module.exports = mongoose.model('User', User);