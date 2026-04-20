<?php

require "db.php";

// JSON input helper
function getBody() {
    return json_decode(file_get_contents("php://input"), true);
}


// ---------------- LOGIN ----------------
function loginAdmin() {
    global $conn;

    $data = getBody();

    $email = $data['email'] ?? '';
    $password = $data['password'] ?? '';

    $result = $conn->query("SELECT * FROM admin WHERE email='$email'");

    if ($row = $result->fetch_assoc()) {

        if (password_verify($password, $row['password'])) {

            echo json_encode([
                "status" => true,
                "message" => "Login success",
                "admin" => [
                    "id" => $row['id'],
                    "name" => $row['name'],
                    "email" => $row['email']
                ]
            ]);

        } else {
            echo json_encode(["status" => false, "message" => "Wrong password"]);
        }

    } else {
        echo json_encode(["status" => false, "message" => "User not found"]);
    }
}


// ---------------- REGISTER ----------------
function registerAdmin() {
    global $conn;

    $data = getBody();

    $name = $data['name'] ?? '';
    $email = $data['email'] ?? '';
    $password = $data['password'] ?? '';

    if (!$name || !$email || !$password) {
        echo json_encode(["status"=>false,"message"=>"All fields required"]);
        return;
    }

    $hashedPassword = password_hash($password, PASSWORD_BCRYPT);

    $conn->query("
        CREATE TABLE IF NOT EXISTS admin (
            id INT AUTO_INCREMENT PRIMARY KEY,
            name VARCHAR(255),
            email VARCHAR(255) UNIQUE,
            password VARCHAR(255)
        )
    ");

    $check = $conn->query("SELECT * FROM admin WHERE email='$email'");
    if ($check->num_rows > 0) {
        echo json_encode(["status"=>false,"message"=>"Email already exists"]);
        return;
    }

    $conn->query("INSERT INTO admin (name, email, password) VALUES ('$name', '$email', '$hashedPassword')");

    echo json_encode(["status"=>true,"message"=>"Registered"]);
}


// ---------------- LOGOUT ----------------
function logoutAdmin() {
    echo json_encode([
        "status" => true,
        "message" => "Logout success"
    ]);
}


// ---------------- UPDATE PROFILE ----------------
function updateAdminProfile() {
    global $conn;

    $data = getBody();

    $email = $data['email'] ?? '';
    $password = $data['password'] ?? '';

    // Validation
    if (!$email || !$password) {
        echo json_encode([
            "status" => false,
            "message" => "Email and Password are required"
        ]);
        return;
    }

    // Check email exists
    $check = $conn->query("SELECT * FROM admin WHERE email='$email'");

    if ($check->num_rows == 0) {
        echo json_encode([
            "status" => false,
            "message" => "Email not found"
        ]);
        return;
    }

    // Hash password
    $hashedPassword = password_hash($password, PASSWORD_BCRYPT);

    // Update password
    $update = $conn->query("UPDATE admin SET password='$hashedPassword' WHERE email='$email'");

    if ($update) {
        echo json_encode([
            "status" => true,
            "message" => "Password updated successfully"
        ]);
    } else {
        echo json_encode([
            "status" => false,
            "message" => "Update failed"
        ]);
    }
}