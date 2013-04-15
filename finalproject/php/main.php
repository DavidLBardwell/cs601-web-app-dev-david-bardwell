<?php
    if (empty($_SESSION)) {
        session_start();  // do I need to keep doing this???
    }    
    $sessionid = session_id();
?>

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
            
            $(document).ready(function() {
                $('#books').dataTable( {
                    "iDisplayLength" : 5
                });
                
                // setup button listeners for dynamic management of cart
                $("button").on("click", function(event) {
		     var whatButton = this.id;
                     if (whatButton.length > 4) {
                         if (whatButton.substr(0, 4) == 'book') {
                             var buttonIndex = whatButton.substr(4);
                             
                             // get the corresponding table row
                             var whatRow = "row" + buttonIndex;
                             var bookRow = document.getElementById(whatRow);
                             
                             var node, display_string;
                             display_string=null;
                             for (var i =0; i < bookrow.childNodes.length; i++) {
                                 node = bookRow.childNodes[i];
                                 display_string += node.nodeValue;
                             }
                             var paragraphobj = document.getElementById("output_area");
                             paragraphobj.innerHTML = display_string;
                         }
                     }
                     
                });
                
            });
    
            
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
            
            #bookCatagory_div {
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
            
            
        </style>
        
    </head>
    <body>
        <header>
            <nav id ="admin_nav">
                <ul>
                    <li><a href="priorpurchases.php" id="prior">View Previous Purchases</a></li> 
                    <li><a href="administration.php" id="admin">Administration</a></li>
                    <li><a href="logout.php" id="logout">Logout</a></li>
                </ul>
            </nav>    
        </header>
        
        <h1>David's Second-hand Bookstore</h1>

        <div id="bookCatagory_div">
            <label for="bookCategory" id="bookCatagory_label">Book Category:</label>
            <select id="bookCategory">
                <option value="foo">Select a book category</option>
                <option value="1">Fiction</option>
                <option value="2">Science Fiction</option>
                <option value="3">Sports</option>
                <option value="4">Business</option>
                <option value="5">Finance</option>
            </select>
            <br/>
           
            <table id="books">
                <caption>Books available for category Fiction</caption>
                <thead>
                    <tr>
                        <th>Title</th>
                        <th>Author</th>
                        <th>Price</th>
                        <th>Purchase</th>
                    </tr>
                </thead>

                <tbody>
                    <tr id="row1">
                        <td><a href="viewdetails.php" id="viewDetails1">A Tale of Two Cities</a></td>
                        <td>Charles Dickens</td>
                        <td>$4.50</td>
                        <td><button id="book1">Add to Cart</button></td>
                    </tr>
                    <tr id="row2">
                        <td><a href="viewdetails.php" id="viewDetails2">The Scarlet Letter</a></td>
                        <td>Nathaniel Hawthorne</td>
                        <td>$5.00</td>
                        <td><button id="book2">Add to Cart</button></td>
                    </tr>
                    <tr id="row3">
                        <td><a href="viewdetails.php" id="viewDetails3">The old Man and the Sea</a></td>
                        <td>Ernest Hemingway</td>
                        <td>$5.25</td>
                        <td><button id="book3">Add to Cart</button></td>
                    </tr>
                    <tr id="row4">
                        <td><a href="viewdetails.php" id="viewDetails4">Great Expectations</a></td>
                        <td>Charles Dickens</td>
                        <td>$10.00</td>
                        <td><button id="book4">Add to Cart</button></td>
                    </tr>
                    <tr id="row5">
                        <td><a href="viewdetails.php" id="viewDetails5">The Great Gatsby</a></td>
                        <td>F. Scott Fitzgerald</td>
                        <td>$8.00</td>
                        <td><button id="book5">Add to Cart</button></td>
                    </tr>
                
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
            
                <tfoot>
                    <tr>
                        <td>Books</td>
                        <td>Authors</td>
                        <td>Total $9.50</td>
                        <td><button id="cart_all">Clear Cart</button></td>
                    </tr>
                </tfoot>    
            
                <tbody id="cartbody">
                    <tr id="cartrow1">
<?php
                        echo '<td>' . '<a href="viewdetails.php?title=\'A Tale of Two Cities\'" id="viewDetails4">' . $_SESSION['cart']['KEY-1']['title'] . '</a></td>';
                        echo '<td>' . $_SESSION['cart']['KEY-1']['author'] . '</td>';
                        echo '<td>' . $_SESSION['cart']['KEY-1']['price'] . '</td>';
                        echo '<td><button id="cart1">Remove from Cart</button></td>';
                    echo '</tr>';
                    echo '<tr id=cartrow2>';
                        echo '<td>' . '<a href="viewdetails.php" id="viewDetails4">' . $_SESSION['cart']['KEY-2']['title'] . '</a></td>';
                        echo '<td>' . $_SESSION['cart']['KEY-2']['author'] . '</td>';
                        echo '<td>' . $_SESSION['cart']['KEY-2']['price'] . '</td>';
                        echo '<td><button id="cart2">Remove from Cart</button></td>';
                    echo '</tr>';
?>                                
                </tbody>    
            </table>    
        
            <p>  </p>
            <button id="checkOut" onclick="goto_purchase();">Proceed to Checkout</button>
        </div>
        
        <div>
            <p id="output_area">  </p>
        </div>
        
        <div id="search_div">
            <label for="search" id="search_label">Search:</label>
            <input type="text" id="search">
            <a href="searchresults.php" id="search_link">Go</a>
            <input type="radio" name="search_choice" id="radio_title" value="title">Title
            <input type="radio" name="search_choice" id="radio_author" value="author">Author
        </div>
        
    </body>
</html>
