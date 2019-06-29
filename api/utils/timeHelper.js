const daysToMilliseconds = function daysToMilliseconds(days) {
  if (!days) {
    return 0;
  }
  return days * 24 * 60 * 60 * 1000;
};

const hoursToMilliseconds = function hoursToMilliseconds(hours) {
  if (!hours) {
    return 0;
  }
  return hours * 60 * 60 * 1000;
};

const minutesToMilliseconds = function minutesToMilliseconds(minutes) {
  if (!minutes) {
    return 0;
  }
  return minutes * 60 * 1000;
};

module.exports = {
  daysToMilliseconds,
  hoursToMilliseconds,
  minutesToMilliseconds,
};
