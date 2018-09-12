  function User(options) {
      options = options || {};
      this.username = options.username;
      this.password = options.password;
  }

  User.prototype.registerUser = function _ajax_request(data) {
      return $.ajax({
        url: 'https://ancient-caverns-16784.herokuapp.com/auth/register',
        type: 'POST',
        data: data,
        success: function(result){
          console.log('Producer added to database!');
        }
      });
  }

  User.prototype.loginUser = function _ajax_request(data) {
      return $.ajax({
        url: 'https://ancient-caverns-16784.herokuapp.com/auth/login',
        type: 'POST',
        data: data,
        success: function(result){
          console.log('Producer logged in');
        }
      });
  }