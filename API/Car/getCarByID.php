<?php
//Header
header('Access-Control-Allow-Origin: *');
header('Content-type: application/json');


include_once '../../config/database.php';
include_once '../../Model/Car.php';
// Instate the DB and Connection
$database = new Database();
$db = $database->connect();
//Initialize the Car
$car = new Car($db);
//Get the ID

$car->carID = $_GET['carID'] ?? die();

//Get Car

$car->getCarByID();

$car_Array = array(
    'carID' => $car->carID,
    'manufacturer' => $car->manufacturer,
    'teamID' => $car->teamID,
    'number' => $car->number,
    'classCar' => $car->classCar);

print_r(json_encode($car_Array));