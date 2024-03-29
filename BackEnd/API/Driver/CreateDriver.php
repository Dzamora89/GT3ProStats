<?php
//Header

header('Access-Control-Allow-Origin: *');
header('Content-Type: application/json');
header("Access-Control-Allow-Headers: X-API-KEY, Origin, X-Requested-With, Content-Type, Accept, Access-Control-Request-Method");
header("Access-Control-Allow-Methods: GET, POST, OPTIONS, PUT, DELETE");
header("Allow: GET, POST, OPTIONS, PUT, DELETE");

// Authorization and Requested with TODO for later on
include_once '../../config/database.php';
include_once '../../Model/Driver.php';
// Instate the DB and Connection
$database = new Database();
$db = $database->connect();

//Initialize the driver
$driver = new Driver($db);
// Get de raw  data

$driver->driverFirstName = $_GET['driverFirstName'];
$driver->driverLastName = $_GET['driverLastName'];
$driver->driverCountry = $_GET['driverCountry'];
$driver->driverDateOfBirth = $_GET['driverDateOfBirth'];
$driver->driverWebsite = $_GET['driverWebsite'];
$driver->driverTwitter = $_GET['driverTwitter'];
$driver->driverStatus = $_GET['driverStatus'];
$driver->driverLicenseLevel = $_GET['driverLicenseLevel'];
$driver->driverELO = $_GET['driverELO'];
$driver->driverImgUrl = $_GET['driverImgUrl'];


// Create the driver

if ($driver->createDriver()) {
    echo json_encode(
        array('message' => 'Driver Created')
    );
} else {
    echo json_encode(
        array('message' => 'Driver Not created')
    );
}
