var mongoose = require('mongoose');
	passportLocalMongoose = require('passport-local-mongoose');

var User = mongoose.Schema({
	username: String,
	password: String,
	api_key: String,
	project_ids: [String],
	acct_id: String
});

User.plugin(passportLocalMongoose,{
	usernameField: 'email'
});

module.exports = mongoose.model('User', User);