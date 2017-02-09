/* -----------------------------------------
 * Author: Philip Jurke
 * Last changes:
 * 09.01.2017 - add comments
 * -----------------------------------------*/

// -----------------------
// Location
// -----------------------

// regex for latitude-attribute
var latitudeRegex = /^\s*[-+]?(?:180(?:\.0+)?|(?:(?:1[0-7]\d)|(?:[1-9]?\d))(?:\.\d+)?)$/m;

module.exports.isLatitude = function(latitude)
{
	return latitudeRegex.test(latitude);
};

// regex for longitude-attribute
var longitudeRegex = /^[-+]?(?:[1-8]?\d(?:\.\d+)?|90(?:\.0+)?)$/m;

module.exports.isLongitude = function(longitude)
{
	return longitudeRegex.test(longitude);
};

// regex for storey-attribute
var storeyRegex = /^-?1?[0-9]{1}$/m;

module.exports.isStorey = function(storey)
{
	return storeyRegex.test(storey);
};