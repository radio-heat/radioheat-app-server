// --------------------
// dependencies
// --------------------

// database-connection handle
var dbc;

// --------------------
// initialisation
// --------------------

module.exports.init = function(dbConnection)
{
	// save reference to db-handler
	dbc = dbConnection;
	
	// output initialised message
	console.log('List-Frequency-Bands-Service initialised.');
};

// --------------------
// functionality
// --------------------

module.exports.service24 = function(webRequest, webResponse)
{
	// submit data to dbs (by stored procedure)
	dbc.func('radioheat_list_frequency_band_24')
	.then(function(dbResponse)		// if request was successful
	{
		webResponse.json(dbResponse[0].radioheat_list_frequency_band_24);
	})
	.catch(function(dbError)		// if request failed
	{
		webResponse.sendStatus(500);
	});
};

module.exports.service5 = function(webRequest, webResponse)
{
	// submit data to dbs (by stored procedure)
	dbc.func('radioheat_list_frequency_band_5')
	.then(function(dbResponse)		// if request was successful
	{
		webResponse.send(dbResponse[0].radioheat_list_frequency_band_5);
	})
	.catch(function(dbError)		// if request failed
	{
		webResponse.sendStatus(500);
	});
};