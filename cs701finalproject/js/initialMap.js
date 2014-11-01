window.onload = init;

// current location
var latitude, longitude;

// Google map
var map = null;

// create map
var createMap = true;

// handle the go button click event
//$( "#goButton" ).click(function() {
//  showMap();
//});

// register the event handlers for buttons
function init() {
    var startButton = document.getElementById("goButton");
    startButton.onclick = showMap;
}

function showMap() {
    // asynchronous call with callback function specified
    var options = {
      enableHighAccuracy : true,
      timeout : 50000,
      maximumAge : 0
    };
    
    navigator.geolocation.getCurrentPosition(
        displayInitialLocation, handleError, options);    
}

function displayInitialLocation(position) {

    latitude = position.coords.latitude;
    longitude = position.coords.longitude;
    
    showOnMap(position.coords);
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

function showOnMap(pos) {
    var googlePosition = 
        new google.maps.LatLng(pos.latitude, pos.longitude);
    
    var mapOptions = {
        zoom: 15,
        center: googlePosition,
        mapTypeId: google.maps.MapTypeId.ROADMAP
    };
    
    var mapElement = document.getElementById("map");
    if (createMap === true) {
        map = new google.maps.Map(mapElement, mapOptions);
        createMap = false;
    }
    
    var latlong = new google.maps.LatLng(latitude, longitude);

    // pan to the most recent position
    map.panTo(latlong);
}
