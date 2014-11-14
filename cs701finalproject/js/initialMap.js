// current location
var latitude, longitude;
var latLong;

// Google map
var map = null;
var service;

// create map
var createMap = true;

// map storage
var mapDataObject = {};
var mapData = [];

var mapDataDetailObject = {};
var mapDataDetail = [];

var itemList = [];
var markers = [];
var callbackCount;


/**
 * function showMap
 * 
 * This is called to show the initial search Google map when the user chooses
 * to start from their current location. We need to first get their current
 * location. We then show the search results based on their current location.
 * This function is re-entrant, and will create a new map object each time.
 */
function showMap() {
    // asynchronous call with callback function specified
    var options = {
      enableHighAccuracy : true,
      timeout : 50000,
      maximumAge : 0
    };
    
    // Default to current location for the search. Other ways of establishing
    // the starting latitude and longitude will be provided.
    navigator.geolocation.getCurrentPosition(
        displayInitialLocation, handleError, options);    
}

function displayInitialLocation(position) {

    latitude = position.coords.latitude;
    longitude = position.coords.longitude;
    
    initializePlaces(position.coords);
}

function handleError(error) {
    switch(error.code) {
        case 1:
            updateStatus("The user denied permission");
            break;
        case 2:
            updateStatus("Position is unavailable");
            break;
        case 3:
            updateStatus("Timed out");
            break;
    }
}

// show our error in the main status div
function updateStatus(message) {
    document.getElementById("status").innerHTML = 
        "<strong>Error</strong>: " + message;
}

//function showOnMap(pos) {
//    var googlePosition = 
//        new google.maps.LatLng(pos.latitude, pos.longitude);
//    latLong = googlePosition;
//    
//    var mapOptions = {
//        zoom: 15,
//        center: googlePosition,
//        mapTypeId: google.maps.MapTypeId.ROADMAP
//    };
//    
//    var mapElement = document.getElementById("map");
//    if (createMap === true) {
//        map = new google.maps.Map(mapElement, mapOptions);
//        createMap = false;
//    }
//    
//    var latlong = new google.maps.LatLng(latitude, longitude);
//
//    // pan to the most recent position
//    map.panTo(latlong);
//}

function initializePlaces(pos) {
    callbackCount = 0;
    var googlePosition = 
        new google.maps.LatLng(pos.latitude, pos.longitude);
    latLong = googlePosition;  
    
    map = new google.maps.Map(document.getElementById('map'), {
      center: latLong,
      zoom: 14
    });

    var request = {
        location: latLong,
        radius: $("#searchRadius").val(),
        types: [$("#searchSelection").val()]
    };

    service = new google.maps.places.PlacesService(map);
    service.nearbySearch(request, callbackPlaces);
}

function callbackPlaces(results, status,  pagination) {
    if (status === google.maps.places.PlacesServiceStatus.OK) {
        // reset mapData and search results for next search
        callbackCount++;
        mapData = [];
        if (markers.length > 0) {
            setAllMap(null);  // clear previous markers
        }
        
        markers = [];
        mapDataObject.pagination = pagination;
        $("#searchResultsTable").empty();
        
        // loop over results and display a link and add marker to the map
        for (var i = 0; i < results.length; i++) {
            var place = results[i];
            //console.log(place);
            var nextLatLong = place.geometry.location;
      
            // add the marker to the map
            var title = place.name;
            var iconUrl = place.icon;
            var content = "Lat: " + nextLatLong.B + 
                        ", Long: " + nextLatLong.k;
            
            addMarker(map, nextLatLong, title, content, iconUrl);
      
            $("#searchResultsTable").append("<tr><td><img id='locationImage" + i  + "'><a id='locationLink" + i +
                    "' class='dynamic-link' href='#'>" + title + "</a><button class='mapButton' id='mapButton" + i + "' type='button'>Map</button></td></tr>");
            
            // save important places information 
            var nextPlaceID = place.place_id;
            var jSONPlace = {title : title, place_id : nextPlaceID, icon : iconUrl, latLong : nextLatLong};
            mapData.push(jSONPlace);
        }
        
        $('#searchResultsTableHeader').html('Search Result');
        if (results.length > 0) {
            $('#searchResultsTableHeader').show();
        }
        else {
            $('#searchResultsTableHeader').hide();
        }
        
        if (results.length === 20 && callbackCount < 3) {
            $('#nextResultButton').show();
        }
        else {
            $('#nextResultButton').hide();
        }
        
        // need to dynamically bind the anchors, and this should work well
        $('a.dynamic-link').click(function() {
            var linkId = this.id;
            var offset = linkId.substr(12);
            getDetailPlaces(offset);
            return false;
        });
        
        // center the link for the place in the map on the left
        $('button.mapButton').click(function() {
            var buttonId = this.id;
            var offset = buttonId.substr(9);
            map.panTo(mapData[offset].latLong);
        });
        
        mapDataObject.mapData = mapData;
    }
    else if (status === "ZERO_RESULTS") {
        // reset mapData and search results for next search
        mapData = [];
        $('#searchResultsTableHeader').html('No Results Found');
        $('#searchResultsTableHeader').show();
        $("#searchResultsTable").empty();   
    }
}

