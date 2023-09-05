<?php
$db_conn = mysqli_connect("localhost", "root", "", "reactphp");
if ($db_conn === false) {
    die("ERROR: Could Not Connect" . mysqli_connect_error());
}

if ($_SERVER["REQUEST_METHOD"] == "PUT") {
    // Get the JSON data from the request body
    $taskUpdate = json_decode(file_get_contents("php://input"));

    // Extract task data from JSON
    $taskId = $taskUpdate->id;
    $taskName = $taskUpdate->taskName;
    $taskDescription = $taskUpdate->taskDescription;
    $dueDate = $taskUpdate->dueDate;
    $status = $taskUpdate->status;
    $priority = $taskUpdate->priority;

    // Update the task data in the database
    $updateData = mysqli_query($db_conn, "UPDATE tasks SET taskName='$taskName', taskDescription='$taskDescription', dueDate='$dueDate', status='$status', priority='$priority' WHERE taskId='$taskId'");

    if ($updateData) {
        echo json_encode(["success" => "Task Updated Successfully"]);
    } else {
        echo json_encode(["error" => "Failed to Update Task"]);
    }
} else {
    echo json_encode(["error" => "Invalid Request Method"]);
}
