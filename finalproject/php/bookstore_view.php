<!DOCTYPE html>
<html>
    <head>
        <title>David's Second-hand Bookstore - Main Page</title>
        <meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
        <link rel="stylesheet" href="http://code.jquery.com/ui/1.10.2/themes/smoothness/jquery-ui.css">
        <script type="text/javascript" src="http://ajax.aspnetcdn.com/ajax/jQuery/jquery-1.9.1.js"></script>
        <script src="http://code.jquery.com/ui/1.10.2/jquery-ui.js"></script>
        <script type="text/javascript" src="http://ajax.aspnetcdn.com/ajax/jquery.dataTables/1.9.4/jquery.dataTables.js"></script>

        <script language="javascript" src="../js/bookstore_view.js"></script>
        <link rel="stylesheet" href="../styles/bookstore_view.css">
    </head>
    
    <body>
        <header>
            <nav id ="admin_nav">
                <ul>
                    <li><a href="index.php?action=view_prior_purchases" id="prior">View Previous Purchases</a></li> 
                    <li><a href="index.php?action=show_admin_page" id="admin">Administration</a></li>
                    <li><a href="index.php?action=log_out" id="logout">Logout</a></li>
                </ul>
            </nav>    
        </header>
        
        <h1>David's Second-hand Bookstore</h1>

        <div id="bookCatagory_div">
            <label for="bookCategory" id="bookCatagory_label">Book Category:</label>
            <select name ="bookCategory" id="bookCategory">
                
<?php
            foreach ($bookCategories as $bookCategory) {
                $nextBookCategory = $bookCategory['category_name'];
                // set the current selection to the general interest of the customer
                if ($nextBookCategory == $generalInterest) {
                    echo '<option selected="selected" value="' . $nextBookCategory . '">' . 
                            $nextBookCategory . '</option>';
                }
                else {
                    echo '<option value="' . $nextBookCategory . '">' . 
                            $nextBookCategory . '</option>';
                }    
            }
?>                
            </select>
            <br/>
           
            <table id="books">
                <caption id="bookcategorycaption">Books available for Category <?php echo $generalInterest?></caption>
                <thead>
                    <tr>
                        <th>Title</th>
                        <th>Author</th>
                        <th>Price</th>
                        <th>Purchase</th>
                        <th>&nbsp;</th>
                    </tr>
                </thead>

                <tbody id="bookbody">
<?php            
                // load the books into the table and use a hidden field to store the book data
                foreach ($books as $book) { 
                    echo '<tr id="row' . $book['book_key'] . '">';
                    echo   '<td><a href="http://www.google.com" class="showBookDetails"  id="viewDetails' . 
                              $book['book_key'] . '">' . $book['title'] . '</a></td>';
                    echo   '<td>' . $book['author'] . '</td>';
                    echo   '<td>' . '$' . $book['price'] . '</td>';
                    echo   '<td><button id="book' . $book['book_key'] . '" onclick="addBookToCart(' . $book['book_key'] . ');">Add to Cart</button></td>';
                    echo   '<td><input type="hidden" id="hdata' . $book['book_key'] . '" name="tablerowdetails" value="' . 
                              'book_key=' . $book['book_key'] . ',title=' . $book['title'] . ',author=' . $book['author'] .
                              ',price=' . $book['price'] . ',imagepath=' . $book['imagepath'] . '"></td>';
                    echo  '</tr>';
                }
?>
                </tbody>
            </table>
            
            <table id="cart">
                <caption><span>Shopping Cart</span> - books selected for purchase</caption>
                <thead>
                    <tr>
                        <th>Title</th>
                        <th>Author</th>
                        <th>Price</th>
                        <th>Purchase</th>
                    </tr>
                </thead>
                
<?php    
    // calculate new total
    $totalAmount = 0;
    foreach ($_SESSION['cart'] as $cartItem) {
        $totalAmount = $totalAmount + $cartItem['price'];
    }
?>    
            
                <tfoot id="cartfooter">
                    <tr>
                        <td>Books</td>
                        <td>Authors</td>
<?php                            
                        echo '<td>Total $' . number_format($totalAmount, 2) . '</td>';
?>
                        <td><button id="cart_all">Clear Cart</button></td>
                    </tr>
                </tfoot>    
            
                <tbody id="cartbody">
<?php                    
    // show the cart based on the current session
    // will I need to get the session object or will it be ready to go?
    foreach ($_SESSION['cart'] as $cartItem) {
        echo '<tr>';
        echo '<td>' . $cartItem['title'] . '</td>';
        echo '<td>' . $cartItem['author'] . '</td>';
        echo '<td>' . '$' . $cartItem['price'] . '</td>';
        echo '<td><button id="cart' . $cartItem['book_key'] . '" onclick="removeBookFromCart(' . $cartItem['book_key'] . ');">Remove from Cart</button></td>';
        echo '</tr>';
    }                    
 ?>   

                </tbody>    
            </table>    
        
            <p>  </p>
            <button id="checkOut" onclick="goto_purchase();">Proceed to Checkout</button>
            
            <p id="output_area">  </p>
        </div>

        <form id="searchForm" action="index.php" method="post" onsubmit="return searchValidation(this);">
            <div id="search_div">
                <label for="search" id="search_label">Search:</label>
                <input type="text" name="searchField" id="searchField" placeholder="Enter search text">
                <button type="submit" id="search_button">Go</button>
                <input type="radio" name="search_choice" id="radio_title" checked="checked" value="Title">Title
                <input type="radio" name="search_choice" id="radio_author" value="Author">Author
                <input type="hidden" name="action" value="bookSearch">
                
                <div id="searchError_div">
                    <p id="searchErrorText"></p>
                </div>   
            
                <div id="detail_book_div">
                
                </div>
            </div>
        </form>
        

        
    </body>
</html>
