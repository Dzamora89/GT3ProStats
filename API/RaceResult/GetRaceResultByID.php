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

$raceResult->raceResultID = $_GET['raceResultID'] ?? die();

//Get Car
$raceResult->getRaceResultByID();

$raceResult_Array = array(
    'raceResultID' => $raceResult->raceResultID,
    'carID' => $raceResult->carID,
    'raceID' => $raceResult->raceID,
    'totalTime' => $raceResult->totalTime,
    'laps' => $raceResult->laps,
    'pointScored' => $raceResult->pointScored,
    'eloChanged' => $raceResult->eloChanged);

print_r(json_encode($raceResult_Array));