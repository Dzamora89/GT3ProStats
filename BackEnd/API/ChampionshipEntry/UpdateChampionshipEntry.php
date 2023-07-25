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

//Initialize the Championship
$championshipEntry = new ChampionshipEntry($db);


// Get de raw posted data



$championshipEntry->championshipEntryID = $_GET['championshipEntryID'];
$championshipEntry->championshipEntryTotalPoints = $_GET['championshipEntryTotalPoints'];

// Update

if ($championshipEntry->updateChampionshipEntry()) {
    echo json_encode(
        array('message' => 'ChampionshipEntry Updated')
    );
} else {
    echo json_encode(
        array('message' => 'ChampionshipEntry not Updated')
    );
}