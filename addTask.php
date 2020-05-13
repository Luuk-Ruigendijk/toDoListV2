<?php

//echo "this is an echo from the server...";
    echo $_GET['theName'];
    echo $_GET['listsId'];

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
    $listsId = $_GET['listsId'];

    $sql = "INSERT INTO tasks (taskname, listsId) VALUES (:theName, :listsId)";

    $statement = $conn->prepare($sql);
    $statement->bindParam(':theName', $theName, PDO::PARAM_STR, 12);
    $statement->bindParam(':listsId', $listsId, PDO::PARAM_STR, 12);

    $success = $statement->execute();

	if ($success) {
    	echo "New record created successfully";
	} else {
    	echo "Error: " . $sql . "<br>" . $conn->error;
	}
?>