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

//Driver  Query

$result = $driver->getAllDriver();
//Get Row count
$rowNumber = $result->rowCount();

// Check if any post

if ($rowNumber > 0) {
    //Driver Array
    $driver_Array = array();
//    $post_Array['Data'] = [];
    while ($row = $result->fetch(PDO::FETCH_ASSOC)) {
        extract($row);
        $driver_item = array(
            'driverID' => $driverID,
            'driverFirstName' => $driverFirstName,
            'driverLastName' => $driverLastName,
            'driverCountry' => $driverCountry,
            'driverDateOfBirth' => $driverDateOfBirth,
            'driverWebsite' => $driverWebsite,
            'driverTwitter' => $driverTwitter,
            'driverStatus' => $driverStatus,
            'driverLicenseLevel' => $driverLicenseLevel,
            'driverELO' => $driverELO,
            'carManufacturer' => $carManufacturer,
            'driverImgUrl' => $driverImgUrl
        );
        // Push Data This work the same as array_push() https://www.php.net/manual/es/function.array-push.php
//        $post_Array['Data'][] = $driver_item;
        array_push($driver_Array, $driver_item);
    }
    //Turn into Json & Output
    echo json_encode($driver_Array);

} else {
    //No found
    echo json_encode(array(
        'message' => 'No post found'
    ));
}