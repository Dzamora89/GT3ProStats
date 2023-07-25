<?php

//Header
// Todo Clean and understand the Headers

header('Access-Control-Allow-Origin: *');
header('Content-Type: application/json');
header("Access-Control-Allow-Headers: X-API-KEY, Origin, X-Requested-With, Content-Type, Accept, Access-Control-Request-Method");
header("Access-Control-Allow-Methods: GET, POST, OPTIONS, PUT, DELETE");
header("Allow: GET, POST, OPTIONS, PUT, DELETE");

// Authorization and Requested with TODO for later on
include_once '../../config/database.php';
include_once '../../Model/Car.php';
// Instate the DB and Connection
$database = new Database();
$db = $database->connect();

//Initialize the driver
$car = new Car($db);


// Get de raw posted data

$car->carClass = $_GET['carClass'];
$car->carNumber = $_GET['carNumber'];
$car->carTeamID = $_GET['carTeamID'];
$car->carManufacturer = $_GET['carManufacturer'];

//Create the car
if ($car->createCar()) {
    echo json_encode(array('message' => 'Car Created'));
} else {
    echo json_encode(
        array('message' => 'Car Not created')
    );
}