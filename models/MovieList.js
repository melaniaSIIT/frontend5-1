function Movies() {
  
}

Movies.prototype.getAll = function(query) {
  if (!query) query = '';
  return $.get("https://ancient-caverns-16784.herokuapp.com/movies" + query);
}