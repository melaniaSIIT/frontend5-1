window.addEventListener("load", function() {



    let containerElement = document.getElementById("movies-list");

    let moviesModel = new Movies();
    moviesModel.getAll().then(function(response) {
      displayAllMovies(response.results);
      console.log(response.results);
    });
    
    function displayAllMovies(moviesData) {
      for (let i = 0; i < moviesData.length; i++) {
        let movie = new Movie(moviesData[i]);
        displayMovie(movie);
      }
    }
    
    function displayMovie(movie) {
      let liEl = document.createElement('li');
      liEl.style = "list-style-type: none;";
      
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
      editBtn.innerHTML = "   Edit   ";
      editBtn.setAttribute("id", "edit-" + movie.id);
      editBtn.setAttribute("name", "Edit");

      //Edit Event
      editBtn.addEventListener("click", function(){
        window.location = "../pages/movieDetails.html?movieId=" + movie.id + "&edit=true";
      })
  
      let deleteBtn = document.createElement('button');
      deleteBtn.innerHTML = "  Delete  ";
      deleteBtn.setAttribute("id", "delete-" + movie.id);
      deleteBtn.setAttribute("name", "Delete");
           
        
      liEl.appendChild(titleEl);
      liEl.appendChild(bodyEl);
      liEl.appendChild(yearEl);
      liEl.appendChild(ratingEl);
      liEl.appendChild(imgEl);
      liEl.appendChild(editBtn);
      liEl.appendChild(deleteBtn);

      liEl.setAttribute("class", "movie");
     
      containerElement.appendChild(liEl);
      
    }
    

    // TOPNAV click listeners

    $('#register').click(function(){
      window.open("../pages/register.html","_self");
    });
     $('#login').click(function(){
      window.open("../pages/login.html","_self");
    });

    // SEARCH MOVIE
 
  var getShowsFilm = function(query) {
  $.ajax({
    url: "https://ancient-caverns-16784.herokuapp.com/"  + query,
    method: "GET",
    success: manageData
    })
  }
  
   $('#invoke-ajax').on('click', function() {
    var query = $(`#search`).val()
    getShowsFilm(query)
  })  
  
  
  
  function manageData (data, textStatus, jqXHR) { 
    $(".container").html(renderHtml(data)) 
    console.log('data', data)
  }

  function renderHtml(data) {
    var html;
     for (i = 0; i < data.length; i++) { 
       var _id = data[i].results._id;
       var Title = data[i].results.Title;
       var Year = data[i].results.Year;
       var Runtime = data[i].results.Runtime;
       var Genre = data[i].results.Genre;
       var Language = data[i].results.Language;
       var Country = data[i].results.Country;
       var Poster = data[i].results.Poster;
       var imdbRating = data[i].results.imdbRating;
       var imdbVotes = data[i].results.imdbVotes;
       var imdbID = data[i].results.imdbID;
       var Type = data[i].results.Type;

 
       html += `<li>` + name + " - " + score + " - " + `<a href=` + url + `>` + url + `</a>` + `</li>`
      }
       return html;     
  }
  
});