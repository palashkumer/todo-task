<?php
require 'Db_connect.php';

if ($_SERVER["REQUEST_METHOD"] == "DELETE") {
    $taskId = isset($_GET['id']) ? $_GET['id'] : null;

    if ($taskId !== null && is_numeric($taskId)) {
        // Delete the user record from the database
        $result = mysqli_query($db_conn, "DELETE FROM tasks WHERE taskId='$taskId'");

        if ($result) {
            echo json_encode(["success" => "User Record Deleted Successfully"]);
        } else {
            echo json_encode(["error" => "Failed to Delete User Record"]);
        }
    } else {
        echo json_encode(["error" => "Invalid User ID"]);
    }
} else {
    echo json_encode(["error" => "Invalid Request Method"]);
}
