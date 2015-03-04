
/**
 * Module dependencies.
 */

var render = require('../lib/render');

/**
 * Render index html page.
 */

exports.index = function *(username) {
  username = username || '';
  this.body = yield render('index', { username: username });
};
