var optimizely_api = require('../models/optimizely_api.js');

var execute = function(req){
	optimizely_api(req);
	// Call all necessary functions here from Models.
}

exports.execute = execute;