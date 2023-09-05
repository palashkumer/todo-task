<?php
require 'Db_connect.php';

if (isset($_GET['id']) && is_numeric($_GET['id'])) {
    $json_array = array();
    $taskId     = $_GET['id'];

    $getTaskRow = mysqli_query($db_conn, "SELECT * FROM tasks WHERE taskId='$taskId'");
    if ($taskRow = mysqli_fetch_array($getTaskRow)) {
        $json_array['rowTaskData'] = array(
            'id'              => $taskRow['taskId'],
            'taskName'        => $taskRow['taskName'],
            'taskDescription' => $taskRow['taskDescription'],
            'dueDate'         => $taskRow['dueDate'],
            'status'          => $taskRow['status'],
            'priority'        => $taskRow['priority'],
        );
        echo json_encode($json_array['rowTaskData']);
    } else {
        echo json_encode(array('result' => 'Task not found'));
    }
} else {
    $allTasks = mysqli_query($db_conn, 'SELECT * FROM tasks');
    if (mysqli_num_rows($allTasks) > 0) {
        $json_array['taskData'] = array();
        while ($row = mysqli_fetch_array($allTasks)) {
            $json_array['taskData'][] = array(
                'id'              => $row['taskId'],
                'taskName'        => $row['taskName'],
                'taskDescription' => $row['taskDescription'],
                'dueDate'         => $row['dueDate'],
                'status'          => $row['status'],
                'priority'        => $row['priority'],
            );
        }
        echo json_encode($json_array['taskData']);
    } else {
        echo json_encode(array('result' => 'No Task Data Found'));
    }
}
