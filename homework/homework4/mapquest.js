
var mapQData = [];    // list of direction details
var mapQObject = {};  // parent container data object

$(function() {
    getInitialDirections();
    
   
});

function getInitialDirections() {
    var startingCity = 'Boston, MA';
    var endingCity = 'New York, NY';
    
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
                for (var i = 0; i < mapQObject.mapQData.length; i++) {
                    $("#directionList").append("<li><a href='" + mapQObject.mapQData[i].mapUrl + "'>" + mapQObject.mapQData[i].narrative + "</li>");
                }
                
                // Very imporant! Need to refresh the listview to see the css applied correctly
                $("#directionList").listview('refresh');
                
                // verify output
                //console.log(mapQObject);
            }
        }
    });
}
