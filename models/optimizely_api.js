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

// Retrieves a list of Active Projects from the Account

var retrieveProjectIds = function(){
	var projectIds = [];
	request(project_options, function (error, response, body) {
		if (!error && response.statusCode === 200) {
			var projects = JSON.parse(body);
			_.each(projects, function(project){
				if (project.project_status === 'Active'){
					projectIds.push(project.id);
				}
			});
		}
		retrieveExperimentIds(projectIds);
	});
}

// Retrieve a list of experiment ID's from each Project (Experiments must be running)

var retrieveExperimentIds = function(projectIds){
	var active_entities = {};
	_.each(projectIds, function(projectId) {
		var experimentInfo = [];
		request(optionsBuilder(projectId), function(error, response, body) {
			if (!error && response.statusCode === 200) {
				var experiments = JSON.parse(body);
				_.map(experiments, function(experiment){
					if (experiment.status === 'Running'){
						experimentInfo.push(experiment);
						active_entities[projectId] = experimentInfo
					}
				});
			}
			console.log(active_entities)
		});
	});
	retrieveExperimentResults(active_entities)
}

var retrieveExperimentResults = function(active_entities){
	console.log("in here")
	console.log(active_entities);
}

retrieveProjectIds();

}

// READ THIS!!!!

// Having trouble returning the last object in the each loop before passing it to retrieveExperimentResults 

// STOP

// Must list all projects in an account > List all experiments in a project

// Need a module that returns all running experiments

// Have an array of running experiments that 