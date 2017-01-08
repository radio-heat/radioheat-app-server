// -----------------------
// Date
// -----------------------

var dayRegex = /^(?:[1-9]|[12][0-9]|3[01])$/m;

module.exports.isDay = function(day)
{
	return dayRegex.test(day);
};

var monthRegex = /^(?:[1-9]|1[0-2])$/m;

module.exports.isMonth = function(month)
{
	return monthRegex.test(month);
};

var yearRegex = /^20[1-9][0-9]$/m;

module.exports.isYear = function(year)
{
	return yearRegex.test(year);
};

// -----------------------
// Time
// -----------------------

var secondRegex = /^[1-5]?[0-9]$/m;

module.exports.isSecond = function(second)
{
	return secondRegex.test(second);
};

var minuteRegex = /^[1-5]?[0-9]$/m;

module.exports.isMinute = function(minute)
{
	return minuteRegex.test(minute);
};

var hourRegex = /^(?:1?[0-9]|2[0-3])$/m;

module.exports.isHour = function(hour)
{
	return hourRegex.test(hour);
};