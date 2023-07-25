<?php
header('Access-Control-Allow-Origin: *');
header('Content-Type: application/json');
header("Access-Control-Allow-Headers: X-API-KEY, Origin, X-Requested-With, Content-Type, Accept, Access-Control-Request-Method");
header("Access-Control-Allow-Methods: POST");
header("Allow: POST");

include_once '../../config/database.php';
include_once '../../Model/User.php';

$database = new Database();
$db = $database->connect();

$user = new User($db);

$user->username = $_GET['username'];
$user->token = $_GET['token'];

if ($user->checkToken() == 1) {
    echo true;
}else {
    echo false;
}