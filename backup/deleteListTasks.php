<?php

//echo "this is an echo from the server...";
    echo $_GET['idList'];

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
    $idList = $_GET['idList'];

    $sql = "DELETE FROM tasks WHERE listsId = :idList;";

    $statement = $conn->prepare($sql);
    $statement->bindParam(':idList', $idList, PDO::PARAM_STR, 12);

    $success = $statement->execute();

	if ($success) {
    	echo "New record created successfully";
	} else {
    	echo "Error: " . $sql . "<br>" . $conn->error;
	}
?>