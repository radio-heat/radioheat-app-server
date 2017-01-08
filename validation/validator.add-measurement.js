
// dependencies

var datetimeValidator = require('./validator.datetime.js');
var locationValidator = require('./validator.location.js');
var wlanValidator = require('./validator.wlan.js');

var dataTemplate = require('./template.add-measurement-input.json');

module.exports.validate = function(input)
{
	
	var result = {};

// first level validation: necessary attributes exist?
	
	result.missingAttributes = [];
	
	// go through all possible properties
	for (var prop1Level in dataTemplate)
	{
		// does the first level attribute exist? yes (enlist), no (check sub-properties)
		if (!input[prop1Level])
			result.missingAttributes.push(prop1Level);
		else
			// go through all sub properties
			for (var prop2Level in dataTemplate[prop1Level])
				// is second level attribute optional and is value given? yes (okay), no (enlist)
				if (dataTemplate[prop1Level][prop2Level].isOptional == false && !input[prop1Level][prop2Level])
				{
					result.missingAttributes.push(prop1Level + '.' + prop2Level);
					console.log(prop1Level, prop2Level);
				}
	}
	
	// if at least one attribute is missing, return missing attribute array
	if (result.missingAttributes.length > 0)
	{
		result.type = 'error';
		return result;
	}
	else
		delete result.type;
	
// second level validation: attributes contain correct data?
	
	result.wrongAttributeValues = [];
	
	if (!datetimeValidator.isDay(input['datetime']['day']))
		wrongAttributeValues['datetime.day'];
	
	if (!datetimeValidator.isMonth(input['datetime']['month']))
		wrongAttributeValues['datetime.month'];
	
	if (!datetimeValidator.isYear(input['datetime']['year']))
		wrongAttributeValues['datetime.year'];
	
	if (!datetimeValidator.isHour(input['datetime']['hour']))
		wrongAttributeValues['datetime.hour'];
	
	if (!datetimeValidator.isMinute(input['datetime']['minute']))
		wrongAttributeValues['datetime.minute'];
	
	if (!datetimeValidator.isSecond(input['datetime']['second']))
		wrongAttributeValues['datetime.second'];
	
	if (!locationValidator.isLatitude(input['location']['latitude']))
		wrongAttributeValues['location.latitude'];
	
	if (!locationValidator.isLongitude(input['location']['longitude']))
		wrongAttributeValues['location.longitude'];
	
	if (!locationValidator.isStorey(input['location']['storey']))
		wrongAttributeValues['location.storey'];
	
	if (!wlanValidator.isBSSID(input['wlanNetworks']['bssid']))
		wrongAttributeValues['wlanNetworks.bssid'];
	
	if (!wlanValidator.isFrequency(input['wlanNetworks']['frequency']))
		wrongAttributeValues['wlanNetworks.frequency'];
	
	if (!wlanValidator.isSSID(input['wlanNetworks']['ssid']))
		wrongAttributeValues['wlanNetworks.ssid'];
	
	if (!wlanValidator.isStrength(input['wlanNetworks']['strength']))
		wrongAttributeValues['wlanNetworks.strength'];
	
	if (wrongAttributeValues.length > 0)
	{
		result.type = 'error';
		return result;
	}

	return true;

};