<?php
//Header

header('Access-Control-Allow-Origin: *');
header('Content-Type: application/json');
header("Access-Control-Allow-Headers: X-API-KEY, Origin, X-Requested-With, Content-Type, Accept, Access-Control-Request-Method");
header("Access-Control-Allow-Methods: GET, POST, OPTIONS, PUT, DELETE");
header("Allow: GET, POST, OPTIONS, PUT, DELETE");

// Authorization and Requested with TODO for later on
include_once '../../config/database.php';
include_once '../../Model/Race.php';
// Instate the DB and Connection
$database = new Database();
$db = $database->connect();

//Initialize the ChampionshipID
$race = new Race($db);


// Get de raw posted data

$race->raceID = $_GET['raceID'];
$race->raceTrack = $_GET['raceTrack'];
$race->raceChampionshipID = $_GET['raceChampionshipID'];
$race->raceCountry = $_GET['raceCountry'];
$race->raceDateOfRace = $_GET['raceDateOfRace'];
$race->raceDuration = $_GET['raceDuration'];
$race->raceEventName = $_GET['raceEventName'];
$race->raceYoutubeLink = $_GET['raceYoutubeLink'];
$race->raceResultLink = $_GET['raceResultLink'];

//Create the race
if ($race->updateRace()) {
    echo json_encode(array('message' => 'Race Updated'));
} else {
    echo json_encode(
        array('message' => 'Race Not Updated')
    );
}
