// file: finalProjectYelp.js
// This javascript file contains the Yelp API call-out integration. The
// Yelp API is a PHP-based API which requires a specific set of keys for
// a more thorough authorization to the API. The file lib/OAuth.php contains
// the specific authorization implementation needed to call the Yelp API.

function testYelpAPI() {
    // TODO: will need to constuct a data list for a post for the
    // search type and details
            
    $.ajax({
        url: "php/callstub.php",
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
                console.log(nextJSONElement.id);
                console.log(nextJSONElement.name);
            }
        }
    });
}
