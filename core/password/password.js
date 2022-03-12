var sha1 = require('sha1')

function Password () {

    // init variables
    var _password1 = null;
    var _password2 = null;
    var _email = localStorage.getItem('email');

    // on submit get vlues from form
    this.init = function () {

        $("#alert").hide();
        $("#success").hide();

        $("#submit").click (function () {

            $("#alert").hide();
            $("#success").hide();

            _password1 = $("#password1").val();
            _password2 = $("#password2").val();

            var check =  checkPassword (_password1, _password2);

            if(check === true){

                update();
            }

        })
    }

    // hash and update password of account where email 
    function update () {

        var password = sha1(_password1);

        var sql = "UPDATE Login SET password = '" + password + "' WHERE email = '" + _email + "'";

        connection.query(sql, function (error, results) {
            if (error) throw error;

            if(results.warningCount == 0){

                empty();
            }
          });
    }

     // empty form
     function empty () {

        $("#success").show();
        $("#success").text("Changement mot de passe a été effectué avec succès");

        $("#password1").val("");
        $("#password2").val("");
    }

    /**
     * 
     * @param {*} password1 string
     * @param {*} password2 string
     * @returns boolean
     */
    function checkPassword (password1, password2) {

        // Minimum eight characters, at least one letter, one number and one special character:
        var reg = /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/;

        var val = reg.test(password1);

        if(password1 != password2){

            $("#alert").show();
            $("#alert").text("Mot de passe sont pas identiques")
            return false;
        }else if (password1 === password2 && val === false) {

            $("#alert").show();
            $("#alert").text("Mot de pass doit avoir lettre, chiffre, caractère spécial long 8")
            return false
        }else if(password1 === password2 && val === true) {

            return true;

        }
    }
}

var $password = new Password();
$password.init();