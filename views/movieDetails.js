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

  // hides the actual log-out click trigger when not logged in
  if(!Cookies.get("authenticated")){
    $('#actual-log-out').css('display','none');
    $('#editButtonId').css('display', 'none');
  } else showGreetings();

  //  Shows welcome message, hides login and register buttons, call this first, before page paint, see above
  function showGreetings(){
    $('#login').css('display','none');
    $('#register').css('display','none');
    $('#greeter').css('display','inline-block');
    $('.search-container').css('left','-17px');
    $('#greeter').html(`Hello ${usernameCookieValue} | <span id='logout'>Log out</span>`);
  }

  // Shows admin only buttons for each movie: edit, delete, 
  function showAdminButtons(){
    if(Cookies.get("authenticated")){
      $('#editButtonId').css('display', 'inline-block');
    }
  }

  //Edit Parameter
  var edit = getUrlParameter("edit");
  // array with all the properties we use
  // the order they is respected
  var movieDisplayDetails = ["title", "year", "type", "genre", "actors", "writer", "director", "language", "country", "rating", "plot"];

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
    if(edit && authenticatedCookieValue) {
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
          if(movieDetails[movieProperty] !== undefined && movieDetails[movieProperty] !== "N/A") {
            inputField.innerHTML = movieDetails[movieProperty];
          }
        } else {
          inputField = document.createElement("input");
          inputField.setAttribute('class','edit-input-field')
          // if the value is undefined, the input should not be filled with undefined or NaN
          // will be filled with its property (with the placeholder)
          if(movieDetails[movieProperty] !== undefined && movieDetails[movieProperty] !== "N/A") {
            inputField.setAttribute("value", movieDetails[movieProperty]);
          }
        }
        inputField.setAttribute("id", movieProperty);
        //making first letter of the property name, upperchase
        var upperChaseProperty = movieProperty.charAt(0).toUpperCase() + movieProperty.slice(1);
        inputField.setAttribute("placeholder", upperChaseProperty);
        // console.log(inputField);
           
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
        //create an object to store data from movie
        var data = {};
        //while bodyEl has content, we check if content data is what we need  
        while(bodyEl.firstChild) {
          //check if the content id is in the list with all properties (movieDisplayDetails)
          //check if the data that we had has been changed
          if(movieDisplayDetails.includes(bodyEl.firstChild.id) && movieGlobal[bodyEl.firstChild.id] != bodyEl.firstChild.value) {
            //add key value to data
            //we need to make the key upper case in order to corespond with the data
            var key = bodyEl.firstChild.id.charAt(0).toUpperCase() + bodyEl.firstChild.id.slice(1);
            data[key] = bodyEl.firstChild.value;
          }
          //remove the first content because we are in while
          bodyEl.removeChild(bodyEl.firstChild);
        }
        movie.updateMovie(accessTokenCookieValue, data, movieId);
      });
    } else {
      for (var i = 0; i < movieDisplayDetails.length; i++){
        var movieProperty = movieDisplayDetails[i];
        var textField = document.createElement("p");
        // if the value is undefined, the input should not be filled with undefined or NaN
        // will be filled with its property (with the placeholder)
        if(movieDetails[movieProperty] !== undefined && movieDetails[movieProperty] !== "N/A") {
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
      editButton.setAttribute("id", "editButtonId");
      editButton.addEventListener("click", editButtonFunction);
          
         
      actionContainer.appendChild(editButton);
      containerEl.appendChild(actionContainer);
        showAdminButtons()
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
  $('#logout').click(function(){
    let quitter = new User();
    quitter.logoutUser(accessTokenCookieValue).then(clearCookies()).then(setTimeout(function(){location.reload()},500));
  });

  function clearCookies() {
    Cookies.remove('username');
    Cookies.remove('authenticated');
    Cookies.remove('accessToken');
  }

  // TOPNAV click listeners
  $('#register').click(function(){
    window.open("../pages/register.html","_self");
  });
  $('#login').click(function(){
    window.open("../pages/login.html","_self");
  });

  function getUrlParameter(name) {
    name = name.replace(/[\[]/, '\\[').replace(/[\]]/, '\\]');
    var regex = new RegExp('[\\?&]' + name + '=([^&#]*)');
    var results = regex.exec(location.search);
    return results === null ? '' : decodeURIComponent(results[1].replace(/\+/g, ' '));
  }


  // SEARCH MOVIE by title

  $('#searchButton').on('click', function() {
    let searchFor = $('#search').val(); 
    location.href = `home.html?search=${searchFor}`
  });

  var input = document.getElementById("search");
    input.addEventListener("keyup", function(event) {
    event.preventDefault();
    if (event.keyCode === 13) {
      document.getElementById("searchButton").click();
    }
  });


});


