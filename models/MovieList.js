function Movies() {
  
}



//  Even though search URLS are put on top of URL for all movies, keep methods separate

Movies.prototype.getAll = function(takeValue, skipValue) {
  return $.get("https://ancient-caverns-16784.herokuapp.com/movies/?take=" + takeValue + "&skip=" + skipValue);
}


Movies.prototype.searchByTitle = function(searchItem) {
  return $.get("https://ancient-caverns-16784.herokuapp.com/movies?Title=" + searchItem);
}