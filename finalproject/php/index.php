<?php

// 
// The index.php will act as the bookstore php controller. The important
// design item is to encapsulate the entire bookstore php application in
// this file using the require and include mechanisms. In this way the
// user stays within the scope of index.php, and we do not run into 
// issues with multiple independent php pages. Use of Session is needed
// to keep the state of the user's cart and their current book category
// selections. We can preserve state on the main bookstore page in this
// way.
//

// require all model php classes to be present
require('database.php');
require('customer.php');


// We now get the action that caused this page to be engaged. Our controller
// implementation will flow the action to the appropriate handlers.

if (isset($_POST['action'])) {
    $action = $_POST['action'];
}
else if (isset($_GET['action'])) {
    $action = $_GET['action'];
}
else {
    $action = "show_login_page";
}

// based on the action, complete the required work to support the action
if ($action == "show_login_page") {
    $loginFailed = false;
    $newRegistration=false;
    $username='';
    $password='';
    include('login_view.php');
}
else if ($action == "login_requested") {
    $username = $_POST['username'];
    $password = $_POST['password'];
    
    $loginSuccessful = Database::login($username, $password);
    
    if ($loginSuccessful == true) {
        // start the session now
        $lifetime = 86400 * 14;  // 2 weeks in seconds
        session_set_cookie_params($lifetime, '/');
        session_start();
        
        // initialize cart to empty
        $_SESSION['cart'] = array();
        $_SESSION['username'] = $username;
        $_SESSION['password'] = $password;
        
        $customer_info = Database::getCustomerInterest($username, $password);
        $customer_key = $customer_info[1];
        $generalInterest = $customer_info[2];
        $_SESSION['customer_key'] = $customer_key;
        $_SESSION['general_interest'] = $generalInterest;
        
        // read complete customer information
        $customerDetails = Database::getCustomerDetails($customer_key);
        $customer = new Customer($customerDetails);
        $_SESSION['customer'] = $customer;
        $firstName = $customer->getFirstName();
        
        // get the book and categories and show bookstore's main page
        $books = Database::getBooks($generalInterest);
        $bookCategories = Database::getBookCategories();
        
        include('bookstore_view.php');
    }
    else {
        // the login page with the error so user can try again.
        $loginFailed = true;
        $newRegistration=false;
        include('login_view.php');
    }
}
else if ($action == "reset_password") {
    $resetPasswordError = false;
    $suppliedUsername='';
    $suppliedSecurityQuestion='';
    $suppliedSecurityAnswer='';
    include('forgotPassword.php');
}
else if ($action == 'process_reset_password') {
    // user requested resetting of their password
    // For this project, I will simply verify that the information
    // is correct. Thus, the client side portion will be complete,
    // but the server side email generation will be left for another time.
    // 
    // Support is available in php to send email but
    // requires some special libraries and php.ini configuration which 
    // is somewhat beyond the scope of this application.
    
    // Verify that the user gave us valid credentials i.e. username and
    // security question and answer that matches what is on file for the
    // the valid username.
    $suppliedUsername = $_POST['username'];
    $suppliedSecurityQuestion = $_POST['securitySelection'];
    $suppliedSecurityAnswer = $_POST['securityResponse'];
    
    // check the database that there is a match
    $result = Database::validatePasswordResetRequest($suppliedUsername, 
                           $suppliedSecurityQuestion, $suppliedSecurityAnswer);
    
    if ($result == false) {
        // give the user back an error
        $resetPasswordError = true;
        include('forgotPassword.php');
    }
    else {
        // tell user their password has been reset via a dialog
        $loginFailed = false;
        $newRegistration=false;
        $username='';
        $password='';
        include('login_view.php');
    }
}

