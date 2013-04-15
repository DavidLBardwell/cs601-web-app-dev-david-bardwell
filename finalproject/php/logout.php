<!DOCTYPE html>

<html>
    <head>
        <title>David's Second-hand Bookstore - Log out</title>
        <meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
        
        <style type="text/css">
            h1 {
                color : green;
                text-align: center;                
            }
        </style>
    </head>
    <body>
        <div>
            <h1>David's Second-hand Bookstore - Log out</h1>
            
            <p>You are now logged out. Thank you for your business.</p>
        </div>
    </body>
</html>

<?php
    $_SESSION = array();  // clear session data from memory
    session_start();      // needs to get current session context for clean up to work correctly??
    session_destroy();    // clean up the session ID
?>
