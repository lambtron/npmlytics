
/**
 * Module dependencies.
 */

var render = require('../lib/render');
var npm = require('../lib/npm');

/**
 * Render index html page.
 */

exports.index = function *(username, from, to) {
  var data = [];
  var packages = [];
  if (username) packages = yield npm.packages(username);
  for (var i = 0; i < packages.length; i++) {
    var stats = yield npm.downloads(packages[i], from, to);
    data.push(stats);
  }
  // this.body = yield render('index', { data: data });
  this.body = data;
};
