var sha1 = require('sha1')

function Login ()  {

    var email = "";
    var password = "";

    this.init = function () {

        $("#submit").click(function () {

            email = $('#email').val();
            password = $('#password').val();

            
            log();
        });

    }

    function log () {

        var $password = sha1(password);
        console.log($password);

        var sql = "SELECT * FROM Login WHERE email='" + email + "' AND password='" + $password + "'";
        connection.connect();
 
        connection.query(sql, function (error, results) {
            if (error) throw error;
            console.log('The solution is: ', results[0]);

            if(results[0]){

                $router.menu();
            }
        });

        

        
    }
}

var $login = new Login();
$login.init();