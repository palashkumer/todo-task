<?php
require 'Db_connect.php';

class TaskDelete
{
    private $db_conn;

    public function __construct($db_conn)
    {
        $this->db_conn = $db_conn;
    }

    public function deleteTask($taskId)
    {
        if ($taskId !== null && is_numeric($taskId)) {
            // Delete the task record from the database
            $result = mysqli_query($this->db_conn, "DELETE FROM tasks WHERE taskId='$taskId'");

            if ($result) {
                return ["success" => "Task Deleted Successfully"];
            } else {
                return ["error" => "Failed to Delete Task"];
            }
        } else {
            return ["error" => "Invalid Task ID"];
        }
    }
}

if ($_SERVER["REQUEST_METHOD"] == "DELETE") {
    $taskId = isset($_GET['id']) ? $_GET['id'] : null;

    // Create an instance of TaskDelete and pass the database connection
    $taskDelete = new TaskDelete($db_conn);

    // Call the deleteTask method to delete a task
    $response = $taskDelete->deleteTask($taskId);

    // Send the response as JSON
    echo json_encode($response);
} else {
    echo json_encode(["error" => "Invalid Request Method"]);
}
