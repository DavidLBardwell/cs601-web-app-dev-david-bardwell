<!DOCTYPE html>
<html>
    <head>
        <title>David's Second-hand Bookstore - Registration Page</title>
        <meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
        <link rel="stylesheet" href="http://code.jquery.com/ui/1.10.2/themes/smoothness/jquery-ui.css">
        <script type="text/javascript" src="http://ajax.aspnetcdn.com/ajax/jQuery/jquery-1.9.1.js"></script>
        <script src="http://code.jquery.com/ui/1.10.2/jquery-ui.js"></script>

        <link rel="stylesheet" href="../styles/register.css">
        <script language="javascript" src="../js/validateObject.js"></script>
        
        <!-- Override the externally referenced css style file -->
        <style type="text/css">
            span.showError {
                color : red;
                margin-left : 10px;
                font-weight: bold;
            }
            
        </style>

        <script type="text/javascript">
            
            // Support immediate validation using the onBlur event so
            // user knows they did not fill in the field correctly.
            // As below, also need to revalidate on form submission.
            // Reuse the same core validation functions in the validateUtil
            // object literal.
            $(document).ready(function() {
                $("#password1").on("blur", function() {
                    var password = $("#password1").val();
                    validateUtil.validateRegPassword1Field(password);
                });
                
                $("#password2").on("blur", function() {
                    var password1 = $("#password1").val();
                    var password2 = $("#password2").val();
                    validateUtil.validateRegPassword2Field(password1, password2);
                });
                
                // Generically check that a text field is not empty. Use
                // some basic DOM scripting to find the associated span element
                // to display error message.
                $(".textfield").on("blur", function() {
                    // skip checking passwords and address2
                    if (this.id === "password1"
                          || this.id === "password2" 
                          || this.id === "address2") {
                        return;
                    }
                    
                    // walk the DOM to get to the span, for some reason there
                    // is a sibling between this and spanElement?
                    var fieldValue = this.value;
                    var textSibling = this.nextSibling;
                    var spanElement = textSibling.nextSibling;
                    
                    if (validateUtil.validateGenericField(fieldValue) === false) {
                        spanElement.innerHTML = "Field cannot be empty";
                    } else {
                        spanElement.innerHTML = "";
                    }
                });
            });
            
            
            // This is called upon form submission. All errors will be displayed
            // not just the first error found. This way the user knows that they
            // have to fix multiple errors. Use core validation object to do the
            // validation checking.
            function registerValidation() {
                // reset any error messages
                resetErrorMessages();
                
                // call function on validation object for complete registration validation
                ret = validateUtil.completeRegistrationValidation();
                return ret;
            }
            
            function resetErrorMessages() {
                $('span').html("");
            }
            
            
        </script>
    </head>
    
    <body>
        <div>
            <h1>David's Second-hand Bookstore - Register Page</h1>
            
            <h2>Please complete the fields below to register</h2>
            
            <form name="register" action="index.php" method="post" onsubmit="return registerValidation(this);">
                <label for="username" id="username_label">Username:</label>
                <input type="text" class="textfield" name="username" id="username">
                <span class="showError" id="span_username"></span>
                <br/>
            
                <label for="password1" id="password_label1">Password:</label>
                <input type="password" class="textfield" name="password" id="password1" 
                       title="Please enter a minimum of 8 characters with at least one numeric digit and starting with a letter.">
                <span class="showError" id="span_password1"></span>
                <br/>
            
                <label for="password2" id="password_label2">Confirm Password:</label>
                <input type="password" class="textfield" name="password2" id="password2">
                <span class="showError" id="span_password2"></span>
                <br/>
            
                <label for="firstName" id="firstName_label">First name:</label>
                <input type="text" class="textfield" name="firstName" id="firstName">
                <span class="showError" id="span_firstName"></span>
                <br/>
            
                <label for="lastName" id="lastName_label">Last name:</label>
                <input type="text" class="textfield" name="lastName" id="lastName">
                <span class="showError" id="span_lastName"></span>
                <br/>
            
                <label for="address1" id="address1_label">Address line 1:</label>
                <input type="text" class="textfield" name="address1" id ="address1">
                <span class="showError" id="span_address1"></span>
                <br/>
            
                <label for="address2" id="address2_label">Address line 2:</label>
                <input type="text" class="textfield" name="address2" id ="address2">
                <span class="showError" id="span_address2"></span>
                <br/>
            
                <label for="city" id="city_label">City:</label>
                <input type="text" class="textfield" name="city" id="city">
                <span class="showError" id="span_city"></span>
                <br/>
            
                <label for="state" id="state_label">State:</label>
                <input type="text" class="textfield" name="state" id="state">
                <span class="showError" id="span_state"></span>
                <br/>
            
                <label for="zipcode" id="zip_label">Zip code:</label>
                <input type="text" class="textfield" name="zipcode" id="zipcode">
                <span class="showError" id="span_zipcode"></span>
                <br/>
            
                <label for="email" id="email_label">E-mail:</label>
                <input type="email" class="textfield" name="email" id="email">
                <span class="showError" id="span_email"></span>
                <br/>
                
                <label for="interests" id="interests_label">General Interest:</label>
                <select name="interests" id="interests">
                
<?php         
            foreach ($bookCategories as $bookCategory) {
                echo '<option value="' . $bookCategory['category_name'] . '">' . 
                        $bookCategory['category_name'] . '</option>';
            }
?>                
                </select>
                <br/>
                
                <label for="security_question" id="security_question_label">Security Question:</label>
                <select name="security_question" id="security_question">
                    <option value="Mother_Maiden_Name">What is your mother's maiden name?</option>
                    <option value="City_Born">What city were you born in?</option>
                    <option value="Favorite_Color">What is your favorite color?</option>
                </select>
                <br/>
                
                <label for="security_answer" id="security_answer_label">Security Answer:</label>
                <input type="text" class="textfield" name="security_answer" id="security_answer">
                <span class="showError" id="span_security_answer"></span>
                <br/>
                
                <input type="hidden" name="action" value="process_new_registration"/>
            
                <button type="submit" id="register_button" name="submit" value="Register">Register</button>
                <button type="reset" id="reset_button" value="reset_button">Reset</button>
            </form>
        </div>
        
        <script>
            $( document ).tooltip();
        </script>
    </body>
</html>
