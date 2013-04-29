// This is the javascript file to support the main bookstore view page.
// AJAX is used to communicate updates to the cart for example adding
// or removing a book from the cart. The SESSION object holds the state
// of the cart. In this way, the cart is persisted across multiple pages.

            // Called when the DOM is ready. Set up static listeners and
            // other initializations. 
            $(document).ready(function() {
                // set the table to just display 5 books at a time.
                // Also, make sure the book link manages the image correctly
                // so set callback on each row loaded to initialize the link
                // handler.
                $('#books').dataTable( {
                    'iDisplayLength' : 5,
                    'fnRowCallback': initializeBookDetailLinkEvents()
                });
                
                // Establish handler for changing book catagory selection
                $("#bookCategory").on("change", handleBookCategorySelection);
                
                // Initialize the book details link handler
                initializeBookDetailLinkEvents();
            });
            
            function searchValidation() {
                // Make sure there is some text in the search text field
                searchText = $("#searchField").val();
                ret = true;
                if (searchText == null || searchText.length == 0) {
                    $("#searchErrorText").html('<span>Please enter some search text</span>');
                    ret = false;
                }
                else {
                    $("#searchErrorText").html('');
                }
                return ret;
            }

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
            
            // Customer selects a new book category.
            function handleBookCategorySelection() {
                var categorySelected = $("#bookCategory :selected").val();
                
                // use post to get the new books to show based on the selected category
                // just reload the full page again with the new information.
                $.post(
                    "index.php",
                    {action : 'categorySelectionChanged', book_category : categorySelected },
                    function(result){
                        window.location = 'index.php?action=redisplay_bookstore_page';  // force a page reload
                    }
                    
                      // The code below did not work as there are very complex interactions
                      // with jQuery/ajax and the dataTable. I believe with a lot of
                      // work it may be possible to get dataTables to work with an
                      // external ajax approach but is so complex, let us abandon this
                      // and just simply reload the full page.
//                    success: function(data, status, xhr) {
//                        $("#bookbody").html(data);  // note: data is the html
//                        $("#bookcategorycaption").html('Books available for category ' + categorySelected);
//                        initializeBookDetailLinkEvents(); // must re-bind links
//                    }
                );
                return true;
            }
                
            // Add book to cart, this is called directly off the button onclick directive
            function addBookToCart(bookId) {
            
                // build the data out with complete information
                debugger;
                var hiddenDataElement = document.getElementById("hdata" + bookId);
                var bookData = hiddenDataElement.value;
                
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
                window.document.location.href="index.php?action=proceed_to_checkout";
            }