<?php

// get alle tasks for alle lists

    $servername = "localhost";
    $username = "root";
    $password = "";

    try {
        $conn = new PDO("mysql:host=$servername;dbname=todolist", $username, $password);
        // set the PDO error mode to exception
        $conn->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
    }
    catch(PDOException $e)
        {
       
        }

        $sql = 'SELECT * FROM tasks';

        $statement = $conn->prepare($sql);	

        $statement->execute();

        $lists = $statement->fetchAll(PDO::FETCH_CLASS);

        $responseText = json_encode($lists);

    	header("Content-Type: application/json");

    	echo $responseText;
?>