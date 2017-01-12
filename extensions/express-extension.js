/* -----------------------------------------
 * Author: Philip Jurke
 * Last changes:
 * 09.01.2017 - file created
 * -----------------------------------------*/

// --------------------
// functionality
// --------------------

var requestStream;

module.exports.init = function()
{
	var fs = require('fs');

	requestStream = fs.createWriteStream('./logs/requests.log', { 'flags': 'a' });
};

// log server-requests
module.exports.logRequests = function(webRequest, webResponse, next)
{
	requestStream.write(new Date().toISOString().replace(/T/, ' ').replace(/\..+/, '') + '\t' + webRequest.protocol + '://' + webRequest.get('host') + webRequest.originalUrl + '\n');

	next();
};

// manage not served routes (with error 404).
module.exports.defaultRoute = function(webRequest, webResponse)
{
	webResponse.sendStatus(404);
};