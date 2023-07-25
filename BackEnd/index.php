<?php

echo "Hello there, this is a PHP Apache container";
phpinfo();
include_once 'config/database.php';
include_once 'Model/Driver.php';
// Instate the DB and Connection
$database = new Database();
$db = $database->connect();
$query = 'SELECT * 
                  FROM driver
                  join championshipentry c on driver.driverID = c.championshipEntryDriverID
                  join car c2 on c2.carID = c.championshipEntryCarID
                  ORDER BY driverELO desc ';

// Prepared Statement

$db->prepare($query);

// Execute Query
$stmt->execute();
return $stmt;