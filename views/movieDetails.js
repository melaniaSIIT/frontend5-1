window.addEventListener("load", function() {
    var containerEl = document.getElementById("movie-details");
    
    var movie = new Movie();
    var movieId = getUrlParameter("movieId");
    movie.id = movieId;
    var movieGlobal;

    let usernameCookieValue = Cookies.get("username");
    let authenticatedCookieValue = Cookies.get("authenticated");
    let accessTokenCookieValue = Cookies.get("accessToken");
    console.log(usernameCookieValue,authenticatedCookieValue,accessTokenCookieValue);

    //Edit Parameter
    var edit = getUrlParameter("edit");
    // array with all the properties we use
    // the order they is respected
    var movieDisplayDetails = ["title", "year", "type", "genre", "actor", "writer", "director", "language", "country", "rating", "plot"];

    
    movie.getMovieDetails().then(function() {          
      displayMovieDetails(movie);
    });
      function displayMovieDetails(movieDetails) {
        // in movieGlobal is stored the info from movieDetails
        // we need to store them in order to recall the editButtonFunction
        movieGlobal = movieDetails;
        //removing elements 
        removeBodyElements();

        var imageEl = document.createElement('IMG');
        imageEl.setAttribute("src", movieDetails.posterUrl);
        imageEl.setAttribute("height", "200");
        imageEl.setAttribute("alt", "Movie Image here");
        imageEl.setAttribute("id", "movieImageId");
        containerEl.appendChild(imageEl);

        var bodyEl = document.createElement("div");
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
        if(edit) {

          // parsed every movie property that we want to display
          // they are stored in movieDisplayDetails
          for(var i = 0; i < movieDisplayDetails.length; i++) {
            var movieProperty = movieDisplayDetails[i];
            
          // for current property we create an input
          // the is specific to what id represents
            var inputField;
            
            if(movieProperty == "plot") {
              inputField = document.createElement("textarea");
              // if the value is undefined, the input should not be filled with undefined or NaN
              // will be filled with its property (with the placeholder)
              if(movieDetails[movieProperty] !== undefined && movieDetails[movieProperty] !== NaN) {
                inputField.innerHTML = movieDetails[movieProperty];
              }
            } else {
              inputField = document.createElement("input");
              // if the value is undefined, the input should not be filled with undefined or NaN
              // will be filled with its property (with the placeholder)
              if(movieDetails[movieProperty] !== undefined && movieDetails[movieProperty] !== NaN) {
                inputField.setAttribute("value", movieDetails[movieProperty]);
              }
            }
            inputField.setAttribute("id", movieProperty);

          //making first letter of the property name, upperchase
            var upperChaseProperty = movieProperty.charAt(0).toUpperCase() + movieProperty.slice(1);
            inputField.setAttribute("placeholder", upperChaseProperty);

           bodyEl.appendChild(inputField);
           var br = document.createElement("br"); 
           bodyEl.appendChild(br);
          }
          containerEl.appendChild(bodyEl);

          var saveButton = document.createElement("button");
          saveButton.innerHTML = "Save";
          saveButton.setAttribute("class", "actionButtonClass");
          actionContainer.appendChild(saveButton);
          containerEl.appendChild(actionContainer);

          saveButton.addEventListener("click", function(){
            movie.updateMovie(
              bodyEl.value
            )
          });
        } else {

          for (var i = 0; i < movieDisplayDetails.length; i++){
            var movieProperty = movieDisplayDetails[i];
            var textField = document.createElement("p");

           // if the value is undefined, the input should not be filled with undefined or NaN
           // will be filled with its property (with the placeholder)
             if(movieDetails[movieProperty] !== undefined && movieDetails[movieProperty] !== NaN) {
            //making first letter of the property name, upperchase
              var upperChaseProperty = movieProperty.charAt(0).toUpperCase() + movieProperty.slice(1);
              textField.innerHTML =  upperChaseProperty + ": " + movieDetails[movieProperty];
            }

            textField.setAttribute("id", movieProperty);
            bodyEl.appendChild(textField);
          }
          containerEl.appendChild(bodyEl);

        //buttons
        var editButton = document.createElement("button");
        editButton.innerHTML = "Edit";
        editButton.setAttribute("class", "actionButtonClass");
        editButton.addEventListener("click", editButtonFunction);
          
        var deleteButton = document.createElement("button");
        deleteButton.innerHTML = "Delete";
        deleteButton.setAttribute("class", "actionButtonClass");
      
        
        actionContainer.appendChild(editButton);
        actionContainer.appendChild(deleteButton);
        containerEl.appendChild(actionContainer);
        }


      } 

    //function for edit one one movie display
      function editButtonFunction() {
        edit = true;
        displayMovieDetails(movieGlobal);
      }

      //function for removing elements from body
      function removeBodyElements() {
        var containerEl = document.getElementById("movie-details");
        while (containerEl.firstChild) {
          containerEl.removeChild(containerEl.firstChild);
        }
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


