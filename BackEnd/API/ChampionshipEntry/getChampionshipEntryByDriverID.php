<?php
//Header


header('Access-Control-Allow-Origin: *');
header('Content-type: application/json');


include_once '../../config/database.php';
include_once '../../Model/ChampionshipEntry.php';
// Instate the DB and Connection
$database = new Database();
$db = $database->connect();

//Initialize the driver
$championshipEntries = new ChampionshipEntry($db);

//Car  Query
$championshipEntries->championshipEntryDriverID = $_GET['driverID'];
$result = $championshipEntries->getChampionshipEntriesByDriverID();
//Get Row count
$rowNumber = $result->rowCount();

// Check if any post

if ($rowNumber > 0) {
    //Driver Array
    $array = array();
//    $post_Array['Data'] = [];
    while ($row = $result->fetch(PDO::FETCH_ASSOC)) {
        extract($row);
        $item = array(
            'teamName' => $teamName,
            'carNumber' => $carNumber,
            'driverFirstName' => $driverFirstName,
            'driverLastName' => $driverLastName,
            'championshipEntryID' => $championshipEntryID,
            'championshipEntryTotalPoints' => $championshipEntryTotalPoints,
            'championshipEntryClass' => $championshipEntryClass,
            'championshipEntryDriverID' => $championshipEntryDriverID,
            'carBrand' => $carManufacturer,
            'carID' => $carID,
            'driverELO' => $driverELO,
            'championshipName' => $championshipName
        );
        $array[] = $item;
    }
    //Turn into Json & Output
    echo json_encode($array);
} else {
    //No found
    echo json_encode(array(
        'message' => 'No post found'
    ));
}