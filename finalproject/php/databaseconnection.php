<?php

    function connectToDatabase() {
        try {      
            $host = "localhost";
            $dbname = "bookstore";
            $user = "scott";
            $pass = "tiger";
            
            // make the administration connection to the database once and
            // then re-use the administration connection for all database business
            // scott/tiger is our administration credentials for the bookstore database
            if (!isset($GLOBALS['databaseconnection'])) {
                $db = new PDO("mysql:host=$host;dbname=$dbname", $user, $pass);  
            }
            else {
                $db = $GLOBALS['databaseconnection'];
            }
        }
        catch(PDOException $e) {  
            echo "error: " + $e->getMessage();  
        }
        return $db;
    }    
?>
