<?php

//Header
header('Access-Control-Allow-Origin: *');
header('Content-Type: application/json');
header("Access-Control-Allow-Headers: X-API-KEY, Origin, X-Requested-With, Content-Type, Accept, Access-Control-Request-Method");
header("Access-Control-Allow-Methods: GET, POST, OPTIONS, PUT, DELETE");
header("Allow: GET, POST, OPTIONS, PUT, DELETE");

// Authorization and Requested with TODO for later on
include_once '../../config/database.php';
include_once '../../Model/ChampionshipEntry.php';
// Instate the DB and Connection
$database = new Database();
$db = $database->connect();

//Initialize the driver
$championshipEntry = new ChampionshipEntry($db);


// Get de raw posted data
$data = json_decode(file_get_contents("php://input"));


$championshipEntry->championshipID = $data->championshipID;
$championshipEntry->totalPoints = $data->totalPoints;
$championshipEntry->position = $data->position;
$championshipEntry->class = $data->class;
//Create
if ($championshipEntry->createChampionshipEntry()) {
    echo json_encode(array('message' => 'championshipEntry Created'));
} else {
    echo json_encode(
        array('message' => 'ChampionshipEntry Not created')
    );
}