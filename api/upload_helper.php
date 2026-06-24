<?php

// Reads request body whether it's multipart/form-data ($_POST) or raw JSON.
function read_input() {
    if (!empty($_POST)) return $_POST;
    $json = json_decode(file_get_contents("php://input"), true);
    return is_array($json) ? $json : [];
}

// Saves uploaded files from $_FILES[$field] (single or multiple) into
// /uploads/$subdir and returns an array of relative web paths.
function save_uploaded_images($field, $subdir) {
    $saved = [];
    if (empty($_FILES[$field])) return $saved;

    $allowed = ['jpg', 'jpeg', 'png', 'webp', 'gif', 'avif'];
    $dir = __DIR__ . "/../uploads/" . $subdir . "/";
    if (!is_dir($dir)) mkdir($dir, 0777, true);

    $f = $_FILES[$field];
    $names = is_array($f['name'])     ? $f['name']     : [$f['name']];
    $tmps  = is_array($f['tmp_name']) ? $f['tmp_name'] : [$f['tmp_name']];
    $errs  = is_array($f['error'])    ? $f['error']    : [$f['error']];

    foreach ($names as $i => $name) {
        if (($errs[$i] ?? UPLOAD_ERR_NO_FILE) !== UPLOAD_ERR_OK) continue;
        $ext = strtolower(pathinfo($name, PATHINFO_EXTENSION));
        if (!in_array($ext, $allowed)) continue;
        $fname = uniqid('img_', true) . '.' . $ext;
        if (move_uploaded_file($tmps[$i], $dir . $fname)) {
            $saved[] = "uploads/" . $subdir . "/" . $fname;
        }
    }
    return $saved;
}

// Final image list for an update: kept existing (from JSON field) + new uploads.
function merge_images($d, $field, $subdir) {
    $existing = [];
    if (!empty($d['existing_images'])) {
        $decoded = json_decode($d['existing_images'], true);
        if (is_array($decoded)) $existing = $decoded;
    }
    $new = save_uploaded_images($field, $subdir);
    return array_values(array_merge($existing, $new));
}

// Deletes image files from disk given their stored relative paths.
function delete_image_files($paths) {
    if (!is_array($paths)) return;
    foreach ($paths as $p) {
        if (!$p || preg_match('#^https?://#i', $p)) continue; // skip empty / external URLs
        $full = __DIR__ . "/../" . ltrim($p, "/");
        if (is_file($full)) @unlink($full);
    }
}

// Reads the current images array stored for a record.
function get_record_images($conn, $table, $id) {
    $stmt = $conn->prepare("SELECT images FROM `$table` WHERE id = ?");
    $stmt->bind_param("i", $id);
    $stmt->execute();
    $row = $stmt->get_result()->fetch_assoc();
    if (!$row) return [];
    $dec = json_decode($row['images'] ?? '[]', true);
    return is_array($dec) ? $dec : [];
}

// Computes the final image list for an update AND removes files the user dropped.
function sync_images($conn, $table, $id, $d, $field, $subdir) {
    $old   = get_record_images($conn, $table, $id);
    $final = merge_images($d, $field, $subdir);   // kept + newly uploaded
    delete_image_files(array_values(array_diff($old, $final)));  // remove orphans
    return $final;
}
