// file: finalProjectMapUtil
// This file contains some utility functions to support the finalProjectMap.js
// implementation.
 
// sort the mapData by title or name alphabetically for the default order
// strangely, I could not find a generic sort utility so I just wrote this instead
function sortMapData(sortType) {
    // order the map data by name (title), rating, or distance
    var smallestTitle;
    var bestRating;
    var shortestDistance;
    var smallestIndex;
    var temp = {};
    
    if (mapData.length < 2) {
        return;
    }
    
    for (var i = 0; i < mapData.length - 1; i++) {
        if (sortType === 'title') {
            smallestTitle = mapData[i].title;
        }
        else if (sortType === 'rating') {
            bestRating = mapData[i].rating;
        }
        else if (sortType === 'distance') {
            shortestDistance = Math.sqrt(Math.pow((latitude - mapData[i].latLong.k), 2) + 
                                         Math.pow((longitude - mapData[i].latLong.B), 2));
        }
        smallestIndex = i;
        
        temp.title = mapData[i].title;
        temp.place_id = mapData[i].place_id;
        temp.icon = mapData[i].icon;
        temp.latLong = mapData[i].latLong;
        temp.content = mapData[i].content;
        temp.rating = mapData[i].rating;
        
        // find the smallest one from our starting position
        for (var j = i + 1 ; j < mapData.length; j++) {
            if (sortType === 'title') {
                if (smallestTitle > mapData[j].title) {
                    smallestIndex = j;
                    smallestTitle = mapData[j].title;
                }
            }
            else if (sortType === 'rating') {
                if (bestRating < mapData[j].rating) {
                    smallestIndex = j;
                    bestRating = mapData[j].rating;
                }
            }
            else if (sortType === 'distance') {
                checkNextDistance = Math.sqrt(Math.pow((latitude - mapData[j].latLong.k), 2) + 
                                              Math.pow((longitude - mapData[j].latLong.B), 2));
                if (checkNextDistance < shortestDistance) {
                    smallestIndex = j;
                    shortestDistance = checkNextDistance;
                }
            }
        }
        
        if (smallestIndex !== i) {
            // copy smallest into the next ith index
            mapData[i].title = mapData[smallestIndex].title;
            mapData[i].place_id = mapData[smallestIndex].place_id;
            mapData[i].icon = mapData[smallestIndex].icon;
            mapData[i].latLong = mapData[smallestIndex].latLong;
            mapData[i].content = mapData[smallestIndex].content;
            mapData[i].rating = mapData[smallestIndex].rating;
            
            // copy what is currenly at position i (from temp) to smallest index
            mapData[smallestIndex].title = temp.title;
            mapData[smallestIndex].place_id = temp.place_id;
            mapData[smallestIndex].icon = temp.icon;
            mapData[smallestIndex].latLong = temp.latLong;
            mapData[smallestIndex].content = temp.content;
            mapData[smallestIndex].rating = temp.rating;
        }
    }
}

// Read all possible Google Place search items from the items.xml file
// so this is not hard-coded.
function getGoogleSearchItems() {
    itemList = [];  // clear, just in case
    
    $.ajax({
        url : "items.xml",
        type : "GET",
        dataType: "xml",
        cache: false,
        success: function(result) {
            var response = result;
            // for each <item> element
            $(response).find("item").each (function() {
                var name = $(this).find("name").text();
                var item = {label : name, 
                            value : name,
                            data : {name : name}};
                itemList.push(item); 
            });
            $('#searchSelection').removeAttr("disabled");
        }
    });
}
