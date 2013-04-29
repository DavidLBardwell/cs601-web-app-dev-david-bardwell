

// Object literal to handle core validation
// Field validation is also handled by the validateUtil object literal

var validateUtil = {

   validatePasswordRule : function(password) {
       if (password.length < 8) {
           return false;
       }
       else {
           // check starts with a letter and contains at least one numeric digit
           var firstChar = password.charAt(0);
           if ( (firstChar >= 'a' && firstChar <= 'z') ||
                (firstChar >= 'A' && firstChar <= 'Z') ) {
                if (password.search('[0-9]') == -1)  {
                    return false;
                } else {
                    return true;
                }    
           
           } else {
               return false;
           }
       }
   },
   
   // generic text field input rule make sure it is not empty
   validateGenericField : function(fieldValue) {
       if (fieldValue == null || fieldValue.length == 0) {
           return false;
       }
       else {
           return true;
       }    
   },
   
   // validate username for login
   validateLoginUsernameField : function(username) {
       ret = true;
       result = validateUtil.validateGenericField(username);
       if (result === false) {
           ret = false;
           $("#checkit").html("<span id='loginFailed'>Field cannot by empty</span>");
       }
       else {
           $("#checkit").html("");
       }
       return ret;
   },
   
   // validate password for login
   validateLoginPasswordField : function(password) {
       var ret = true;
       if (validateUtil.validatePasswordRule(password) === false) {
           $("#checkit").html("<span id='loginFailed'>Password is not valid.</span>Please review password rules.");
           ret = false;
       }
       else {
           $("#checkit").html(''); // clear any error message
       }
       return ret;
   },
   
   // validate password field 1 on the registration form
   validateRegPassword1Field : function(password) {
       var ret = true;
       if (validateUtil.validatePasswordRule(password) === false) {
           $("#span_password1").html("Password is not valid. Please review password rules.");
           ret = false;
       }
       else {
           $("#span_password1").html(''); // clear any error message
       }
       return ret;
   
   },
   
   // validate password field 2 on the registration form
   validateRegPassword2Field : function(password1, password2) {
       var ret = true;
       if (validateUtil.validatePasswordRule(password1) === false) {
           $("#span_password2").html("Confirmation password is not valid. Please review password rules.");
           ret = false;
       }
       else {
            // make sure the password and confirmation passwords match
            if (password1 !== password2) {
                $("#span_password2").html("The password and confirmation passwords must match");
                ret = false;
            }
            else {
               $("#span_password2").html(''); // clear any error message
            }    
       }
       return ret;
   
   },
   
   completeRegistrationValidation : function() {
   
       // repopulate error message(s) based on issues found
       var password1 = $("#password1").val();
       var password2 = $("#password2").val();
       var username = $("#username").val();
       var firstname = $("#firstName").val();
       var lastname = $("#lastName").val();
       var address1 = $("#address1").val();
       var city = $("#city").val();
       var state = $("#state").val();
       var zipcode = $("#zipcode").val();
       var email = $("#email").val();
       var securityanswer = $("#security_answer").val();
                
       var result = true;
       var ret = true;  // optimistic, if any field not valid cannot submit until fixed
                
       // check first password field
       result = validateUtil.validateRegPassword1Field(password1);
       if (result === false) {
           ret = false;
       }
                
       // check confirmation password field
       result = validateUtil.validateRegPassword2Field(password1, password2);
       if (result === false) {
           ret = false;
       }

       // check username field
       result = validateUtil.validateGenericField(username);
       if (result === false) {
           ret = false;
           $("#span_username").html("Field cannot by empty");
       }

       // check first name field
       result = validateUtil.validateGenericField(firstname);
       if (result === false) {
           ret = false;
           $("#span_firstName").html("Field cannot by empty");
       }

       // check last name field
       result = validateUtil.validateGenericField(lastname);
       if (result === false) {
           ret = false;
           $("#span_lastName").html("Field cannot by empty");
       }
                
       // check address1 field
       result = validateUtil.validateGenericField(address1);
       if (result === false) {
           ret = false;
           $("#span_address1").html("Field cannot by empty");
       }
                
       // check city field
       result = validateUtil.validateGenericField(city);
       if (result === false) {
           ret = false;
           $("#span_city").html("Field cannot by empty");
       }
                
       // check state field
       result = validateUtil.validateGenericField(state);
       if (result === false) {
           ret = false;
           $("#span_state").html("Field cannot by empty");
       }
                
       // check zipcode field
       result = validateUtil.validateGenericField(zipcode);
       if (result === false) {
           ret = false;
           $("#span_zipcode").html("Field cannot by empty");
       }
                
       // check email field
       result = validateUtil.validateGenericField(email);
       if (result === false) {
           ret = false;
           $("#span_email").html("Field cannot by empty");
       }
                
       // check security answer
       result = validateUtil.validateGenericField(securityanswer);
       if (result === false) {
           ret = false;
           $("#span_security_answer").html("Field cannot by empty");
       }
        
       return ret;
   
   }
};
