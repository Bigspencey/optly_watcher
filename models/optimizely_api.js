var request = require('request');
var _  = require('underscore');
var async = require('async');

module.exports = function(req, callback){
	// Retrieve API Token from user session

	var project_options = {
		url: 'https://www.optimizelyapis.com/experiment/v1/projects/',
		headers: {
			'Token': req.user.api_key
		}
	}

	// Helper function to build options parameter for API calls

	function optionsBuilder(projectId){
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

		function retrieveProjectIds(callback){
			var projectIds = [];
			var projectNamePairs = {};
			request(project_options, function (error, response, body) {
				if (!error && response.statusCode === 200) {
					var projects = JSON.parse(body);
					_.each(projects, function(project){
						if (project.project_status === 'Active'){
							projectNamePairs[project.id] = project.project_name
						}
					});
				}
				callback(null, projectNamePairs);
			});
		}],
		
	// Return project IDs that are associated to active experiments

	function(err, results) {
		if (err) {
			console.log(err);
		}
		callback(results);
	});
}