// file: finalProjectMap.js
// This file contains all the javascript code to manage the Google Map API
// searchs. The following Google API are used:
//  Places  - google.maps.places.PlacesService
//  Geocode - maps.googleapis.com/maps/api/geocode


/**
 * function showMapFromCurrentLocation
 * 
 * This is called to show the initial search Google map when the user chooses
 * to start from their current location. We need to first get their current
 * location. We then show the search results based on their current location.
 * This function is re-entrant, and will create a new map object each time.
 */
function showMapFromCurrentLocation() {
    // asynchronous call with callback function specified
    var options = {
      enableHighAccuracy : true,
      timeout : 50000,
      maximumAge : 0
    };
    
    // Default to current location for the search. Other ways of establishing
    // the starting latitude and longitude will be provided.
    // Use geolocation service to get the user's current position
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

//
// initializePlaces
// 
// This is the main commonly shared function to display the Google map on
// the first start search tab. It is called in two cases.
// In the first case, it is called when the user starts their search from
// their current location. The second case, this function is called based
// on the location obtained from a highly accurate address to geo-coordinate
// lookup using the geocode address service.
// 
// Parameter: pos - a highly accurate location coordinate
//
//
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

    // now, get locations near the user's starting point
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
            var indicatedFromMapMarker = false;
            var visitedLink = false;
            if (place.rating !== undefined) {
                rating = place.rating;
            }    
            
            // save important places information 
            var jSONPlace = {title : title,
                             place_id : nextPlaceID,
                             icon : iconUrl,
                             latLong : nextLatLong,
                             content : content,
                             rating : rating,
                             indicatedFromMapMarker : indicatedFromMapMarker,
                             visitedLink : visitedLink};
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
              "' href='www.cnn.com'>" + nextMapData.title +
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
        $('a').click(function(e) {
            e.preventDefault();
            $(this).addClass('visited-link');
            var linkId = this.id;
            var offset = linkId.substr(12);
            mapData[offset].visitedLink = true;
            getDetailPlaces(offset);
            return false;
        });
        
        // center the link for the place in the map on the left
        $('button.mapButton').click(function() {
            var buttonId = this.id;
            var offset = buttonId.substr(9);
            map.panTo(mapData[offset].latLong);
        });
        
        // need to update address
        $('button.startFromHereButton').click(function() {
            var buttonId = this.id;
            var offset = buttonId.substr(19);
            $("#restartSearchLocation").html("Tailor search from " + mapData[offset].title);
            
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
        mapData[markerIndex].indicatedFromMapMarker = true;
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

// getDetailAddress is called by the Restart button which is next to a 
// location link. This is needed to get the official Google formatted address
// of the location. This in turn will allow us to get a highly accurate 
// coordinate to base a new nearby search on.
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
 * Note: This function is called when a user clicks on the location link
 *       on the right side of the first tab.
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
        mapDataDetailObject.formattedAddress = place.formatted_address;
        mapDataDetailObject.website = place.website;
        mapDataDetailObject.url = place.url;
        mapDataDetailObject.formattedPhoneNumber = place.formatted_phone_number;
        if (place.formatted_phone_number !== undefined) {
            mapDataDetailObject.phoneNumber = unformatPhoneNumber(place.formatted_phone_number);
        }
        else {
            mapDataDetailObject.phoneNumber = null;
        }
        
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
        var urlToShow = null;
        if (mapDataDetailObject.website !== undefined && 
            mapDataDetailObject.website !== null) {
            if (mapDataDetailObject.website.length > 0) {
                urlToShow = mapDataDetailObject.website;
            }
            else {
                urlToShow = mapDataDetailObject.url;
            }
        }
        else {
            urlToShow = mapDataDetailObject.url;
        }
        $("#locationTitle").html("<a href=" + urlToShow + ">" + mapDataDetailObject.name + "</a>");
        $("#locationPhone").html(mapDataDetailObject.formattedPhoneNumber);
        $("#locationAddress").html(mapDataDetailObject.formattedAddress);
        
        $("#locationHours").empty();
        if (place.opening_hours !== undefined) {
            if (place.opening_hours.weekday_text !== undefined) {
                for (var i = 0; i < place.opening_hours.weekday_text.length; i++) {
                    if (i === 0) {
                        $("#locationHours").append("<table id='hoursTable'><thead><tr><th>Hours</th></tr></thead>");
                    }
                    // need to in-line padding as css rule is not firing for some reason?
                    $("#locationHours").append("<tr><td style='padding:3px'>" + place.opening_hours.weekday_text[i] + "</td></tr>");
                }
                $("#locationHours").append("</table>");
            }
        }
        
        mapDataDetailObject.photoCount = photoCount;
        mapDataDetailObject.photoStart = 1;  // start with 2nd photo for automatic display
        
        // clear previous interval, if one was set
        if (mapDataDetailObject.photoDisplay !== undefined) {
            clearInterval(mapDataDetailObject.photoDisplay);
        }
        // rotate the images every 5 seconds
        mapDataDetailObject.photoDisplay = setInterval(function(){ showLocationImages(); }, 5000);
        
        // also, initially show the photos 
        $("#locationPhotos").empty();
        // show up to 4 photos at the top of the panel for now
        var photoLimit = (photoCount < 4 ? photoCount : 4);
        for (var i = 0; i < photoLimit; i++) {
            $("#locationPhotos").append("<img src='" + mapDataDetail[i].url + "'>");
            if (((i + 1) % 4) === 0) {
                $("#locationPhotos").append("<br>");
            }
        }
        
        // display the english turn-by-turn street directions on the 2nd detail
        // tab on the right side on the panel.
        showDirectionsOnDetailTab();
        
        // show the google review results
        if (place.reviews !== undefined) {
            $("#detailRatingsPanel").empty();
            for (var i = 0; i < place.reviews.length; i++) {
                if (i === 0) {
                    $("#detailRatingsPanel").append("<table><thead><tr><th>Rating</th><th>Comments</th></tr></thead>");
                    $("#detailRatingsPanel").append("<tbody>");
                }    
                $("#detailRatingsPanel").append("<tr><td>" + place.reviews[i].rating + "</td>");
                $("#detailRatingsPanel").append("<td>" + place.reviews[i].text + "</td></tr>");
            }
            $("#detailRatingsPanel").append("</tbody></table>");
        }
        
        // hide the map as it does not display correctly. There are well known
        // issues with using multiple jQuery ui tabs and Google Maps. The suggested 
        // workarounds caused other serious side effects or were based on
        // iframes which I have been instructed not to use.
        // We only show the turn-by-turn directions on the detail tab.
        $("#directionsMap").hide();
        $("#target").tabs( "enable", 1);
        $("#target").tabs( "enable", 2);
        $("#target").tabs("select", 1 );
        
        // finally, get the YELP information for the restaurant or other business
        var searchType = $("#searchSelection").val();
        // expand to all search types
        //if (searchType === 'restaurant') {
            var formattedAddress = purifyFormattedAddress(place.formatted_address);
            var lat = place.geometry.location.k;
            var long = place.geometry.location.B;
            cll = lat.toString() + "," + long.toString();
            
            yelpAPICallout(searchType, formattedAddress, cll);
        //}
    }
}

// automatically rotate through all available location images
function showLocationImages() {
    if (mapDataDetailObject.photoCount === 0) {
        $("#locationPhotos").empty();
        return;
    }
    
    $("#locationPhotos").empty();
    // create an array of indexes to show
    var photosToShow = [];
    
    // determine start index in photo array
    var startIndex = mapDataDetailObject.photoStart;
    if (startIndex >= mapDataDetailObject.photoCount) {
        mapDataDetailObject.photoStart = 0;
        startIndex = 0;
    }
    
    // little tricky to deal with all possible cases, so very carefully
    // get the indexes of the photos array into our photosToShow array
    var loopControl = true;
    var count = 0;
    var nextIndex = startIndex;
    while (loopControl === true) {
        if (nextIndex >= mapDataDetailObject.photoCount) {
            nextIndex = 0;
        }
        photosToShow.push(nextIndex);
        count++;
        nextIndex++;
        
        if (count >= mapDataDetailObject.photoCount) {
            loopControl = false;
        }
        else if (count === 4) {
            loopControl = false;
        }
    }
    
    // finally, display the next set of 4 photos in a carousel fashion
    var stopIndex = (mapDataDetailObject.photoCount < 4 ? mapDataDetailObject.photoCount : 4);
    for (var i = 0; i < stopIndex; i++) {
        $("#locationPhotos").append("<img src='" + mapDataDetail[photosToShow[i]].url + "'>");
        if (((i + 1) % 4) === 0) {
            $("#locationPhotos").append("<br>");
        }
    }
    mapDataDetailObject.photoStart++;
}

// This function is needed to get a highly accurate coordinate from an 
// address and uses the special Google geocode API. I have found that the
// Google nearby search does not return an accurate enough coordinate to work
// with the specific location getDetails.
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

// This function shows the directions on the main Google Map by drawing the
// directions directly on the Google Map.
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

// Helper function to actually display the route on the main Google Map on the
// first tab. Currently, the english set of direction instructions is not
// diplayed on the first tab, but is displayed on the 2nd detail places tab.
function calcRouteOnFirstMap(offset) {
    var start = startLocationForDirections;
    var end = mapData[offset].latLong;
    
    var googleTravelMode = google.maps.TravelMode.DRIVING;
    switch ($("#travelModeChoice").val()) {
        case 'Driving':
            googleTravelMode = google.maps.TravelMode.DRIVING;
            break;
        case 'Walking':
            googleTravelMode = google.maps.TravelMode.WALKING;
            break;
        case 'Bicycling':
            googleTravelMode = google.maps.TravelMode.BICYCLING;
            break;
        case "Transit":
            googleTravelMode = google.maps.TravelMode.TRANSIT;
            break;
    }
    
    var request = {
        origin:start,
        destination:end,
        travelMode: googleTravelMode
    };
  
    directionsService.route(request, function(response, status) {
        if (status === google.maps.DirectionsStatus.OK) {
            directionsDisplay.setDirections(response);
        }
    });
}


// 
// Main function for showing the driving turn-by-turn instructions on the
// detail places tab.
//
function showDirectionsOnDetailTab() {
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
    directionsDisplay.setMap(mapForDirections);  // currently not diplayed
    directionsDisplay.setPanel(document.getElementById("directionsPanel"));
    calcRouteOnDetailTab();
}

// helper function to calculate the driving instructions for the detail tab
// and present the driving instructions on the right-side of the panel.
function calcRouteOnDetailTab() {
    var start = startLocationForDirections;
    var end = mapDataDetailObject.location;
    var googleTravelMode = google.maps.TravelMode.DRIVING;
    switch ($("#travelModeChoice").val()) {
        case 'Driving':
            googleTravelMode = google.maps.TravelMode.DRIVING;
            break;
        case 'Walking':
            googleTravelMode = google.maps.TravelMode.WALKING;
            break;
        case 'Bicycling':
            googleTravelMode = google.maps.TravelMode.BICYCLING;
            break;
        case "Transit":
            googleTravelMode = google.maps.TravelMode.TRANSIT;
            break;
    }
    var request = {
        origin:start,
        destination:end,
        travelMode: googleTravelMode
    };
  
    directionsService.route(request, function(response, status) {
        if (status === google.maps.DirectionsStatus.OK) {
            directionsDisplay.setDirections(response);
        }
    });
}

// This function is needed to allow Google and Yelp to have similarly 
// formatted phone numbers. Yelp does not use any formatting so this
// function strips formatting from the Google Places phone number.
function unformatPhoneNumber(phone_number) {
    var compressPhoneNumber = "";
    
    for (var i = 0; i < phone_number.length; i++) {
        var nextPhoneChar = phone_number.charAt(i);
        if (nextPhoneChar >= '0' && nextPhoneChar <= '9') {
            compressPhoneNumber += nextPhoneChar;
        }
    }
    return compressPhoneNumber;
}

// For some reason, Google Places formatted_address may contain control
// characters and cause issues for Yelp. I will try to clean up any of
// these odd control characters.
function purifyFormattedAddress(formatted_address) {
    var cleanedUpFormattedAddress = "";
    
    for (var i = 0; i < formatted_address.length; i++) {
        var nextChar = formatted_address.charAt(i);
        if ( (nextChar >= '0' && nextChar <= '9') ||
             (nextChar >= 'A' && nextChar <= 'Z') ||
             (nextChar >= 'a' && nextChar <= 'z') ||
             (nextChar === ' ' || nextChar === ',' || nextChar === "." ||
              nextChar === "'" || nextChar === '&')) {

            cleanedUpFormattedAddress += nextChar;
        }
    }
    return cleanedUpFormattedAddress;
}
