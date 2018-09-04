function Movie(options) {
    options = options || {};
    this.id = options._id;
    this.title = options.Title;
    this.genre = options.Genre;
    this.posterUrl = options.Poster;
    this.rating = options.imdbRating;
    this.votes = options.imdbVotes;
    this.description = options.Plot;
  }
  
  Movie.prototype.getMovieDetails = function() {
    var that = this;
    return $.get("https://ancient-caverns-16784.herokuapp.com/movies" + this.id)
      .then(function(response) {
        that.id = response._id;
        that.title = response.Title;
        that.genre = response.Genre;
        that.posterUrl = response.Poster;
        that.rating = response.imdbRating;
        that.votes = response.imdbVotes;
        that.plot = response.Plot;
    })
  }
  
  