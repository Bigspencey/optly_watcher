var request = require('request');
var mongoose = require('mongoose');
var User = require('./user.js');

module.exports = function(){

request('http://www.google.com', function (error, response, body) {
		if (!error && response.statusCode == 200) {
	console.log(body) // Show the HTML for the Google homepage.
	 	}
});

}

	// var httpReq = function(){
	// 	console.log("WORKS!!!")

	// }