<?php
header("Content-Type: application/json");

include "db.php";

$method = $_SERVER['REQUEST_METHOD'];
// echo $method;

$data = json_decode(file_get_contents("php://input"), true);

// ================= CREATE =================

function createInternship() {
    global $conn;

    $data = json_decode(file_get_contents("php://input"), true);

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
        return;
    }

    if (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
        echo json_encode([
            "status" => false,
            "message" => "Invalid email format"
        ]);
        return;
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
        return;
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
        return;
    }

    $stmt->bind_param("sssssss", $name, $email, $phone, $college, $degree, $city, $motivation);

    if ($stmt->execute()) {
        echo json_encode([
            "status" => true,
            "message" => "Internship form submitted successfully",
            "data" => [
                "id" => $stmt->insert_id
            ]
        ]);
    } else {
        echo json_encode([
            "status" => false,
            "message" => "Insert Error: " . $stmt->error
        ]);
    }
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

    // ✅ Step 1: All questions + answers ek baar me load (optimization 🔥)
    $questionMap = [];
    $qRes = $conn->query("SELECT question, correct_answer FROM questions");

    while ($qRow = $qRes->fetch_assoc()) {
        $questionMap[strtolower(trim($qRow['question']))] = strtolower(trim($qRow['correct_answer']));
    }

$dataArr = [];

while ($row = $result->fetch_assoc()) {

    $answers = json_decode($row['test_answers'], true);

    $correct = 0;
    $incorrect = 0;
    $skipped = 0;

    $questionResults = []; // ✅ NEW

    if ($answers && is_array($answers)) {
        foreach ($answers as $question => $userAnswer) {

            $qKey = strtolower(trim($question));

            if (isset($questionMap[$qKey])) {

                $correctAnswer = $questionMap[$qKey];

                // ✅ Skip
                if ($userAnswer === "Skipped" || $userAnswer === "Skip") {
                    $skipped++;
                    $questionResults[$question] = "skipped";
                } 
                // ✅ Correct
                else if (strtolower(trim($userAnswer)) === $correctAnswer) {
                    $correct++;
                    $questionResults[$question] = "correct";
                } 
                // ❌ Incorrect
                else {
                    $incorrect++;
                    $questionResults[$question] = "incorrect";
                }
            }
        }
    }

    // ✅ Pass / Fail
    $resultStatus = ($correct >= 15) ? "Pass" : "Fail";

    // ✅ Attach result
    $row['result'] = [
        "correct" => $correct,
        "incorrect" => $incorrect,
        "skipped" => $skipped,
        "status" => $resultStatus
    ];

    // ✅ Attach per-question result
    $row['question_results'] = $questionResults;

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
function submitTest() {
    global $conn;

    $data = json_decode(file_get_contents("php://input"), true);

    $email = $data['email'] ?? '';
    $answers = json_encode($data['answers'] ?? []);

    if (!$email || !$answers) {
        echo json_encode([
            "status" => false,
            "message" => "Email and answers required"
        ]);
        return;
    }

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
}
?>