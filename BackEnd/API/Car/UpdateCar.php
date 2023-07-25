<?php
//Header

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

//Initialize the Car
$car = new Car($db);

$car->carID = $_GET['carID'];
$car->carClass = $_GET['carClass'];
$car->carNumber = $_GET['carNumber'];
$car->carTeamID = $_GET['carTeamID'];
$car->carManufacturer = $_GET['carManufacturer'];

// Create the driver

if ($car->updateCar()) {
    echo json_encode(
        array('message' => 'Car Updated')
    );
} else {
    echo json_encode(
        array('message' => 'Car Not Updated')
    );
}