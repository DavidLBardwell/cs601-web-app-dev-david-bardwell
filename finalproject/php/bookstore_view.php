<!DOCTYPE html>
<html>
    <head>
        <title>David's Second-hand Bookstore - Main Page</title>
        <meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
        <script type="text/javascript" src="http://ajax.aspnetcdn.com/ajax/jQuery/jquery-1.9.1.js">
        </script>
        <script type="text/javascript" src="http://ajax.aspnetcdn.com/ajax/jquery.dataTables/1.9.4/jquery.dataTables.js">
        </script>
        <script type="text/javascript">
            
            // Called when the DOM is ready. Set up static listeners and
            // other initializations. 
            $(document).ready(function() {
                // set the table to just display 5 books at a time.
                $('#books').dataTable( {
                    "iDisplayLength" : 5
                });
                
                // Establish handler for changing book catagory selection
                $("#bookCategory").on("change", handleBookCategorySelection);
                
                // Initialize the book details link handler
                initializeBookDetailLinkEvents();
            });

            // Allow the book links to display a nice book cover. The path to
            // the images are stored in the database book record. The images
            // are available on the web server's images directory.
            // Here we use a class selector for our links.
            function initializeBookDetailLinkEvents() {
                $(".showBookDetails").on("click", function(e) {
                    var idoflink = this.id;  // get the id so we can lookup the book image
                    var bookId = idoflink.substr(11); // viewdetails1
                    var hiddenDataElement = document.getElementById("hdata" + bookId);
                    var bookData = hiddenDataElement.value;
                
                    var args = bookData.split(",");
                    var imagePathData = args[4];
                    var imagePath = imagePathData.substr(imagePathData.indexOf("=") + 1);
                    if (imagePath != '') {
                        imageElement = '<img src="' + imagePath + '" alt="Book Image">';
                        $("#detail_book_div").empty();  // remove previous image
                        $("#detail_book_div").append(imageElement);
                    }
                    return false;  // do not want the href link value to fire.
                });            
            
            }
            
            // Customer selects a new book category handle through ajax call
            // Note: AJAX updates the DOM, and the DOM events need to be
            //       rebinded or the links for viewing book images will no 
            //       longer work.
            function handleBookCategorySelection() {
                var categorySelected = $("#bookCategory :selected").val();
                
                // use ajax to get the new books to show based on the selected category
                $.ajax({
                    url: "index.php",
                    type : "post",
                    data: {action : 'categorySelectionChanged', book_category : categorySelected },
                    dataType: "text",
                    success: function(data, status, xhr) {
                        $("#bookbody").html(data);  // note: data is the html
                        $("#bookcategorycaption").html('Books available for category ' + categorySelected);
                        initializeBookDetailLinkEvents(); // must re-bind links
                    }
                });
            }
                
            // Add book to cart, this is called directly off the button onclick directive
            function addBookToCart(bookId) {
            
                // build the data out with complete information
                debugger;
                var hiddenDataElement = document.getElementById("hdata" + bookId);
                var bookData = hiddenDataElement.value;
                //$("#output_area").html(bookData);
                
                // format the data for the ajax call
                var args = bookData.split(",");
                var titleData = args[1];
                var title = titleData.substr(titleData.indexOf("=") + 1);
                var authorData = args[2];
                var author = authorData.substr(authorData.indexOf("=") + 1);
                var priceData = args[3];
                var price = priceData.substr(priceData.indexOf("=") + 1);
            
                $.ajax({
                    url: "index.php",
                    type : "post",
                    data: {action : 'addBookToCart', book_key : bookId, title : title, author : author, price : price },
                    dataType: "json",
                    success: function(data, status, xhr) {
                        $("#cartbody").html(data[0]);  // note: data is the html
                        $("#cartfooter").html(data[1]);
                    }
                });		
	    }
            
            // Remove book from cart, this is also called directly off the button onclick directive
            function removeBookFromCart(bookId) {
                $.ajax({
                    url: "index.php",
                    type : "post",
                    data: {action : 'removeBookFromCart', book_key : bookId },
                    dataType: "json",
                    success: function(data, status, xhr) {
                        $("#cartbody").html(data[0]);  // note: data is the html
                        $("#cartfooter").html(data[1]);
                    }
                });
            }
            
            // Remove all currently selected books from the cart
            function clearCart() {
                $.ajax({
                    url: "index.php",
                    type : "post",
                    data: {action : 'clearCart'},
                    dataType: "text",
                    success: function(data, status, xhr) {
                        $("#cartbody").html(''); // cart is empty now
                        $("#cartfooter").html(data);  // reset total in footer
                    }
                });
            }
    
            
            function goto_purchase() {
                window.document.location.href="purchase.php";
            }
        </script>
        
        <style type="text/css">
            h1 {
                font-weight: bold;
                text-align: center;
                color : green;
            }
            
            caption {
                font-weight : bold;
            }
            
            #admin_nav {
                text-align : right;
            }
            
            #admin_nav li {
                display: inline;
                padding : 0 0.5em;
                border-right: 1px solid black;
            }
            
            #search_div {
                float : right;
            }
            
            #bookCatagory_div, #debug_div {
                float : left;
            }
            
            a:hover, button:hover {
                color : red;
            }
            
            button {
                font-weight : bold;
            }
            
            table {
                border : 1px solid black;
                border-spacing : 2px;
            }
            
            th, td {
                border : 1px solid black;
                padding : .2em .7em;
                text-align: left;
            }
            
            table#cart {
                text-align : center;
            }
            
            span, #search_label, #bookCatagory_label {
                font-weight: bold;
                color : green;
            }
            
            #radio_title, #radio_author {
                color : green;
            }
            
            #bookCategory {
                margin-bottom : 20px;
            }
            
            table#books, table#cart, #dataTables_wrapper {
                margin-top: 20px;
            }
            div#detail_book_div {
                margin-top: 40px;
            }
            
        </style>
    </head>
    
    <body>
        <header>
            <nav id ="admin_nav">
                <ul>
                    <li><a href="priorpurchases.php" id="prior">View Previous Purchases</a></li> 
                    <li><a href="index.php?action=show_admin_page" id="admin">Administration</a></li>
                    <li><a href="logout.php" id="logout">Logout</a></li>
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

        
        <div id="search_div">
            <label for="search" id="search_label">Search:</label>
            <input type="text" id="search">
            <a href="searchresults.php" id="search_link">Go</a>
            <input type="radio" name="search_choice" id="radio_title" value="title">Title
            <input type="radio" name="search_choice" id="radio_author" value="author">Author
            
            <div id="detail_book_div">
                
                
                
            </div>
        </div>
        

        
    </body>
</html>
