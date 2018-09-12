function Movies() {
  
}



//  Even though search URLS are put on top of URL for all movies, keep methods separate

Movies.prototype.getAll = function() {
  return $.get("https://ancient-caverns-16784.herokuapp.com/movies");
}




Movies.prototype.searchByTitle = function(searchItem) {
  return $.get("https://ancient-caverns-16784.herokuapp.com/movies?Title=" + searchItem);
}

