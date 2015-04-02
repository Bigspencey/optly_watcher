var request = require('request');
var _  = require('underscore');
var async = require('async');

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


async.parallel({

	// Retrieves a list of Active Projects from the Account

	retrieveProjectIds : function(){
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
	},

	// Retrieve a list of experiment ID's from each Project (Experiments must be running)

	retrieveExperimentIds : function(projectIds){
		var projects_with_experiments = {};
		_.each(projectIds, function(projectId) {
			var experimentInfo = [];
			request(optionsBuilder(projectId), function(error, response, body) {
				if (!error && response.statusCode === 200) {
					var experiments = JSON.parse(body);
					_.each(experiments, function(experiment){
						if (experiment.status === 'Running'){
							experimentInfo.push(experiment);
							projects_with_experiments[projectId] = experimentInfo
						}
					});
				}
				console.log(projects_with_experiments)
			});
		});
		debugger;
		retrieveExperimentResults(projects_with_experiments)
	},

	retrieveExperimentResults : function(projects_with_experiments){
		console.log("THE THING: " + projects_with_experiments);
		return projects_with_experiments
	}
},
function(err, results){
	console.log("success!!!!!!");
	console.log(results)
});

}

// READ THIS!!!!

// Having trouble returning the last object in the each loop before passing it to retrieveExperimentResults 

// STOP

// Must list all projects in an account > List all experiments in a project

// Need a module that returns all running experiments

// Have an array of running experiments that 