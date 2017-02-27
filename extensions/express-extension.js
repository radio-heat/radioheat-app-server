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
	// load file system (for writing into log file)
	var fs = require('fs');
	
	// create file stream
	requestStream = fs.createWriteStream('../logs/requests.log', { 'flags': 'a' });
};

// log server-requests
module.exports.logRequests = function(webRequest, webResponse, next)
{
	// write new entry into stream
	requestStream.write(new Date().toISOString().replace(/T/, ' ').replace(/\..+/, '') + '\t' + webRequest.protocol + '://' + webRequest.get('host') + webRequest.originalUrl + '\n');
	
	// forward to next available service point
	next();
};

// handle not served routes (with error 404).
module.exports.defaultRoute = function(webRequest, webResponse)
{
	// send http error code 404 (page / service not found)
	webResponse.sendStatus(404);
};
