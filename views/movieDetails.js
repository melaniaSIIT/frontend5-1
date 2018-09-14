window.addEventListener("load", function() {
    var containerEl = document.getElementById("movie-details");
    
    var movie = new Movie();
    var movieId = getUrlParameter("movieId");
    movie.id = movieId;

    let usernameCookieValue = Cookies.get("username");
    let authenticatedCookieValue = Cookies.get("authenticated");
    let accessTokenCookieValue = Cookies.get("accessToken");
    console.log(usernameCookieValue,authenticatedCookieValue,accessTokenCookieValue);

    //Edit Parameter
    var edit = false;
    edit = getUrlParameter("edit");
    
    movie.getMovieDetails().then(function() {          
      displayMovieDetails(movie);
    });
      function displayMovieDetails(movieDetails) {

        var imageEl = document.createElement('IMG');
        imageEl.setAttribute("src", movieDetails.posterUrl);
        imageEl.setAttribute("height", "200");
        imageEl.setAttribute("alt", "Movie Image here");
        imageEl.setAttribute("id", "movieImageId");
        containerEl.appendChild(imageEl);

        var titleEl;
        var bodyEl;
        var actionContainer = document.createElement("div");

        //Back button
        var backButton = document.createElement("button");
        backButton.innerHTML = "Back";
        backButton.addEventListener("click", function(){
          window.location = "../pages/home.html#home";
        })
        backButton.setAttribute("class", "actionButtonClass");
        actionContainer.appendChild(backButton);

    //Edit

        if(edit === "true") {
          var titleName = document.createElement("p");
          titleName.innerHTML = "Edit title here";

          titleEl = document.createElement("input");
          titleEl.value = movieDetails.title;
          titleEl.setAttribute("id", "movieTitleId");
          containerEl.appendChild(titleName);
          containerEl.appendChild(titleEl);

          var plotName = document.createElement("p");
          plotName.innerHTML = "Change plot here";

          bodyEl = document.createElement("textarea");
          bodyEl.value = movieDetails.plot;
          bodyEl.setAttribute("id", "moviePlotId");
          containerEl.appendChild(plotName);
          containerEl.appendChild(bodyEl);

          var saveButton = document.createElement("button");
          saveButton.innerHTML = "Save";
          saveButton.setAttribute("class", "actionButtonClass");
          actionContainer.appendChild(saveButton);
          containerEl.appendChild(actionContainer);

          saveButton.addEventListener("click", function(){
            movie.updateMovie(
              titleEl.value,
              bodyEl.value
            )
          });
        } else {
          titleEl = document.createElement('h2');
          titleEl.innerHTML = movieDetails.title;
          
          containerEl.appendChild(titleEl);
          
          
          bodyEl = document.createElement('p');
          bodyEl.innerHTML = "Plot: " + movieDetails.plot + "<br>";
          bodyEl.innerHTML += "Year: " + movieDetails.year + "<br>";
          bodyEl.innerHTML += "Genre: " + movieDetails.genre + "<br>";
          bodyEl.innerHTML += "Director: " + movieDetails.director + "<br>";
          bodyEl.innerHTML += "Writer: " + movieDetails.writer + "<br>";
          bodyEl.innerHTML += "Actors: " + movieDetails.actors + "<br>";
          bodyEl.innerHTML += "Language: " + movieDetails.language + "<br>";
          bodyEl.innerHTML += "Country: " + movieDetails.country + "<br>";
          bodyEl.innerHTML += "IMDB Rating: " + movieDetails.rating + "<br>";
          bodyEl.innerHTML += "Type: " + movieDetails.type + "<br>";
          bodyEl.setAttribute("id", "moviePlotId");
          containerEl.appendChild(bodyEl);

        //buttons
         var editButton = document.createElement("button");
         editButton.innerHTML = "Edit";
          editButton.setAttribute("class", "actionButtonClass");
          
          var deleteButton = document.createElement("button");
          deleteButton.innerHTML = "Delete";
          deleteButton.setAttribute("class", "actionButtonClass");
      
        
          actionContainer.appendChild(editButton);
          actionContainer.appendChild(deleteButton);
          containerEl.appendChild(actionContainer);
        }

    // //Rate movie
      var asideRateContainer = document.getElementById("asideSection");

    //Rating Text
      var rateMovieText = document.createElement("h2");
      rateMovieText.innerHTML = "Rate " +  movieDetails.title;
      asideRateContainer.appendChild(rateMovieText);
        
    //Rating Alert
      } 



    // TOPNAV click listeners
    $('#register').click(function(){
      window.open("../pages/register.html","_self");
    });
     $('#login').click(function(){
      window.open("../pages/login.html","_self");
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


