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

var retrieveProjectIds = function(){
	var projectIds = [];
	request(options, function (error, response, body) {
		if (!error && response.statusCode === 200) {
			var projects = JSON.parse(body);
			_.each(projects, function(project){
				projectIds.push(project.id);
			});
		}
		retrieveExperimentIds(projectIds);
	});

}

// Retrieve each Projects' list of experiments

var retrieveExperimentIds = function(projectIds){
	console.log("inside callback");
	console.log(projectIds);
}



}

// request('https://www.optimizelyapis.com/experiment/v1/experiments/', function (error, response, body) {
// 		if (!error && response.statusCode === 200) {
// 	console.log(body)
// 	 	}
// });

// Must list all projects in an account > List all experiments in a project