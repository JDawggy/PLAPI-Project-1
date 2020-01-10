
// document ready makes sure the page is loaded so the java script can work
$(document).ready(function(){

    var search_query = "";
    var model_query = "";
    var selected_year = 0;


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

                    table_rows += "<tr><td>"+car.make+"</td><td>"+car.model+"</td><td>"+car.year+"</td><td>"+car.nickname+"</td></tr>";

                });

                $("#search-results").html(table_rows);

            }                                   // On complete function(returned data from php file)

        ); // end $.post

    } // end cool search



});