var mongoose = require('mongoose');
	passportLocalMongoose = require('passport-local-mongoose');

var User = mongoose.Schema({
	username: String,
	password: String,
	api_key: String
});

User.plugin(passportLocalMongoose,{
	usernameField: 'email'
});

module.exports = mongoose.model('User', User);