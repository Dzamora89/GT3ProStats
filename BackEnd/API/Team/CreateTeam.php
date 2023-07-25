<?php

//Header

header('Access-Control-Allow-Origin: *');
header('Content-Type: application/json');
header("Access-Control-Allow-Headers: X-API-KEY, Origin, X-Requested-With, Content-Type, Accept, Access-Control-Request-Method");
header("Access-Control-Allow-Methods: GET, POST, OPTIONS, PUT, DELETE");
header("Allow: GET, POST, OPTIONS, PUT, DELETE");

// Authorization and Requested with TODO for later on
include_once '../../config/database.php';
include_once '../../Model/Team.php';
// Instate the DB and Connection
$database = new Database();
$db = $database->connect();

//Initialize the driver
$team = new Team($db);


// Get de raw posted data

$team->teamName = $_GET['teamName'];
$team->teamOwner = $_GET['teamOwner'];
$team->teamCountry = $_GET['teamCountry'];
$team->teamTwitter = $_GET['teamTwitter'];
$team->teamWebsite = $_GET['teamWebsite'];
$team->teamCarBrand = $_GET['teamCarBrand'];

//Create the race
if ($team->createTeam()) {
    echo json_encode(array('message' => 'Team Created'));
} else {
    echo json_encode(
        array('message' => 'Team Not created')
    );
}