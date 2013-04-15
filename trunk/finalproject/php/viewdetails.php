<?php
    if (empty($_SESSION)) {
        session_start();  // do I need to keep doing this???
    }    
    
    if (isset($_GET['title'])) {
        $title = $_GET['title'];
    }    
?>

<!DOCTYPE html>
<html>
    <head>
        <title>David's Second-hand Bookstore - View Details</title>
        <meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
        
        <script type="text/javascript">
            function navigateToMainPage() {
                window.document.location.href="main.php";
            }
        </script>    
        
        <style type="text/css">
            h1 {
                color : green;
                text-align: center;                
            }
            
            div#bookDetails_div {
                float : left;
            }
            
            div#image_div {
                float : right;
            }    
                
            td.column1 {
                font-weight: bold;
            }
            
            td.column2 {
                font-weight : bold;
                color : green;
            }
            
            span {
                font-weight: bold;
            }
            
        </style>
    </head>
    <body>

       <h1>David's Second-hand Bookstore - View Details</h1>
            
       <div id="bookDetails_div">
           <table>
               <thead>
                   <tr>
                       <th>Item</th>
                       <th>Information</th>
                   </tr>
               </thead>
               <tbody>
                   <tr>
                       <td class="column1">Title</td>
                       <td class="column2">Adventures of Huckleberry Finn</td>
                   </tr>
                   <tr>
                       <td class="column1">Author</td>
                       <td class="column2">Mark Twain</td>
                   </tr>
                   <tr>
                       <td class="column1">Category</td>
                       <td class="column2">Fiction</td>
                   </tr>
                   <tr>
                       <td class="column1">Price</td>
                       <td class="column2">$6.50</td>
                   </tr>
               </tbody>
           </table>
            
           <br/>
           <p><span>Summary:</span>Mark Twain's classic work of fiction and
               social criticism...</p>
           
           <button value="Return to Main page" onclick="navigateToMainPage();">Return to Main page</button>
       
       </div>
       
       <div id="image_div">
           <img src="../images/Huck_Finn.jpg" alt="Huckleberry Finn" width="300" height="300">
       </div>
    </body>
</html>
