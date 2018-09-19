function Movies() {
  
}



//  Even though search URLS are put on top of URL for all movies, keep methods separate

Movies.prototype.getAll = function() {
  return $.get("https://ancient-caverns-16784.herokuapp.com/movies");
}


<<<<<<< HEAD
Movies.prototype.searchBy = function(searchItem) {
  return $.get("https://ancient-caverns-16784.herokuapp.com/movies?Title=" + searchItem /*+ "&Year=" + searchItem*/);
}
=======


Movies.prototype.searchByTitle = function(searchItem) {
  return $.get("https://ancient-caverns-16784.herokuapp.com/movies?Title=" + searchItem);
}



>>>>>>> 056982d03ec070b66aa4bfd7b111b1e8579c4b57
