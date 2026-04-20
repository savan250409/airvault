<?php

error_reporting(E_ALL);
ini_set('display_errors', 1);

header("Content-Type: application/json");
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: Content-Type, Authorization");
header("Access-Control-Allow-Methods: GET, POST, PUT, DELETE");

// Preflight (CORS)
if ($_SERVER['REQUEST_METHOD'] == "OPTIONS") {
    http_response_code(200);
    exit();
}

// URL Parse
$url = $_GET['url'] ?? '';
$url = explode('/', trim($url, '/'));

$module = $url[0] ?? '';
$action = $url[1] ?? '';
$id     = $url[2] ?? null;


// ================= TEST =================
if ($module === "test") {
    echo json_encode([
        "status" => true,
        "message" => "API working"
    ]);
}


// ================= AUTH =================
elseif ($module === "auth") {

    require "auth.php";

    if ($_SERVER['REQUEST_METHOD'] == "POST" && $action === "login") {
        loginAdmin();
    }
    elseif ($_SERVER['REQUEST_METHOD'] == "POST" && $action === "register") {
        registerAdmin();
    }
    elseif ($_SERVER['REQUEST_METHOD'] == "POST" && $action === "logout") {
        logoutAdmin();
    }
    elseif ($_SERVER['REQUEST_METHOD'] == "PUT" && $action === "update-profile") {
        updateAdminProfile();
    }
    else {
        echo json_encode([
            "status" => false,
            "message" => "Invalid Auth Route"
        ]);
    }
}


// ================= SERVICES =================
elseif ($module === "services") {

    require "services.php";

    if ($_SERVER['REQUEST_METHOD'] == "GET" && !$action) {
        getAllServices(); // GET /services
    }
    elseif ($_SERVER['REQUEST_METHOD'] == "GET" && $action) {
        getServiceById($action); // GET /services/:id
    }
    elseif ($_SERVER['REQUEST_METHOD'] == "POST") {
        addService(); // POST /services
    }
    elseif ($_SERVER['REQUEST_METHOD'] == "PUT" && $action) {
        updateService($action); // PUT /services/:id
    }
    elseif ($_SERVER['REQUEST_METHOD'] == "DELETE" && $action) {
        deleteService($action); // DELETE /services/:id
    }
    else {
        echo json_encode([
            "status" => false,
            "message" => "Invalid Services Route"
        ]);
    }
}


// ================= INTERNSHIP =================
elseif ($module === "internship") {

    require "internship.php";

    if ($_SERVER['REQUEST_METHOD'] == "POST" && !$action) {
        createInternship(); // POST /internship
    }
    elseif ($_SERVER['REQUEST_METHOD'] == "GET" && !$action) {
        getAllInternships(); // GET /internship
    }
    elseif ($_SERVER['REQUEST_METHOD'] == "GET" && $action) {
        getInternshipById($action); // GET /internship/:id
    }
    elseif ($_SERVER['REQUEST_METHOD'] == "POST" && $action === "submit-test") {
        submitTest(); // POST /internship/submit-test
    }
    else {
        echo json_encode([
            "status" => false,
            "message" => "Invalid Internship Route"
        ]);
    }
}


// ================= QUESTIONS =================
elseif ($module === "questions") {

    require "questions.php";

    if ($_SERVER['REQUEST_METHOD'] == "POST" && !$action) {
        createQuestion(); // POST /questions
    }
    elseif ($_SERVER['REQUEST_METHOD'] == "GET" && !$action) {
        getQuestions(); // GET /questions
    }
    elseif ($_SERVER['REQUEST_METHOD'] == "PUT" && $action) {
        updateQuestion($action); // PUT /questions/:id
    }
    elseif ($_SERVER['REQUEST_METHOD'] == "DELETE" && $action) {
        deleteQuestion($action); // DELETE /questions/:id
    }
    elseif ($_SERVER['REQUEST_METHOD'] == "POST" && $action === "bulk") {
        bulkInsertQuestions(); // POST /questions/bulk
    }
    else {
        echo json_encode([
            "status" => false,
            "message" => "Invalid Questions Route"
        ]);
    }
}


// ================= QUESTION LIMIT =================
elseif ($module === "set-question-limit") {

    require "questions.php";

    if ($_SERVER['REQUEST_METHOD'] == "POST") {
        setQuestionLimit(); // POST /set-question-limit
    }
    else {
        echo json_encode([
            "status" => false,
            "message" => "Invalid Route"
        ]);
    }
}

elseif ($module === "get-question-limit") {

    require "questions.php";

    if ($_SERVER['REQUEST_METHOD'] == "GET") {
        getQuestionLimit(); // GET /get-question-limit
    }
    else {
        echo json_encode([
            "status" => false,
            "message" => "Invalid Route"
        ]);
    }
}


// ================= DEFAULT =================
else {
    echo json_encode([
        "status" => false,
        "message" => "Route not found"
    ]);
}