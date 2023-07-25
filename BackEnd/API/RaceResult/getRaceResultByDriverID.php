<?php
//Header

header('Access-Control-Allow-Origin: *');
header('Content-type: application/json');


include_once '../../config/database.php';
include_once '../../Model/RaceResult.php';
// Instate the DB and Connection
$database = new Database();
$db = $database->connect();
//Initialize the Car
$raceResult = new RaceResult($db);
//Get the ID

$raceResult->raceResultDriverID = $_GET['driverID'];
//Get Car
$result = $raceResult->getRaceResultByDriverID();

$rowNumber = $result->rowCount();

// Check if any post

if ($rowNumber > 0) {
    //Race Array
    $array = array();
//    $post_Array['Data'] = [];
    while ($row = $result->fetch(PDO::FETCH_ASSOC)) {
        extract($row);
        $item = array(
            'driverFirstName' => $driverFirstName,
            'driverLastName' => $driverLastName,
            'carNumber' => $carNumber,
            'carManufacturer' => $carManufacturer,
            'raceResultGap' => $raceresultGap,
            'raceResultLaps' => $raceresultLaps,
            'raceResultEloChanged' => $raceresultEloChanged,
            'raceResultPosition' => $raceresultPosition,
            'driverELO' => $driverELO,
            'driverID' => $driverID,
            'carID' => $carID,
            'raceResultPointsScored' => $raceresultPointsScored,
            'raceResultID' => $raceresultID,
            'raceTrack' => $raceTrack,
            'championshipName' => $championshipName,
            'raceDateOfRace' => $raceDateOfRace,
            'championshipID' => $championshipID
        );
        $array[] = $item;
    }
    //Turn into Json & Output
    echo json_encode($array);

} else {
    //No found
    echo json_encode(array(
        'message' => 'No post found'
    ));
}