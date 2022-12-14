<?php
$host = "localhost";
$user = "root";
$pass = "";
$db = "kahfiart";

$con = mysqli_connect($host, $user, $pass, $db);
if (!$con) {
    die("Connection failed!");
}

$app_id = "1164127";
$key = "6955608fa11f5638ae70";
$secret = "09c9d31605fb4a4bc8b8";
$cluster = "ap1";
$channel = "kahfiart";
$event = "siskarobi";
