<?php

//echo "this is an echo from the server...";
    echo $_GET['id'];
    echo $_GET['theTime'];

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
    $theTime = $_GET['theTime'];

    $sql = "UPDATE tasks SET requiredTime = :theTime WHERE id = :id";

    $statement = $conn->prepare($sql);
    $statement->bindParam(':id', $id, PDO::PARAM_STR, 12);
    $statement->bindParam(':theTime', $theTime, PDO::PARAM_STR, 12);

    $success = $statement->execute();

    if ($success) {
        echo '{"message" : "New record created successfully"}';
    } else {
        echo '{"message" : "Error: " . $sql . "<br>" . $conn->error}';
    }
?>