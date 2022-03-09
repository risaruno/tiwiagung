<?php
include 'connection.php';

$query = "SELECT * FROM `message` WHERE `roomName` = '$event' ORDER BY `id` DESC";
$result = mysqli_query($con, $query);

if(mysqli_num_rows($result) > 0 ){
    $data = array();
    $data["data"] = array();
    while($r = mysqli_fetch_array($result)){
        $h['id'] = $r["id"];
        $h['name'] = $r["name"];
        $h['message'] = $r["msg"];
        $h['time'] = $r["datetime"];
        array_push($data["data"], $h);
    }
    echo json_encode($data);
} else {
    $data["error"]="Tidak ada data";
    echo json_encode($data);
}

mysqli_close($con);