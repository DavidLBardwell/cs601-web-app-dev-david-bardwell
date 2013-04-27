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

        <link rel="stylesheet" href="../styles/searchresults.css">

    </head>
    
    <body>
        <div>
            <h1>David's Second-hand Bookstore - Search Results</h1>
            
            <h2>Search Criteria:</h2>

            <p>Searching for <span> <?php echo $searchCriterion ?></span></p>
            
            <table id="results">
                <caption>Books found from the search</caption>
                <thead>
                    <tr>
                        <th>Count</th>
                        <th>Title</th>
                        <th>Author</th>
                        <th>Category</th>
                        <th>Price</th>
                    </tr>
                </thead>

                <tbody>
<?php
                $count = 1;
                foreach($booksFound as $bookFound) {
                    echo '<tr>';
                    echo '<td>' . $count . '</td>';
                    echo '<td>' . $bookFound['title'] . '</td>';
                    echo '<td>' . $bookFound['author'] . '</td>';
                    echo '<td>' . $bookFound['category'] . '</td>';
                    echo '<td> $' . $bookFound['price'] . '</td>';
                    echo '</tr>';
                    $count = $count + 1;
                }    
?>
                </tbody>
            </table>  
            
            
            <form id="returnFromSearch" action="index.php" method="post">
                <button type="submit">Return to Bookstore page</button>
                <input type="hidden" name="action" value="returnFromSearch">
            </form>
            
        </div>
    </body>
</html>
