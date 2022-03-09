<?php
$host = "localhost";
$user = "u536743714_kahfi";
$pass = "Circle23@";
$db = "u536743714_kahfiart";

$con = mysqli_connect($host, $user, $pass, $db);
if (!$con) {
    die("Connection failed!");
}