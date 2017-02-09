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

// import pg-promise (postgresql-connection)
var pgp = require('pg-promise')();

// import express extensions and initialise them
var expressExtensions = require('./extensions/express-extension.js');
expressExtensions.init();

// import cors-module
var cors = require('cors');

// import services
var addMeasurementService = require('./services/add-measurement/add.service.js'),
	listMeasurementService = require('./services/list-measurements/list.service.js'),
	listFrequencyBands = require('./services/list-frequency-bands/list.service.js');

// --------------------
// functionality
// --------------------

// === configure express

// config database connection
var dbc = pgp(dbConfig);

// allow cors
app.use(cors());
app.options('*', cors());

// make use of body-parser (body-request => json format)
app.use(bodyParser.json());

// log all incoming requests
app.use(expressExtensions.logRequests);

// initialise service-module
addMeasurementService.init(dbc);
listMeasurementService.init(dbc);
listFrequencyBands.init(dbc);

// === routes

app.post('/add', addMeasurementService.service);
app.post('/measurement/list', listMeasurementService.service);
app.get('/frequency-band/list/2.4', listFrequencyBands.service24);
app.get('/frequency-band/list/5', listFrequencyBands.service5);

// default route (not provided service-urls)
app.use(expressExtensions.defaultRoute);

// start listening
app.listen(appConfig.port, function()
{
	console.log('Application server initialised.');
});