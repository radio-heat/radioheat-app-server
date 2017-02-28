/* -----------------------------------------
 * Author: Philip Jurke
 * Last changes:
 * 09.01.2017 - add comments
 * -----------------------------------------*/

// -----------------------
// Date
// -----------------------

// regex for a year
var yearRegex = /^20[1-9][0-9]$/m;

module.exports.isYear = function(year)
{
	return yearRegex.test(year);
};


// regex for a month
var monthRegex = /^(?:[1-9]|1[0-2])$/m;

module.exports.isMonth = function(month)
{
	return monthRegex.test(month);
};

// regex for a day
var dayRegex = /^(?:[1-9]|[12][0-9]|3[01])$/m;

module.exports.isDay = function(day)
{
	return dayRegex.test(day);
};



// -----------------------
// Time
// -----------------------

// regex for an hour
var hourRegex = /^(?:1?[0-9]|2[0-3])$/m;

module.exports.isHour = function(hour)
{
	return hourRegex.test(hour);
};

// regex for a minute
var minuteRegex = /^[1-5]?[0-9]$/m;

module.exports.isMinute = function(minute)
{
	return minuteRegex.test(minute);
};

// regex for a second
var secondRegex = /^[1-5]?[0-9]$/m;

module.exports.isSecond = function(second)
{
	return secondRegex.test(second);
};


