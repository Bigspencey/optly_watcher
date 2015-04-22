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

	async.waterfall([

		// Retrieves a list of Active Projects from the Account

		retrieveProjectIds = function(callback){
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
				callback(null, projectIds);
			});
		},

		// Retrieve a list of experiment ID's from each Project (Experiments must be running)

		retrieveExperimentIds = function(projectIds, callback){
			var active_experiments = {};
			var counter = 0;
			var array_length = projectIds.length;
			_.each(projectIds, function(projectId) {
				request(optionsBuilder(projectId), function(error, response, body) {
					if (!error && response.statusCode === 200) {
						var experiments = JSON.parse(body);
						active_experiments[projectId] = _.filter(experiments, function(experiment){
							return experiment.status === 'Running';
						});
						if (counter === projectIds.length -1){
							callback(null, active_experiments);
						}
						counter++;
					}
				});
			});
		}
	],
	// Return project IDs that are associated to active experiments

	function(err, results) {
		if (err) {
			console.log(err);
		}
		console.log("INSIDE THE FINAL CALLBACK");
		console.log(results);
	});

}

// READ THIS!!!!

// Add notes from table.