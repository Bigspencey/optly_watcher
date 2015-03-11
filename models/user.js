var mongoose = require('mongoose')

var User = mongoose.Schema({
	username: String,
	password: String,
	email: String,
	api_key: String
});

User.plugin(passportLocalMongoose,{
	usernameField: 'email'
});

module.exports = mongoose.model('User', User);