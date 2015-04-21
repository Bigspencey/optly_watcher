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
			// callback(null, active_experiments);
		}

		// var retrieveExperimentResults = function(active_experiments){
		// 	console.log("in here")
		// 	console.log(active_experiments);
		// }

		// retrieveProjectIds();

	],
	function(err, results) {
		if (err) {
			console.log(err);
		}
		console.log("INSIDE THE FINAL CALLBACK");
		console.log(results);
	});

}

// READ THIS!!!!

// Having trouble returning the last object in the each loop before passing it to retrieveExperimentResults 

// Psuedo code for returning running experiments

/*
  Have an array of project IDs
  We loop through each project ID in the array making a network request for each.
  Each network request will return an array of objects with relevant experiment data
  We then filter out any experiment that isn't "Running".
  Associate each 
*/