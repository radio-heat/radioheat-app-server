/* -----------------------------------------
 * Author: Philip Jurke
 * Last changes:
 * 09.01.2017 - file created
 * -----------------------------------------*/

// --------------------
// functionality
// --------------------

// manage not served routes (with error 404).
module.exports.defaultRoute = function(webRequest, webResponse)
{
	webResponse.sendStatus(404);
};