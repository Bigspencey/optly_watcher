var mongoose = require('mongoose'),
	passportLocalMongoose = require('passport-local-mongoose');

var User = mongoose.Schema({
	first_name: String,
	username: String,
	password: String,
	api_key: String
});

User.plugin(passportLocalMongoose);

module.exports = mongoose.model('User', User);