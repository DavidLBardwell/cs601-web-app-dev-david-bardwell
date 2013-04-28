<!DOCTYPE html>
<html>
    <head>
        <title>David's Second-hand Bookstore - Purchase Page</title>
        <meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
        
        <script type="text/javascript">
            function paymentValidation() {
                return true; //TODO: add validation
            }
        </script>

        <link rel="stylesheet" href="../styles/purchases.css">

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
                        <th>Price</th>
                    </tr>
                </thead>
                <tfoot>
                    <tr>
                        <td>Books</td>
                        <td>Authors</td>
<?php                        
                        echo "<td>Total: $" . $totalAmount . "</td>";
?>                            
                    </tr>    
                </tfoot>
                <tbody>
<?php
    foreach ($_SESSION['cart'] as $cartItem) {
        echo '<tr>';
        echo '<td>' . $cartItem['title'] . '</td>';
        echo '<td>' . $cartItem['author'] . '</td>';
        echo '<td>' . '$' . $cartItem['price'] . '</td>';
        echo '</tr>';
    }    
?>

                </tbody>    
            </table>    
        </div>
                
        <div id="payment_div">
            <form id="complete_payment" action="index.php" method="post" onsubmit="return paymentValidation(this);">
                <table>
                    <caption><span>Choose your payment and delivery terms</span></caption>
                    <tr>
                        <td><label for="paymentMethod" id="paymentMethod_label">Payment Method:</label></td>
                        <td><select name="paymentMethod" id ="paymentMethod" name="paymentMethod">
                              <option value="Mastercard">Mastercard</option>
                              <option value="Visa">Visa</option>
                              <option value="American Express">American Express</option>
                              <option value="Discover">Discover</option>
                            </select>
                        </td>
                    </tr>   
                    <tr>
                        <td><label for="creditCardNo" id="creditCardNo_label">Credit Card Number:</label></td>
                        <td><input type="text" id="creditCardNo" name="creditCardNo"></td>
                    </tr>
                    <tr>
                        <td><label for="expireDate" id="expireDate_label">Expiration Date:</label></td>
                        <td><input type="text" id="expireDate" name="expireDate" placeholder="MM/YY"></td>
                    </tr>
                    <tr>
                        <td><label for="deliveryMethod" id="deliveryMethod_label">Delivery Method:</label></td>
                        <td><select name="deliveryMethod" id="deliveryMethod" name="deliveryMethod">
                              <option value="Overnight">Overnight</option>
                              <option value="2nd Day Air">2nd Day Air</option>
                              <option value="Ground shipment">Ground shipment</option>
                            </select>
                        </td>
                    </tr>
                </table>
                <input type="hidden" name="action" value="process_payment_on_purchase"/>
                <br/>
                <button id="submit" type="submit">Complete Order</button>
            </form>
        </div>
    </body>
</html>
