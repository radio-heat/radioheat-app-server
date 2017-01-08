// -----------------------
// Location
// -----------------------

var latitudeRegex = /^\s*[-+]?(180(\.0+)?|((1[0-7]\d)|([1-9]?\d))(\.\d+)?)$/;

module.exports.isLatitude = function(latitude)
{
	return latitudeRegex.test(latitude);
};

var longitudeRegex = /^[-+]?([1-8]?\d(\.\d+)?|90(\.0+)?)$/;

module.exports.isLongitude = function(longitude)
{
	return longitudeRegex.test(longitude);
};