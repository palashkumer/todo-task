<?php
error_reporting(E_ALL);
ini_set('display_errors', 1);
header("Access-Control-Allow-Origin:* ");
header("Access-Control-Allow-Headers: *");
header("Access-Control-Allow-Methods: *");
require 'Db_connect.php';

$method = $_SERVER['REQUEST_METHOD'];

switch ($method) {
    case "GET":
        require 'get.php';
        break;
    case "POST":
        require 'create.php';
        break;
    case "PUT":
        require 'update.php';
        break;
    case "DELETE":
        require 'delete.php';
        break;
}
