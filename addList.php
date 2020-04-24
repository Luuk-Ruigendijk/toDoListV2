<?php

//echo "this is an echo from the server...";
//echo $_GET['name'];

$servername = "localhost";
$username = "root";
$password = "";

try {
    $conn = new PDO("mysql:host=$servername;dbname=todolist", $username, $password);	//maak een supermarkt
    // set the PDO error mode to exception
    $conn->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
    //echo "Connected successfully";
    }
catch(PDOException $e)
    {
    //echo "Connection failed: " . $e->getMessage();
    }

    $sql = "INSERT INTO lists (listname)
	VALUES ('')";

	if ($conn->query($sql) === TRUE) {
    	echo "New record created successfully";
	} else {
    	echo "Error: " . $sql . "<br>" . $conn->error;
	}
?>