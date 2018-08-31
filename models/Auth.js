// function Game(options) {
//   options = options || {};
//   this._id = options._id;
//   this.description = options.description;
//   this.title = options.title;
//   this.publisher = options.publisher;
//   this.imageUrl = options.imageUrl;
//   this.releaseDate = options.releaseDate;
//   this.genre = options.genre;
// }

// Game.prototype.getGameDetails = function() {
//   return $.get('https://games-world.herokuapp.com/games/' + this._id);
// }


// Game.prototype.updateGameDetails = function _ajax_request(url, data) {
//     return jQuery.ajax({
//         url: url,
//         type: 'PUT',
//         data: data,
//         success: function(data){
//           console.log('salut');
//         }
//     });
// }

// Game.prototype.deleteGame = function _ajax_request(url) {
//     return jQuery.ajax({
//         url: url,
//         type: 'DELETE',
//         success: function(result){
//           console.log('deleted', result);
//         }
//     });
// }

  function User(options) {
      options = options || {};
      this.username = options.username;
      this.password = options.password;
  }

  User.prototype.registerUser = function _ajax_request(data) {
      return jQuery.ajax({
        url: 'https://ancient-caverns-16784.herokuapp.com/auth/register',
        type: 'POST',
        
      });
  }
