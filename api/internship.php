<?php
header("Content-Type: application/json");

include "db.php";

$method = $_SERVER['REQUEST_METHOD'];
$data = json_decode(file_get_contents("php://input"), true);

// ================= CREATE =================
if ($method === 'POST') {

    $name = $data['name'] ?? '';
    $email = $data['email'] ?? '';
    $phone = $data['phone'] ?? '';
    $college = $data['college'] ?? '';
    $degree = $data['degree'] ?? '';
    $city = $data['city'] ?? '';
    $motivation = $data['motivation'] ?? '';

    // Validation
    if (!$name || !$email || !$phone) {
        echo json_encode([
            "status" => false,
            "message" => "Name, Email and Phone are required"
        ]);
        exit;
    }

    if (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
        echo json_encode([
            "status" => false,
            "message" => "Invalid email format"
        ]);
        exit;
    }

    // Check duplicate email
    $check = $conn->prepare("SELECT id FROM internships WHERE email = ?");
    $check->bind_param("s", $email);
    $check->execute();
    $result = $check->get_result();

    if ($result->num_rows > 0) {
        echo json_encode([
            "status" => false,
            "message" => "Email already exists"
        ]);
        exit;
    }

    // Insert
    $stmt = $conn->prepare("
        INSERT INTO internships 
        (name, email, phone, college, degree, city, motivation)
        VALUES (?, ?, ?, ?, ?, ?, ?)
    ");

    if (!$stmt) {
        echo json_encode([
            "status" => false,
            "message" => "Prepare Error: " . $conn->error
        ]);
        exit;
    }

    $stmt->bind_param("sssssss", $name, $email, $phone, $college, $degree, $city, $motivation);

    if ($stmt->execute()) {
        echo json_encode([
            "status" => true,
            "message" => "Internship form submitted successfully",
            "data" => [
                "id" => $stmt->insert_id,
                "name" => $name,
                "email" => $email,
                "phone" => $phone,
                "college" => $college,
                "degree" => $degree,
                "city" => $city,
                "motivation" => $motivation
            ]
        ]);
    } else {
        echo json_encode([
            "status" => false,
            "message" => "Insert Error: " . $stmt->error
        ]);
    }

    exit;
}


// ================= GET ALL =================
if ($method === 'GET' && !isset($_GET['id'])) {

    $result = $conn->query("SELECT * FROM internships ORDER BY id DESC");

    if (!$result) {
        echo json_encode([
            "status" => false,
            "message" => "Fetch Error: " . $conn->error
        ]);
        exit;
    }

    $dataArr = [];
    while ($row = $result->fetch_assoc()) {
        $dataArr[] = $row;
    }

    echo json_encode([
        "status" => true,
        "count" => count($dataArr),
        "data" => $dataArr
    ]);

    exit;
}


// ================= GET BY ID =================
if ($method === 'GET' && isset($_GET['id'])) {

    $id = $_GET['id'];

    $stmt = $conn->prepare("SELECT * FROM internships WHERE id = ?");
    $stmt->bind_param("i", $id);
    $stmt->execute();

    $result = $stmt->get_result();

    if ($result->num_rows === 0) {
        echo json_encode([
            "status" => false,
            "message" => "Record not found"
        ]);
        exit;
    }

    echo json_encode([
        "status" => true,
        "data" => $result->fetch_assoc()
    ]);

    exit;
}


// ================= DELETE =================
if ($method === 'DELETE') {

    parse_str($_SERVER['QUERY_STRING'], $params);
    $id = $params['id'] ?? null;

    if (!$id) {
        echo json_encode([
            "status" => false,
            "message" => "ID required"
        ]);
        exit;
    }

    $stmt = $conn->prepare("DELETE FROM internships WHERE id = ?");
    $stmt->bind_param("i", $id);

    if ($stmt->execute()) {
        echo json_encode([
            "status" => true,
            "message" => "Record deleted successfully",
            "deletedId" => $id
        ]);
    } else {
        echo json_encode([
            "status" => false,
            "message" => "Delete Error: " . $stmt->error
        ]);
    }

    exit;
}


// ================= SUBMIT TEST =================
if ($method === 'PUT') {

    $email = $data['email'] ?? '';
    $answers = json_encode($data['answers'] ?? []);

    $stmt = $conn->prepare(
        "UPDATE internships SET test_answers = ? WHERE email = ?"
    );

    $stmt->bind_param("ss", $answers, $email);

    if ($stmt->execute()) {
        echo json_encode([
            "status" => true,
            "message" => "Answers saved"
        ]);
    } else {
        echo json_encode([
            "status" => false,
            "message" => "Update Error: " . $stmt->error
        ]);
    }

    exit;
}
?>