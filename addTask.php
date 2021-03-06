<?php

//echo "this is an echo from the server...";
    echo $_GET['theName'];
    echo $_GET['listsId'];
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
    
    $theName = $_GET['theName'];
    $listsId = $_GET['listsId'];
    $theTime = $_GET['theTime'];

    $sql = "INSERT INTO tasks (taskname, listsId, requiredTime) VALUES (:theName, :listsId, :theTime)";

    $statement = $conn->prepare($sql);
    $statement->bindParam(':theName', $theName, PDO::PARAM_STR, 12);
    $statement->bindParam(':listsId', $listsId, PDO::PARAM_STR, 12);
    $statement->bindParam(':theTime', $theTime, PDO::PARAM_STR, 12);

    $success = $statement->execute();

	if ($success) {
    	echo "New record created successfully";
	} else {
    	echo "Error: " . $sql . "<br>" . $conn->error;
	}
?>