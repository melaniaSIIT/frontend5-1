window.addEventListener("load", function() {
    var containerEl = document.getElementById("movie-details");
    
    var movie = new Movie();
    var movieId = getUrlParameter("movieId");
    movie.id = movieId;
    
    movie.getMovieDetails().then(function(response) {          
      displayMovieDetails(movie);
      function displayMovieDetails(movieDetails) {
        
        var titleEl = document.createElement('h2');
        titleEl.innerHTML = movieDetails.title;
        titleEl.setAttribute("id", "movieTitleId");
        containerEl.appendChild(titleEl);
        
        var imageEl = document.createElement('IMG');
          imageEl.setAttribute("src", movieDetails.posterUrl);
          imageEl.setAttribute("height", "200");
          imageEl.setAttribute("alt", "Movie Image here");
          imageEl.setAttribute("id", "movieImageId");
        containerEl.appendChild(imageEl);
          
        var bodyEl = document.createElement('p');
        bodyEl.innerHTML = movieDetails.plot;
        bodyEl.setAttribute("id", "moviePlotId");
        containerEl.appendChild(bodyEl);
        
        //buttons
        var actionContainer = document.createElement("div");

        var backButton = document.createElement("button");
        backButton.innerHTML = "Back";
        backButton.addEventListener("click", function(){
          window.location = "../pages/home.html#home";
        })
        backButton.setAttribute("class", "actionButtonClass");
        
        var editButton = document.createElement("button");
        editButton.innerHTML = "Edit";
        editButton.setAttribute("class", "actionButtonClass");
        
        var deleteButton = document.createElement("button");
        deleteButton.innerHTML = "Delete";
        deleteButton.setAttribute("class", "actionButtonClass");

        actionContainer.appendChild(backButton);
        actionContainer.appendChild(editButton);
        actionContainer.appendChild(deleteButton);

        containerEl.appendChild(actionContainer);

        //Rate movie
        var asideRateContainer = document.getElementById("asideSection");

        //Rating Text
        var rateMovieText = document.createElement("h2");
        rateMovieText.innerHTML = "Rate " +  movieDetails.title;
        asideRateContainer.appendChild(rateMovieText);
        
        // //Rating Alert
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


