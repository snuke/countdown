import moment from 'moment';
import 'moment-duration-format';

var utils = {
  deep: {},
  setLS: {},
  getLS: {},
  getMoment: {},
  validateTimers: {},
  loadTimers: {},
  saveTimers: {}
};

const KEY_TIMERS = 'CountDownTimers';

utils.deep = function(data) {
  return JSON.parse(JSON.stringify(data));
}

utils.setLS = function(key, val) {
  localStorage.setItem(key, JSON.stringify(val));
}
utils.getLS = function(key) {
  return JSON.parse(localStorage.getItem(key) || 'null');
}

utils.getMoment = function(timer) {
  return moment(timer.date + 'T' + timer.time + ':00');
}

utils.validateTimers = function(timers) {
  if (!timers) return false;
  if (typeof(timers) !== 'object') return false;
  for (var i = 0; i < timers.length; i++) {
    var timer = timers[i];
    if (typeof(timer) !== 'object') return false;
    if (Object.keys(timer).length !== 3) return false;
    if (!('label' in timer)) return false;
    if (!('date' in timer)) return false;
    if (!('time' in timer)) return false;
    if (typeof(timer.label) !== 'string') return false;
    if (typeof(timer.date) !== 'string') return false;
    if (typeof(timer.time) !== 'string') return false;
    if (!utils.getMoment(timer).isValid()) return false;
  }
  return true;
}

utils.loadTimers = function() {
  var timers = utils.getLS(KEY_TIMERS);
  if (!utils.validateTimers(timers)) timers = [];
  return timers;
}
utils.saveTimers = function(timers) {
  utils.setLS(KEY_TIMERS, timers);
}

export default utils;