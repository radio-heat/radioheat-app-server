/* -----------------------------------------
 * Author: Philip Jurke
 * Last changes:
 * 08.01.2017 - add comments
 * 09.01.2017 - add app server config
 * -----------------------------------------*/

// --------------------
// dependencies
// --------------------

// import database configuration details
var dbConfig = require('./config/db.json');

// import app-server configuration details
var appConfig = require('./config/server.json');

// import express.js (module to handle REST-requests)
var express = require('express');

// initialise express, create a new app
var app = express();

// import body-parser (module to get json-data)
var bodyParser = require('body-parser');

// import express extensions and initialise them
var expressExtensions = require('./extensions/express-extension.js');
expressExtensions.init();

// import services-module (outsourced)
var services = require('./services/main-services.js');

// --------------------
// functionality
// --------------------

// === configure express

// make use of body-parser (body-request => json format)
app.use(bodyParser.json());

// log all incoming requests
app.use(expressExtensions.logRequests);

// initialise service-module
services.init(dbConfig);

// === routes

// <domain>/add (store a new measurement)
app.post('/add', services.addMeasurement);

// <domain>/list (list all measurements)
app.post('/list', services.listMeasurements);

// default route (not provided service-urls)
app.use(expressExtensions.defaultRoute);

// start listening
app.listen(appConfig.port, function()
{
	console.log('Application server initialised.');
});