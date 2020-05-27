<?php

//echo "this is an echo from the server...";
    echo $_GET['theName'];
    echo $_GET['id'];

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
    $theName = $_GET['theName'];
    $id = $_GET['id'];

    $sql = "UPDATE tasks SET taskname = :theName WHERE id = :id";

    $statement = $conn->prepare($sql);
    $statement->bindParam(':theName', $theName, PDO::PARAM_STR, 12);
    $statement->bindParam(':id', $id, PDO::PARAM_STR, 12);

    $success = $statement->execute();

    if ($success) {
        echo '{"message" : "New record created successfully"}';
    } else {
        echo '{"message" : "Error: " . $sql . "<br>" . $conn->error}';
    }
?>