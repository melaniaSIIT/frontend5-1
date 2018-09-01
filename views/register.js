
$(domLoaded)

function domLoaded() {

	// Function that sends payload object to server for registering
	function register(payload){
			var user = new User();
			user.registerUser(payload).then(displayResponse);
		}
		
		function displayResponse(response){
			console.log(response.authenticated);
			console.log(response.accessToken);
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
			$('#small-arrow').css('left','5%');
		}
	});
}