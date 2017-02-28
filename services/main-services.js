/* -----------------------------------------
 * Author: Philip Jurke
 * Last changes:
 * 08.01.2017 - add comments
 * -----------------------------------------*/

// --------------------
// dependencies
// --------------------

var pgp = require('pg-promise')();											// import pg-promise (postgresql-connection)
var dbc;																	// database-connection handle

var validator = require('../validation/validator.add-measurement.js');		// service validator

// --------------------
// services
// --------------------

// module initialisation
module.exports.init = function(dbConfig)
{
	dbc = pgp(dbConfig);													// connect to database server

	console.log('Database connection initialised.');						// output initialised message
};

// add a measurement
module.exports.addMeasurement = function(webRequest, webResponse)			// store a new measurement
{
	
	//var results = validator.validate(webRequest.body);
	
	// if there are errors submit it to the client
	//if (results.type)
	//{
	//	webResponse.json(results);
	//	return;
	//}
	
	// call database server by stored procedure
	dbc.func('radioheat_add_measurement', [ webRequest.body ])
	.then(function(dbResponse)
	{
		webResponse.json('alright');
	})
	.catch(function(dbError)
	{
		console.log(dbError);
		webResponse.send(dbError);
	});

};