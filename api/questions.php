<?php
require "db.php";

function getBody() {
    return json_decode(file_get_contents("php://input"), true);
}

function ensureQuestionLimitColumn() {
    global $conn;

    $check = $conn->query("SHOW COLUMNS FROM admin LIKE 'question_limit'");

    if ($check->num_rows == 0) {
        $conn->query("ALTER TABLE admin ADD COLUMN question_limit INT DEFAULT 40");
    }
}
function setQuestionLimit() {
    global $conn;
    ensureQuestionLimitColumn();

    $data = getBody();
    $limit = $data['limit'] ?? null;

    if (!$limit) {
        echo json_encode(["status"=>false,"message"=>"limit required"]);
        return;
    }

    $conn->query("UPDATE admin SET question_limit = '$limit' ORDER BY id ASC LIMIT 1");

    echo json_encode([
        "status"=>true,
        "message"=>"Limit saved successfully"
    ]);
}

function getQuestionLimit() {
    global $conn;
    ensureQuestionLimitColumn();

    // Get question limit
    $res = $conn->query("SELECT question_limit FROM admin ORDER BY id ASC LIMIT 1");

    $limit = 10;

    if ($res->num_rows > 0) {
        $row = $res->fetch_assoc();
        if (!empty($row['question_limit'])) {
            $limit = $row['question_limit'];
        }
    }

    // Get total number of questions
    $totalQuestions = 0;
    $qRes = $conn->query("SELECT COUNT(*) as total FROM questions");

    if ($qRes && $qRes->num_rows > 0) {
        $qRow = $qRes->fetch_assoc();
        $totalQuestions = (int)$qRow['total'];
    }

    echo json_encode([
        "status" => true,
        "question_limit" => $limit,
        "total_questions" => $totalQuestions
    ]);
}
// ================= CREATE =================
function createQuestion() {
    global $conn;
    $data = getBody();

    $q = $data['question'] ?? '';
    $o1 = $data['option1'] ?? '';
    $o2 = $data['option2'] ?? '';
    $o3 = $data['option3'] ?? '';
    $o4 = $data['option4'] ?? '';
    $ans = $data['correct_answer'] ?? null;

    if (!$q || !$o1 || !$o2 || !$o3 || !$o4) {
        echo json_encode(["status"=>false,"message"=>"All fields required"]);
        return;
    }

    // duplicate check
    $stmt = $conn->prepare("SELECT id FROM questions WHERE LOWER(question)=LOWER(?)");
    $stmt->bind_param("s", $q);
    $stmt->execute();
    $res = $stmt->get_result();

    if ($res->num_rows > 0) {
        echo json_encode(["status"=>false,"message"=>"Question exists"]);
        return;
    }

    
    $stmt = $conn->prepare("INSERT INTO questions (question, option1, option2, option3, option4, correct_answer) VALUES (?,?,?,?,?,?)");
    $stmt->bind_param("ssssss", $q, $o1, $o2, $o3, $o4, $ans);
    $stmt->execute();

    echo json_encode([
        "status"=>true,
        "message"=>"Question added",
        "data"=>["id"=>$stmt->insert_id]
    ]);
}

