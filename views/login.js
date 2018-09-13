$(domLoaded)
function domLoaded(){

    function login(info){
            var user=new User();
            // this 'username' will be used to set cookie in handleResponse
            username=info.username; 
            user.loginUser(info).then(handleResponse).then(goHome);
        }
        function handleResponse(response){
            Cookies.set('username', username, { expires: 7 });
            Cookies.set('authenticated', response.authenticated, { expires: 7 });
            Cookies.set('accessToken', response.accessToken, { expires: 7 });
        }
        function goHome(){
           window.open("../pages/home.html","_self");
        }


    // Click handler for LOGIN button, triggers function login()  : see above
    $("#submit").click(function(){
        var userName=$("#username").val();
        var passWord=$("#password").val();
        if( userName ==' ' || password ==' '){
            $('input[type="text"],input[type="password"]').css("border","2px solid red");
        }
        else{
            let info={username:userName,
                      password:passWord};
            console.log(info);
            login(info);
        }
    });
}