else if ($action == 'show_admin_page') {
    include('administration.php');
    
}
else if ($action == 'process_admin_change') {
    // process requested administration changes...
    session_start();  // otherwise $_SESSION is lost
    $customer_key = $_SESSION['customer_key'];
    $deleteFlag = false;
    
    // process delete customer
    if (isset($_POST['deleteCustomer'])) {
        $deleteFlag = true;
        $deleteCustomer = true;
        Database::deleteCustomer($customer_key);
        include('logout.php');
    }
    
    // skip this if the customer has been deleted
    if ($deleteFlag == false) {
        if (isset($_POST['changePasswordIndicator'])) {
            $newPassword = $_POST['password1'];
            Database::updatePassword($customer_key, $newPassword);
        }
    
        if (isset($_POST['changeSecurityQuestionIndicator'])) {
            $securityQuestion = $_POST['securitySelection'];
            $securityAnswer = $_POST['securityResponse'];
            Database::updateSecurityQuestion($customer_key, $securityQuestion, $securityAnswer);
        }
    
        $username = $_SESSION['username'];
        $password = $_SESSION['password'];
        $generalInterest = $_SESSION['general_interest'];  // restore current book category
    
        $books = Database::getBooks($generalInterest);
        $bookCategories = Database::getBookCategories();
        
        $customer = $_SESSION['customer'];
        $firstName = $customer->getFirstName();
        
        include('bookstore_view.php');  // will this work
    }    
}

else if ($action == 'redisplay_bookstore_page') {
    session_start();  // otherwise $_SESSION is lost
    $generalInterest = $_SESSION['general_interest'];  // restore current book category
    $books = Database::getBooks($generalInterest);
    $bookCategories = Database::getBookCategories();
    
    $customer = $_SESSION['customer'];
    $firstName = $customer->getFirstName();
    
    include('bookstore_view.php');  // everything should be ready to go, right?
    
}
else if ($action == 'show_registration_page') {
    $bookCategories = Database::getBookCategories();
    include('register.php');
    
}
else if ($action == 'process_new_registration') {
    $username = $_POST['username'];
    $password = $_POST['password'];
    $firstName = $_POST['firstName'];
    $lastName = $_POST['lastName'];
    $address1 = $_POST['address1'];
    $address2 = $_POST['address2'];
    $city = $_POST['city'];
    $state = $_POST['state'];
    $zipcode = $_POST['zipcode'];
    $email = $_POST['email'];
    $interests = $_POST['interests'];
    $security_question = $_POST['security_question'];
    $security_answer = $_POST['security_answer'];
    
    // setup an associative array to pass to the database function
    $regInfo = array();
    $regInfo['username'] = $username;
    $regInfo['password'] = $password;
    $regInfo['firstName'] = $firstName;
    $regInfo['lastName'] = $lastName;
    $regInfo['address1'] = $address1;
    $regInfo['address2'] = $address2;
    $regInfo['city'] = $city;
    $regInfo['state']  = $state;
    $regInfo['zipcode'] = $zipcode;
    $regInfo['email'] = $email;
    $regInfo['interests'] = $interests;
    $regInfo['security_question'] = $security_question;
    $regInfo['security_answer'] = $security_answer;
    
    $regSuccess = Database::processRegistration($regInfo);
    if ($regSuccess == true) {
        // TODO: give user a success message and then bring them to login
        $loginFailed = false;
        $newRegistration=true;
        include('login_view.php');
    }
}

