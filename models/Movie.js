function Movie(options) {
    options = options || {};
    this.id = options._id;
    this.title = options.Title;
    this.genre = options.Genre;
    this.year = options.Year;
    this.posterUrl = options.Poster;
    this.rating = options.imdbRating;
    this.votes = options.imdbVotes;
  }
  
  Movie.prototype.getMovieDetails = function() {
    var that = this;
    return $.get("https://ancient-caverns-16784.herokuapp.com/movies/" + this.id)
      .then(function(response) {
        that.title = response.Title;
        that.year = response.Year;
        that.released = response.Released;
        that.runtime = response.Runtime;
        that.genre = response.Genre;
        that.director = response.Director;
        that.writer = response.Writer;
        that.actors = response.Actors;
        that.language = response.Language;
        that.country = response.Country;
        that.posterUrl = response.Poster;
        that.rating = response.imdbRating;
        that.votes = response.imdbVotes;
        that.plot = response.Plot;
        that.type = response.Type;
    })
  }

  Movie.prototype.saveMovie = function _ajax_request(token) {
    return $.ajax({
    url: "https://ancient-caverns-16784.herokuapp.com/movies/" + this.id,
    headers: {
      "x-auth-token": token
    },
    type: "PUT",
    success: function(response){
      alert ("Changes have been made successful!");
      window.location = "../pages/home.html#home";
      console.log(response);
     }
    });
  }

  Movie.prototype.updateMovie = function(token, data) {
    return $.delete( {
      data
    })
    .then(function(response){
      console.log(response);
      alert ("Changes have been made successful!");
      window.location = "../pages/home.html#home";
    });
  }

  Movie.prototype.deleteMovie = function(token){
	return $.ajax({
		url: "https://ancient-caverns-16784.herokuapp.com/movies/" + this.id,
		type: 'DELETE',
		headers: {
			  "x-auth-token": token
		},
		success: function(result) {
				 console.log(result);
		}
	});
  }

