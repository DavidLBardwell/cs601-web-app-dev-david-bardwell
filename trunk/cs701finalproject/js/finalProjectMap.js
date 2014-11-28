// file: finalProjectMap.js
// This file contains all the javascript code to manage the Google Map API
// searchs. The following Google API are used:
// Places - google.maps.places.PlacesService


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
    
    if (setStartLocationForDirections === true) {
        setStartLocationForDirections = false;
        startLocationForDirections = googlePosition;
    }
    
    map = new google.maps.Map(document.getElementById('map'), {
      center: latLong,
      zoom: 15
    });
    
    // add initial marker on map for our starting location
    addMarker(map, startLocationForDirections, "You are here", null, null);

    var typesForSearch;
    if ($("#searchSelection").val() === 'restaurant') {
        typesForSearch = ['restaurant', 'bar'];
    }
    else {
        typesForSearch = [$("#searchSelection").val()];
    }
    
    var request = {
        location: latLong,
        radius: $("#searchRadius").val(),
        types: typesForSearch
    };

    service = new google.maps.places.PlacesService(map);
    service.nearbySearch(request, callbackPlaces);
}

/**
 *   callbackPlaces - handle callback to the initial places search
 *   This function is re-entrant if called for next 20 results via
 *   the pagination object.
 *   The function populates the populates and sorts the mapData array.
 *   Also adds a map marker for each location.
 * @param {type} results
 * @param {type} status
 * @param {type} pagination
 * @returns nothing
 */
