
/**
 * Module dependencies.
 */

var render = require('../lib/render');
var npm = require('../lib/npm');

/**
 * Render index html page.
 */

exports.index = function *() {
  this.body = yield render('index');
};

/**
 * Render stats page.
 */

exports.stats = function *(username, from, to) {
  if (!~this.request.url.indexOf('.json')) return this.body = yield render('chart');
  if (!username) return redirect('/');
  var data = [];
  var packages = yield npm.packages(username);
  for (var i = 0; i < packages.length; i++) {
    var stats = yield npm.downloads(packages[i], from, to);
    data.push(stats);
  }
  return this.body = data;
};