// ================= GET =================
function getQuestions() {
    global $conn;

    ensureQuestionLimitColumn();

    // 👉 limit lo
    $adminRes = $conn->query("SELECT question_limit FROM admin ORDER BY id ASC LIMIT 1");

    $limit = 10;

    if ($adminRes->num_rows > 0) {
        $row = $adminRes->fetch_assoc();
        if (!empty($row['question_limit'])) {
            $limit = $row['question_limit'];
        }
    }

    // 👉 ALL questions (limit frontend use karega)
    $res = $conn->query("SELECT * FROM questions ORDER BY id DESC");

    $data = [];

    while($row = $res->fetch_assoc()){
        $data[] = $row;
    }

    echo json_encode([
        "status"=>true,
        "question_limit"=>$limit,
        "data"=>$data
    ]);
}
// ================= UPDATE =================
function updateQuestion($id) {
    global $conn;
    $data = getBody();

    $stmt = $conn->prepare("
        UPDATE questions SET 
        question=?, option1=?, option2=?, option3=?, option4=?, correct_answer=? 
        WHERE id=?
    ");

    $stmt->bind_param(
        "ssssssi",
        $data['question'],
        $data['option1'],
        $data['option2'],
        $data['option3'],
        $data['option4'],
        $data['correct_answer'],
        $id
    );

    $stmt->execute();

    echo json_encode(["status"=>true,"message"=>"Updated"]);
}

// ================= DELETE =================
function deleteQuestion($id) {
    global $conn;

    $stmt = $conn->prepare("DELETE FROM questions WHERE id=?");
    $stmt->bind_param("i", $id);
    $stmt->execute();

    echo json_encode(["status"=>true,"message"=>"Deleted"]);
}

// ================= BULK INSERT =================
function bulkInsertQuestions() {
    global $conn;
    $data = getBody();

    // ✅ अगर single object आया है (admin panel)
    if (!isset($data['questions']) && isset($data['question'])) {
        $data['questions'] = [[
            "question" => $data['question'],
            "options" => [
                $data['option1'] ?? null,
                $data['option2'] ?? null,
                $data['option3'] ?? null,
                $data['option4'] ?? null
            ],
            "correct_answer" => $data['correct_answer'] ?? null
        ]];
    }

    // ❌ Invalid format
    if (!isset($data['questions']) || !is_array($data['questions'])) {
        echo json_encode(["status"=>false,"message"=>"Invalid format"]);
        return;
    }

    // Existing questions
    $existing = [];
    $res = $conn->query("SELECT question FROM questions");

    while($row = $res->fetch_assoc()){
        $existing[] = strtolower($row['question']);
    }

    $values = [];

    foreach ($data['questions'] as $q) {

        if (!isset($q['question']) || !isset($q['options']) || count($q['options']) != 4) {
            echo json_encode(["status"=>false,"message"=>"Each must have 4 options"]);
            return;
        }

        $qText = strtolower($q['question']);

        if (in_array($qText, $existing)) {
            echo json_encode(["status"=>false,"message"=>"Duplicate: ".$q['question']]);
            return;
        }
$correct = null;

if (isset($q['correct_answer']) && $q['correct_answer'] !== "") {

    $index = -1;

    // number case (1-4)
    if (is_numeric($q['correct_answer'])) {
        if (!in_array($q['correct_answer'], [1,2,3,4])) {
            echo json_encode(["status"=>false,"message"=>"Invalid correct answer"]);
            return;
        }
        $index = $q['correct_answer'] - 1;
    }

    // string case
    else {
        foreach ($q['options'] as $i => $opt) {
            if (strtolower(trim($opt)) == strtolower(trim($q['correct_answer']))) {
                $index = $i;
                break;
            }
        }

        if ($index === -1) {
            echo json_encode(["status"=>false,"message"=>"Correct answer must match options"]);
            return;
        }
    }

    // ✅ store actual answer text
    $correct = mysqli_real_escape_string($conn, $q['options'][$index]);
}

        // ✅ SQL injection safe (escape)
        $question = mysqli_real_escape_string($conn, $q['question']);
        $opt1 = mysqli_real_escape_string($conn, $q['options'][0]);
        $opt2 = mysqli_real_escape_string($conn, $q['options'][1]);
        $opt3 = mysqli_real_escape_string($conn, $q['options'][2]);
        $opt4 = mysqli_real_escape_string($conn, $q['options'][3]);

        $correctVal = $correct ? "'".$correct."'" : "NULL";

        $values[] = "('$question','$opt1','$opt2','$opt3','$opt4',$correctVal)";
        $existing[] = $qText;
    }

    $sql = "INSERT INTO questions 
    (question, option1, option2, option3, option4, correct_answer) 
    VALUES ".implode(",", $values);

    if ($conn->query($sql)) {
        echo json_encode(["status"=>true,"message"=>"Insert success"]);
    } else {
        echo json_encode(["status"=>false,"message"=>"DB Error"]);
    }
}