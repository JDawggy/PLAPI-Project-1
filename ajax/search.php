<?php

require_once("../conn.php");

            // this is the name inside the { name : ________ } curlys on scripts.js inside $.post which sends it here as $_POST
$search = isset($_POST["search"]) ? $_POST["search"] : false;
$model = isset($_POST["model"]) ? $_POST["model"] : false;
$make = isset($_POST["make"]) ? $_POST["make"] : false;
$year = isset($_POST["year"]) ? $_POST["year"] : false;

// checks is the string we get from POST contains charaters that can contain characters that can be used for mysql injections
$search = $db->real_escape_string(trim($search));
$make = $db->real_escape_string(trim($make));
$model = $db->real_escape_string(trim($model));
$year = $db->real_escape_string($year);

if($search || $year || $model) {

    $search_sql = " SELECT * FROM cars
                    WHERE nickname LIKE '%$search%' AND CONCAT_WS('', make, model) LIKE '%$model%'";

    if($year != 0) {
        $search_sql .= "AND year = $year";
    }

} else {
    $search_sql = " SELECT * FROM cars";
}


$result = $db->query($search_sql);

$cars = array();

while($row = $result->fetch_assoc()){

    $cars[] = $row; // append row to the $cars array

}

$db->close();

echo json_encode($cars);


?>