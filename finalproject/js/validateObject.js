

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
   
   }

   
   
   

};


