<?php
//Header

header('Access-Control-Allow-Origin: *');
header('Content-type: application/json');


include_once '../../config/database.php';
include_once '../../Model/RaceResult.php';
// Instate the DB and Connection
$database = new Database();
$db = $database->connect();

//Initialize the driver
$raceResult = new RaceResult($db);

//Driver  Query

$result = $raceResult->getAllRaceResult();
//Get Row count
$rowNumber = $result->rowCount();

// Check if any post

if ($rowNumber > 0) {
    //Driver Array
    $array = array();
//    $post_Array['Data'] = [];
    while ($row = $result->fetch(PDO::FETCH_ASSOC)) {
        extract($row);
        $item = array(
            'raceTrack' => $raceTrack,
            'raceDateOfRace' => $raceDateOfRace
        );
        // Push Data This work the same as array_push() https://www.php.net/manual/es/function.array-push.php
//        $post_Array['Data'][] = $driver_item;
        array_push($array, $item);
    }
    //Turn into Json & Output
    echo json_encode($array);

} else {
    //No found
    echo json_encode(array(
        'message' => 'No post found'
    ));
}