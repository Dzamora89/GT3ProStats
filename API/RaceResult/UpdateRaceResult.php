<?php
//Header
header('Access-Control-Allow-Origin: *');
header('Content-Type: application/json');
header("Access-Control-Allow-Headers: X-API-KEY, Origin, X-Requested-With, Content-Type, Accept, Access-Control-Request-Method");
header("Access-Control-Allow-Methods: GET, POST, OPTIONS, PUT, DELETE");
header("Allow: GET, POST, OPTIONS, PUT, DELETE");

// Authorization and Requested with TODO for later on
include_once '../../config/database.php';
include_once '../../Model/RaceResult.php';
// Instate the DB and Connection
$database = new Database();
$db = $database->connect();

//Initialize the Championship
$raceResult = new RaceResult($db);


// Get de raw posted data
$data = json_decode(file_get_contents("php://input"));

$raceResult->raceResultID = $data->raceResultID;
$raceResult->carID = $data->carID;
$raceResult->raceID = $data->raceID;
$raceResult->totalTime = $data->totalTime;
$raceResult->laps = $data->laps;
$raceResult->pointScored = $data->pointScored;
$raceResult->eloChanged = $data->eloChanged;

//Create the race
if ($raceResult->updateRaceResult()) {
    echo json_encode(array('message' => 'RaceResult Updated'));
} else {
    echo json_encode(
        array('message' => 'RaceResult Not Updated')
    );
}