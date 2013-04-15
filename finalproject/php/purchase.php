<?php
if (empty($_SESSION)) {
        session_start();  // do I need to keep doing this???
    }    
    $sessionid = session_id();
    
?>

<!DOCTYPE html>
<html>
    <head>
        <title>David's Second-hand Bookstore - Purchase Page</title>
        <meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
        
        <script type="text/javascript">
            function navigateToConfirmPage() {
                window.document.location.href="processpurchase.php";
            }
        </script>
        
        <style type="text/css">
            h1 {
                color : green;
                text-align: center;
            }
            
            table#Purchases {
                border : 1px solid black;
                border-spacing : 2px;
            }
            
            table#Purchases th, table#Purchases td {
                border : 1px solid black;
                padding : .2em .7em;
                text-align: left;
            }
            
            span {
                font-weight : bold;
                color : green;
            }
            
            div#payment_div {
                margin-top: 25px;
            }
            
        </style>
    </head>
    
    <body>
        <div id="cart_div">
            <h1>David's Second-hand Bookstore - Purchase</h1>
            
            <table id="Purchases">
                <caption><span>Shopping Cart - Current Purchases</span></caption>
                <thead>
                    <tr>
                        <th>Title</th>
                        <th>Author</th>
                        <th>Category</th>
                        <th>Price</th>
                    </tr>
                </thead>
                <tfoot>
                    <tr>
                        <td>Books</td>
                        <td>Authors</td>
                        <td>Categories</td>
                        <td>Total: $9.50</td>
                    </tr>    
                </tfoot>
                <tbody>
                    <tr>
                        <td>A Tale of Two Cities</td>
                        <td>Charles Dickens</td>
                        <td>Fiction</td>
                        <td>$4.50</td>
                    </tr>
                    <tr>
                        <td>The Scarlet Letter</td>
                        <td>Nathaniel Hawthorne</td>
                        <td>Fiction</td>
                        <td>$5.00</td>
                    </tr>
                </tbody>    
            </table>    
        </div>
                
        <div id="payment_div">
            <table>
                <caption><span>Choose your payment and delivery terms</span></caption>
                <tr>
                    <td><label for="paymentMethod" id="paymentMethod_label">Payment Method:</label></td>
                    <td><select name="paymentMethod" id ="paymentMethod">
                          <option value="foo">select your payment method</option>
                          <option value="1">Mastercard</option>
                          <option value="2">Visa</option>
                          <option value="3">American Express</option>
                          <option value="4">Discover</option>
                          <option value="5">PayPal</option>
                        </select>
                    </td>
                </tr>   
                <tr>
                    <td><label for="creditCardNo" id="creditCardNo_label">Credit Card Number:</label></td>
                    <td><input type="text" id="creditCardNo"></td>
                </tr>
                <tr>
            
                    <td><label for="expireDate" id="expireDate_label">Expiration Date:</label></td>
                    <td><input type="text" id="expireDate" placeholder="MM/YY"></td>
                </tr>
                <tr>
            
                    <td><label for="deliveryMethod" id="deliveryMethod_label">Delivery Method:</label></td>
                    <td><select name="deliveryMethod" id ="deliveryMethod">
                          <option value="foo">select your delivery method</option>
                          <option value="1">Overnight</option>
                          <option value="2">2nd Day Air</option>
                          <option value="3">Ground shipment</option>
                        </select>
                    </td>
                </tr>
            </table>
            
            <br/>
            
            <button value="Submit" onclick="navigateToConfirmPage();">Complete Order</button>
            
        </div>
    </body>
</html>
