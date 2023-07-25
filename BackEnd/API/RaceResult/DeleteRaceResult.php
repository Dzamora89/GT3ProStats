<?php
//Header
const invertir = -1;
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

//Initialize the driver
$raceResult = new RaceResult($db);
$driver = new Driver($db);
$championshipEntry = new ChampionshipEntry($db);

$raceResult->raceResultID = $_GET['raceresultID'];
$driver->driverID = $_GET['raceResultDriverID'];
$driver->driverELO = $_GET['driverELO'];
$championshipEntry->championshipEntryChampionshipID = $_GET['championshipID'];
$championshipEntry->championshipEntryDriverID = $_GET['raceResultDriverID'];
// Delete

if ($raceResult->deleteRaceResult()) {
    $championshipEntry->updateTheChampionship(intval($_GET['raceresultPointsScored']) * invertir);
    $driver->updateElo();
    echo json_encode(
        array('message' => 'Race Result Deleted')
    );
} else {
    echo json_encode(
        array('message' => 'Race Result Not Deleted')
    );
}