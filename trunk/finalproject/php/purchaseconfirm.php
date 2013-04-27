<!DOCTYPE html>
<html>
    <head>
        <title>David's Second-hand Bookstore - Purchase Confirmation Page</title>
        <meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
        <script type="text/javascript" src="http://ajax.aspnetcdn.com/ajax/jQuery/jquery-1.9.1.js">
        </script>
        
        <script type="text/javascript">
            // return to the main bookstore page
            $(document).ready(function() {
                $("#returnToMainPage").on("click", function() {
                    $.post(
                        "index.php",
                        {action : 'redisplay_bookstore_page'},
                        function(result) {
                            window.location = 'index.php?action=redisplay_bookstore_page';
                        }
                    );
                });
            });
        
        </script>

        <link rel="stylesheet" href="../styles/purchaseconfirm.css">

    </head>
    
    <body>
        <h1>Purchase confirmation</h1>
        
        <div id="header1">
            <p id="successful">Your purchase has been completed successfully.</p>
            <p id="mailBooksTo">The books will be mailed to:</p>
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
    
            echo "<div id='mailto'>";
            echo "<p class='name'>" . $firstName . " " . $lastName . "</p>";
            echo "<p class='address'>" . $address1 . "</p>";
            echo "<p class='address'>" . $address2 . "</p>";
            echo "<p class='address'>" . $city . ", " . $state . "  " . $zipcode . "</p>";
            echo "</div>";
            
            echo "<div id='delivery'>";
            echo "<p><span class='delivery'>The books will be delivered by " . $summary['delivery_method'] . " service.</span/</p>";
            echo "</div>";
?>
            
            <div id="return">
                <button id="returnToMainPage">Return to Main Page</button>
                
            </div>
            
        </div>
    </body>
</html>
