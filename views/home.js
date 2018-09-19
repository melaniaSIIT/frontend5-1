window.addEventListener("load", function() {


     // these are the 3 cookies now available on homepage, to do with them as u please
     // extract them first so page doesn't have to delay painting because it doesnt yet have the cookies
    let usernameCookieValue = Cookies.get("username");
    let authenticatedCookieValue = Cookies.get("authenticated");
    let accessTokenCookieValue = Cookies.get("accessToken");
    console.log(usernameCookieValue,authenticatedCookieValue,accessTokenCookieValue);

    // function that hides spinner must be called after games are loaded on screen, at the end of display all movies function
    function hideSpinner(){
    $('.loader').css('display','none');
    }

    // hides the actual log-out click trigger when not logged in
    if(!Cookies.get("authenticated")){
      $('#actual-log-out').css('display','none');
    }else showGreetings();

    // get container for all movies
    let containerElement = document.getElementById("flex-container");
    let moviesModel = new Movies();
    moviesModel.getAll().then(function(response) {
      displayAllMovies(response.results);
    });

    //  Shows welcome message, hides login and register buttons, call this first, before page paint, see above
    function showGreetings(){
        $('#login').css('display','none');
        $('#register').css('display','none');
        $('#greeter').css('display','inline-block');
        $('#greeter').html(`Hello ${usernameCookieValue} | Log out`);
    }


    // Shows admin only buttons for each movie: edit, delete, 
    function showAdminButtons(){
       if(Cookies.get("authenticated")){
        $('.admin-button').css('display','inline-block');
        }
    }
    
    function displayAllMovies(moviesData) {
      for (let i = 0; i < moviesData.length; i++) {
        let movie = new Movie(moviesData[i]);
        displayMovie(movie);
      }
      hideSpinner();
    }
    
    function displayMovie(movie) {

      // ADMIN BUTTONS
      // create these buttons first and show them through showAdminButtons();
      let editBtn = document.createElement('button');
      editBtn.innerHTML = "Edit";
      editBtn.setAttribute("id", "edit-" + movie.id);
      editBtn.setAttribute("name", "Edit");
      editBtn.setAttribute("class", "admin-button edit-button");
      //Edit Event
      editBtn.addEventListener("click", function(){
        window.location = "../pages/movieDetails.html?movieId=" + movie.id + "&edit=true";
      })
  
      let deleteBtn = document.createElement('button');
      deleteBtn.innerHTML = "Delete";
      deleteBtn.setAttribute("id", "delete-" + movie.id);
      deleteBtn.setAttribute("name", "Delete");
      deleteBtn.setAttribute("class", "admin-button delete-button");

      let adminButtons = document.createElement('div');
      adminButtons.appendChild(editBtn);
      adminButtons.appendChild(deleteBtn);


      let item = document.createElement('div');
      
      let titleEl = document.createElement('h1');
      titleEl.innerHTML = movie.title;
      
          
      titleEl.addEventListener("click", function() {
        window.location = "../pages/movieDetails.html?movieId=" + movie.id;
      });
      
      let imgEl = document.createElement('img');
        $(imgEl).attr({
          "src":movie.posterUrl,
          "height":"200",
          "alt":"Movie Image here",
        });  
      
      let bodyEl = document.createElement('p');
      bodyEl.innerHTML = "Genre: " + movie.genre;

      let yearEl = document.createElement('p');
      yearEl.innerHTML = "Year: " + movie.year;

      let ratingEl = document.createElement('p');
      ratingEl.innerHTML = "IMDB Rating: " + movie.rating;

      
      let idEl = document.createElement('p');
      idEl.innerHTML = movie.id;
      
      

        
      item.appendChild(titleEl);
      item.appendChild(bodyEl);
      item.appendChild(yearEl);
      item.appendChild(ratingEl);
      item.appendChild(imgEl);
      item.appendChild(adminButtons);

      item.setAttribute("class", "movie");
     
      containerElement.appendChild(item);
      showAdminButtons();


    }

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
    $('#actual-log-out').click(function(){
      let quitter = new User();
      quitter.logoutUser(accessTokenCookieValue);
      setTimeout(clearCookies, 100);
      setTimeout(function(){location.reload();},1500);
    });

    

    
    // SEARCH MOVIE by title

    $('#searchButton').on('click', function() {
      let searchFor = $('#search').val(); 
      let newMovies = new Movies();
      newMovies.searchBy(searchFor).then(function(response) {
        containerElement.innerHTML = '';
        displayAllMovies(response.results);
        console.log(response.results);
      });

      
  });
    
});