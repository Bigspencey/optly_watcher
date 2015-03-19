var request = require('request');
var _  = require('underscore');

module.exports = function(req){

// Retrieve API Token from user session

var project_options = {
	url: 'https://www.optimizelyapis.com/experiment/v1/projects/',
	headers: {
		'Token': req.user.api_key
	}
}

// Retrieve a list of Projects in your account

var retrieveProjectIds = function(){
	var projectIds = [];
	request(project_options, function (error, response, body) {
		if (!error && response.statusCode === 200) {
			var projects = JSON.parse(body);
			_.each(projects, function(project){
				projectIds.push(project.id);
			});
		}
		console.log(projectIds);
		retrieveExperimentIds(projectIds);
	});

}

// Retrieve each Projects' list of experiments

var retrieveExperimentIds = function(projectIds){
	var experiment
	console.log("inside retrieveExperimentIds");
	console.log(projectIds);
}

retrieveProjectIds()

}

// request('https://www.optimizelyapis.com/experiment/v1/experiments/', function (error, response, body) {
// 		if (!error && response.statusCode === 200) {
// 	console.log(body)
// 	 	}
// });

// Must list all projects in an account > List all experiments in a project
