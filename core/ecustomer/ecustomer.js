
function Ecustomer () {

    // init variables
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

    // search data from clients account
    this.init = function() {
 
        $("#alert").hide();
        $("#success").hide();
        var $i = 0;
        var $select = "";

        $select += '<div class="col-6">'
        $select += '<label for="disabledSelect" class="form-label">Entreprise</label>';
        $select += '<select id="company_select" class="form-select" aria-label="Default select" onChange="$ecustomer.select()">';
        $select += '<option selected>Choisir une entreprise</option>';

        var $sql = "SELECT * FROM Clients";
        connection.query($sql, function (error, results) {
            if(error) throw error;

            for($i = 0; $i < results.length; $i++){

                $select += '<option value="' + results[$i].email + '">' + results[$i].company + '</option>';
            }
                
            $select += '</select>';
            $select += '</div>';

            $("#_select").prepend($select);

        })

    }


    // search data from clients account where email of client
    this.select = function () {

        var $select = $("#company_select").val();
        var $sql = "SELECT * FROM Clients WHERE email='" + $select + "'";

        connection.query($sql, function (error, results){
            if(error) throw error;

            _company = $("#company").val(results[0].company);
            _first_name = $("#first_name").val(results[0].first_name);
            _name = $("#name").val(results[0].name);
            _status = $("#status").val(results[0].status);
            _email = $("#email").val(results[0].email);
            _tel = $("#tel").val(results[0].tel);
            _address = $("#address").val(results[0].address);
            _zip = $("#zip").val(results[0].zip);
            _city = $("#city").val(results[0].city);
            _activity = $("#activity").val(results[0].activity);
            _comment = $("#comment").val(results[0].comment);
            _news = $("#news").prop("checked");

            if(results[0].news == 1){

                $("#news").prop("checked", true);
            }else if (results[0].news == 0){
                $("#news").prop("checked", false);
            }

            register();

        })
    }

    // on submit get values from form
    function register() {


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

                update();
            }
        });
    }

    // update the client account
    function update () {

        var $email = $("#company_select").val();
        // update
        var sql = "UPDATE Clients SET company='" + _company + "', first_name='" + _first_name + "', name='" + _name + "', status='" + _status + "', email='" + _email + "', tel='" + _tel + "', address='" + _address + "', zip='" + _zip + "', city='" + _city + "', activity='" + _activity + "', comment='" + _comment + "', news='" + _news + "' WHERE email = '" + $email + "'";

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

    // empty the form and refresh
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

        $router.loader('ecustomer');

    }

    /**
     * check if email is valid
     * @param {*} email string
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
     * @param {*} phone string
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
     * @param {*} zip string
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

var $ecustomer = new Ecustomer();
$ecustomer.init();