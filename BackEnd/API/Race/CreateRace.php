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

//Initialize the driver
$race = new Race($db);


// Get de raw posted data
$data = json_decode(file_get_contents("php://input"));

$race->raceTrack = $data->raceTrack;
$race->raceChampionshipID = $data->raceChampionshipID;
$race->raceCountry = $data->raceCountry;
$race->raceDateOfRace = $data->raceDateOfRace;

//Create the race
if ($race->createRace()) {
    echo json_encode(array('message' => 'Race Created'));
} else {
    echo json_encode(
        array('message' => 'Race Not created')
    );
}