else if ($action == 'addBookToCart') {
    session_start();  // need to get the current session
    $book_key = $_POST['book_key'];
    
    // We just need to echo out what the new cart should look like. The
    // state of the cart is tracked by the $_SESSION['cart'].
            
    // Update the Session cart with the posted book details.
    // Avoid requerying the database as it slows down the user
    $_SESSION['cart'][$book_key] = array();
    $_SESSION['cart'][$book_key]['book_key'] = $book_key;
    $_SESSION['cart'][$book_key]['title'] = $_POST['title'];
    $_SESSION['cart'][$book_key]['author'] = $_POST['author'];
    $_SESSION['cart'][$book_key]['price'] = $_POST['price'];
    
    // calculate new total
    $totalAmount = 0;
    foreach ($_SESSION['cart'] as $cartItem) {
        $totalAmount = $totalAmount + $cartItem['price'];
    }
    
    // reconstruct the html of the cart through a set of echos which will
    // be the new cart for the customer to see.
    $cartContents = regenerateCartBodyContents();
    $footerContents = regenerateCartFooterContents($totalAmount);
    
    // Send back two html fragments via JSON encoding
    $response = array($cartContents, $footerContents);

    echo json_encode($response);
}
else if ($action == 'removeBookFromCart') {
    session_start();  // need to get the current session
    $book_key = $_POST['book_key'];
    
    // find the book_key in the session and remove it
    foreach ($_SESSION['cart'] as $cartItem) {
        if ($cartItem['book_key'] == $book_key) {
            unset ($_SESSION['cart'][$book_key]);
            break;
        }
    }
    
    // calculate new total
    $totalAmount = 0;
    foreach ($_SESSION['cart'] as $cartItem) {
        $totalAmount = $totalAmount + $cartItem['price'];
    }
    
    // reconstruct the html of the cart through a set of echos which will
    // be the new cart for the customer to see.
    $cartContents = regenerateCartBodyContents();
    $footerContents = regenerateCartFooterContents($totalAmount);
    
    // Send back two html fragments via JSON encoding
    $response = array($cartContents, $footerContents);

    echo json_encode($response);
}

else if ($action == 'clearCart') {
    session_start();  // need to get the current session
    $_SESSION['cart'] = array();  // reset the cart
    
    echo '<tr>';
    echo '<td>Books</td>';
    echo '<td>Authors</td>';
    echo '<td>Total ' . '$0.00</td>';
    echo '<td><button id="cart_all" onclick="clearCart();">Clear Cart</button></td>';
    echo '</tr>';
}
else if ($action == 'categorySelectionChanged') {
    // A simple post call needs to set the session general category to
    // the new choice. The client will then call back again with
    // a request to load the bookstore_view.php page. This is handled
    // by the redisplay_bookstore_page action request.
    session_start();
    $bookCategory = $_POST['book_category'];
    $_SESSION['general_interest'] = $bookCategory;
    
//    This code represents a failed ajax attempt to update dataTables with new
//    information. There is more complexity with updating a dataTable via ajax
//    then is really worth implementing.     
//    foreach ($books as $book) { 
//        echo '<tr id="row' . $book['book_key'] . '">';
//        echo   '<td><a href="http://www.google.com" class="showBookDetails"  id="viewDetails' . 
//                   $book['book_key'] . '">' . $book['title'] . '</a></td>';
//        echo   '<td>' . $book['author'] . '</td>';
//        echo   '<td>' . '$' . $book['price'] . '</td>';
//        echo   '<td><button id="book' . $book['book_key'] . '" onclick="addBookToCart(' . $book['book_key'] . ');">Add to Cart</button></td>';
//        echo   '<td><input type="hidden" id="hdata' . $book['book_key'] . '" name="tablerowdetails" value="' . 
//                'book_key=' . $book['book_key'] . ',title=' . $book['title'] . ',author=' . $book['author'] .
//                ',price=' . $book['price'] . ',imagepath=' . $book['imagepath'] . '"></td>';
//        echo  '</tr>';
//    }
}
else if ($action == 'bookSearch') {
    session_start();
    $searchText = $_POST['searchField'];
    $searchOption = $_POST['search_choice'];
    $doublecheck = $searchOption;
    
    $booksFound = Database::searchBooks($searchText, $searchOption);
    
    // if the results are all in the same category, set general_interest to
    // the category so that when the customer returns to the main bookstore
    // page the most appropriate category will already be selected so they
    // can get to their book(s) of interest more quickly.
    $allSameCategory = true;
    if (sizeof($booksFound) > 0) {
        $lastCategory = null;
        foreach ($booksFound as $bookFound) {
            if ($lastCategory == null) {
                $lastCategory = $bookFound['category'];
            }
            else {
                if ($lastCategory != $bookFound['category']) {
                    $allSameCategory = false;
                    break;
                }
            }
        }
        if ($allSameCategory == true) {
            $_SESSION['general_interest'] = $lastCategory;
        }
    }    
    
    $searchCriterion = $searchOption . ": " . $searchText;
    include('searchresults.php');
}
else if ($action == 'returnFromSearch') {
    // return to the main bookstore page by reinitializing state for page
    session_start();  // otherwise $_SESSION is lost
    
    $username = $_SESSION['username'];
    $password = $_SESSION['password'];
    $generalInterest = $_SESSION['general_interest'];  // restore current book category
    
    $books = Database::getBooks($generalInterest);
    $bookCategories = Database::getBookCategories();
    
    $customer = $_SESSION['customer'];
    $firstName = $customer->getFirstName();
    
    include('bookstore_view.php');  // will this work    
}
else if ($action == 'view_prior_purchases') {
    session_start();
    
    $customer_key = $_SESSION['customer_key'];
    $booksPreviouslyPurchased = Database::getBooksPreviouslyPurchased($customer_key);
    
    include('priorpurchases.php');
    
}
else if ($action=='proceed_to_checkout') {
    session_start();
    
    // calculate total in the cart
    // calculate new total
    $totalAmount = 0;
    foreach ($_SESSION['cart'] as $cartItem) {
        $totalAmount = $totalAmount + $cartItem['price'];
    }
    include('purchase.php');
}
else if ($action=='process_payment_on_purchase') {
    session_start();
    
    // build transaction object and pass to the Database class for
    // back-end transaction posting
    $summary = array();
    $summary['customer_key'] = $_SESSION['customer_key'];
    $summary['purchase_date'] = date("Y/m/d");
    $summary['payment_method'] = $_POST['paymentMethod'];
    $summary['delivery_method'] = $_POST['deliveryMethod'];
    
    // calculate new total
    $totalAmount = 0;
    foreach ($_SESSION['cart'] as $cartItem) {
        $totalAmount = $totalAmount + $cartItem['price'];
    }
    $summary['total_amount'] = $totalAmount;
    
    // details
    $details = array();
    foreach ($_SESSION['cart'] as $cartItem) {
        $book_key = $cartItem['book_key'];
        $details[$book_key] = array();
        $details[$book_key]['book_key'] = $book_key;
        $details[$book_key]['customer_key'] = $_SESSION['customer_key'];
        $details[$book_key]['amount'] = $cartItem['price'];
    }
    
    Database::postTransaction($summary, $details);
    
    // TODO: give a success page with some details and then
    // return user to the main screen since they are still logged in.
    $_SESSION['cart'] = array();  // reset the cart
    
    $generalInterest = $_SESSION['general_interest'];  // restore current book category
    $books = Database::getBooks($generalInterest);
    $bookCategories = Database::getBookCategories();

    include('purchaseconfirm.php');
}
else if ($action == 'log_out') {
    $deleteCustomer = false;
    include('logout.php');
}


