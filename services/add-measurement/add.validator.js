// --------------------
// dependencies
// --------------------

var datetimeValidator = require('../../validation/validator.datetime.js');
var locationValidator = require('../../validation/validator.location.js');
var wlanValidator = require('../../validation/validator.wlan.js');

// --------------------
// functionality
// --------------------

module.exports.validate = function(input)
{

// first level validation (all attributes existing)
	
	var missingAttributes = [];
	
	var datetime = ['year', 'month', 'day', 'hour', 'minute', 'second'];
	
	if (!input.hasOwnProperty('datetime'))
		missingAttributes.push('datetime');
	else
		for (var attr in datetime)
			if (!input.datetime.hasOwnProperty(datetime[attr]))
				missingAttributes.push('datetime.' + datetime[attr]);
	
	var location = ['latitude', 'longitude', 'storey'];
	
	if (!input.hasOwnProperty('location'))
		missingAttributes.push('location');
	else
		for (var attr in ['latitude', 'longitude', 'storey'])
			if (!input.location.hasOwnProperty(location[attr]))
				missingAttributes.push('location.' + location[attr]);
	
	var wlanNetwork = ['bssid', 'frequency', 'ssid', 'strength'];

	if (!input.hasOwnProperty('wlanNetworks'))
		missingAttributes.push('wlanNetworks');
	else
		for (var network in input.wlanNetwork)
			for (var attr in wlanNetworks)
				if (!network.hasOwnProperty(wlanNetwork[attr]))
					missingAttributes.push('wlanNetworks.' + wlanNetwork[attr]);

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
	if (!datetimeValidator.isYear(input['datetime']['year']))
		unformattedAttributes['datetime.year'];
	
	if (!datetimeValidator.isMonth(input['datetime']['month']))
		unformattedAttributes['datetime.month'];

	if (!datetimeValidator.isDay(input['datetime']['day']))
		unformattedAttributes['datetime.day'];
	
	if (!datetimeValidator.isHour(input['datetime']['hour']))
		unformattedAttributes['datetime.hour'];
	
	if (!datetimeValidator.isMinute(input['datetime']['minute']))
		unformattedAttributes['datetime.minute'];
	
	if (!datetimeValidator.isSecond(input['datetime']['second']))
		unformattedAttributes['datetime.second'];
	
	if (!locationValidator.isLatitude(input['location']['latitude']))
		unformattedAttributes['location.latitude'];
	
	if (!locationValidator.isLongitude(input['location']['longitude']))
		unformattedAttributes['location.longitude'];
	
	if (!locationValidator.isStorey(input['location']['storey']))
		unformattedAttributes['location.storey'];
	
	if (!wlanValidator.isBSSID(input['wlanNetworks']['bssid']))
		unformattedAttributes['wlanNetworks.bssid'];
	
	if (!wlanValidator.isFrequency(input['wlanNetworks']['frequency']))
		unformattedAttributes['wlanNetworks.frequency'];
	
	if (!wlanValidator.isSSID(input['wlanNetworks']['ssid']))
		unformattedAttributes['wlanNetworks.ssid'];
	
	if (!wlanValidator.isStrength(input['wlanNetworks']['strength']))
		unformattedAttributes['wlanNetworks.strength'];
	
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
