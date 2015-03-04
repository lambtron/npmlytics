(function() {

  /**
   * Form submit to redirect user.
   */

  $('form').submit(function(e) {
    e.preventDefault();
    redirect();
  });

  /**
   * Text blur to redirect user.
   */

  $('').blur(redirect);

  /**
   * Redirect user.
   */

  function redirect() {
    var username = $('input[name="username"]').val();
    if (username) document.location.href = '/' + username;
  }

})();