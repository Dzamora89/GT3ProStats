<?php
//Header
header('Access-Control-Allow-Origin: *');
header('Content-type: application/json');


include_once '../../config/database.php';
include_once '../../Model/Car.php';
// Instate the DB and Connection
$database = new Database();
$db = $database->connect();

//Initialize the driver
$car = new Car($db);

//Car  Query

$result = $car->getAllCar();
//Get Row count
$rowNumber = $result->rowCount();

// Check if any post

if ($rowNumber > 0) {
    //Car Array
    $car_Array = array();
//    $post_Array['Data'] = [];
    while ($row = $result->fetch(PDO::FETCH_ASSOC)) {
        extract($row);
        $car_item = array(
            'carID' => $carID,
            'manufacturer' => $manufacturer,
            'teamName' => $teamName,
            'number' => $number,
            'classCar' => $classCar);
        // Push Data This work the same as array_push() https://www.php.net/manual/es/function.array-push.php
//
        $car_Array[] = $car_item;
    }
    //Turn into Json & Output
    echo json_encode($car_Array);

} else {
    //No found
    echo json_encode(array(
        'message' => 'No Car found'
    ));
}