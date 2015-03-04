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

  $('input[name="username"]').blur(function() {
    if ($(this).val().length === 0) $(this).focus();
    redirect();
  });

  /**
   * Focus to text box.
   */

  $('input[name="username"]').focus();

  /**
   * Redirect user.
   */

  function redirect() {
    var username = $('input[name="username"]').val();
    if (username) document.location.href = '/' + username;
  }

})();