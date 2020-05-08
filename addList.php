<?php

//echo "this is an echo from the server...";
    echo $_GET['theName'];

    $servername = "localhost";
    $username = "root";
    $password = "";

    try {
        $conn = new PDO("mysql:host=$servername;dbname=todolist", $username, $password);	//maak een supermarkt
        // set the PDO error mode to exception
        $conn->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
        //echo "Connected successfully";
    }
    catch(PDOException $e){
        //echo "Connection failed: " . $e->getMessage();
    }
    $theName = $_GET['theName'];

    $sql = "INSERT INTO lists (listname) VALUES (:theName)";

    $statement = $conn->prepare($sql);
    $statement->bindParam(':theName', $theName, PDO::PARAM_STR, 12);

    $success = $statement->execute();

	if ($success) {
    	echo "New record created successfully";
	} else {
    	echo "Error: " . $sql . "<br>" . $conn->error;
	}
?>