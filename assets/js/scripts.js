
// document ready makes sure the page is loaded so the java script can work
$(document).ready(function(){

    var search_query = "";
    var model_query = "";
    var selected_year = 0;
    var car_id = false;
    var new_id = false;

    cool_search();


    $("#search-from").on("sumbit", function(e){

        // on click of the search form sumbit prevent refresh
        e.preventDefault();

    });

    // On keyup start searching for results
                    // square brackets are to select type or name =
    // $("#search-form input[type=search]").on("keyup", function(){
    $("#search-form #search-nickname").on("keyup", function(){

        // Get the value in the search box
        // Send query to PHP file 
        // Return rows from PHP file that match query
        // Replace table rows with new results

        search_query = $(this).val();
        cool_search();

        console.log(search_query);

    }); // end of search key up


    $("#search-form #search-model").on("keyup", function(){

        model_query = $(this).val();
        cool_search();

        console.log(model_query);

    }); // end of search key up




    $("#year-select").on("change", function(){

        selected_year = $(this).val();
        cool_search();

        console.log(selected_year);

    });


    // On Delete button click

    $("#search-results").on("click", "[data-action=delete]", function(){
        car_id = $(this).data("car");
        console.log(car_id);

        $("#deleteCarAlert").modal("show");
    });


    // on Delete confirmation click

    $("#deleteCarAlert").on("click", "[data-action=confirm-delete]", function(){
        console.log(car_id);

        $.ajax({
            url: "ajax/delete.php",
            type: "POST",
            data: {
                id: car_id
            },
            success: function (result) {

                console.log(result);

                $("#deleteCarAlert").modal("hide");

                car_id = false;
                cool_search();
            }
        });
    });


    // on add car button click

    $("#insert").on("click", "[data-action=insert]", function(){

        var new_model = $("#model_input").val();
        var new_make = $("#make_input").val();
        var new_year = $("#year_input").val();
        var new_nickname = $("#nickname_input").val();

        if ( new_model == "" || new_make == "" || new_year == "" || new_nickname == "") return;
    
        $.ajax({
            url: "ajax/insert.php",
            type: "POST",
            data: {
                make: new_make,
                model: new_model,
                year: new_year,
                nickname: new_nickname
            },
            success: function (result) {

                if(result == "") return;

                console.log(result);

                cool_search();

            }
        });

    });




    /*
    *
    * cool search start
    * send search query to search.php
    * return JSON results
    * 
    */

    function cool_search() {

        $.post(
            "ajax/search.php",                  // URL of file to call
            {
                search: search_query,
                model: model_query,
                year: selected_year
            },                                  // Data to be passed to file via POST
            function(data){
                
                if(data == "") return;

                var cars = JSON.parse(data);

                var table_rows = "";

                        // function below is
                        // for each( index, object ) 
                $.each(cars, function(i, car){

                    table_rows +=   "<tr><td>"+car.make+
                                    "</td><td>"+car.model+
                                    "</td><td>"+car.year+
                                    "</td><td>"+car.nickname+
                                    "</td><td>"+
                                    "<button class='btn btn-danger' data-action='delete' data-car='"+car.id+"'><i class='fas fa-trash'></i></button>"+
                                    "</td></tr>";

                });

                $("#search-results").html(table_rows);

            }                                   // On complete function(returned data from php file)

        ); // end $.post

    } // end cool search



});