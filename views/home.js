window.addEventListener("load", function() {
    var containerElement = document.getElementById("movies-list");
    
    var moviesModel = new Movies();
    moviesModel.getAll().then(function(response) {
      displayAllMovies(response);
      console.log(response);
    });
    
    function displayAllMovies(moviesData) {
      for (var i = 0; i < moviesData.length; i++) {
        var movie = new Movie(moviesData[i]);
        displayMovie(movie);
      }
    }
    
    function displayMovie(movie) {
      var liEl = document.createElement('li');
      liEl.style = "list-style-type: none;";
      
      var titleEl = document.createElement('h1');
      titleEl.innerHTML = movie.title;
      
      titleEl.addEventListener("mouseover", function () {
        titleEl.style = "cursor: pointer;";
      });
          
      titleEl.addEventListener("click", function() {
        window.location = "http://cursuri-v-banaru-banaru702140.codeanyapp.com/Homeworks/Homework%20-%20Objects%20and%20Classes/templates/movie.html?movieId=" + movie.id;
      });
      
      var imgEl = document.createElement('img');
        $(imgEl).attr({
          "src":movie.imageUrl,
          "height":"200",
          "alt":"Movie Image here",
        });
  //       imgEl.setAttribute("height", "200");
  //       imgEl.setAttribute("alt", "Movie Image here");
        imgEl.style.display = "block";
      
      var bodyEl = document.createElement('p');
      bodyEl.innerHTML = movie.description;
      
      var idEl = document.createElement('p');
      idEl.innerHTML = movie.id;
      
      var editBtn = document.createElement('button');
      editBtn.innerHTML = "   Edit   ";
      editBtn.setAttribute("id", "edit-" + movie.id);
      editBtn.setAttribute("name", "Edit");
      editBtn.style.margin = "10px";
  
      var deleteBtn = document.createElement('button');
      deleteBtn.innerHTML = "  Delete  ";
      deleteBtn.setAttribute("id", "delete-" + movie.id);
      deleteBtn.setAttribute("name", "Delete");
      deleteBtn.style.margin = "10px";
      
      var movieId = movie.id;
      
  //     console.log("Movie's link to API - in order to be deleted", "https://movies-world.herokuapp.com/movies/" + movieId);
  //     var deleteMovie = function(movieId) {
  //       $.ajax({
  //       url: "https://movies-world.herokuapp.com/movies/" + movieId,
  //       method: "DELETE",
  //       success: function() {
  //         console.log("Movie was deleted");
  //       }
  //     })
  //     }
      
      editBtn.addEventListener("click", editMovieDetails.movie());
  //     deleteBtn.addEventListener("click", deleteMovie(movieId));
  
      
      liEl.appendChild(titleEl);
      liEl.appendChild(bodyEl);
      liEl.appendChild(imgEl);
      liEl.appendChild(editBtn);
      liEl.appendChild(deleteBtn);
     
      containerElement.appendChild(liEl);
      
    }
  
  });