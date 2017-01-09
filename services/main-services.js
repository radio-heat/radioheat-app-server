/* -----------------------------------------
 * Author: Philip Jurke
 * Last changes:
 * 08.01.2017 - add comments
 * -----------------------------------------*/

// --------------------
// dependencies
// --------------------

// import pg-promise (postgresql-connection)
var pgp = require('pg-promise')();

// database-connection handle
var dbc;

// validator for this service
var validator = require('../validation/validator.add-measurement.js');

// --------------------
// services
// --------------------

// module initialisation
module.exports.init = function(dbConfig)
{
	// connect to database server
	dbc = pgp(dbConfig);
	
	// output initialised message
	console.log('Database connection initialised.');
};

// add / store a new measurement
module.exports.addMeasurement = function(webRequest, webResponse)
{
	
	//var results = validator.validate(webRequest.body);
	
	// if there are errors submit it to the client
	//if (results.type)
	//{
	//	webResponse.json(results);
	//	return;
	//}
	
	// submit data to dbs (by stored procedure)
	dbc.func('radioheat_add_measurement', [ webRequest.body ])
	.then(function(dbResponse)		// if request is successful
	{
		webResponse.json('alright');
	})
	.catch(function(dbError)		// if request failed
	{
		console.log(dbError);
		webResponse.sendStatus(500);
	});

};