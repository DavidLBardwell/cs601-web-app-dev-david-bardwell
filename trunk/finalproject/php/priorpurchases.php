<!DOCTYPE html>
<html>
    <head>
        <title>David's Second-hand Bookstore - Prior Purchases</title>
        <meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
        <script src="http://code.jquery.com/jquery-latest.min.js"></script>
        
        <script type="text/javascript">
            // handle user's request to write a comment
            $(function() {
                $("td").on("click", function(event) {
                    var itemPressed = this.innerHTML;
                    
                    if (itemPressed === "Write Review") {
                        window.document.location.href="writereview.php";
                    }
                });
            });
    
            function navigateToMainPage() {
                window.document.location.href="main.php";
            }
        </script>
        
        <style type='text/css'>
            h1 {
                color : green;
                text-align: center;
            }
            
            span {
                color : green;
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
            
            td.writeReview {
                color : green;
                font-weight : bold;
                text-decoration: underline;
            }
            
            a:hover, button:hover {
                color : red;
            }
            
            td.writeReview:hover {
                color : red;
                text-decoration: underline;
            }
            
        </style>
        
    </head>
    <body>
        <div>
            <h1>David's Second-hand Bookstore - Prior Purchases</h1>
            
            <table id="prior_purchases">
                <caption><span>Prior Purchases</span></caption>
                <thead>
                    <tr>
                        <th>Title</th>
                        <th>Author</th>
                        <th>Category</th>
                        <th>Price</th>
                        <th>Purchase Date</th>
                    </tr>
                </thead>
                <tbody>
<?php
                foreach ($booksPreviouslyPurchased as $book) {
                    echo '<tr>';
                    echo '<td>' . $book['title'] . '</td>';
                    echo '<td>' . $book['author'] . '</td>';
                    echo '<td>' . $book['category'] . '</td>';
                    echo '<td>' . $book['price'] . '</td>';
                    echo '<td>' . $book['purchase_date'] . '</td>';
                    echo '</tr>';
                }    
?>
                </tbody>    
            </table>
            <br/>
            <br/>

            <form id="returnFromSearch" action="index.php" method="post">
                <button type="submit">Return to Bookstore page</button>
                <input type="hidden" name="action" value="returnFromSearch">
            </form>
        </div>
    </body>
</html>
