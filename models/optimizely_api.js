var request = require('request');
var mongoose = require('mongoose');
var User = require('./user.js');

module.exports = function(){

// Retrieve API Token from database

console.log("HERE IS THE USER: " + req.session)


var options = {
	url: 'https://www.optimizelyapis.com/experiment/v1/projects/',
	headers: {
		'Token': 'token here'
	}
}

// Retrieve a list of Projects in your account

request(options, function (error, response, body) {
	if (!error && response.statusCode === 200) {
		console.log(body);
	} else {
		console.log(error);
	}
});



}

// request('https://www.optimizelyapis.com/experiment/v1/experiments/', function (error, response, body) {
// 		if (!error && response.statusCode === 200) {
// 	console.log(body)
// 	 	}
// });