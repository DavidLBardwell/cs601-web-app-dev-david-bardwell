// This source file contains the javascript code to support the administration page.
// All event handling and validation is managed in this file.
// Some application-level check box management with associated password fields
// is handled in this file. For example, the user needs to check the check box to
// be able to enter a password field. This is a u/i that an auditor or lawyer would like.
            
            
            $(document).ready(function() {
                $("#deleteCustomer").change(
                    function() { 
                        var isChecked = $("#deleteCustomer").is(':checked');
                    
                        // if user decides to delete themselves from the bookstore,
                        // uncheck and disable the other check boxes and input fields 
                        // as they would be irrelevant.
                        if (isChecked) {
                            $("#changePasswordIndicator").prop("checked", false);
                            $("#changeSecurityQuestionIndicator").prop("checked", false);
                            $("#changePasswordIndicator").attr("disabled", true);
                            $("#changeSecurityQuestionIndicator").attr("disabled", true);
                            $("#password1").attr("disabled", true);
                            $("#password2").attr("disabled", true);
                            $("#securityResponse").attr("disabled", true);
                        }
                        else {
                            // user decided not to delete their record, re-enable other check boxes
                            $("#changePasswordIndicator").attr("disabled", false);
                            $("#changeSecurityQuestionIndicator").attr("disabled", false);
                        }    
                    }
                );
                
                
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
                    
                    // use the object literal to validate user supplied passwords
                    var checkp1 = validateUtil.validatePasswordRule(password1);
                    var checkp2 = validateUtil.validatePasswordRule(password2);
                    
                    if (checkp1 === false) {
                        $("#validation_error_output_div").html('<p class="error">The first password is not valid.</p>');
                        ret = false;
                    }
                    else if (checkp2 === false) {
                        $("#validation_error_output_div").html('<p class="error">The second password is not valid.</p>');
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