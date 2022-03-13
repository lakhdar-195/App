
function Customer () {

    // init variables
    var _id = localStorage.getItem("id");
    var _company = null;
    var _first_name = null;
    var _name = null;
    var _status = null;
    var _email = null;
    var _tel = null;
    var _address = null;
    var _zip = null;
    var _city = null;
    var _activity = null;
    var _comment = null;
    var _news = null;

    // init click form
    this.init = function () {

        $("#alert").hide();
        $("#success").hide();
        $("#submit").click(function () {

            $("#alert").hide();
            $("#success").hide();
            _company = $("#company").val();
            _first_name = $("#first_name").val();
            _name = $("#name").val();
            _status = $("#status").val();
            _email = $("#email").val();
            _tel = $("#tel").val();
            _address = $("#address").val();
            _zip = $("#zip").val();
            _city = $("#city").val();
            _activity = $("#activity").val();
            _comment = $("#comment").val();
            _news = $("#news").prop("checked");

            if(_news == false){

                _news = 0;
            }else if (_news == true){
                _news = 1;
            }

            if(checkForm() == true){

                checkRegister();
            }
        });
    }

    // check if account exite
    function checkRegister () {

        var sql = "SELECT * FROM Clients WHERE email = '" + _email + "'";
        connection.query(sql, function (error, results){
            if(error) throw error;
            if(results[0]){

                $("#alert").show();
                $("#alert").text("Client existe déja")

            }else {

                inserto();
            }

        })
    }

    // insert to database
    function inserto () {

        var sql = "INSERT INTO Clients (id_client, company, first_name, name_client, status, email_client, tel, address, zip, city, news, activity, comment_client, login_id, date_client) VALUES (null, '" + _company +"', '" + _first_name + "', '" + _name + "', '" + _status + "', '" + _email + "', '" + _tel+ "', '" + _address + "', '" + _zip + "','" + _city + "','" + _news + "','" + _activity + "','" + _comment + "','" + _id + "', CURRENT_TIMESTAMP)";

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

    /**
     * check if form is valid
     * @returns boolean
     */
    function checkForm () {

        if (_company.length < 3){

            $("#alert").show();
            $("#alert").text("Nom entreprise est trop court");
            return false;
        }else if (_first_name.length < 3){

            $("#alert").show();
            $("#alert").text("Nom  est trop court");
            return false;
        }else if (_name.length < 3){

            $("#alert").show();
            $("#alert").text("Prénom  est trop court");
            return false;
        }else if (_status.length < 3){

            $("#alert").show();
            $("#alert").text("Status  est trop court");
            return false;
        }else if (checkMail (_email) === false){

            $("#alert").show();
            $("#alert").text("E-mail incorrect");
            return false;
        }else if (checkPhone (_tel) === false){

            $("#alert").show();
            $("#alert").text("N:° de téléphone incorrect");
            return false;
        }else if (_address.length < 8){

            $("#alert").show();
            $("#alert").text("Address  est trop court");
            return false;
        }else if (checkZip (_zip) === false){

            $("#alert").show();
            $("#alert").text("Code postale incorrect");
            return false;
        }else if (_city.length < 3){

            $("#alert").show();
            $("#alert").text("Ville  est trop court");
            return false;
        }else if (_activity.length < 3){

            $("#alert").show();
            $("#alert").text("Activity  est trop court");
            return false;
        }else {

            return true;
        }
    }

    // empty the form
    function empty () {

        $("#success").show();
        $("#success").text("L'enregistrement a été effectué avec succès");

        $("#company").val("");
        $("#first_name").val("");
        $("#name").val("");
        $("#status").val("");
        $("#email").val("");
        $("#tel").val("");
        $("#address").val("");
        $("#zip").val("");
        $("#city").val("");
        $("#activity").val("");
        $("#comment").val("");
        $("#news").prop("checked", false);

    }

    /**
     * check if email is valid
     * @param {*} email 
     * @returns boolean
     */
    function checkMail (email){

        var reg = /^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/;
        if (reg.test(email)) {
            return true;
        }else{
            return false;
        }

    }

    /**
     * check if phone is valid
     * @param {*} phone 
     * @returns boolean
     */
    function checkPhone (phone){

       if (Number.isNaN(phone) || phone.length < 10 || phone.length > 10) {

            return false;
        }else {

            return true
        }

    }

    /**
     * check if zip is valid
     * @param {*} zip 
     * @returns boolean
     */
    function checkZip (zip) {

        if (Number.isNaN(zip) || zip.length < 5 || zip.length > 5) {

            return false;
        }else {

            return true
        }
    }


}

var $customer = new Customer();
$customer.init();