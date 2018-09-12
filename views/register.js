 
$(domLoaded)

function domLoaded() {

	// Function that sends payload object to server for registering
	function register(payload){
			var user = new User();
			username = payload.username;
			user.registerUser(payload).then(user.loginUser(payload)).then(displayResponse).then(goHome);
	}
	function displayResponse(response){
		console.log(response.authenticated);
		console.log(response.accessToken);
		// Because of closure, here i have access to the username from above.
		// Also, naturally here i have access to the response that contains the access token and authenticated checker
		// Therefore, here the cookie shall be set
		Cookies.set('username', username, { expires: 7 });
		Cookies.set('authenticated', response.authenticated, { expires: 7 });
		Cookies.set('accessToken', response.accessToken, { expires: 7 });
	}
	function goHome(){
		$('#register').css('display','none');	
		$('#login').css('display','none');	
		$('#welcome-message').css('display','inline-block');
 		setTimeout(function(){window.open("../pages/home.html","_self");},2000);
	}

	// Click handler for REGISTER button, triggers function register()  : see above
	$('#submit').click(function(){
		let user,pass;
		if($('#username').val().length !== 0){
			user = $('#username').val();
		}
		if($('#password').val().length > 7){
			pass = $('#password').val();
		}
		let agree_gdpr = $('#gdpr-radio').prop("checked");
		console.log()
		if ((user != null && user !== undefined) && (pass != null && pass !== undefined) && (agree_gdpr))
			{
				let payload={
							username: user,
							password: pass
							};
				console.log(payload);
				register(payload);
			}
		else if ((user != null && user !== undefined) && (pass != null && pass !== undefined) && !(agree_gdpr))
		{
			moveArrow();
		}
	});

	// Various click handlers
	$('.left-info').click(function(){
		$('info').css('visibility','visible');
		moveArrow();
	})
	$('.right-info').click(function(){
		// go to login page
		location.reload();
	})

	$('#gdpr-link').click(function(){
		// $('.cookieInfo').css('visibility','visible');
		// location.reload();
	})

	$('#home').click(function(){
          window.location = "../pages/home.html";
        })
	 $('#login').click(function(){
     	  window.open("../pages/login.html","_self");
        });
	
	// Moves small arrow @gdpr to alert user
	function moveArrow(){
		$('#small-arrow').css('left','5%');
	}

}