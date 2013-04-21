<!DOCTYPE html>
<html>
    <head>
        <title>David's Second-hand Bookstore - Forgot Password</title>
        <meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
        <script type="text/javascript" src="http://ajax.aspnetcdn.com/ajax/jQuery/jquery-1.9.1.js">
        </script>        
        <script type="text/javascript">
            function resetPasswordValidation() {
                // TODO: add validation
                return true;
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
            #error {
                font-weight : bold;
                color : red;
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

            <form name="resetPasswordForm" action="index.php" method="post" onsubmit="return resetPasswordValidation(this);">
                <table>
                    <tr>
                        <td><label for="username" id="username_label">Username:</label></td>
                        <td><input type="text" name="username" id ="username" <?php echo 'value="' . $suppliedUsername . '"'?>></td>
                    </tr>
                    <tr>
                        <td><label for="securitySelection" id="security_label">Security Question:</label></td>
                        <td><select id="securitySelection" name="securitySelection">
                                
<?php
  // It is important to populate the selections as the user made so they can more easily
  // determine what they got wrong.
  if ($suppliedSecurityQuestion != '') {
      if ($suppliedSecurityQuestion == 'Mother_Maiden_Name') {
          echo "<option selected='selected' value='Mother_Maiden_Name'>What is your mother\'s maiden name?</option>";
      }
      else {
          echo "<option value='Mother_Maiden_Name'>What is your mother\'s maiden name?</option>";
      }
      if ($suppliedSecurityQuestion == 'City_Born') {
          echo "<option selected='selected' value='City_Born'>What city were you born in?</option>";
      }
      else {
          echo "<option value='City_Born'>What city were you born in?</option>";
      }
      if ($suppliedSecurityQuestion == 'Favorite_Color') {
          echo "<option selected='selected' value='Favorite_Color'>What is your favorite color?</option>";
      }
      else {
          echo "<option value='Favorite_Color'>What is your favorite color?</option>";
      }
  }
  else {
          echo "<option value='Mother_Maiden_Name'>What is your mother\'s maiden name?</option>";
          echo "<option value='City_Born'>What city were you born in?</option>";
          echo "<option value='Favorite_Color'>What is your favorite color?</option>";
      }
?>                              
                              
                            </select>
                        </td>
                    </tr>
                    <tr>
                        <td><label for="securityResponse" id="securityResponse_label">Security Answer:</label></td>
                        <td><input type="text" id="securityResponse" name="securityResponse" <?php echo 'value="' . $suppliedSecurityAnswer . '"'?>></td>
                    </tr>
                </table>
                
                <input type="hidden" name="action" value="process_reset_password"/>
            
                <button type="submit" id="resetPasswordSubmit_button"> Submit</button>
            </form>    
        </div>
        
        <div id="validation_error_output_div">
<?php
    if ($resetPasswordError == true) {
        echo '<p id="error">The provided username, security question and answer did not match any record on file.</p>';
    }
?>
        </div>        
        
    </body>
</html>
