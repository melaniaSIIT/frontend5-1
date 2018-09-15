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

  Movie.prototype.updateMovie = function(data) {
    var that = this;
    return $.put("https://ancient-caverns-16784.herokuapp.com/movies/" + this.id, {
      data
    })
    .then(function(response){
      console.log(response);
      alert ("Changes have been made successful!");
      window.location = "../pages/home.html#home";
    });
  }

  $.put = function(url, data, callback, type) {

    if ($.isFunction(data)) {
      type = type || callback,
        callback = data,
        data = {}
    }
  
    return $.ajax({
      url: url,
      type: 'PUT',
      success: callback,
      data: data,
      contentType: type
    });
  }
