function Users () {

    this.init = function () {

        var sql = "SELECT * FROM Login";
        connection.query(sql, function (error, results) {
            if (error) throw error;

            if(results[0]){
                
                display(results)
            }
        });
    }

    function display ($results) {

        var months = ["Jan", "Fév", "Mar", "Avr", "Mai", "Jui", "Jui", "Aou", "Sep", "Oct", "Nov", "Déc"];
        var card = "";
        var date = "";
        var role = ""
        var state = "";
        var i = 0;
        for (i = 0; i < $results.length; i++){

            date = new Date($results[i].date);
            date = date.getDate() + '-' + months[date.getUTCMonth()] + '-' + date.getUTCFullYear();

            if ($results[i].role == 'user'){

                role = '<i class="fa-solid fa-graduation-cap"></i>';

            }else if ($results[i].role == 'super'){

                role = '<i class="fa-solid fa-crown"></i>';
            }

            if($results[i].state == 0){

                state = '<a href="#" ><i style="color:red;" class="fa-solid fa-circle" onclick="$users.change(`'+$results[i].email +'`)"></i> </a>'
            }else 
            if($results[i].state == 1){

                state = '<a href="#" ><i style="color:green;" class="fa-solid fa-circle" onclick="$users.change(`' + $results[i].email + '`)" ></i></a>'
            }

            card = "";
            card += '<div class="col">';
            card += '<div class="card">';
            card += '<div class="card">';
            card += '<div class="card-body">';
            card += '<h5 class="card-title">' + role + " " + $results[i].name + '</h5>'
            card += '<p class="card-text">' + $results[i].email + '</p>'
            card += '<p class="card-text">' + date +'</p>'
            card += '</div>';
            card += '<div class="card-footer">' + state + '</div>'
            card += '</div>';
            card += '</div>';
            card += '</div>';

            $("#rowCard").append(card)
        }
    }

    this.change = function (email) {

        var $sql = ""

        var sql = "SELECT * From Login WHERE email='" + email + "'";
        connection.query(sql, function (error, results) {
            if (error) throw error;

            console.log(results[0])
            console.log(email)

            if(results[0].state == 0){
                
                $sql = "UPDATE Login SET state = 1 WHERE email = '" + email + "'";
                connection.query($sql);
            }else 
            if(results[0].state == 1){
                
                $sql = "UPDATE Login SET state = 0 WHERE email = '" + email + "'";
                connection.query($sql);
            }
        });

        $router.loader('users')
    }
}

var $users = new Users();
$users.init();