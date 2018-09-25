window.addEventListener("load", function() {

	// these are the 3 cookies now available on homepage, to do with them as u please
    // extract them first so page doesn't have to delay painting because it doesnt yet have the cookies
   
	let usernameCookieValue = Cookies.get("username");
    let authenticatedCookieValue = Cookies.get("authenticated");
    let accessTokenCookieValue = Cookies.get("accessToken");
    console.log(usernameCookieValue,authenticatedCookieValue,accessTokenCookieValue);
	
	 //  Shows welcome message, hides login and register buttons, call this first, before page paint, see above
    function showGreetings(){
        $('#login').css('display','none');
        $('#register').css('display','none');
        $('#greeter').css('display','inline-block');
        $('#greeter').html(`Hello ${usernameCookieValue} | <span id='logout'>Log out</span>`);
    }

    function clearCookies() {
      Cookies.remove('username');
      Cookies.remove('authenticated');
      Cookies.remove('accessToken');
    }

     // hides the actual log-out click trigger when not logged in
    if(!Cookies.get("authenticated")){
      $('#logout').css('display','none');
    } else showGreetings();


    // TOPNAV click listeners
    $('#home').click(function(){
          window.location = "../pages/home.html";
    });
    $('#register').click(function(){
      window.open("../pages/register.html","_self");
    });
    $('#login').click(function(){
      window.open("../pages/login.html","_self");
    });
    $('#logout').click(function(){
      let quitter = new User();
      quitter.logoutUser(accessTokenCookieValue).then(clearCookies()).then(setTimeout(function(){location.reload();},500));
      window.open("../pages/home.html","_self");
    });
})