// add position marker to the map
function addMarker(map, latlongPosition, title, content, iconUrl) {
   
    var options = {
        position: latlongPosition,
        map: map,
        title: title,
        icon : iconUrl,
        clickable: true
    };
    var marker = new google.maps.Marker(options);
    markers.push(marker);

    var popupWindowOptions = {
        content: title,
        position: latlongPosition
    };

    var popupWindow = new google.maps.InfoWindow(popupWindowOptions);

    google.maps.event.addListener(marker, 'click', function(e) {
        // show a check box next to the link for the marker the user just
        // clickedon
        var markerIndex = getIndexFromMarkerClickEvent(e.latLng);
        $('#locationImage' + markerIndex).prop('src', 'accept-Icon.png');
        popupWindow.open(map);
    });
}

// Sets the map on all markers in the array.
function setAllMap(map) {
  for (var i = 0; i < markers.length; i++) {
    markers[i].setMap(map);
  }
}

function getIndexFromMarkerClickEvent(latLong) {
    var index = -1;
    var eventLat = latLong.B;
    var eventLng = latLong.k;
    
    for (var i = 0; i < mapData.length; i++) {
        var nextLat = mapData[i].latLong.B;
        var nextLng = mapData[i].latLong.k;
        if (eventLat === nextLat && eventLng === nextLng) {
            index = i;
            break;
        }
    }
    return index;
}

/**
 * function getDetailPlaces()
 * @argument location_offset - index into mapData to show detail
 * This gets specific detail information about a specific place
 * 
 */
function getDetailPlaces(location_offset) {
    // test - see if we can get the detail places call to work
    var request = {
        placeId: mapDataObject.mapData[location_offset].place_id
    };

    service = new google.maps.places.PlacesService(map);
    service.getDetails(request, callbackDetail);
}    

function callbackDetail(place, status) {
    if (status === google.maps.places.PlacesServiceStatus.OK) {
        
        mapDataDetailObject.name = place.name;
        mapDataDetailObject.location = place.geometry.location;
        mapDataDetail = [];
        
        // display all the photos, note: need to check if there are any
        var photoCount = 0;
        var photos = null;
                
        if (place.hasOwnProperty('photos') === true) {
            photos = place.photos;
            photoCount = photos.length;
        }
        
        for (var i = 0; i < photoCount; i++) {
            var urlPhoto = photos[i].getUrl({ 'maxWidth': 200, 'maxHeight': 200 });
            var jSONData = {url : urlPhoto};
            
            // remove duplicate photos which are present on Google for some reason?
            found = false;
            for (var j = 0; j < mapDataDetail.length; j++) {
                if (jSONData.url === mapDataDetail[j].url) {
                    found = true;
                }
            }
            
            if (found === false) {
                mapDataDetail.push(jSONData);
                //$("#output").append("<p>" + jSONData.url + "</p>");
            }    
        }
        
        // display the details screen
        $("#locationTitle").html(mapDataDetailObject.name);
        
        $("#photos").empty();
        for (var i = 0; i < mapDataDetail.length; i++) {
            $("#photos").append("<img src='" + mapDataDetail[i].url + "'>");
            if (((i + 1) % 4) === 0) {
                $("#photos").append("<br>");  // break them out 4 to a line
            }
        }
        
        $("#target").tabs("select", 1 );
    }
}

function getStreetViewPhoto() {
    
    var location = mapDataDetailObject.location;
    var latitude = location.B;
    var longitude = location.k;

    //var imageURL = 'https://maps.googleapis.com/maps/api/streetview?size=400x400&location=' + latitude + ',' + longitude + '&key=AIzaSyCQ74ly4xXn1cadZECibp-kXDYxk_7KyTw';
    //var imageURL = 'https://maps.googleapis.com/maps/api/streetview?size=400x400&location=40.720032,-73.988354&key=AIzaSyCQ74ly4xXn1cadZECibp-kXDYxk_7KyTw';
    //40.720032,-73.988354
    $("#streeViewPhoto").prop("src", 'https://maps.googleapis.com/maps/api/streetview?size=400x400&location=' + latitude + ',' + longitude + '&key=AIzaSyCQ74ly4xXn1cadZECibp-kXDYxk_7KyTw');
    //$("#streeViewPhoto").prop("src", 'https://maps.googleapis.com/maps/api/streetview?size=400x400&location=40.720032,-73.988354&key=AIzaSyCQ74ly4xXn1cadZECibp-kXDYxk_7KyTw');
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

function getPositionFromAddress(address) {
    //var testAddress = "10 Van de Graaff Drive, Burlington, MA";
    address = encodeURIComponent(address);
    
    $.ajax({
        url: 'https://maps.googleapis.com/maps/api/geocode/json?address=' + address + '&key=AIzaSyCQ74ly4xXn1cadZECibp-kXDYxk_7KyTw',
                            
        success: function(data, status, xhr) {
            // get the location from the data object
            if (xhr.status === 200) {
                // TODO: check the data object more closely in case there is a problem
                var location = data.results[0].geometry.location;
                var pos = {latitude : location.lat, longitude : location.lng};
                initializePlaces(pos);
            }
        }
    });    
}
