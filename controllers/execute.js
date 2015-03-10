var optimizely_api = require('../models/optimizely_api.js');

var execute = function(){
	optimizely_api();
	// Call all necessary functions here from Models.
}

exports.execute = execute;