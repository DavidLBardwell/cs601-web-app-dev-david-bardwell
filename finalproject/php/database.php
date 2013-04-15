<?php

/**
 * Description of Database
 * This is the database class which connects to a MySQL database.
 * The important item is that we can re-use one administration connection
 * for each Apache Session. This is much better than trying to use
 * $GLOBALS to store the $db connection.
 *
 * @author David Bardwell
 */
class Database {
    private static $dsn = "mysql:host=localhost;dbname=bookstore";
    private static $host = "localhost";
    private static $dbname = "bookstore";
    private static $adminUser = "scott";
    private static $adminPassword = "tiger";
    private static $db;
    
    private function __construct() {
    }
    
    public static function getDB() {
        if (!isset(self::$db)) {
            try {
                self::$db = new PDO(self::$dsn, 
                                    self::$adminUser,
                                    self::$adminPassword);
            }
            catch (PDOException $e) {
                // todo: report error somehow
            }
        }
        return self::$db;
    }
    
    public static function login($username, $password) {
        $db = Database::getDB();
        
        $queryStr = "select COUNT(*) rowcount from bookstore_security where username='" . 
                    $username . "' and password='" . $password ."'";
        $records = $db->query($queryStr);
        $ret = false;
        foreach ($records as $rec) {
            $rowcount = $rec['rowcount'];
            if ($rowcount == 1) {
                $ret = true;
            }
        }
        return $ret;        
    }
    
    // A new user has just submitted a new registration, create a
    // new customer record and a new bookstore_security record for the customer.
    public static function processRegistration($registrationInfo) {
        
        // for simplicity let's unwrap the $registrationInfo associative array
        $username = $registrationInfo['username'];
        $password = $registrationInfo['password'];
        $firstName = $registrationInfo['firstName'];
        $lastName = $registrationInfo['lastName'];
        $address1 = $registrationInfo['address1'];
        $address2 = $registrationInfo['address2'];
        $city = $registrationInfo['city'];
        $state = $registrationInfo['state'];
        $zipcode = $registrationInfo['zipcode'];
        $email = $registrationInfo['email'];
        $interests = $registrationInfo['interests'];
        
        // get the database connection context
        $databaseConnection = Database::getDB();

        // create a row for the bookstore security and customer table
        // make sure to make this atomic.
        try {
            $databaseConnection->beginTransaction();
            $insertSecurityStatement = "INSERT INTO bookstore_security values(null, '" . 
                                       $username . "', '" . $password . "', null)";
            $affectedRows = $databaseConnection->exec($insertSecurityStatement);
        
            $insertNewCustomer = "INSERT INTO customers values(null, 1, '" . 
                $firstName . "', '" . $lastName . "', '" . $address1 . "', '" . $address2 . "', '" . 
                $city . "', '" . $state . "', '" . $zipcode . "', '" . $email . "', '" . $interests . "', 'foo', 'bar')";
            $affectedRows = $databaseConnection->exec($insertNewCustomer);
            $databaseConnection->commit();
        
        }
        catch(PDOException $e) {  
            echo "error: " + $e->getMessage();  
            $databaseConnection->rollBack();
        }
    
        try {
            // The code below mutually links the customers table and the bookstore_security table
            // for referential integrity.

            // get the security key for the new user and update the customer table with it
            $sec_record = $databaseConnection->query("select security_key from bookstore_security where username = '" . $username . "'");
            foreach ($sec_record as $rec) {
                $security_key = $rec['security_key'];
            }
        
            // update the new customer with the security key
            $databaseConnection->exec("UPDATE customers SET security_key = " . $security_key . " WHERE first_name = '" . 
                    $firstName . "' AND last_name = '" . $lastName . "'");
        
            // get the customer key for the new customer record
            $customer_record = $databaseConnection->query("select customer_key from customers where first_name = '" . 
                    $firstName . "' AND last_name = '" . $lastName . "'");
            foreach ($customer_record as $rec) {
                $customer_key = $rec['customer_key'];
            }

            // update the new bookstore_security row with the customer key
            $databaseConnection->exec("update bookstore_security set customer_key = " . $customer_key . 
                    " where security_key = " . $security_key);
        }
        catch(PDOException $e) {  
            echo "error: " + $e->getMessage();  
        }
        return true;  // for now, just return true
    }
    
    // Get all books for a given catagory
    // For the class project, we will assume this is not unreasonable as
    // my bookstore is not that big.
    public static function getBooks($category) {
        
        $databaseConnection = Database::getDB();
        
        $selectBookQuery = "SELECT book_key, title, author, year_published, price, path_to_image FROM books WHERE category = '" . $category . "'";
        $bookResults = $databaseConnection->query($selectBookQuery);
        
        $books = array();
        foreach ($bookResults as $book) {
            // note: even though book_key is numeric in the table, it is returned as a String, go figure.
            $book_key = $book['book_key'];
            $books[$book_key] = array();
            $books[$book_key]['book_key'] = $book['book_key'];
            $books[$book_key]['title'] = $book['title'];
            $books[$book_key]['author'] = $book['author'];
            $books[$book_key]['price'] = $book['price'];
        }
        
        return $books;
    }
    
    // Get the details for a specific book
    // This method is used to help with adding book to cart
    public static function getBookDetails($book_key) {
        
        $databaseConnection = Database::getDB();
        
        $selectBookQuery = "SELECT book_key, title, author, year_published, price, path_to_image FROM books WHERE book_key = " . $book_key;
        $bookResults = $databaseConnection->query($selectBookQuery);
        
        $books = array();
        foreach ($bookResults as $book) {
            $books[$book_key] = array();
            $books[$book_key]['book_key'] = $book['book_key'];
            $books[$book_key]['title'] = $book['title'];
            $books[$book_key]['author'] = $book['author'];
            $books[$book_key]['price'] = $book['price'];
        }
        return $books;
    }
    
    // Books are organized into well-known categories. This helps us partition our
    // bookstore and allows our customers to more easily find what they are looking for.
    public static function getBookCategories() {
        $databaseConnection = Database::getDB();
        $SelectBookCategoryQuery = "SELECT book_category_key, category_name, category_description FROM book_categories";
        $bookCategoryResults = $databaseConnection->query($SelectBookCategoryQuery);
        
        $bookCategories = array();
        foreach ($bookCategoryResults as $bookCategory) {
            $book_cat_key = $bookCategory['book_category_key'];
            $bookCategories[$book_cat_key] = array();
            $bookCategories[$book_cat_key]['book_category_key'] = $bookCategory['book_category_key'];
            $bookCategories[$book_cat_key]['category_name'] = $bookCategory['category_name'];
            $bookCategories[$book_cat_key]['category_description'] = $bookCategory['category_description'];
        }
        return $bookCategories;
    }
    
    public static function getCustomerInterest($username, $password) {
        $databaseConnection = Database::getDB();
        
        $customerQuery = "SELECT c.general_interest general_interest from customers c, bookstore_security s where s.username='" . 
                $username . "' and s.password='" . $password . "' and c.customer_key = s.customer_key";
                
        $generalIntestResults = $databaseConnection->query($customerQuery);
        foreach ($generalIntestResults as $generalInterestResult) {
            $generalInterest = $generalInterestResult['general_interest'];
        }
        return $generalInterest;
    }
}
?>
