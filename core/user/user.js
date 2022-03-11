var sha1 = require('sha1')

function User (){

    // init variables
    var role = null;
    var name = null;
    var email= null;
    var password1 = null;
    var password2 = null;
    var check = null;

    this.init = function () {

        $("#alert").hide();
        $("#success").hide();

        $("#submit").click (()=>{

            $("#alert").hide();
            $("#success").hide();
            role = $("#role").val();
            name = $("#name").val();
            email = $("#email").val();
            password1 = $("#password1").val();
            password2 = $("#password2").val();
            check = $("#check").prop("checked");

            if(check == false){

                check = 0;
            }else if (check == true){
                check= 1;
            }

            if(checkMail(email) == true && checkPassword(password1, password2) == true){

                checkSave();
            }

        });
    }

    // check if email existe
    function checkSave () {

        var sql = "SELECT * FROM Login WHERE email='" + email + "'";
        // query connection
        connection.query(sql, function (error, results) {
            if (error) throw error;

            if(results[0]){
                
                $("#alert").show();
                $("#alert").text("E-mail existe déja")
            }else {

                inserto();
            }
        });
    }

    // insert in the database table login
    function inserto () {

        var password = sha1(password1);

        var sql = "INSERT INTO Login (id, name, email, password, date, state, role)VALUES (null, '" + name +"', '" + email + "', '" + password + "', CURRENT_TIMESTAMP, '" + check + "', '" + role + "')";

        connection.query(sql, function (error, results) {
            if (error) throw error;

            if(results.warningCount == 0){

                empty();
            }else {

                $("#alert").show();
                $("#alert").text("Erreur de connection base de données")
            }
        });
    }

    // empty form
    function empty () {

        $("#success").show();
        $("#success").text("L'enregistrement a été effectué avec succès");

        $("#role").val("");
        $("#name").val("");
        $("#email").val("");
        $("#password1").val("");
        $("#password2").val("");
        $("#check").prop('checked', false)
    }

    /**
     * check email with regex
     * @param {*} email 
     * @returns 
     */
    function checkMail (email){

        var reg = /^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/;
        if (reg.test(email)) {
            return true;
        }else{

            $("#alert").show();
            $("#alert").text("E-mail incorrect")
            return false;
        }

    }

    /**
     * check passwords with regex
     * @param {*} password1 
     * @param {*} password2 
     * @returns 
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

var $user = new User();
$user.init();