<?php
require 'Db_connect.php';

if ($_SERVER["REQUEST_METHOD"] == "POST") {
    // Get the JSON data from the request body
    $userpostdata = json_decode(file_get_contents("php://input"));

    // Extract user data from JSON
    $taskName = $userpostdata->taskName;
    $taskDescription = $userpostdata->taskDescription;
    $dueDate = $userpostdata->dueDate;
    $status = $userpostdata->status;
    $priority = $userpostdata->priority;

    // Insert the task data into the database
    $result = mysqli_query($db_conn, "INSERT INTO tasks (taskName, taskDescription, dueDate, status, priority) 
        VALUES('$taskName', '$taskDescription', '$dueDate', '$status', '$priority')");

    if ($result) {
        echo json_encode(["success" => "Task Added Successfully"]);
    } else {
        echo json_encode(["error" => "Failed to Add Task"]);
    }
} else {
    echo json_encode(["error" => "Invalid Request Method"]);
}
