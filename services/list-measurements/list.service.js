// --------------------
// dependencies
// --------------------

// database-connection handle
var dbc;

// validator for this service
var validator = require('./list.validator.js');

// --------------------
// initialisation
// --------------------

module.exports.init = function(dbConnection)
{
	// connect to database server
	dbc = dbConnection;
	
	// output initialised message
	console.log('List-Measurement-Service initialised.');
};

// --------------------
// functionality
// --------------------

module.exports.service = function(webRequest, webResponse)
{
	// test incoming data
	var result = validator.validate(webRequest.body);

	// if the validator returns something, an error occurred
	if (result != null)
	{
		webResponse.json(result);
		return;
	}
	
	var arguments = [webRequest.body.latitude, webRequest.body.longitude];
	var funcName = 'radioheat_list_wlan_frequency';
	
	if (webRequest.body.hasOwnProperty('frequency'))
	{
		if (webRequest.body.frequency == 2.4)
			funcName = 'radioheat_list_wlan_frequency_24';
		else if (webRequest.body.frequency == 5)
			funcName = 'radioheat_list_wlan_frequency_5';
		else
			arguments.push(webRequest.body.frequency);
	}


	// submit data to dbs (by stored procedure)
	dbc.func(funcName, arguments)
	.then(function(dbResponse)		// if request was successful
	{
		webResponse.json(dbResponse);
	})
	.catch(function(dbError)		// if request failed
	{
		webResponse.sendStatus(500);
	});
};