var request = require('request');
var mongoose = require('mongoose');
var User = require('./user.js');

module.exports = function(req){

// Retrieve API Token from user session

var options = {
	url: 'https://www.optimizelyapis.com/experiment/v1/projects/',
	headers: {
		'Token': req.user.api_key
	}
}

// Retrieve a list of Projects in your account

request(options, function (error, response, body) {
	if (!error && response.statusCode === 200) {
		console.log(body);
	}
});



}

// request('https://www.optimizelyapis.com/experiment/v1/experiments/', function (error, response, body) {
// 		if (!error && response.statusCode === 200) {
// 	console.log(body)
// 	 	}
// });