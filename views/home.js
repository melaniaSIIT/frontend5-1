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
        imgEl.style.display = "block";
      
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
      editBtn.style.margin = "10px";
  
      let deleteBtn = document.createElement('button');
      deleteBtn.innerHTML = "  Delete  ";
      deleteBtn.setAttribute("id", "delete-" + movie.id);
      deleteBtn.setAttribute("name", "Delete");
      deleteBtn.style.margin = "10px";
           
        
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
  
  });