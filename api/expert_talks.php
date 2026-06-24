<?php

require_once "db.php";
require_once "upload_helper.php";

// ---------------- helpers ----------------
function talk_slugify($text) {
    $text = strtolower(trim($text));
    $text = preg_replace('/[^a-z0-9]+/', '-', $text);
    $text = trim($text, '-');
    return $text ?: 'expert-talk';
}

function talk_unique_slug($base) {
    global $conn;
    $base = talk_slugify($base);
    $slug = $base;
    $i = 2;
    while (true) {
        $stmt = $conn->prepare("SELECT id FROM expert_talks WHERE slug = ?");
        $stmt->bind_param("s", $slug);
        $stmt->execute();
        if ($stmt->get_result()->num_rows === 0) return $slug;
        $slug = $base . '-' . $i++;
    }
}

// ---------------- GET ALL ----------------
function getAllExpertTalks() {
    global $conn;
    $res = $conn->query("SELECT id, slug, episode, title, description, content, speaker,
        designation, topic, duration, image, images, date, created_at
        FROM expert_talks ORDER BY id DESC");
    if (!$res) {
        echo json_encode(["status" => false, "message" => "Fetch Error: " . $conn->error]);
        return;
    }
    echo json_encode(["status" => true, "data" => $res->fetch_all(MYSQLI_ASSOC)]);
}

// ---------------- GET ONE (by numeric id or slug) ----------------
function getExpertTalk($key) {
    global $conn;
    if (ctype_digit((string)$key)) {
        $stmt = $conn->prepare("SELECT id, slug, episode, title, description, content, speaker,
            designation, topic, duration, image, images, date, created_at FROM expert_talks WHERE id = ?");
        $stmt->bind_param("i", $key);
    } else {
        $stmt = $conn->prepare("SELECT id, slug, episode, title, description, content, speaker,
            designation, topic, duration, image, images, date, created_at FROM expert_talks WHERE slug = ?");
        $stmt->bind_param("s", $key);
    }
    $stmt->execute();
    $row = $stmt->get_result()->fetch_assoc();
    if (!$row) {
        echo json_encode(["status" => false, "message" => "Expert Talk not found"]);
        return;
    }
    echo json_encode(["status" => true, "data" => $row]);
}

// ---------------- CREATE ----------------
function addExpertTalk() {
    global $conn;
    $d = read_input();

    $episode     = trim($d['episode'] ?? '');
    $title       = trim($d['title'] ?? '');
    $description = trim($d['description'] ?? '');
    $content     = trim($d['content'] ?? '');
    $speaker     = trim($d['speaker'] ?? '');
    $designation = trim($d['designation'] ?? '');
    $topic       = trim($d['topic'] ?? '');
    $duration    = trim($d['duration'] ?? '');
    $image       = trim($d['image'] ?? '');
    $date        = trim($d['date'] ?? '') ?: date("F j, Y");

    if (!$title) {
        echo json_encode(["status" => false, "message" => "Title is required"]);
        return;
    }
    $slug = !empty($d['slug']) ? talk_unique_slug($d['slug']) : talk_unique_slug($title);

    $imgs = save_uploaded_images('images', 'expert_talks');
    if (!$imgs && !empty($d['images']) && is_array($d['images'])) $imgs = $d['images'];
    $imagesJson = json_encode(array_values($imgs));

    $stmt = $conn->prepare("INSERT INTO expert_talks
        (slug, episode, title, description, content, speaker, designation, topic, duration, image, images, date)
        VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)");
    $stmt->bind_param("ssssssssssss",
        $slug, $episode, $title, $description, $content, $speaker, $designation, $topic, $duration, $image, $imagesJson, $date);

    if ($stmt->execute()) {
        echo json_encode(["status" => true, "message" => "Expert Talk added successfully",
            "data" => ["id" => $stmt->insert_id, "slug" => $slug]]);
    } else {
        echo json_encode(["status" => false, "message" => "Insert Error: " . $stmt->error]);
    }
}

// ---------------- UPDATE ----------------
function updateExpertTalk($id) {
    global $conn;
    $d = read_input();

    $episode     = trim($d['episode'] ?? '');
    $title       = trim($d['title'] ?? '');
    $description = trim($d['description'] ?? '');
    $content     = trim($d['content'] ?? '');
    $speaker     = trim($d['speaker'] ?? '');
    $designation = trim($d['designation'] ?? '');
    $topic       = trim($d['topic'] ?? '');
    $duration    = trim($d['duration'] ?? '');

    if (!$title) {
        echo json_encode(["status" => false, "message" => "Title is required"]);
        return;
    }

    $touchImages = isset($_FILES['images']) || isset($d['existing_images']);

    if ($touchImages) {
        $imagesJson = json_encode(sync_images($conn, 'expert_talks', $id, $d, 'images', 'expert_talks'));
        $stmt = $conn->prepare("UPDATE expert_talks SET
            episode = ?, title = ?, description = ?, content = ?, speaker = ?,
            designation = ?, topic = ?, duration = ?, images = ? WHERE id = ?");
        $stmt->bind_param("sssssssssi",
            $episode, $title, $description, $content, $speaker, $designation, $topic, $duration, $imagesJson, $id);
    } else {
        $stmt = $conn->prepare("UPDATE expert_talks SET
            episode = ?, title = ?, description = ?, content = ?, speaker = ?,
            designation = ?, topic = ?, duration = ? WHERE id = ?");
        $stmt->bind_param("ssssssssi",
            $episode, $title, $description, $content, $speaker, $designation, $topic, $duration, $id);
    }

    if ($stmt->execute()) {
        echo json_encode(["status" => true, "message" => "Expert Talk updated successfully"]);
    } else {
        echo json_encode(["status" => false, "message" => "Update Error: " . $stmt->error]);
    }
}

// ---------------- DELETE ----------------
function deleteExpertTalk($id) {
    global $conn;
    // Remove the record's image files from disk first.
    delete_image_files(get_record_images($conn, 'expert_talks', $id));

    $stmt = $conn->prepare("DELETE FROM expert_talks WHERE id = ?");
    $stmt->bind_param("i", $id);
    if ($stmt->execute()) {
        echo json_encode(["status" => true, "message" => "Expert Talk deleted successfully"]);
    } else {
        echo json_encode(["status" => false, "message" => "Delete Error: " . $stmt->error]);
    }
}