// The Session object has been updated, regenerate the cart
function regenerateCartBodyContents() {
    // reconstruct the html of the cart through a set of echos which will
    // be the new cart for the customer to see.
    $cartContents = null;
    foreach ($_SESSION['cart'] as $cartItem) {
        $cartContents .= '<tr>';
        $cartContents .= '<td>' . $cartItem['title'] . '</td>';
        $cartContents .= '<td>' . $cartItem['author'] . '</td>';
        $cartContents .= '<td>' . '$' . $cartItem['price'] . '</td>';
        $cartContents .= '<td><button id="cart' . $cartItem['book_key'] . '" onclick="removeBookFromCart(' 
                            . $cartItem['book_key'] . ');">Remove from Cart</button></td>';
        $cartContents .= '</tr>';
    }
    return $cartContents;
}

// The Session object has changed, regenerate the cart footer for new total
function regenerateCartFooterContents($totalAmount) {
    $footerContents = '<tr>';
    $footerContents .= '<td>Books</td>';
    $footerContents .= '<td>Authors</td>';
    $footerContents .= '<td>Total ' . '$' . number_format($totalAmount, 2) . '</td>';
    $footerContents .= '<td><button id="cart_all" onclick="clearCart();">Clear Cart</button></td>';
    $footerContents .= '</tr>';
    return $footerContents;
}

?>
