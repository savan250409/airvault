<?php
header("Content-Type: application/json");
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: GET, POST, PUT, DELETE");
header("Access-Control-Allow-Headers: Content-Type");

include "db.php";

$request = $_SERVER['REQUEST_URI'];
$method = $_SERVER['REQUEST_METHOD'];

// Remove base path
$request = str_replace("/api/", "", $request);

// Routing
if (strpos($request, "services") === 0) {
    include "services.php";
}
elseif (strpos($request, "internship") === 0) {
    include "internship.php";
}
elseif (strpos($request, "auth") === 0) {
    include "auth.php";
}
else {
    echo json_encode(["message" => "API working"]);
}
?>