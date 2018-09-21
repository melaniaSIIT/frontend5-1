window.addEventListener("load", function() {


  let accessTokenCookieValue = Cookies.get("accessToken");

    // function that hides spinner must be called after games are loaded on screen, at the end of display all movies function
    function hideSpinner(){
    $('.loader').css('display','none');
    }

    // get container for all movies
    let containerElement = document.getElementById("flex-container");
    let moviesModel = new Movies();

	function displayAllMovies(movies) {
	  containerElement.innerHTML = "";
	  const moviesData = movies.results;
      for (let i = 0; i < moviesData.length; i++) {
        let movie = new Movie(moviesData[i]);
        displayMovie(movie);	
      }
      hideSpinner();
    }

    currentUrl = $(location).attr("href");
    let pageRef = currentUrl.substr(currentUrl.length - 7);
    let skipPages = $("a[href='" + pageRef + "']").data("value");
    if (typeof skipPages == "undefined"){
      skipPages = 0;
    }

    skipValue = skipPages;

    $('a', '.pagination').click(function(){
      location.reload();
    });

    moviesModel.getAll(takeValue, skipValue).then(displayAllMovies);

    // Shows admin only buttons for each movie: edit, delete, 
    function showAdminButtons(){
       if(Cookies.get("authenticated")){
        $('.admin-button').css('display','inline-block');
        }
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
	  deleteBtn.addEventListener("click", function() {
		movie.deleteMovie(accessTokenCookieValue).then(function() {
      alert(movie.title + "has been deleted!");
      location.reload();
		});
	  });

    // moreInfoButton
    let moreInfoButton = document.createElement('button');
    moreInfoButton.innerHTML = "More Info";
    moreInfoButton.setAttribute("class", "admin-button");
    moreInfoButton.style.display = "inline-block";
    
    moreInfoButton.addEventListener("click", function(){
      window.location = "../pages/movieDetails.html?movieId=" + movie.id;
    });

    let adminButtons = document.createElement('div');
    adminButtons.appendChild(editBtn);
    adminButtons.appendChild(deleteBtn);
    adminButtons.appendChild(moreInfoButton);

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
      
      // item.appendChild(moreInfoButton);
      

        
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
  
    // SEARCH MOVIE by title

    $('#searchButton').on('click', function() {
      let searchFor = $('#search').val(); 
      let newMovies = new Movies();
      newMovies.searchByTitle(searchFor).then(function(response) {
        containerElement.innerHTML = '';
        displayAllMovies(response);
        console.log(response.results);
      });
    });


    var input = document.getElementById("search");
      input.addEventListener("keyup", function(event) {
      event.preventDefault();
      if (event.keyCode === 13) {
        document.getElementById("searchButton").click();
      }
    });

    // ADD MOVIE
    $('#add-movies').on('click', function() {
      window.open("../pages/addMovie.html","_self");
    });

})






