// file: finalProjectMapUtil
// This file contains some utility functions to support the finalProjectMap.js
// implementation.
 
// sort the mapData by title or name alphabetically for the default order
// strangely, I could not find a generic sort utility so I just wrote this instead
function sortMapData() {
    // order the map data by name alphabetically
    var smallestTitle;
    var smallestIndex;
    var temp = {};
    
    if (mapData.length < 2) {
        return;
    }
    
    for (var i = 0; i < mapData.length - 1; i++) {
        smallestTitle = mapData[i].title;
        smallestIndex = i;
        
        temp.title = mapData[i].title;
        temp.place_id = mapData[i].place_id;
        temp.icon = mapData[i].icon;
        temp.latLong = mapData[i].latLong;
        temp.content = mapData[i].content;
        
        // find the smallest one from our starting position
        for (var j = i + 1 ; j < mapData.length; j++) {
            if (smallestTitle > mapData[j].title) {
                smallestIndex = j;
                smallestTitle = mapData[j].title;
            }
        }
        
        if (smallestIndex !== i) {
            // copy smallest into the next ith index
            mapData[i].title = mapData[smallestIndex].title;
            mapData[i].place_id = mapData[smallestIndex].place_id;
            mapData[i].icon = mapData[smallestIndex].icon;
            mapData[i].latLong = mapData[smallestIndex].latLong;
            mapData[i].content = mapData[smallestIndex].content;
            
            // copy what is currenly at position i (from temp) to smallest index
            mapData[smallestIndex].title = temp.title;
            mapData[smallestIndex].place_id = temp.place_id;
            mapData[smallestIndex].icon = temp.icon;
            mapData[smallestIndex].latLong = temp.latLong;
            mapData[smallestIndex].content = temp.content;
        }
    }
}

function getGoogleSearchItems() {
    // Read all possible Google Place search items from the items.xml file
    // so this is not hard-coded.
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