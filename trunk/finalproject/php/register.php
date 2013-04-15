<!DOCTYPE html>
<html>
    <head>
        <title>David's Second-hand Bookstore - Registration Page</title>
        <meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
        
        <script type="text/javascript">
            function navigateToLoginPage() {
                window.document.location.href="index.php";
            }
            
            function registerValidation() {
                return true;
                
                // to do : validate form
            }
            
        </script>
        <style type="text/css">
            h1 {
                text-align: center;
                color : green;
            }
            
            label {
                float : left;
                width : 8em;
                font-weight : bold;
                color : green;
                text-align: right;
            }
            
            input, select {
                width : 15em;
                margin-left : 1em;
                margin-bottom : .5em;
            }
            
            input:focus {
                border : 2px solid green;
            }
            
            #register_button, #reset {
                width : 7em;
                box-shadow : 2px 2px 0 silver;
                background-color : silver;
            }
            
            button:hover {
                color : red;
            }
        </style>
    </head>
    <body>
        <div>
            <h1>David's Second-hand Bookstore - Register Page</h1>
            
            <h2>Please complete the fields below to register</h2>
            
            
            <form name="register" action="index.php" method="post" onsubmit="return registerValidation(this);">
                <label for="username" id="username_label">Username:</label>
                <input type="text" name="username" id="username"><br/>
            
                <label for="password1" id="password_label1">Password:</label>
                <input type="password" name="password" id="password1"><br/>
            
                <label for="password2" id="password_label2">Reenter Password:</label>
                <input type="password" name="password2" id="password2"><br/>
            
                <label for="firstName" id="firstName_label">First name:</label>
                <input type="text" name="firstName" id="firstName"><br/>
            
                <label for="lastName" id="lastName_label">Last name:</label>
                <input type="text" name="lastName" id="lastName"><br/>
            
                <label for="address1" id="address1_label">Address line 1:</label>
                <input type="text" name="address1" id ="address1"><br/>
            
                <label for="address2" id="address2_label">Address line 2:</label>
                <input type="text" name="address2" id ="address2"><br/>
            
                <label for="city" id="city_label">City:</label>
                <input type="text" name="city" id="city"><br/>
            
                <label for="state" id="state_label">State:</label>
                <input type="text" name="state" id="state"><br/>
            
                <label for="zipcode" id="zip_label">Zip code:</label>
                <input type="text" name="zipcode" id="zipcode"><br/>
            
                <label for="email" id="email_label">E-mail:</label>
                <input type="email" name="email" id="email"><br/>
                
                <label for="interests" id="interests_label">General Interest</label>
                <select name="interests" id="interests">
                
<?php         
            foreach ($bookCategories as $bookCategory) {
                echo '<option value="' . $bookCategory['category_name'] . '">' . 
                        $bookCategory['category_name'] . '</option>';
            }
?>                
                </select>
                <br/>                
                
                <input type="hidden" name="action" value="process_new_registration"/>
            
                <button id="register_button" value="Register" type="submit">Register</button>
            </form>
        </div>
    </body>
</html>
