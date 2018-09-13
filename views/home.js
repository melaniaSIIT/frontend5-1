window.addEventListener("load", function() {


     // these are the 3 cookies now available on homepage, to do with them as u please
     // extract them first so page doesn't have to delay painting because it doesnt yet have the cookies
    let usernameCookieValue = Cookies.get("username");
    let authenticatedCookieValue = Cookies.get("authenticated");
    let accessTokenCookieValue = Cookies.get("accessToken");
    console.log(usernameCookieValue,authenticatedCookieValue,accessTokenCookieValue);

    // hides the actual log-out click trigger when not logged in
    if(!Cookies.get("authenticated")){
      $('#actual-log-out').css('display','none');
    }

    // get container for all movies
    let containerElement = document.getElementById("flex-container");
    let moviesModel = new Movies();
    showAdminButtons();
    moviesModel.getAll().then(function(response) {
      displayAllMovies(response.results);
    });


    // Shows admin only buttons: edit, delete, add movie 
    function showAdminButtons(){
       if(Cookies.get("authenticated")){
        $('.admin-button').css('display','inline-block');
        $('#login').css('display','none');
        $('#register').css('display','none');
        $('#greeter').css('display','inline-block');
        $('#greeter').html(`Hello ${usernameCookieValue} | Log out`);
        }
    }
    
    function displayAllMovies(moviesData) {
      for (let i = 0; i < moviesData.length; i++) {
        let movie = new Movie(moviesData[i]);
        displayMovie(movie);
      }
    }
    
    function displayMovie(movie) {
      let item = document.createElement('div');
      
      let titleEl = document.createElement('h1');
      titleEl.innerHTML = movie.title;
      
      titleEl.addEventListener("mouseover", function () {
        titleEl.style = "cursor: pointer;";
      });
          
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
        
      item.appendChild(titleEl);
      item.appendChild(bodyEl);
      item.appendChild(yearEl);
      item.appendChild(ratingEl);
      item.appendChild(imgEl);
      item.appendChild(adminButtons);

      item.setAttribute("class", "movie");
     
      containerElement.appendChild(item);

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
      clearCookies();
      let quitter = new User();
      quitter.logoutUser(accessTokenCookieValue);
      setTimeout(function(){location.reload();},6.66);
    });

    


    // SEARCH MOVIE
    $('#searchButton').on('click', function() {
      let searchFor = $('#search').val(); 
      let newMovies = new Movies();
      newMovies.searchByTitle(searchFor).then(function(response) {
        displayAllMovies(response.results);
        console.log(response.results);
      });;
    }); 
    



});