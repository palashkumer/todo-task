<?php
require 'Db_connect.php';

class TaskUpdate
{
    private $db_conn;

    public function __construct($db_conn)
    {
        $this->db_conn = $db_conn;
    }

    public function updateTask($taskUpdate)
    {
        if ($_SERVER["REQUEST_METHOD"] == "PUT") {
            // Extract task data from JSON
            $taskId = $taskUpdate->id;
            $taskName = $taskUpdate->taskName;
            $taskDescription = $taskUpdate->taskDescription;
            $dueDate = $taskUpdate->dueDate;
            $status = $taskUpdate->status;
            $priority = $taskUpdate->priority;

            // Update the task data in the database
            $updateData = mysqli_query(
                $this->db_conn,
                "UPDATE tasks SET taskName='$taskName', taskDescription='$taskDescription', dueDate='$dueDate', status='$status', priority='$priority' WHERE taskId='$taskId'"
            );

            if ($updateData) {
                return ["success" => "Task Updated Successfully"];
            } else {
                return ["error" => "Failed to Update Task"];
            }
        } else {
            return ["error" => "Invalid Request Method"];
        }
    }
}

if ($_SERVER["REQUEST_METHOD"] == "PUT") {
    // Get the JSON data from the request body
    $taskUpdate = json_decode(file_get_contents("php://input"));

    // Create an instance of TaskUpdate and pass the database connection
    $taskUpdateObj = new TaskUpdate($db_conn);

    // Call the updateTask method to update a task
    $response = $taskUpdateObj->updateTask($taskUpdate);

    // Send the response as JSON
    echo json_encode($response);
} else {
    echo json_encode(["error" => "Invalid Request Method"]);
}
