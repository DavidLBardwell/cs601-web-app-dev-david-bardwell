<?php

    require('database.php');

    $username = $_POST['username'];
    $password = $_POST['password'];

    $databaseConnection = Database::getDB();
    
    $validLogin = validateUsernamePassword($databaseConnection, $username, $password);
    if ($validLogin == true) {
        // valid login - start session here
        $lifetime = 86400 * 14;  // 2 weeks in seconds
        session_set_cookie_params($lifetime, '/');
        session_start();
        $sessionid = session_id();
        
        // initialize cart
        if (empty($_SESSION['cart'])) {
            $_SESSION['cart'] = array();
        }
        $books = array();
        $books['KEY-1'] = array('book_key' => '1', 'customer_key' => '5', 'title' => 'A Tale of Two Cities', 'author' => 'Charles Dickens', 'price' => '$4.50');
        $books['KEY-2'] = array('book_key' => '2', 'customer_key' => '5', 'title' => 'Adventures of HuckleBerry Finn', 'author' => 'Mark Twain', 'price' => '$5.50');
        $_SESSION['cart']['KEY-1'] = $books['KEY-1'];
        $_SESSION['cart']['KEY-2'] = $books['KEY-2'];
        $checkit = $_SESSION['cart']['KEY-1']['customer_key'];
        
        include("main.php");
    }
    else {
        include("index.php");
    }
  
  
    // Validate the username and password provided - todo encrypt everything!!!
    function validateUsernamePassword($db, $user, $pass) {
        $queryStr = "select COUNT(*) rowcount from bookstore_security where username='" . $user . "' and password='" . $pass ."'";
        $records = $db->query($queryStr);
        $ret = false;
        foreach ($records as $rec) {
            $rowcount = $rec['rowcount'];
            if ($rowcount == 1) {
                $ret = true;
            }
        }
        return $ret;
    }
  
?>
