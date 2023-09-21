<?php
require 'Db_connect.php';

class TaskCreate
{
    private $db_conn;

    public function __construct($db_conn)
    {
        $this->db_conn = $db_conn;
    }

    public function createTask($userpostdata)
    {
        // Extract user data from JSON
        $taskName = $userpostdata->taskName;
        $taskDescription = $userpostdata->taskDescription;
        $dueDate = $userpostdata->dueDate;
        $status = $userpostdata->status;
        $priority = $userpostdata->priority;

        // Insert the task data into the database
        $result = mysqli_query($this->db_conn, "INSERT INTO tasks (taskName, taskDescription, dueDate, status, priority) 
            VALUES('$taskName', '$taskDescription', '$dueDate', '$status', '$priority')");

        if ($result) {
            return ["success" => "Task Added Successfully"];
        } else {
            return ["error" => "Failed to Add Task"];
        }
    }
}

if ($_SERVER["REQUEST_METHOD"] == "POST") {
    // Get the JSON data from the request body
    $userpostdata = json_decode(file_get_contents("php://input"));

    // Create an instance of TaskCreate and pass the database connection
    $taskCreate = new TaskCreate($db_conn);

    // Call the createTask method to create a new task
    $response = $taskCreate->createTask($userpostdata);

    // Send the response as JSON
    echo json_encode($response);
} else {
    echo json_encode(["error" => "Invalid Request Method"]);
}
