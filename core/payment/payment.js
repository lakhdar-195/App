function Payment () {

    var _projectId = null;
    var _sum = null;
    var _comment = null;

    this.init = function () {

        $("#success").hide();
        $("#alert").hide();

        var $sql = "SELECT * FROM Project";
        connection.query($sql, function(error, results){
            if(error) throw error

            var $select = '';
            $select += '<label for="disabledSelect" class="form-label">Clients</label>';
            $select += '<select id="project" class="form-select" aria-label="Default select">';
            var $i = 0;

            for ($i = 0; $i < results.length; $i++){

                $select += '<option value="' + results[$i].id_project + '"> ' + results[$i].name_project + ' </option>'
            }

            $select += '</select>';
            $("#project_select").append($select);

            form();

        });

    }

    function form () {

        $("#submit").click(function (){

            $("#success").hide();
            $("#alert").hide();

            _projectId = $("#project").val();
            _sum = $("#sum").val();
            _comment = $("#comment").val();

            if(checkForm() == true){

                inserto ();
            }

        });

    }

    function inserto () {

        var $sql = "INSERT INTO Payment (id_payment, sum_payment,  comment_payment, date_payment, Project_id) VALUES (null, '" +_sum + "', '" +_comment + "', CURRENT_TIMESTAMP,  '" +_projectId + "')";

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
     function empty () {

        $("#success").show();
        $("#success").text("L'enregistrement a été effectué avec succès");

        $("#sum").val("");
        $("#comment").val("");

    }

    function checkForm () {

        if (checkSum() === false ){

            $("#alert").show();
            $("#alert").text("Vérifiez la somme");
            return false;
        }else if(_comment.length < 5){

            $("#alert").show();
            $("#alert").text("Commentaire est trop court");
            return false;
        }else {

            return true;
        }
    }

    /**
     * check price
     * @returns boolean
     */
     function checkSum (){

        if (Number.isNaN(_sum)) {
 
             return false;
         }else {
 
             return true
         }
 
     }
}

var $payment = new Payment();
$payment.init();