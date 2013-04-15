<!DOCTYPE html>
<html>
    <head>
        <title>David's Second-hand Bookstore - Write Book Review</title>
        <meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
        
        <script type="text/javascript">
            function navigateToPriorPurchasePage() {
                window.document.location.href="priorpurchases.php";
            }
        </script>    
        
        <style type="text/css">
            textarea {
                height : 15em;
                width : 40em;
                font-family : Arial, Helvetica, sans-serif;
            }
            
            h1 {
                text-align : center;
                color : green;
            }
        </style>    
    </head>
    <body>
        <div>
            <h1>David's Second-hand Bookstore - Write Book Review</h1>
            
            <h3>Title: A Tale of Two Cities</h3>
            
            <textarea id="review"
                      placeholder="Enter your book review here"></textarea>
            <br/>
            
            <button value="Submit" onclick="navigateToPriorPurchasePage();">Post Review</button>
            
        </div>
    </body>
</html>
