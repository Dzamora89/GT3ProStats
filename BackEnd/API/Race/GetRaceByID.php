<?php
//Header

header('Access-Control-Allow-Origin: *');
header('Content-type: application/json');


include_once '../../config/database.php';
include_once '../../Model/Race.php';
// Instate the DB and Connection
$database = new Database();
$db = $database->connect();
//Initialize the Car
$race = new Race($db);
//Get the ID

$race->raceID = $_GET['raceID'] ?? die();

//Get Car
$race->getRaceByID();

$race_Array = array(
    'raceID' => $race->raceID,
    'raceTrack' => $race->raceTrack,
    'raceDateOfRace' => $race->raceDateOfRace,
    'raceCountry' => $race->raceCountry,
    'raceChampionshipID' => $race->raceChampionshipID,
    'raceDuration' => $race->raceDuration,
    'raceEventName' => $race->raceEventName,
    'raceYoutubeLink' => $race->raceYoutubeLink,
    'raceResultLink' => $race->raceResultLink
);

print_r(json_encode($race_Array));
