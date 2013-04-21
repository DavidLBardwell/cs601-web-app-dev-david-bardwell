<!DOCTYPE html>
<html>
    <head>
        <title>David's Second-hand Bookstore - Registration Page</title>
        <meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
        <script type="text/javascript" src="http://ajax.aspnetcdn.com/ajax/jQuery/jquery-1.9.1.js">
        </script>
        <script type="text/javascript">
            
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
                width : 20em;
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
                margin-top: 20px;
                margin-left: 25px;
            }

            #reset_button {
                width : 7em;
                box-shadow : 2px 2px 0 silver;
                background-color : silver;
                margin-left: 25px;
                margin-top: 20px;
            }
            
            button:hover {
                color : red;
            }
            
            .textfield:hover {
                background-color: lightblue;
            }
            
        </style>
    </head>
    <body>
        <div>
            <h1>David's Second-hand Bookstore - Register Page</h1>
            
            <h2>Please complete the fields below to register</h2>
            
            
            <form name="register" action="index.php" method="post" onsubmit="return registerValidation(this);">
                <label for="username" id="username_label">Username:</label>
                <input type="text" class="textfield" name="username" id="username"><br/>
            
                <label for="password1" id="password_label1">Password:</label>
                <input type="password" class="textfield" name="password" id="password1"><br/>
            
                <label for="password2" id="password_label2">Reenter Password:</label>
                <input type="password" class="textfield" name="password2" id="password2"><br/>
            
                <label for="firstName" id="firstName_label">First name:</label>
                <input type="text" class="textfield" name="firstName" id="firstName"><br/>
            
                <label for="lastName" id="lastName_label">Last name:</label>
                <input type="text" class="textfield" name="lastName" id="lastName"><br/>
            
                <label for="address1" id="address1_label">Address line 1:</label>
                <input type="text" class="textfield" name="address1" id ="address1"><br/>
            
                <label for="address2" id="address2_label">Address line 2:</label>
                <input type="text" class="textfield" name="address2" id ="address2"><br/>
            
                <label for="city" id="city_label">City:</label>
                <input type="text" class="textfield" name="city" id="city"><br/>
            
                <label for="state" id="state_label">State:</label>
                <input type="text" class="textfield" name="state" id="state"><br/>
            
                <label for="zipcode" id="zip_label">Zip code:</label>
                <input type="text" class="textfield" name="zipcode" id="zipcode"><br/>
            
                <label for="email" id="email_label">E-mail:</label>
                <input type="email" class="textfield" name="email" id="email"><br/>
                
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
                <input type="text" class="textfield" name="security_answer" id="security_answer"><br/>
                
                <input type="hidden" name="action" value="process_new_registration"/>
            
                <button type="submit" id="register_button" value="Register">Register</button>
                <button type="reset" id="reset_button" value="reset_button">Reset</button>
            </form>
        </div>
    </body>
</html>
