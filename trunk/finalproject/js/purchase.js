// The payment page needs to do a good job of validating a credit card number
// and its expiration date. The paymentValidation() function performs a pretty
// thorough validation. All errors are reported to the user and the submit does
// not go through until a valid credit card number and expiration date are provided.


            function paymentValidation() {
                ret = true;
                
                // Do basic sanity checking on credit card number and expiration date.
                // This is not completely exhaustive but will catch a vast number of errors.
                // The logic will flow to each test and if all tests fail that
                // means the credit card and expiration date did not match a failing test case
                // and are thus valid enough.

                // First check credit card number.
                var creditCardNo = $("#creditCardNo").val();
                if (creditCardNo === null || creditCardNo.length === 0) {
                    // override the style to make the color orange in-line overrides everybody
                    $("#validateError").html('<p style="color:orange">The credit card number cannot be empty.</p>');
                    ret = false;
                }
                else if (isNaN(creditCardNo) === true) {
                    $("#validateError").html('<p>The credit card number must be all numbers.</p>');
                    ret = false;
                }
                else if (creditCardNo.length < 15 || creditCardNo.length > 16) {
                    $("#validateError").html('<p>The credit card number must be 15 or 16 digits depending on the card.</p>');
                    ret = false;
                }
                
                // Now check expiration date.
                var currentDate = new Date();
                var currentMonth = currentDate.getMonth() + 1;
                var currentYear = currentDate.getFullYear();
                if (ret === true)  {
                    var expireDate = $("#expireDate").val();
                    if (expireDate === null || expireDate.length === 0) {
                        // override the style to make the color orange in-line overrides everybody                    
                        $("#validateError").html('<p style="color:orange">The expiration date cannot be empty.</p>');
                        ret = false;
                    }
                    else {
                        var indexOfSlash = expireDate.indexOf("/");
                        if (indexOfSlash === -1) {
                            $("#validateError").html('<p>The expiration date is not formatted as MM/YY.</p>');
                            ret = false;
                        }
                        else {
                            var pieces = expireDate.split("/");
                            var month = pieces[0];
                            var year = pieces[1];
                            if (isNaN(month) === true || isNaN(year === true)) {
                                $("#validateError").html('<p>The expiration date is not formatted as MM/YY properly.</p>');
                                ret = false;
                            }
                            else {
                                // make sure the values are reasonable
                                if (month < 1 || month > 12) {
                                    $("#validateError").html('<p>The expiration date has an invalid month must be 1 to 12.</p>');
                                    ret = false;
                                }
                                else {
                                    // not sure how far out some credit cards are valid go to 2018 for this test
                                    year = parseInt(year);
                                    year = year + 2000;
                                    if (year < currentYear || year > currentYear + 5) {
                                        $("#validateError").html('<p>The expiration date has an invalid year must be 2013 to 2018.</p>');
                                        ret = false;
                                    }
                                    else {
                                        // finally, make sure the expiration date is not prior to the current date
                                        // Credit cards normally expire at the end of the month
                                        if (year === currentYear && month < currentMonth) {
                                            $("#validateError").html('<p>The credit card has already expired.</p>');
                                            ret = false;
                                        }
                                    }    
                                }
                            }    
                        }
                    }
                }    
                return ret;
            }