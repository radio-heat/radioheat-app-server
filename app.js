/* -----------------------------------------
 * Author: Philip Jurke
 * Last changes:
 * 08.01.2017 - add comments
 * -----------------------------------------*/

// --------------------
// dependencies
// --------------------

var dbConfig = require('./config/db.json');					// import database configuration details

var express = require('express');							// import express.js (module to handle REST-requests)
var app = express();										// initialise express, create a new app
var bodyParser = require('body-parser');					// import body-parser (module to get json-data)

var services = require('./services/main-services.js');		// import services-module (outsourced)

// --------------------
// functionality
// --------------------

// configure express
app.disable('x-powered-by');								// hide version number (improve security)
app.use(bodyParser.json());									// make use of body-parser (body-request => json format)

// initialise service
services.init(dbConfig);									// initialise service-module

// routes
app.post('/add', services.addMeasurement);					// <domain>/add (store a new measurement)

// not registered routes
app.use(function(webRequest, webResponse)					// default route (not provided service-urls)
{
	webResponse.sendStatus(404);
});

// start listening
app.listen(8080, function()
{
	console.log('Application server initialised.');
});