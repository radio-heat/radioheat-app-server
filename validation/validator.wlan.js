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

// regex for frequency-attribute
var frequencyRegex = /[0-9]{4}/g;

module.exports.isFrequency = function(frequency)
{
	return frequencyRegex.test(frequency);
};

// regex for strength-attribute
var strengthRegex = /^-[1-9][0-9]?$/g;

module.exports.isStrength = function(strength)
{
	return strengthRegex.test(strength);
};