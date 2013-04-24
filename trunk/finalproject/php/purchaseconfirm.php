<?php

/*
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */
?>

<!DOCTYPE html>
<html>
    <head>
        <title>David's Second-hand Bookstore - Purchase Confirmation Page</title>
        <meta http-equiv="Content-Type" content="text/html; charset=UTF-8">

        
    </head>
    
    <body>
        <h2>Purchase confirmation</h2>
        
        <div>
            <p>Your purchase has been completed successfully. The books will be mailed to:</p>
<?php
    // retrive customer information 
    $customer = $_SESSION['customer'];
    $firstName = $customer->getFirstName();
    $lastName = $customer->getLastName();
    $address1 = $customer->getAddress1();
    $address2 = $customer->getAddress2();
    $city = $customer->getCity();
    $state = $customer->getState();
    $zipcode = $customer->getZipcode();

            echo "<p>" . $firstName . " " . $lastName . "</p>";
            echo "<p>" . $address1 . "</p>";
            echo "<p>" . $address2 . "</p>";
            echo "<p>" . $city . ", " . $state . "  " . $zipcode . "</p>";
?>
            
        </div>
    </body>
</html>    