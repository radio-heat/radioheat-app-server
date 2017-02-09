// --------------------
// dependencies
// --------------------

var locationValidator = require('../../validation/validator.location.js');
var wlanValidator = require('../../validation/validator.wlan.js');

// --------------------
// functionality
// --------------------

module.exports.validate = function(input)
{

// first level validation (all attributes existing)
	
	var missingAttributes = [];
	
	if (!input.hasOwnProperty('latitude'))
		missingAttributes.push('latitude');
	
	if (!input.hasOwnProperty('longitude'))
		missingAttributes.push('longitude');

	// if at least one attribute is missing, return the error
	if (missingAttributes.length > 0)
	{
		return {
			returnType: 'error',
			error: {
				type: 'missingAttributes',
				missingAttributes: missingAttributes
			}
		};
	}

// second level validation: attributes contain correct data?

	var unformattedAttributes = [];
	
	if (input.hasOwnProperty('frequency'))
		if (!(wlanValidator.isGeneralFrequency(input.frequency)))
			unformattedAttributes.push('frequency');

	if (!locationValidator.isLatitude(input.latitude))
		unformattedAttributes.push('latitude');
	
	if (!locationValidator.isLongitude(input.longitude))
		unformattedAttributes.push('longitude');
	
	// if at least one attribute is missing, return the error
	if (unformattedAttributes.length > 0)
	{
		return {
			returnType: 'error',
			error: {
				type: 'unformattedAttributes',
				unformattedAttributes: unformattedAttributes
			}
		};
	}

	// if everything is okay, return null
	
	return null;

};