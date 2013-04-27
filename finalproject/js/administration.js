            
            
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