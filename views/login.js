$(domLoaded)
function domLoaded(){
    $("#submit").click(function(){
        function login(info){
            var user=new User();
            user.loginUser(info).then(handelTok);
        }
        function handelTok(response){
            console.log(response.authenticated);
            console.log(response.accessToken);
        }
        var userName=$("#username").val();
        var passWord=$("#password").val();
        if( userName ==' ' || password ==' '){
            $('input[type="text"],input[type="password"]').css("border","2px solid red");
            
        }
        else{
            let info={username:userName,
                      password:passWord};
            login(info);
            
        }
    });



}
