// --------------------
// dependencies
// --------------------

// database-connection handle
var dbc;

// validator for this service
var validator = require('./add.validator.js');

// --------------------
// initialisation
// --------------------

module.exports.init = function(dbConnection)
{
	// connect to database server
	dbc = dbConnection;
	
	// output initialised message
	console.log('Add-Measurement-Service initialised.');
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

	// submit data to dbs (by stored procedure)
	dbc.func('radioheat_add_measurement', [webRequest.body])
	.then(function(dbResponse)		// if request was successful
	{
		webResponse.json('alright');
	})
	.catch(function(dbError)		// if request failed
	{
		webResponse.sendStatus(500);
	});
};