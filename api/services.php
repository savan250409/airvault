<?php
if ($_SERVER['REQUEST_METHOD'] === 'GET') {

    $result = $conn->query("SELECT * FROM services");
    $data = $result->fetch_all(MYSQLI_ASSOC);

    echo json_encode($data);
}
?>