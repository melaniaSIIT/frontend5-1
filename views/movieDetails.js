window.addEventListener("load", function() {
    var containerEl = document.getElementById("movie-details");
    
    var movie = new Movie();
    var movieId = getUrlParameter("movieId");
    movie.id = movieId;
    
    movie.getMovieDetails().then(function(response) {          
      displayMovieDetails(movie);
      function displayMovieDetails(movieDetails) {
        
        var titleEl = document.createElement('h1');
        titleEl.innerHTML = movieDetails.title;
        containerEl.appendChild(titleEl);
        
        var imageEl = document.createElement('IMG');
          imageEl.setAttribute("src", movieDetails.posterUrl);
          imageEl.setAttribute("height", "200");
          imageEl.setAttribute("alt", "Movie Image here");
        containerEl.appendChild(imageEl);
          
        var bodyEl = document.createElement('p');
        bodyEl.innerHTML = movieDetails.plot;
        containerEl.appendChild(bodyEl);
        
      }
    });
    
    
    /**
       * It retrieves a query (URL) parameter value
       * 
       * It expects you to send the parameter key(before '=')
        */
      function getUrlParameter(name) {
          name = name.replace(/[\[]/, '\\[').replace(/[\]]/, '\\]');
          var regex = new RegExp('[\\?&]' + name + '=([^&#]*)');
          var results = regex.exec(location.search);
          return results === null ? '' : decodeURIComponent(results[1].replace(/\+/g, ' '));
      }
  });