<!DOCTYPE html>
<html>
    <head>
        <title>David's Second-hand Bookstore - Login page</title>
        <meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
        <script type="text/javascript" src="http://ajax.aspnetcdn.com/ajax/jQuery/jquery-1.9.1.js"></script>
        
        <link rel="stylesheet" href="../styles/login_view.css">
        <script type="text/javascript" src="../js/validateObject.js"></script>

        <script type="text/javascript">
            
            $(document).ready(function() {
                $("#username").on("blur", function() {
                    var loginUsername = $("#username").val();
                    validateUtil.validateLoginUsernameField(loginUsername);
               });
                
               $("#password").on("blur", function() {
                    var loginPassword = $("#password").val();
                    validateUtil.validateLoginPasswordField(loginPassword);
               });
            });    

            // On form submit, revalidate the username and password fields on
            // this client side. If invalid, no reason to waste time sending
            // to apache server and interacting with the database.
            function loginValidation() {
                var ret = true;
                var loginUsername = $("#username").val();
                var result = validateUtil.validateLoginUsernameField(loginUsername);
                if (result === false) {
                    ret = false;
                }
                if (ret === true) {
                    var loginPassword = $("#password").val();
                    result = validateUtil.validateLoginPasswordField(loginPassword);
                    if (result === false) {
                        ret = false;
                    }
                }
                return ret;
            }
        </script>
        
        <style type="text/css">
           /* Example of overriding css rules coming from imported css file login_view.css */
           input:focus {
               border : 2px solid green;
           }
           
           input:hover {
                background-color: lightblue;
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
                        <td><input type="text" name="username" id ="username" maxlength="20" <?php echo 'value="' . $username . '"'?>></td>
                        <td></td>
                    </tr>
                    <tr>
                        <td><label for="password" id="password_label">Password:</label></td>
                        <td><input type="password" name="password" id ="password" maxlength="20"></td>
                        <td><a href="index.php?action=reset_password" id="forgotPassword">Forgot Password</a>
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
            
            <p id="checkit">
 <?php
            if ($loginFailed == true) {
                echo '<span id="loginFailed">Login Failed:</span> Please check your username and password and try again';
            }
            
            if ($newRegistration == true) {
                echo '<span id="newRegistration">Registration Successful: Please continue by logging in with your new username and password.</span>';
            }
  ?>
            </p>
            
            <h2>Become a new customer</h2>
            <p>If you would like to become a new customer, it is super easy to 
              <a href="index.php?action=show_registration_page" id="register_link">Register</a>.</p>
        </div>
    </body>
</html>
