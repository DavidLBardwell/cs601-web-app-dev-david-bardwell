<?php

    require('database.php');
    
    if (empty($_SESSION)) {
        session_start();  // do I need to keep doing this???
    }    
    $sessionid = session_id();
    
    
    // post the transaction - currently hard-coded just to get the implementation started
    try {
        // create the transaction summary record, and then details for each book purchased
        $databaseConnection = Database::getDB();
        $databaseConnection->beginTransaction();
        
        $customer = $_SESSION['cart']['KEY-1']['customer_key'];
        $amount = 9.50;
        
        $insertSummary = "INSERT into transaction_summary values(null, " . $customer . ", null, " . $amount . ", 'VISA', '2nd Day Shipping')";
        $databaseConnection->exec($insertSummary);
        
        $books = $_SESSION['cart'];
        
        foreach ($books as $book) {
            $check_book_key = $book['book_key'];
            $check_customer_key = $book['customer_key'];
            $check_title = $book['title'];
            $check_author = $book['author'];
        }
        $databaseConnection->commit();
        
        
        
        
    }
    catch (PDOException $e) {
        echo 'error ' . $e;
        
    }    


?>
