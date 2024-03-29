<?php
//Header

header('Access-Control-Allow-Origin: *');
header('Content-type: application/json');


include_once '../../config/database.php';
include_once '../../Model/Driver.php';
// Instate the DB and Connection
$database = new Database();
$db = $database->connect();

//Initialize the driver
$driver = new Driver($db);


//Get the ID

$driver->driverID = $_GET['driverID'] ?? die();

// Get Driver

$driver->getDriverByID();

//Create Array
$driver_Array = array(
    'driverID' => $driver->driverID,
    'driverFirstName' => $driver->driverFirstName,
    'driverLastName' => $driver->driverLastName,
    'driverCountry' => $driver->driverCountry,
    'driverDateOfBirth' => $driver->driverDateOfBirth,
    'driverWebsite' => $driver->driverWebsite,
    'driverTwitter' => $driver->driverTwitter,
    'driverStatus' => $driver->driverStatus,
    'driverLicenseLevel' => $driver->driverLicenseLevel,
    'driverELO' => $driver->driverELO,
    'carManufacturer' => $driver->carManufacturer,
    'driverImgUrl' => $driver->driverImgUrl,
);

//Make Json

print_r(json_encode($driver_Array));
