

function Project () {

    var _clientId = null;
    var _name = null;
    var _dateStart = null;
    var _datedead = null;
    var _comment = null;
    var _price = null;
    var _folder = null;

    // init search clients account in the database
    this.init = function (){

        $("#alert").hide();
        $("#success").hide();

        var $sql = "SELECT * FROM Clients"
        connection.query($sql, function (error, results){
            if(error) throw error;

            var $select = '';
            $select += '<label for="disabledSelect" class="form-label">Clients</label>';
            $select += '<select id="client" class="form-select" aria-label="Default select">';
            var $i = 0;

            for ($i = 0; $i < results.length; $i++){

                $select += '<option value="' + results[$i].id_client + '"> ' + results[$i].company + ' </option>'
            }

            $select += '</select>';
            $("#client_select").append($select);

            getValue();

        })

    }

    // on submit get values from form
    function getValue () {

        $("#submit").click(function () {

            $("#alert").hide();
            $("#success").hide();

            _clientId = $("#client").val();
            _name = $("#name").val();
            _dateStart = $("#start").val();
            _datedead = $("#end").val();
            _comment = $("#comment").val();
            _price = $("#price").val();

            var ds = new Date(_dateStart);
            _dateStart = ds.toISOString().split('T')[0]+' '+ds.toTimeString().split(' ')[0];
            var de = new Date(_datedead);
            _datedead = de.toISOString().split('T')[0]+' '+de.toTimeString().split(' ')[0];
        
            var $rand = Math.floor(Math.random() * (100 - 10) + 10);
            var $months = ["jan", "Fev", "Mar", "Avr", "Mai", "Jun", "Jui", "Aou", "Sep", "Oct", "Nov", "Dec"];
            var $date = new Date();
            _folder = $date.getDate() + "_" + $months[$date.getUTCMonth()] + "_" + $date.getUTCFullYear() + "_" + $rand; 

            
            
            if(checkForm() == true){

                inserto();
            }

        })

    }

    // insert into the database
    function inserto () {

        var $sql = "INSERT INTO Project (id_project, name_project, start, deadline, price, folder, comment_project, date_project, end, Clients_id) VALUES(null, '" +_name + "', '" +_dateStart + "', '" +_datedead + "', '" +_price + "' ,'" +_folder + "', '" +_comment + "', CURRENT_TIMESTAMP, null, '" + _clientId + "')";
        connection.query($sql, function (error, results) {
            if(error) throw error;
            if(results.warningCount == 0){

                empty();
            }else {

                $("#alert").show();
                $("#alert").text("Erreur de connection base de données")
            }

        })

    }

    // empty the form
    function empty() {

        $("#success").show();
        $("#success").text("L'enregistrement a été effectué avec succès");

        $("#client").val("");
        $("#name").val("");
        $("#start").val("");
        $("#end").val("");
        $("#comment").val("");
        $("#price").val("");
    }

    /**
     * check form
     * @returns boolean
     */
    function checkForm () {

        if(_name.length < 3){

            $("#alert").show();
            $("#alert").text("Nom est trop court");
            return false;
        }else if (checkDate() == false){

            $("#alert").show();
            $("#alert").text("Vérifiez les dates");
            return false
        }else if (checkPrice() == false){

            $("#alert").show();
            $("#alert").text("Vérifiez le prix");
            return false
        }else if (_comment.length < 10){

            $("#alert").show();
            $("#alert").text("Vérifiez le commentaire");
            return false
        }else {
            
            return true
        }
    }

    /**
     * compare dates
     * @returns  boolean
     */
    function checkDate () {

        var s = new Date(_dateStart);
        var e = new Date(_datedead);

        var c = s < e;

        if(_dateStart == null || _datedead == null){

            return false
        }else {

            return c;
        }
            
    }

    /**
     * check price
     * @returns boolean
     */
    function checkPrice (){

        if (Number.isNaN(_price)) {
 
             return false;
         }else {
 
             return true
         }
 
     }

    

}

var $project = new Project();
$project.init();