class Controller  {


    init () {

        $("#container").load("./core/login/login.html", () => {

            $.getScript("./core/login/login.js");
        });

    }

    menu () {

        $("#container-menu").load("./core/menu/menu.html", () => {

            $.getScript("./core/menu/menu.js", () => {

                this.loader('home');
            })
        });
    }

    loader($page){

        $("#container").load("./core/" + $page + "/" + $page +".html", () => {

            $.getScript("./core/" + $page + "/" + $page +".js");
        });
    }
}

var $controller =  new Controller();
$controller.init();
