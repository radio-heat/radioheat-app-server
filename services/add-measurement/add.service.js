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
	// save reference to db-handler
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
	console.log('module.exports.service info: Daten kommen so an:' + webRequest.body); // Debug
	// if the validator returns something, an error occurred
	if (result != null)
	{
		webResponse.json(result);
		console.log('module.exports.service info: Daten validiert ->'); // Debug
		return;
	}

	// submit data to dbs (by stored procedure)
	dbc.func('radioheat_add_measurement', [webRequest.body])
	.then(function(dbResponse)		// if request was successful
	{
		console.log('module.exports.service info: Daten engegengenommen'); // Debug
		webResponse.json('alright');
	})
	.catch(function(dbError)		// if request failed
	{
		webResponse.sendStatus(500);
		console.log('module.exports.service error: Datenbankfehler'); // Debug
		console.log(dbError);
	});
};
