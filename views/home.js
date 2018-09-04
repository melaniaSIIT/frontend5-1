window.addEventListener("load", function() {
    let containerElement = document.getElementById("movies-list");
    
    let moviesModel = new Movies();
    moviesModel.getAll().then(function(response) {
      displayAllMovies(response);
      console.log(response);
    });
    
    function displayAllMovies(moviesData) {
      for (let i = 0; i <= 10; i++) {
        let movie = new Movie(moviesData[i]);
        displayMovie(movie);
        console.log("Movie data", movie);
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
        window.location = "https://ancient-caverns-16784.herokuapp.com/movies/" + movie.id;
      });
      
      let imgEl = document.createElement('img');
        $(imgEl).attr({
          "src":movie.posterUrl,
          "height":"200",
          "alt":"Movie Image here",
        });  
        imgEl.style.display = "block";
      
      let bodyEl = document.createElement('p');
      bodyEl.innerHTML = movie.description;
      
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
      liEl.appendChild(imgEl);
      liEl.appendChild(editBtn);
      liEl.appendChild(deleteBtn);
     
      containerElement.appendChild(liEl);
      
    }
  
  });