function callbackPlaces(results, status,  pagination) {
    if (status === google.maps.places.PlacesServiceStatus.OK) {
        // reset mapData and search results for next search
        var i;
        callbackCount++;
        mapData = [];
        if (markers.length > 0) {
            setAllMap(null);  // clear previous markers
        }
        
        markers = [];
        addMarker(map, startLocationForDirections, "You are here", null, null);
        markers.push(youAreHereMarker);
        mapDataObject.pagination = pagination;
        $("#searchResultsTable").empty();
        
        // loop over results and display a link and add marker to the map
        for (i = 0; i < results.length; i++) {
            var place = results[i];
            var title = place.name;
            
            // make sure the name is not too long
            if (title.length > 35) {
                title = title.substring(0, 35);
            }
            var nextPlaceID = place.place_id;
            var nextLatLong = place.geometry.location;
            var iconUrl = place.icon;
            var content = "Lat: " + nextLatLong.B + 
                        ", Long: " + nextLatLong.k;
            var rating = 0;
            if (place.rating !== undefined) {
                rating = place.rating;
            }    
            
            // save important places information 
            var jSONPlace = {title : title,
                             place_id : nextPlaceID,
                             icon : iconUrl,
                             latLong : nextLatLong,
                             content : content,
                             rating : rating};
            mapData.push(jSONPlace);
        }
        
        // sort the data by location title or rating
        var orderChoice = $("#orderChoice").val();
        sortMapData(orderChoice);
        
        // add the link and the map marker after sorting
        for (i = 0; i < mapData.length; i++) {
            var nextMapData = mapData[i];
            addMarker(map, nextMapData.latLong, nextMapData.title, nextMapData.content, nextMapData.icon);
            
            // TODO: clean this code up with better DOM management
            $("#searchResultsTable").append("<tr><td><img id='locationImage" + i +
              "'><a id='locationLink" + i +
              "' class='dynamic-link' href='#'>" + nextMapData.title +
              "</a><button class='mapButton' id='mapButton" + i + 
              "' type='button'>Center</button>" + 
              "<button class='startFromHereButton' id='startFromHereButton" + i +
              "' type='button'>Restart</button>" +
              "<button class='directionsButton' id='directionsButton" + i +
              "' type='button'>Directions</button>" +              
              "</td></tr>");
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
        
        // need to update address and set radius to 500 for now
        $('button.startFromHereButton').click(function() {
            var buttonId = this.id;
            var offset = buttonId.substr(19);
            
            getDetailAddress(offset);
        });
        
        // test, see how well we can add directions to first map
        $('button.directionsButton').click(function() {
            var buttonId = this.id;
            var offset = buttonId.substr(16);
            
            showDirectionsOnFirstMap(offset);
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
    
    if (title === 'You are here') {
        youAreHereMarker = marker;
    }

    var popupWindowOptions = {
        content: title,
        position: latlongPosition
    };

    var popupWindow = new google.maps.InfoWindow(popupWindowOptions);

    google.maps.event.addListener(marker, 'click', function(e) {
        // show a check box next to the link for the marker the user just
        // clicked on
        var markerIndex = getIndexFromMarkerClickEvent(e.latLng);
        $('#locationImage' + markerIndex).prop('src', 'accept-Icon.png');
        popupWindow.open(map);
    });
}

// Sets the map on all markers in the array.
function setAllMap(map) {
    // Keep initial you are here marker
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

function getDetailAddress(location_offset) {
   var request = {
        placeId: mapDataObject.mapData[location_offset].place_id
    };

    service = new google.maps.places.PlacesService(map);
    service.getDetails(request, callbackAddressDetail);
}

function callbackAddressDetail(place, status) {
    if (status === google.maps.places.PlacesServiceStatus.OK) {
        formattedAddress = place.formatted_address;
        getPositionFromAddress(formattedAddress, false);
    }
}   

/**
 * function getDetailPlaces()
 * @argument location_offset - index into mapData to show detail
 * This gets specific detail information about a specific place
 * 
 */
function getDetailPlaces(location_offset) {
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
        // show up to 4 photos at the top of the panel for now
        var photoLimit = (photoCount < 4 ? photoCount : 4);
        for (var i = 0; i < photoLimit; i++) {
            $("#photos").append("<img src='" + mapDataDetail[i].url + "'>");
            if (((i + 1) % 4) === 0) {
                $("#photos").append("<br>");  // break them out 4 to a line
            }
        }
        
        showDirections();
        $("#directionsMap").hide();  // hide the map as it does not display correctly
        $("#target").tabs("select", 1 );
        
    }
}

function getPositionFromAddress(address, setInitialPosition) {
    address = encodeURIComponent(address);
    
    $.ajax({
        url: 'https://maps.googleapis.com/maps/api/geocode/json?address=' + address + '&key=AIzaSyCQ74ly4xXn1cadZECibp-kXDYxk_7KyTw',
                            
        success: function(data, status, xhr) {
            // get the location from the data object
            if (xhr.status === 200) {
                // TODO: check the data object more closely in case there is a problem
                var location = data.results[0].geometry.location;
                var pos = {latitude : location.lat, longitude : location.lng};
                if (setInitialPosition === true) {
                    latitude = pos.latitude;
                    longitude = pos.longitude;
                }
                initializePlaces(pos);
            }
        }
    });    
}

function showDirectionsOnFirstMap(offset) {
    if (directionsService === null) {
        directionsService = new google.maps.DirectionsService();
    }
    
    // clear previous route information
    $("#directionsPanelFirstTab").empty();
    
    directionsDisplay = new google.maps.DirectionsRenderer();
    
    var mapOptions = {
        center: startLocationForDirections,
        zoom: 14
    };
    
    directionsDisplay.setMap(map);
    directionsDisplay.setPanel(document.getElementById("directionsPanelFirstTab"));
    calcRouteOnFirstMap(offset);    
}

function calcRouteOnFirstMap(offset) {
    var start = startLocationForDirections;
    var end = mapData[offset].latLong;
    var request = {
        origin:start,
        destination:end,
        travelMode: google.maps.TravelMode.DRIVING
    };
  
    directionsService.route(request, function(response, status) {
        if (status === google.maps.DirectionsStatus.OK) {
            directionsDisplay.setDirections(response);
        }
    });
}


function showDirections() {
    if (directionsService === null) {
        directionsService = new google.maps.DirectionsService();
    }
    
    // clear previous route information
    $("#directionsPanel").empty();
    
    directionsDisplay = new google.maps.DirectionsRenderer();
    
    var mapOptions = {
        center: startLocationForDirections,
        zoom: 14
    };
    
    mapForDirections = new google.maps.Map(document.getElementById("directionsMap"), mapOptions);
    directionsDisplay.setMap(mapForDirections);
    directionsDisplay.setPanel(document.getElementById("directionsPanel"));
    calcRoute();
}

function calcRoute() {
    var start = startLocationForDirections;
    var end = mapDataDetailObject.location;
    var request = {
        origin:start,
        destination:end,
        travelMode: google.maps.TravelMode.DRIVING
    };
  
    directionsService.route(request, function(response, status) {
        if (status === google.maps.DirectionsStatus.OK) {
            directionsDisplay.setDirections(response);
        }
    });
}

