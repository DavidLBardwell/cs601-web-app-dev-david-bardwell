<?php

/* Process the registration form for a new customer */

/* Create a new customer record in the database and
 * create a new bookstore security record for the provided
 * username and password.
 * TODO: more thorough validation
 */
    
    require('database.php');
    
     // Get the posted fields from the HTML form
    $username = $_POST['username'];
    $password = $_POST['password'];
    $firstName = $_POST['firstName'];
    $lastName = $_POST['lastName'];
    $address1 = $_POST['address1'];
    $address2 = $_POST['address2'];
    $city = $_POST['city'];
    $state = $_POST['state'];
    $zipcode = $_POST['zipcode'];
    $email = $_POST['email'];

    $databaseConnection = Database::getDB();

    // create a row for the bookstore security and customer table
    // make sure to make this atomic.
    try {
        $databaseConnection->beginTransaction();
        $insertSecurityStatement = "INSERT INTO bookstore_security values(null, '" . $username . "', '" . $password . "', null)";
        $affectedRows = $databaseConnection->exec($insertSecurityStatement);
        
        $insertNewCustomer = "INSERT INTO customers values(null, 1, '" . $firstName . "', '" . $lastName . "', '" . $address1 . "', '" . $address2 . "', '" . $city . "', '" . $state . "', '" . $zipcode . "', '" . $email . "', null, 'foo', 'bar')";
        $affectedRows = $databaseConnection->exec($insertNewCustomer);
        $databaseConnection->commit();
        
    }
    catch(PDOException $e) {  
        echo "error: " + $e->getMessage();  
        $databaseConnection->rollBack();
    }
    
    try {
        // The code below mutually links the customers table and the bookstore_security table
        // for referential integrity.

        // get the security key for the new user and update the customer table with it
        $sec_record = $databaseConnection->query("select security_key from bookstore_security where username = '" . $username . "'");
        foreach ($sec_record as $rec) {
            $security_key = $rec['security_key'];
        }
        
        // update the new customer with the security key
        $databaseConnection->exec("UPDATE customers SET security_key = " . $security_key . " WHERE first_name = '" . $firstName . "' AND last_name = '" . $lastName . "'");
        
        // get the customer key for the new customer record
        $customer_record = $databaseConnection->query("select customer_key from customers where first_name = '" . $firstName . "' AND last_name = '" . $lastName . "'");
        foreach ($customer_record as $rec) {
            $customer_key = $rec['customer_key'];
        }

        // update the new bookstore_security row with the customer key
        $databaseConnection->exec("update bookstore_security set customer_key = " . $customer_key . " where security_key = " . $security_key);
    }
    catch(PDOException $e) {  
        echo "error: " + $e->getMessage();  
    }    
    

?>
