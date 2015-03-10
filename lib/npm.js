
/**
 * Module dependencies.
 */

var thunkify = require('thunkify-wrap');
var request = require('request');
var cheerio = require('cheerio');
var moment = require('moment');

/**
 * Define static variables.
 */

var get = thunkify(request.get);

/**
 * Get packages.
 *
 * @param {String} username
 *
 * @return {Array}
 */

exports.packages = function *(username) {
  if (username.length === 0) return;
  var domain = 'https://www.npmjs.com/~' + username;
  var $ = yield parseHTML(domain);
  var packages = [];
  for (var i = 0; i < $('.content li > a').length; i++) {
    packages.push($('.content li > a')[i].children[0].data);
  }
  return packages;
};

/**
 * Get package download info.
 *
 * @param {String} pkg
 * @param {String} from
 * @param {String} to
 *
 * @return {Object}
 */

exports.downloads = function *(pkg, from, to) {
  var domain = 'https://api.npmjs.org/downloads/range/';
  var range = 'last-month';
  if (from && to) range = from + ':' + to;
  domain += range + '/' + pkg;
  var data = yield parseJSON(domain);
  data.downloads.sort(sortByDateAsc);
  var start = moment.isDate(from) ? from : moment().subtract(1, 'month').subtract(1, 'day').format('YYYY-MM-DD');
  var end = moment.isDate(to) ? to : moment().format('YYYY-MM-DD');
  data.downloads = trim(data.downloads, start, end);
  return data;
};

/**
 * Trim start date.
 */

function trim(arr, start, end) {
  if (!moment(arr[arr.length - 1].day).isSame(moment(end))) arr.push({ day: end, downloads: 0 });
  if (moment(arr[0].day).isSame(moment(start))) return fill(arr);
  arr.unshift({ day: start, downloads: 0 });
  return fill(arr);
}

/**
 * Fill in blank dates.
 */

function fill(arr) {
  var prev = curr = '';
  for (var i = 1; i < arr.length; i++) {
    prev = moment(arr[i - 1].day);
    curr = moment(arr[i].day);
    if (prev.add(1, 'd').isSame(curr)) continue;
    var newcurr = prev.format('YYYY-MM-DD');
    arr.splice(i, 0, { day: newcurr, downloads: 0 });
  }
  return arr;
}

/**
 * Get HTML and parse it.
 *
 * @param {String} domain
 *
 * @return {Object}
 */

function *parseHTML(domain) {
  var html = yield get(domain);
  return cheerio.load(html[0].body);
}

/**
 * Get JSON and parse it.
 *
 * @param {String} domain
 *
 * @return {Object}
 */

function *parseJSON(domain) {
  var res = yield get(domain);
  return JSON.parse(res[0].body);
}

/**
 * Sort by date.
 */

function sortByDateAsc(a, b) {
  a = moment(a.day);
  b = moment(b.day);
  return a.isAfter(b) ? 1 : a.isBefore(b) ? -1 : 0;
}
