<?php

//echo "this is an echo from the server...";
    echo $_GET['id'];
    echo $_GET['status'];

    $servername = "localhost";
    $username = "root";
    $password = "";

    try {
        $conn = new PDO("mysql:host=$servername;dbname=todolist", $username, $password);
        // set the PDO error mode to exception
        $conn->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
    }
    catch(PDOException $e){
        
    }
    $id = $_GET['id'];
    $status = $_GET['status'];

    $sql = "UPDATE tasks SET status = :status WHERE id = :id";

    $statement = $conn->prepare($sql);
    $statement->bindParam(':id', $id, PDO::PARAM_STR, 12);
    $statement->bindParam(':status', $status, PDO::PARAM_STR, 12);

    $success = $statement->execute();

    if ($success) {
        echo '{"message" : "New record created successfully"}';
    } else {
        echo '{"message" : "Error: " . $sql . "<br>" . $conn->error}';
    }
?>