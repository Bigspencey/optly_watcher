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

// var urlBuilder = function(projectIds){
// 	.each(projectIds, function(id){
// 		url: 'https://www.optimizelyapis.com/experiment/v1/projects/1416366117/experiments/'
// 	})
// 	var experiment_options = {

// 	}
// }
var experiment_options = {
	url: 'https://www.optimizelyapis.com/experiment/v1/projects/1629293960/experiments/',
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
		console.log("project Ids");
		console.log(projectIds);
		retrieveExperimentIds(projectIds);
	});
}

// Retrieve each Projects' list of experiments

var retrieveExperimentIds = function(projectIds){
	var experimentIds = [];
	request(experiment_options, function(error, response, body) {
		if (!error && response.statusCode === 200) {
			var experiments = JSON.parse(body);
			_.each(experiments, function(experiment){
				if (experiment.status === 'Running'){
					experimentIds.push(experiment.id)
					console.log('STATUS!!!');
					console.log(experiment);
				}
			});
		}
		console.log('experiment ids');
		console.log(experimentIds);
	});
}

retrieveProjectIds()

}

// Must list all projects in an account > List all experiments in a project

// Need a module that returns all running 
