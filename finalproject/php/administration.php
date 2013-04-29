<!DOCTYPE html>
<html>
    <head>
        <title>David's Second-hand Bookstore Administration</title>
        <meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
        <link rel="stylesheet" href="http://code.jquery.com/ui/1.10.2/themes/smoothness/jquery-ui.css">
        <script type="text/javascript" src="http://ajax.aspnetcdn.com/ajax/jQuery/jquery-1.9.1.js"></script>
        <script src="http://code.jquery.com/ui/1.10.2/jquery-ui.js"></script>
        
        <link rel="stylesheet" href="../styles/administration.css">
        <script type="text/javascript" src="../js/validateObject.js"></script>
        <script type="text/javascript" src="../js/administration.js"></script>    
        
        <style type="text/css">
            /* additional css customizations beyond the styles administration.css file.
               These will override the ones in administration.css if there is any
               overlap with rules. */
            
            
        </style>
    </head>
    
    <body>
        <div>
            <h1>David's Second-hand Bookstore - Administration</h1>
            
            <form name="adminform" action="index.php" method="post" onsubmit="return adminValidation(this);">
                
                <section id="deleteCustomer_section">
                    <h2>Delete my customer record from the book store</h2>
                    
                    <input type="checkbox" name="deleteCustomer" id="deleteCustomer">Check if you wish to be removed from the bookstore<br/>
                    
                </section>
                
                <section>
                    <h2>Change Password</h2>

                    <input type="checkbox" name="changePasswordIndicator" id="changePasswordIndicator">Check if you wish to change password<br/>
            
                    <p>Please provide your new password below. The password must be
                     at least 8 characters long with both alphabetic and at least one 
                     numeric character. Additionally, at least one alphabetic character
                     in the password must be upper and lower case.</p>
            
                    <table>
                        <tr>
                            <td><label for="password1" id="password_label1">New Password:</label></td>
                            <td><input type="password" name="password1" id ="password1" maxlength="20" disabled
                                       title="Please enter a minimum of 8 characters with at least one numeric digit and starting with a letter.">
                            </td>
                        </tr>
                        <tr>
                            <td><label for="password2" id="password_label2" maxlength="20">Confirm New Password:</label></td>
                            <td><input type="password" name="password2" id ="password2" disabled></td>
                        </tr>
                    </table>
                </section>

                <section>
                    <h2>Change Security Question or Answer</h2>
            
                    <input type="checkbox" id="changeSecurityQuestionIndicator" name="changeSecurityQuestionIndicator">Check if you wish to change security question<br/>
            
                    <table>
                        <tr>
                            <td><label for="securitySelection" id="security_label">Security Question:</label></td>
                            <td><select id="securitySelection" name="securitySelection">
                                  <option value="Mother_Maiden_Name">What is your mother's maiden name?</option>
                                  <option value="City_Born">What city were you born in?</option>
                                  <option value="Favorite_Color">What is your favorite color?</option>
                                </select>
                            </td>
                        </tr>
                        <tr>
                            <td><label for="securityResponse" id="securityResponse_label">Security Answer:</label></td>
                            <td><input type="text" id="securityResponse" name="securityResponse" disabled></td>
                        </tr>
                    </table>
                </section>
            
                <input type="hidden" name="action" value="process_admin_change"/>
            
                <button value="Submit" type="submit">Submit</button>
            </form>
        </div>
        <div id="validation_error_output_div">
            
        </div>
        
<script>
    $( document ).tooltip();
</script>
    </body>
</html>
