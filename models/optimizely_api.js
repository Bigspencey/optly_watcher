var request = require('request');
var _  = require('underscore');

module.exports = function(req){

// Retrieve API Token from user session

var options = {
	url: 'https://www.optimizelyapis.com/experiment/v1/projects/',
	headers: {
		'Token': req.user.api_key
	}
}

// Retrieve a list of Projects in your account

var retrieveProjectIds = function(callback){
	var projectIds = [];
	request(options, function (error, response, body) {
		if (!error && response.statusCode === 200) {
			var info = JSON.parse(body);
			_.each(info, function(item){
				projectIds.push(item.id);
			});
		}
		callback(projectIds);
	});

}

var retrieveExperimentIds = function(){
	retrieveProjectIds(function(projectIds){
		console.log("inside callback");
		console.log(projectIds);
	});
}





}

// request('https://www.optimizelyapis.com/experiment/v1/experiments/', function (error, response, body) {
// 		if (!error && response.statusCode === 200) {
// 	console.log(body)
// 	 	}
// });

// Must list all projects in an account > List all experiments in a project