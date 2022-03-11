var sha1 = require('sha1')

function Login ()  {

    // init email and password
    var email = "";
    var password = "";
    
    // get email and password
    this.init = function () {
        
        $("#alert").hide();
        $("#submit").click(function () {

            $("#alert").hide();
            email = $('#email').val();
            password = $('#password').val();

            log();
        });
    }

    
    function log () {

        // hash sha1 password
        var $password = sha1(password);
        // sql req
        var sql = "SELECT * FROM Login WHERE email='" + email + "' AND password='" + $password + "'";
        // query connection
        connection.query(sql, function (error, results) {
            if (error) throw error;

            if(results[0]){
                
                if(results[0].state != 0){

                    localStorage.setItem('id', results[0].id);
                    localStorage.setItem('email', results[0].email);
                    localStorage.setItem('role', results[0].role);
                    $router.menu();
                }else {

                    $("#alert").show();
                    $("#alert").text("Votre compte est bloqué")
                }
                
            }else {

                $("#alert").show();
                $("#alert").text("E-mail ou mot de passe incorrect")
            }
        });

        

        
    }
}

var $login = new Login();
$login.init();