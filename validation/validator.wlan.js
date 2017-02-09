/* -----------------------------------------
 * Author: Philip Jurke
 * Last changes:
 * 09.01.2017 - add comments
 * -----------------------------------------*/

// -----------------------
// WLAN
// -----------------------

// regex for bssid-attribute
var bssidRegex = /^(?:[0-9a-f]{2}:){5}[0-9a-f]{2}$/im;

module.exports.isBSSID = function(bssid)
{
	return bssidRegex.test(bssid);
};

var genFrequencyRegex = /^(?:[0-9]{4}|2\.4|5)$/m;

module.exports.isGeneralFrequency = function(frequency)
{
	return genFrequencyRegex.test(frequency);
};

// regex for frequency-attribute
var frequencyRegex = /^[0-9]{4}$/m;

module.exports.isFrequency = function(frequency)
{
	return frequencyRegex.test(frequency);
};

var frequencyBandRegex = /^(?:2\.4|5)$/m;

 module.exports.isFrequencyBand = function(frequencyBand)
{
	return frequencyBandRegex.test(frequencyBand);
};

var ssidRegex = /^[\d^\d]{1,32}$/m;

module.exports.isSSID = function(ssid)
{
	return ssidRegex.test(ssid);
};

// regex for strength-attribute
var strengthRegex = /^-[1-9][0-9]?$/m;

module.exports.isStrength = function(strength)
{
	return strengthRegex.test(strength);
};