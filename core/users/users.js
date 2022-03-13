function Users () {

    // selct all account
    this.init = function () {

        var sql = "SELECT * FROM Login";
        connection.query(sql, function (error, results) {
            if (error) throw error;

            if(results[0]){
                
                display(results)
            }
        });
    }

    // display data of all account 
    function display ($results) {

        var months = ["Jan", "Fév", "Mar", "Avr", "Mai", "Jun", "Jui", "Aou", "Sep", "Oct", "Nov", "Déc"];
        var card = "";
        var date = "";
        var role = ""
        var state = "";
        var i = 0;
        for (i = 0; i < $results.length; i++){

            date = new Date($results[i].date_login);
            date = date.getDate() + '-' + months[date.getUTCMonth()] + '-' + date.getUTCFullYear();

            if ($results[i].role == 'user'){

                role = '<button type="button" class="btn btn-secondary " onclick="$users.changeRole(`' + $results[i].email_login + '`)"> User </button>';

            }else if ($results[i].role == 'super'){

                role = '<button type="button" class="btn btn-success" onclick="$users.changeRole(`' + $results[i].email_login + '`)"> Super user </button>';
            }

            if($results[i].state == 0){

                state = '<button type="button" class="btn btn-danger" onclick="$users.changeState(`'+$results[i].email_login +'`)"> Verrouillé </button> '
            }else 
            if($results[i].state == 1){

                state = '<button type="button" class="btn btn-success" onclick="$users.changeState(`' + $results[i].email_login + '`)" >Déverrouillé</button>'
            }

            card = "";
            card += '<div class="col">';
            card += '<div class="card">';
            card += '<div class="card">';
            card += '<div class="card-body">';
            card += '<h5 class="card-title" style="text-transform: uppercase;">' + $results[i].name_login + '</h5>'
            card += '<i class="card-text">' + $results[i].email_login + '</i> </br>'
            card += '<i class="" style="font-size: 12px;">' + date +'</i>'
            card += '</div>';
            card += '<div class="card-footer">' + role + ' ' + state + '</div>'
            card += '</div>';
            card += '</div>';
            card += '</div>';

            $("#rowCard").append(card)
        }
    }

    // function to change state
    this.changeState = function (email) {

        var $sql = ""

        var sql = "SELECT * From Login WHERE email_login='" + email + "'";
        connection.query(sql, function (error, results) {
            if (error) throw error;

            if(results[0].state == 0){
                
                $sql = "UPDATE Login SET state = 1 WHERE email_login = '" + email + "'";
                connection.query($sql);
            }else 
            if(results[0].state == 1){
                
                $sql = "UPDATE Login SET state = 0 WHERE email_login = '" + email + "'";
                connection.query($sql);
            }
        });

        $router.loader('users')
    }

    // function to change role
    this.changeRole = function (email) {

        var $sql = ""

        var sql = "SELECT * From Login WHERE email_login='" + email + "'";
        connection.query(sql, function (error, results) {
            if (error) throw error;

            if(results[0].role == 'user'){
                
                $sql = "UPDATE Login SET role = 'super' WHERE email_login = '" + email + "'";
                connection.query($sql);
            }else 
            if(results[0].role == 'super'){
                
                $sql = "UPDATE Login SET role = 'user' WHERE email_login = '" + email + "'";
                connection.query($sql);
            }
        });

        $router.loader('users')
    }
}

var $users = new Users();
$users.init();