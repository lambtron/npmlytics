
/**
 * Module dependencies.
 */

var thunkify = require('thunkify-wrap');
var request = require('request');
var cheerio = require('cheerio');

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
  return yield parseJSON(domain);
};

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
