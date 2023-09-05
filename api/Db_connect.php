<?php
$db_conn = mysqli_connect("localhost", "root", "", "reactphp");
if ($db_conn === false) {
    die("ERROR: Could Not Connect" . mysqli_connect_error());
}
