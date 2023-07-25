<?php

//Header

header('Access-Control-Allow-Origin: *');
header('Content-Type: application/json');
header("Access-Control-Allow-Headers: X-API-KEY, Origin, X-Requested-With, Content-Type, Accept, Access-Control-Request-Method");
header("Access-Control-Allow-Methods: GET, POST, OPTIONS, PUT, DELETE");
header("Allow: GET, POST, OPTIONS, PUT, DELETE");

// Authorization and Requested with TODO for later on
include_once '../../config/database.php';
include_once '../../Model/Championship.php';
// Instate the DB and Connection
$database = new Database();
$db = $database->connect();

//Initialize the driver
$championship = new Championship($db);


// Get de raw posted data

$championship->championshipName = $_GET['championshipName'];
$championship->championshipYoutube = $_GET['championshipYoutube'];
$championship->championshipFacebook = $_GET['championshipFacebook'];
$championship->championshipTwitter = $_GET['championshipTwitter'];
$championship->championshipWebsite = $_GET['championshipWebsite'];
$championship->championshipCountry = $_GET['championshipCountry'];
$championship->championshipSeason = $_GET['championshipSeason'];
//Create the championship
if ($championship->createChampionship()) {
    echo json_encode(array('message' => 'championship Created'));
} else {
    echo json_encode(
        array('message' => 'Championship Not created')
    );
}