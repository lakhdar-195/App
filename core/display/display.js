

function Display () {

    // search data from project
    this.init = function () {

        $("#tbody").empty();

        var $sql = "SELECT * FROM Project LEFT JOIN Clients ON Project.Clients_id = Clients.id_client"

        // var $sql = "SELECT * FROM Project";
        connection.query($sql, function (error, results){
            if(error) throw error

           

            var $months = ["01", "02", "03", "04", "05", "06", "07", "08", "09", "10", "11", "12"];
            var $i = 0;

            for($i = 0; $i < results.length; $i++){

                var $start = new Date(results[$i].start);
                var $dead = new Date(results[$i].deadline);
                var $date = new Date(results[$i].date_project);
                var $end = new Date(results[$i].end);


                var $tbody = "";
                $tbody += "<tr>";
                $tbody += '<td>' + results[$i].id_project + '</td>';
                $tbody += '<td>' + results[$i].company + '</td>';
                $tbody += '<td>' + results[$i].name_project + '</td>';
                $tbody += '<td>' + $start.getDate() + '-' + $months[$start.getMonth()] + '-' + $start.getUTCFullYear() + '</td>';
                $tbody += '<td>' + $dead.getDate() + '-' + $months[$dead.getMonth()] + '-' + $dead.getUTCFullYear() + '</td>';
                $tbody += '<td>' + results[$i].folder + '</td>';
                $tbody += '<td>' + $date.getDate() + '-' + $months[$date.getMonth()] + '-' + $date.getUTCFullYear() + '</td>';
                $tbody += '<td>' + results[$i].comment_project + '</td>';
                $tbody += '<td class="text-end">' + results[$i].price + ' &euro;</td>';

                if(results[$i].end == null){

                    $tbody += '<td class="text-end"><button class="btn-primary" onclick="$display.update(`' + results[$i].id_project + '`)">Fini</button></td>';
                }else {

                    $tbody += '<td class="text-end">' + $end.getDate() + '-' + $months[$end.getMonth()] + '-' + $end.getUTCFullYear() + '</td>';
                }
                $tbody += '</tr>';
                $("#tbody").append($tbody);
            }


        });
    }

    this.update = function (id) {

        var $sql = "UPDATE Project SET end = CURRENT_TIMESTAMP WHERE id_project = '" + id + "'";
        connection.query($sql, function (error, results){
            if (error) throw error;

            if(results.warningCount == 0){

                $display.init();
            }

        })
    }
}

var $display = new Display();
$display.init();