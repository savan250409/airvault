<?php
$data = json_decode(file_get_contents("php://input"), true);

if ($_SERVER['REQUEST_METHOD'] === 'POST') {

    if (strpos($_SERVER['REQUEST_URI'], "login") !== false) {

        $email = $data['email'];
        $password = $data['password'];

        $result = $conn->query("SELECT * FROM admins WHERE email='$email'");

        if ($row = $result->fetch_assoc()) {
            if ($row['password'] == $password) {
                echo json_encode(["status" => true, "message" => "Login success"]);
            } else {
                echo json_encode(["status" => false, "message" => "Wrong password"]);
            }
        } else {
            echo json_encode(["status" => false, "message" => "User not found"]);
        }
    }
}
?>