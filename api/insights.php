<?php

require_once "db.php";
require_once "upload_helper.php";

// ---------------- helpers ----------------
function insight_slugify($text) {
    $text = strtolower(trim($text));
    $text = preg_replace('/[^a-z0-9]+/', '-', $text);
    $text = trim($text, '-');
    return $text ?: 'insight';
}

function insight_unique_slug($base) {
    global $conn;
    $base = insight_slugify($base);
    $slug = $base;
    $i = 2;
    while (true) {
        $stmt = $conn->prepare("SELECT id FROM insights WHERE slug = ?");
        $stmt->bind_param("s", $slug);
        $stmt->execute();
        if ($stmt->get_result()->num_rows === 0) return $slug;
        $slug = $base . '-' . $i++;
    }
}

// ---------------- GET ALL ----------------
function getAllInsights() {
    global $conn;
    $res = $conn->query("SELECT id, slug, title, excerpt, content, author, category,
        read_time AS readTime, tags, image, images, date, created_at
        FROM insights ORDER BY id DESC");
    if (!$res) {
        echo json_encode(["status" => false, "message" => "Fetch Error: " . $conn->error]);
        return;
    }
    echo json_encode(["status" => true, "data" => $res->fetch_all(MYSQLI_ASSOC)]);
}

// ---------------- GET ONE (by numeric id or slug) ----------------
function getInsight($key) {
    global $conn;
    if (ctype_digit((string)$key)) {
        $stmt = $conn->prepare("SELECT id, slug, title, excerpt, content, author, category,
            read_time AS readTime, tags, image, images, date, created_at FROM insights WHERE id = ?");
        $stmt->bind_param("i", $key);
    } else {
        $stmt = $conn->prepare("SELECT id, slug, title, excerpt, content, author, category,
            read_time AS readTime, tags, image, images, date, created_at FROM insights WHERE slug = ?");
        $stmt->bind_param("s", $key);
    }
    $stmt->execute();
    $row = $stmt->get_result()->fetch_assoc();
    if (!$row) {
        echo json_encode(["status" => false, "message" => "Insight not found"]);
        return;
    }
    echo json_encode(["status" => true, "data" => $row]);
}

// ---------------- CREATE ----------------
function addInsight() {
    global $conn;
    $d = read_input();

    $title    = trim($d['title'] ?? '');
    $excerpt  = trim($d['excerpt'] ?? $d['description'] ?? '');
    $content  = trim($d['content'] ?? '');
    $author   = trim($d['author'] ?? '');
    $category = trim($d['category'] ?? '');
    $readTime = trim($d['readTime'] ?? $d['read_time'] ?? '');
    $tags     = trim($d['tags'] ?? '');
    $image    = trim($d['image'] ?? '');
    $date     = trim($d['date'] ?? '') ?: date("F j, Y");

    if (!$title) {
        echo json_encode(["status" => false, "message" => "Title is required"]);
        return;
    }
    $slug = !empty($d['slug']) ? insight_unique_slug($d['slug']) : insight_unique_slug($title);

    // Uploaded images (multipart) or seeded images array (JSON)
    $imgs = save_uploaded_images('images', 'insights');
    if (!$imgs && !empty($d['images']) && is_array($d['images'])) $imgs = $d['images'];
    $imagesJson = json_encode(array_values($imgs));

    $stmt = $conn->prepare("INSERT INTO insights
        (slug, title, excerpt, content, author, category, read_time, tags, image, images, date)
        VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)");
    $stmt->bind_param("sssssssssss",
        $slug, $title, $excerpt, $content, $author, $category, $readTime, $tags, $image, $imagesJson, $date);

    if ($stmt->execute()) {
        echo json_encode(["status" => true, "message" => "Insight added successfully",
            "data" => ["id" => $stmt->insert_id, "slug" => $slug]]);
    } else {
        echo json_encode(["status" => false, "message" => "Insert Error: " . $stmt->error]);
    }
}

// ---------------- UPDATE ----------------
function updateInsight($id) {
    global $conn;
    $d = read_input();

    $title    = trim($d['title'] ?? '');
    $excerpt  = trim($d['excerpt'] ?? $d['description'] ?? '');
    $content  = trim($d['content'] ?? '');
    $author   = trim($d['author'] ?? '');
    $category = trim($d['category'] ?? '');
    $readTime = trim($d['readTime'] ?? $d['read_time'] ?? '');
    $tags     = trim($d['tags'] ?? '');

    if (!$title) {
        echo json_encode(["status" => false, "message" => "Title is required"]);
        return;
    }

    // Only touch images when the request actually deals with them.
    $touchImages = isset($_FILES['images']) || isset($d['existing_images']);

    if ($touchImages) {
        $imagesJson = json_encode(sync_images($conn, 'insights', $id, $d, 'images', 'insights'));
        $stmt = $conn->prepare("UPDATE insights SET
            title = ?, excerpt = ?, content = ?, author = ?, category = ?, read_time = ?, tags = ?, images = ?
            WHERE id = ?");
        $stmt->bind_param("ssssssssi",
            $title, $excerpt, $content, $author, $category, $readTime, $tags, $imagesJson, $id);
    } else {
        $stmt = $conn->prepare("UPDATE insights SET
            title = ?, excerpt = ?, content = ?, author = ?, category = ?, read_time = ?, tags = ?
            WHERE id = ?");
        $stmt->bind_param("sssssssi",
            $title, $excerpt, $content, $author, $category, $readTime, $tags, $id);
    }

    if ($stmt->execute()) {
        echo json_encode(["status" => true, "message" => "Insight updated successfully"]);
    } else {
        echo json_encode(["status" => false, "message" => "Update Error: " . $stmt->error]);
    }
}

// ---------------- DELETE ----------------
function deleteInsight($id) {
    global $conn;
    // Remove the record's image files from disk first.
    delete_image_files(get_record_images($conn, 'insights', $id));

    $stmt = $conn->prepare("DELETE FROM insights WHERE id = ?");
    $stmt->bind_param("i", $id);
    if ($stmt->execute()) {
        echo json_encode(["status" => true, "message" => "Insight deleted successfully"]);
    } else {
        echo json_encode(["status" => false, "message" => "Delete Error: " . $stmt->error]);
    }
}
