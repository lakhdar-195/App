var sha1 = require('sha1')

function Login ()  {

    // init email and password
    var email = "";
    var password = "";

    // get email and password
    this.init = function () {

        $("#submit").click(function () {

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

        //connect mysql
        connection.connect();
 
        // query connection
        connection.query(sql, function (error, results) {
            if (error) throw error;
            console.log('The solution is: ', results[0]);

            if(results[0]){

                // send to home page
                $router.menu();
            }
        });

        

        
    }
}

var $login = new Login();
$login.init();