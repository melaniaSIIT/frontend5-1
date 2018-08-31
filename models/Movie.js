function Movie(options) {
    options = options || {};
    this.id = options._id;
    this.title = options.Title;
    this.genre = options.Genre;
    this.posterUrl = options.Poster;
    this.rating = options.imdbRating;
    this.votes = options.imdgVotes;
    this.description = options.description;
  }
  
  Movie.prototype.getMovieDetails = function() {
    var that = this;
    return $.get("https://ancient-caverns-16784.herokuapp.com/movies" + this.id)
      .then(function(response) {
        that.id = options._id;
        that.title = options.Title;
        that.genre = options.Genre;
        that.posterUrl = options.Poster;
        that.rating = options.imdbRating;
        that.votes = options.imdgVotes;
        that.description = options.description; 
    })
  }
  
  Movie.prototype.editMovieDetails = function() {
    return $.ajax({
        url:  "https://ancient-caverns-16784.herokuapp.com/movies" + movieId,
        method: "PUT",
        data: {
            // to be filled with data input from user
        }, 
        success: function() {

        }
      })
      }
  
  