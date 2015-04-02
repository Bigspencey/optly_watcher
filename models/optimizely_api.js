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

// Helper function to build options parameter for API calls

var optionsBuilder = function(projectId){
	var projectURL = 'https://www.optimizelyapis.com/experiment/v1/projects/' + projectId + '/experiments/'
	var experiment_options = {
		url: projectURL,
		headers: {
			'Token': req.user.api_key
		}
	}
	return experiment_options;
}

// Returns REST API Request

var makeRequest = function(options){
	request(options, function (error, response, body) {
		if (!error && response.statusCode === 200) {
			console.log('in makeRequest')
			return JSON.parse(body);
		}
	});
}

// Retrieves a list of Active Projects from the Account

var retrieveProjectIds = function(){
	var projectIds = [];
	var projects = makeRequest(project_options);
	_.each(projects, function(project){
		if (project.project_status === 'Active'){
			projectIds.push(project.id);
		}
	});
	console.log('HERE ARE THE PROJECT IDs' + projectIds)
	retrieveExperimentIds(projectIds);
}

// Retrieve a list of experiment ID's from each Project (Experiments must be running)

var retrieveExperimentIds = function(projectIds){
	var projects_with_experiments = {};
	_.each(projectIds, function(projectId) {
		var experimentInfo = [];
		var experiments = makeRequest(optionsBuilder);
		_.each(experiments, function(experiment){
			if (experiment.status === 'Running'){
				experimentInfo.push(experiment);
				projects_with_experiments[projectId] = experimentInfo
			}
		});
	});
	retrieveExperimentResults(projects_with_experiments)
}

var retrieveExperimentResults = function(projects_with_experiments){
	// Do nothing for the moment
}

retrieveProjectIds();

}

// READ THIS!!!!

// NEED TO INSTALL ASYNC MODULE!!!!!!!

// Having trouble returning the last object in the each loop before passing it to retrieveExperimentResults 

// STOP

// Must list all projects in an account > List all experiments in a project

// Need a module that returns all running experiments

// Have an array of running experiments that 