<?php
//Header
header('Access-Control-Allow-Origin: *');
header('Content-type: application/json');


include_once '../../config/database.php';
include_once '../../Model/Race.php';
// Instate the DB and Connection
$database = new Database();
$db = $database->connect();
//Initialize the Car
$race = new Race($db);
//Get the ID

$race->championshipID = $_GET['championshipID'] ?? die();

//Get Car
$result = $race->getRaceBychampionshipID();
//Get Row count
$rowNumber = $result->rowCount();

// Check if any post

if ($rowNumber > 0) {
    //Race Array
    $race_Array = array();
//    $post_Array['Data'] = [];
    while ($row = $result->fetch(PDO::FETCH_ASSOC)) {
        extract($row);
        $race_item = array(
            'raceID' => $raceID,
            'track' => $track,
            'dateOfRace' => $dateOfRace,
            'country' => $country,
            'championshipID' => $championshipID
        );
        // Push Data This work the same as array_push() https://www.php.net/manual/es/function.array-push.php
//        $post_Array['Data'][] = $Race_item;
        array_push($race_Array, $race_item);
    }
    //Turn into Json & Output
    echo json_encode($race_Array);

} else {
    //No found
    echo json_encode(array(
        'message' => 'No post found'
    ));
}