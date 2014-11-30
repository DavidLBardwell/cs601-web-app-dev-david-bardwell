// file: finalProjectYelp.js
// This javascript file contains the Yelp API call-out integration. The
// Yelp API is a PHP-based API which requires a specific set of keys for
// a more thorough authorization to the API. The file lib/OAuth.php contains
// the specific authorization implementation needed to call the Yelp API.

function yelpAPICallout(term, location, cll) {
    /* var term = 'restaurant';
    var location = '10 Wayside Road, Burlington, MA 01803';
    var cll = '42.4857853,-71.1911223'; */
    yelpResults = [];
            
    $.ajax({
        url: "php/yelpstub.php",
        data : {term : term, location : location, cll : cll },
        datatype : "json",
        complete: function(xhr, result) {
            if (result !== "success")
                return;
            // for some reason there is a bit of extra text before the JSON array
            var jsonDataArray = xhr.responseText.substr(xhr.responseText.indexOf('\['));
            var yelpJSONList = JSON.parse(jsonDataArray);
            for (var i = 0; i < yelpJSONList.length; i++) {
                // need to parse out each JSON string in each array element (I think)
                var nextJSONElement = JSON.parse(yelpJSONList[i]);
                yelpResults.push(nextJSONElement);
            }
            
            // match the current name of the restaurant and show reviews
            var matchIndex = -1;
            for (var i = 0; i < yelpResults.length; i++) {
                // See if we have a name match
                if (yelpResults[i].name === mapDataDetailObject.name) {
                    matchIndex = i;
                    break;
                }
                else {
                    // sometimes names may be a little different, try a phone number match
                    if (mapDataDetailObject.phoneNumber !== null) {
                        if (yelpResults[i].phone === mapDataDetailObject.phoneNumber) {
                            matchIndex = i;
                            break;
                        }
                    }
                }
            }
            
            // Only show a review if we got a location name match
            if (matchIndex !== -1) {
                if (yelpResults[matchIndex].reviews !== undefined) {
                    $("#YelpReviews").empty();
                    $("#YelpReviews").append("<h3>Review ratings comments for " + yelpResults[matchIndex].name + "</h3><br/>");
                    for (var i = 0; i < yelpResults[matchIndex].reviews.length; i++) {
                        var nextReview = yelpResults[matchIndex].reviews[i];
                        if (i === 0) {
                            $("#YelpReviews").append("<table><thead><tr><th>Rating</th><th>Comments</th></tr></thead>");
                            $("#YelpReviews").append("<tbody>");
                        }
                        $("#YelpReviews").append("<tr><td>" + nextReview.rating + "</td>");
                        $("#YelpReviews").append("<td>" + nextReview.excerpt + "</td></tr>");
                    }
                    $("#YelpReviews").append("</tbody></table><br/>");
                    
                    // show a rating image below the comments
                    $("#YelpReviews").append("<img src=" + yelpResults[matchIndex].reviews[0].rating_image_large_url + ">");
                }
            }
            else {
                $("#YelpReviews").empty();
                $("#YelpReviews").append("Sorry, location match not successful for a Yelp review search.");
            }
        }
    });
}
