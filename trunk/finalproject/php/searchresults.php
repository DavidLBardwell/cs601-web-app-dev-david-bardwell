<!DOCTYPE html>
<html>
    <head>
        <title>David's Second-hand Bookstore - Search Results</title>
        <meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
        
        <script type="text/javascript">
            function navigateToMainPage() {
                window.document.location.href="main.php";
            }
        </script>    
        
        <style type="text/css">
            h1 {
                text-align: center;
                color : green;
            }
            
            a:hover, button:hover {
                color : red;
            }
            
            span {
                font-weight: bold;
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
        </style>
    </head>
    
    <body>
        <div>
            <h1>David's Second-hand Bookstore - Search Results</h1>
            
            <h2>Search Criteria:</h2>
            
            <p>Searching for title: <span>huckleberry finn</span></p>
            
            <table id="results">
                <caption>Books found from the search</caption>
                <thead>
                    <tr>
                        <th>Title</th>
                        <th>Author</th>
                        <th>Category</th>
                        <th>Price</th>
                        <th>Purchase</th>
                    </tr>
                </thead>

                <tbody>
                    <tr>
                        <td><a href="viewdetails.php" id="searchResults1">Adventures of Huckleberry Finn</a></td>
                        <td>Mark Twain</td>
                        <td>Fiction</td>
                        <td>$6.50</td>
                        <td><button id="book1">Add to Cart</button></td>
                    </tr>
                </tbody>
            </table>  
            
            <button value="Return to Main page" onclick="navigateToMainPage();">Return to Main page</button>
            
            
            
        </div>
    </body>
</html>
