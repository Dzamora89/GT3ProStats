<?php

//Header


//Header

header('Access-Control-Allow-Origin: *');
header('Content-Type: application/json');
header("Access-Control-Allow-Headers: X-API-KEY, Origin, X-Requested-With, Content-Type, Accept, Access-Control-Request-Method");
header("Access-Control-Allow-Methods: GET, POST, OPTIONS, PUT, DELETE");
header("Allow: GET, POST, OPTIONS, PUT, DELETE");

// Authorization and Requested with TODO for later on
include_once '../../config/database.php';
include_once '../../Model/RaceResult.php';
include_once '../../Model/ChampionshipEntry.php';
include_once '../../Model/Driver.php';
// Instate the DB and Connection
$database = new Database();
$db = $database->connect();
$driver = new Driver($db);
$championshipEntry = new ChampionshipEntry($db);
$raceResult = new RaceResult($db);
// Get de raw posted data

$raceResult->raceResultCarID = $_GET['raceResultCarID'];
$raceResult->raceResultRaceID = $_GET['raceResultRaceID'];
$raceResult->raceResultDriverID = $_GET['raceResultDriverID'];
$raceResult->raceResultEloChanged = $_GET['raceResultEloChanged'];
$raceResult->raceResultPosition = $_GET['raceResultPosition'];
$raceResult->raceResultDriverELO = $_GET['driverELO'];


$driver->driverID = $_GET['raceResultDriverID'];
$driver->driverELO = $_GET['driverELO'];




//Create the race
if ($raceResult->createRaceResult()) {
    try {
        echo json_encode(array('message' => 'Race Result Created'));
        $driver->updateElo();
    } catch (Error $e) {
        echo $e->getMessage();
    }
} else {
    echo json_encode(
        array('message' => 'Race Result Not created')
    );
}
