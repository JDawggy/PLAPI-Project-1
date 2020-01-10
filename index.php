<?php

require_once("conn.php");

function __($input){
    return htmlspecialchars($input, ENT_QUOTES);
}

?>


<!doctype html>
<html lang="en">
  <head>
    <!-- Required meta tags -->
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no">

    <!-- Font Awesome -->
    <script src="https://kit.fontawesome.com/ea81b73834.js" crossorigin="anonymous"></script>

    <!-- Bootstrap CSS -->
    <link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.4.1/css/bootstrap.min.css" integrity="sha384-Vkoo8x4CGsO3+Hhxv8T/Q5PaXtkKtu6ug5TOeNV6gBiFeWPGFN9MuhOf23Q9Ifjh" crossorigin="anonymous">

    <link rel="stylesheet" href="assets/css/styles.css">


    <title>Hello, world!</title>
  </head>
  <body>

    <div class="container">

        <h3>Cars</h3>
        <hr>

        <div class="row">
            <div class="col-12">
                <form class="input-group" id="search-form">

                    <div for="search" class="input-group-prepend">
                        <select class="custom-select" id="year-select">

                            <option selected value="0">Year</option>
                            <?php

                            for($i = 1956; $i <= intval(date("Y")); $i++){
                                echo "<option value='$i'>$i</option>";
                            }

                            ?>

                        </select>
                    </div>

                    <input type="search" name="search" placeholder="Enter Car Make or Model" class="form-control mb-3" id="search-model">


                    <input type="search" name="search" placeholder="Enter Car Nickname" class="form-control mb-3" id="search-nickname">


                    <div class="input-group-append">
                        <button class="btn btn-primary form-control" type="submit">
                            <i class="fas fa-search"></i>
                        </button>
                    </div>
                </form>
            </div>
        </div>

        <table class="table">

            <thead>
                <th>Make</th>
                <th>Model</th>
                <th>Year</th>
                <th>Nickname</th>
            </thead>

            <tbody id="search-results">
            <?php
            $sql = "SELECT * FROM cars";
            $results = $db->query($sql);

            while($row = $results->fetch_assoc()){
                echo "<tr>";
                echo "<td>" . __($row["make"]) . "</td>";
                echo "<td>" . __($row["model"]) . "</td>";
                echo "<td>" . __($row["year"]) . "</td>";
                echo "<td>" . __($row["nickname"]) . "</td>";
                echo "</tr>";

            }

            ?>
            </tbody>

        </table>

    </div>









    <!-- Optional JavaScript -->
    <!-- jQuery first, then Popper.js, then Bootstrap JS -->
    <script src="https://ajax.googleapis.com/ajax/libs/jquery/3.4.1/jquery.min.js"></script>
    <script src="https://cdn.jsdelivr.net/npm/popper.js@1.16.0/dist/umd/popper.min.js" integrity="sha384-Q6E9RHvbIyZFJoft+2mJbHaEWldlvI9IOYy5n3zV9zzTtmI3UksdQRVvoxMfooAo" crossorigin="anonymous"></script>
    <script src="https://stackpath.bootstrapcdn.com/bootstrap/4.4.1/js/bootstrap.min.js" integrity="sha384-wfSDF2E50Y2D1uUdj0O3uMBJnjuUD4Ih7YwaYd1iqfktj0Uod8GCExl3Og8ifwB6" crossorigin="anonymous"></script>

    <script src="assets/js/scripts.js"></script>
  </body>
</html>