
var mapQData = [];    // list of direction details
var mapQObject = {};  // parent container data object

// On page load, show the initial Boston, MA to New York, NY directions
$(function() {
    getInitialDirections();
});

function getInitialDirections() {
    var startingCity = 'Boston, MA';
    var endingCity = 'New York, NY';
    
    // leverage power of jQuery selector to find both input text search fields
    // to avoid code duplication for each of the two input text search fields
    $("#content_div :input").bind("change", function( event ) {
        startingCity = $("#from").val();
        endingCity = $("#to").val();
        
        // make sure have non-empty fields for both
        if (startingCity.length > 0 && endingCity.length > 0) {
            getDirections(startingCity, endingCity);
        }    
    });
    
    getDirections(startingCity, endingCity);
}

function getDirections(startingCity, endingCity) {
    startingCity = encodeURIComponent(startingCity);
    endingCity = encodeURIComponent(endingCity);

    // This is the jQuery/ajax invocation based on the mapquest api
    $.ajax({
        url: 'http://www.mapquestapi.com/directions/v1/route?key=mjtd%7Clu61200ynl%2Cas%3Do5-50ylq&from=' + startingCity + '&to=' + endingCity,
                            
        // In non-callback mode, this is called in-line.
        // In this implementation this function is not called.
        success: function(data, status, xhr) {
            // on success go ahead and populate all the direction details
            if (xhr.status === 200) {
                mapQObject.distance = data.route.distance;
                mapQObject.totalTime = data.route.formattedTime;
                mapQData = [];  // clear the array, if making a subsequent call
                
                var directionItems = data.route.legs[0].maneuvers;
                for (var i = 0; i < directionItems.length; i++) {
                    var directionItem = directionItems[i];
                    var narrativeInfo = directionItem.narrative;
                    var distanceInfo = directionItem.distance;
                    var mapUrlInfo = directionItem.mapUrl;
                    var iconUrlInfo = directionItem.iconUrl;
                    var directionItemJSON = {narrative : narrativeInfo, 
                                             distance : distanceInfo,
                                             mapUrl : mapUrlInfo,
                                             iconUrl : iconUrlInfo};
                    mapQData.push(directionItemJSON);
                }
                mapQObject.mapQData = mapQData;
                
                $("#directionList").empty();
                $("#directionList").append("<li>Trip Summary</li>");
                $("#directionList").append("<li style='background-color: white'>Distance = " + mapQObject.distance + "m Time = " + 
                                            mapQObject.totalTime + "h</li>");
                $("#directionList").append("<li>Turn by Turn Directions</li>");

                for (var i = 0; i < mapQObject.mapQData.length; i++) {
                    var directionStep = i + 1;
                    $("#directionList").append("<li><img src='" + mapQObject.mapQData[i].iconUrl + "'><a href='" + mapQObject.mapQData[i].mapUrl + "'>" + directionStep + ". " + 
                                                mapQObject.mapQData[i].narrative + "[" + mapQObject.mapQData[i].distance + "m ]</li>");
                }
                
                // Very imporant! Need to refresh the listview to see the css applied correctly
                $("#directionList").listview('refresh');
            }
        }
    });
}
