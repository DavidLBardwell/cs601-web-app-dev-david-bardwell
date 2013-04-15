<!DOCTYPE html>
<html>
    <head>
        <title>David's Second-hand Bookstore - Forgot Password</title>
        <meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
        
        <script type="text/javascript">
            function navigateToLogin() {
                window.document.location.href="index.php";
            }
        </script>
        
        <style type="text/css">
            h1 {
                color : green;
                text-align: center;
            }
            
            label {
                font-weight: bold;
                color : green;
            }
            button {
                font-weight : bold;
                font-size : 16px;
            }
        </style>
    </head>
    <body>
        <div>
            <h1>David's Second-hand Bookstore - Forgot Password</h1>
            
            <p>This page will allow you to have a new password generated for you. 
               You must know your username and be able to provide the correct answer to
               a security question. Once a valid username and security question is provided,
               a new password will be e-mailed to the account on file. You may then
               change the password by logging in and going to administer account.</p>
            
            <table>
                <tr>
                    <td><label for="username" id="username_label">Username:</label></td>
                    <td><input type="text" name="username" id ="username"></td>
                </tr>
                <tr>
                    <td><label for="securitySelection" id="security_label">Security Question:</label></td>
                    <td><select id="securitySelection">
                          <option value="foo">select and answer a security question correctly</option>
                          <option value="1">What is your mother's maiden name?</option>
                          <option value="2">What City were you born in?</option>
                        </select>
                    </td>
                </tr>
                <tr>
                    <td><label for="securityResponse" id="securityResponse_label">Security Answer:</label></td>
                    <td><input type="text" id="securityResponse"></td>
                </tr>
            </table>
            
            <button id="resetPasswordSubmit_button" onclick="navigateToLogin();"> Submit</button>
        </div>
    </body>
</html>
