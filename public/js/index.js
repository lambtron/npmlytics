(function() {

  /**
   * Instantiate variables.
   */

   var packages = [];
   var username = '';

  /**
   * Get user.
   */

  function getUser() {
    // grab from URL or better to get it from server?
  }

  /**
   * Get user's packages.
   *
   * @param {string} username
   */

  function getPackages(username) {
    if (username.length === 0) return;
    var domain = 'https://www.npmjs.com/~' + username;
    $.get(domain, function(data) {
      console.log(data);
      // get package names from HTML.
      // save them to object.
    });
  }

  /**
   * Get package download info.
   *
   * @param {string} pkg
   * @param {string} from
   * @param {string} to
   */

  function getStats(pkg, from, to) {
    var domain = 'https://api.npmjs.org/downloads/range/';
    domain += from + ':' + to + '/' + pkg;
    $.get(domain, function(data) {
      // data is JSON.
      // feed this data into some D3 shiz.
    });
  }

})();