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

  Movie.prototype.updateMovie = function (token, data, movieId) {
    var movieUrl = "https://ancient-caverns-16784.herokuapp.com/movies/" + movieId;
    // console.log(movieUrl);
    // console.log(data);
    return $.ajax({
    url: movieUrl,
    headers: {
      "x-auth-token": token,
      // "Content-Type": "text"
    },
    type: "PUT",
    data: data,
    // success: function(result, textStatus){
    //   console.log(result);
    //   console.log("textStatus= " + textStatus);
    //  }, 
     complete: function(result) {
      if(result.status == 200) {
        // alert ("Changes have been made successful!");
        console.log(result);
        var message = result.responseText.substring(1,result.responseText.length - 2);
        // message = message.replace(":", "=");
        // message = message.replace('"', ' ');
        window.location = "../pages/movieDetails.html?movieId=" + movieId;
        // window.location = "../pages/movieDetails.html?movieId=" + this.id;
        alert ("The movie was updated: " + message);
      } else {
        alert ("There were no changes to update");
        window.location = "../pages/movieDetails.html?movieId=" + movieId + "&edit=true";
      }
      console.log(result.status);
      console.log(result);
      } 
    }) 
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

