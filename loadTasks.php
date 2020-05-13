<?php

    //echo "this is an echo from the server...";
    //echo $_GET['name'];

	echo $_GET['listsId'];

    $servername = "localhost";
    $username = "root";
    $password = "";

    try {
        $conn = new PDO("mysql:host=$servername;dbname=todolist", $username, $password);
        // set the PDO error mode to exception
        $conn->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
        //echo "Connected successfully";
        }
    catch(PDOException $e)
        {
        //echo "Connection failed: " . $e->getMessage();
        }

        $listsId = $_GET['listsId'];

        $sql = 'SELECT * FROM tasks';

        $statement = $conn->prepare($sql);	

        $statement->bindParam(':listsId', $listsId, PDO::PARAM_STR, 12);

        $statement->execute();

        $lists = $statement->fetchAll(PDO::FETCH_CLASS);

        /*foreach($lists as $list){
        	$task1 = (object) array('name' => 'bar');
        	$task2 = (object) array('name' => 'foe');
        	$list->tasks = [$task1, $task2];
        }*/

        $responseText = json_encode($lists);

    	header("Content-Type: application/json");

    	echo $responseText;
?>