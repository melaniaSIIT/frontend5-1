function Movies() {
  
}



//  Even though search URLS are put on top of URL for all movies, keep methods separate
let takeValue = 10;
let skipValue = 0;
Movies.prototype.getAll = function(takeValue, skipValue) {
  // return $.get("https://ancient-caverns-16784.herokuapp.com/movies/?take=10&skip=10");
  return $.get("https://ancient-caverns-16784.herokuapp.com/movies/?take=" + takeValue + "&skip=" + skipValue);
}


Movies.prototype.searchByTitle = function(searchItem) {
  return $.get("https://ancient-caverns-16784.herokuapp.com/movies?Title=" + searchItem);
}