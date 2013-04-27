<!DOCTYPE html>
<html>
    <head>
        <title>David's Second-hand Bookstore Administration</title>
        <meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
        <script type="text/javascript" src="http://ajax.aspnetcdn.com/ajax/jQuery/jquery-1.9.1.js">
        </script>
        <script type="text/javascript">
            
            $(document).ready(function() {
                $("#changePasswordIndicator").change(
                    function() { 
                        // Toggle the new password fields being enabled based on the user electing
                        // to change their password checkbox.
                        // A quick note on the next line of jQuery. I struggled to
                        // find this exact code and many other examples of how to
                        // do this were not working for me (including the text book).
                        var isChecked = $("#changePasswordIndicator").is(':checked');
                        
                        if (isChecked) {
                            $("#password1").attr("disabled", false);
                            $("#password2").attr("disabled", false);
                        }
                        else {
                            $("#password1").attr("disabled", true);
                            $("#password2").attr("disabled", true);                            
                        }
                    }    
                );

                // As an audit measure, make sure the user has made their intentions clear
                // that they wish to change the security question and/or answer.
                $("#changeSecurityQuestionIndicator").change(
                    function() {
                        var isChecked = $("#changeSecurityQuestionIndicator").is(':checked');
                        
                        if (isChecked) {
                            $("#securityResponse").attr("disabled", false);
                        }
                        else {
                            $("#securityResponse").attr("disabled", true);
                        }
                    }
                );   
            });
            
            // Verify the correctness of the information 
            function adminValidation() {
                var ret = true;
                
                // See if user wants to change their password
                var isChecked = $("#changePasswordIndicator").is(':checked');
                if (isChecked == true) {
                    var password1 = $("#password1").val();
                    var password2 = $("#password2").val();
                    if (password1 == null || password1.length == 0) {
                        $("#validation_error_output_div").html('<p class="error">The first password field cannot be empty.</p>');
                        ret = false;
                    }
                    else if (password2 == null || password2.length == 0) {
                        $("#validation_error_output_div").html('<p class="error">The second password field cannot be empty.</p>');
                        ret = false;
                    }
                    else if (password1 != password2) {
                        $("#validation_error_output_div").html('<p class="error">The password confirmation does not match.</p>');
                        ret = false;
                    }
                }
                
                // See if user wants to change their security question or answer
                if (ret == true) {
                    isChecked = $("#changeSecurityQuestionIndicator").is(':checked');
                    if (isChecked == true) {
                        var securityResponse = $("#securityResponse").val();
                        if (securityResponse == null || securityResponse.length == 0) {
                            $("#validation_error_output_div").html('<p class="error">The security answer cannot be empty.</p>');
                            ret = false;
                        }
                    }
                }
                return ret;
            }
        </script>
        
        <link rel="stylesheet" href="../styles/administration.css">
    </head>
    <body>
        <div>
            <h1>David's Second-hand Bookstore - Administration</h1>
            
            <form name="adminform" action="index.php" method="post" onsubmit="return adminValidation(this);">
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
                            <td><input type="password" name="password1" id ="password1" disabled></td>
                        </tr>
                        <tr>
                            <td><label for="password2" id="password_label2">Confirm New Password:</label></td>
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
    </body>
</html>
