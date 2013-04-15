<?php

/*
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */
?>

<!DOCTYPE html>
<html>
    <head>
        <title>David's Second-hand Bookstore - Login page</title>
        <meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
        
        <script type="text/javascript">
            function loginValidation() {
                //window.document.location.href="main.php";
                // client side validation of login before continuing
                var checkit = document.getElementById('checkit');
                checkit.innerHTML = "Invalid username or password";
                return true;
            }
        </script>
        
        <style type="text/css">
            h1#title {
                font-weight: bold;
                text-align: center;
                color : green;
            }
            
            label#username_label, label#password_label {
                font-weight : bold;
                color : green;
            }    
            button {
                font-weight : bold;
                font-size: 16px;
            }
            
            button:hover {
                color : red;
            }
            
            a {
                color : green;
                font-weight : bold;
            }
            
            a:hover {
                color : red;
            }
            
        </style>
    </head>
    <body>
        <div>
            <h1 id="title">Welcome to David's Second-hand Bookstore</h1>
            
            <h2>Please login</h2>
            
            <form name="login" action="index.php" method="post" onsubmit="return loginValidation(this);">
                <table>
                    <tr>
                        <td><label for="username" id="username_label">Username:</label></td>
                        <td><input type="text" name="username" id ="username"></td>
                        <td></td>
                    </tr>
                    <tr>
                        <td><label for="password" id="password_label">Password:</label></td>
                        <td><input type="password" name="password" id ="password"></td>
                        <td><a href="forgotpassword.php" id="forgotPassword">Forgot Password</a>
                    </tr>
                    <tr>
                        <td><input type="hidden" name="action" value="login_requested"/></td>
                        <td></td>
                        <td></td>
                    </tr>
                </table>
            
                <button value="Login" type="submit">Login</button>
            </form>
            
            <br/>
            
            <p id="checkit">  </p>
            
            <h2>Become a new customer</h2>
            <p>If you would like to become a new customer, it is super easy to 
              <a href="index.php?action=show_registration_page" id="register_link">Register</a>.</p>
        </div>
    </body>
</html>
