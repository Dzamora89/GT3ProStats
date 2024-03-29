<?php

//Header

header('Access-Control-Allow-Origin: *');
header('Content-type: application/json');


include_once '../../config/database.php';
include_once '../../Model/Race.php';
// Instate the DB and Connection
$database = new Database();
$db = $database->connect();

//Initialize the Race
$race = new Race($db);

//Race  Query

$result = $race->getAllRaces();
//Get Row count
$rowNumber = $result->rowCount();

// Check if any post

if ($rowNumber > 0) {
    //Race Array
    $race_Array = array();
    //    $post_Array['Data'] = [];
    while ($row = $result->fetch(PDO::FETCH_ASSOC)) {
        extract($row);
        $race_item = array(
            'raceID' => $raceID,
            'raceTrack' => $raceTrack,
            'raceDateOfRace' => $raceDateOfRace,
            'raceCountry' => $raceCountry,
            'championshipName' => $championshipName,
            'championshipID' => $championshipID,
            'raceDuration' => $raceDuration,
            'raceEventName' => $raceEventName,
            'raceYoutubeLink' => $raceYoutubeLink,
            'raceResultLink' => $raceResultLink
        );
        $race_Array[] = $race_item;
    }
    //Turn into Json & Output
    echo json_encode($race_Array);
} else {
    //No found
    echo json_encode(array(
        'message' => 'No post found'
    ));
}
