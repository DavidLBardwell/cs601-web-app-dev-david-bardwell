
window.onload = init;
var url = "ws://echo.websocket.org";
var socket;
var counter = 0;

// current location
var latitude, longitude;

// Google map
var map = null;

// Path
var path = [];

// register the event handlers for buttons
function init() {
    var startButton = document.getElementById("startButton");
    startButton.onclick = connectToServer;
}

function connectToServer() {
    // create the WebSocket object
    socket = new WebSocket(url);
   
    // event handlers for the WebSocket
    socket.onopen = handleOpenConnection;
    socket.onclose = handleCloseConnection;  // not currently used by client
    socket.onerror = handleError;
    socket.onmessage = handleMessage;
    
    // disable the start button so it cannot be clicked on again.
    document.getElementById("startButton").disabled = true;
    getLocation();
}

function disconnectFromServer() {
    // close the WebSocket
    socket.close();
}

// sending a message to the WebSocket server
function sendToServer() {
    if (socket)
    {
        var changeInLatitude = Math.random()/100;
        var changeInLongitude = Math.random()/100;
        var data = JSON.stringify({latitude: changeInLatitude, longitude : changeInLongitude});
        socket.send(data);
    }
}

// WebSocket event handlers
function handleOpenConnection(event) {
    //log("Open");
    setInterval(sendToServer, 5000);
}

function handleCloseConnection(event) {
    //log("Close");
    socket = null;
}

// This is the WebSocket callback message handler function or onmessage
// event handler.
// The client receives a message from the server once every 5 seconds.
// We parse the stringified JSON object back into an object so
// we can easily get the data for latitude and longitude.
function handleMessage(event) {
    var data = JSON.parse(event.data);
    updateLocation(data);
}

// the client handles an error condition, just log it for now
function handleError(event) {
    log("Error:" + event.data);
}

// the log method appends to out page's output area the new information.
function log(message) {
    var pre = document.createElement("p");
    pre.innerHTML = message;
    var output = document.getElementById("status");
    output.appendChild(pre);
}

// Upon startup and do only once, get the starting location and
// display it via the geolocation API.
function getLocation() {

    // asynchronous call with callback function specified
    var options = {
      enableHighAccuracy : true,
      timeout : 50000,
      maximumAge : 0
    };
    
    navigator.geolocation.getCurrentPosition(
        displayInitialLocation, handleError, options);
}

// Display the initial latitude and longitude
function displayInitialLocation(position) {

    counter = counter + 1;
    latitude = position.coords.latitude;
    longitude = position.coords.longitude;

    document.getElementById("updateNumValue").innerHTML = counter;
    document.getElementById("startLatValue").innerHTML = latitude;
    document.getElementById("startLonValue").innerHTML = longitude;
    document.getElementById("curLatValue").innerHTML = latitude;
    document.getElementById("curLonValue").innerHTML = longitude;
    
    showOnMap(position.coords, true);
}

// Display the updated latitude and longitude
function updateLocation(data) {
    counter = counter + 1;
    document.getElementById("updateNumValue").innerHTML = counter;
    
    var changeLat = data.latitude;
    var changeLon = data.longitude;
    
    // retrive the current latitude and longitude
    var currentLat = document.getElementById("curLatValue").innerHTML;
    var currentLon = document.getElementById("curLonValue").innerHTML;
    currentLat = parseFloat(currentLat);
    currentLon = parseFloat(currentLon);
    
    // update the current latitude and longitude values and display them
    // move west and south since Salem, MA is next to the ocean.
    currentLat -= changeLat;
    currentLon -= changeLon;
    document.getElementById("curLatValue").innerHTML = currentLat;
    document.getElementById("curLonValue").innerHTML = currentLon;
    latitude = currentLat;
    longitude = currentLon;
    
    var positionData = {latitude : latitude, longitude : longitude};
    showOnMap(positionData, false);
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

// show initial and new positions on the map. This includes
// both position markers and lines that connect all the markers.
// note: the createMap argument is needed to know if we need to create
//       the Google map. It is true on the first invocation.
function showOnMap(pos, createMap) {
    
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
    }  
    
    // add the marker to the map
    var title = "Location Details";
    var content = "Lat: " + pos.latitude + 
                    ", Long: " + pos.longitude;
                    
    addMarker(map, googlePosition, title, content);    
    showPath();
}

// add position marker to the map
function addMarker(map, latlongPosition, title, content) {
   
    var options = {
        position: latlongPosition,
        map: map,
        title: title,
        clickable: true
    };
    var marker = new google.maps.Marker(options);

    var popupWindowOptions = {
        content: content,
        position: latlongPosition
    };

    var popupWindow = new google.maps.InfoWindow(popupWindowOptions);

    google.maps.event.addListener(marker, 'click', function() {
        popupWindow.open(map);
    });
}

function showPath()
{
  // push most recent position on path.
  var latlong = new google.maps.LatLng(latitude, longitude);
  path.push(latlong);
  
  // only draw path if there is at least two coordinates
  if (path.length > 1) {
      var line = new google.maps.Polyline({
          path : path,
          strokeColor : '#0000ff',
          strokeOpacity : 1.0,
          strokeWeight : 3
      });
      line.setMap(map);
  }    

  // pan to the most recent position
  map.panTo(latlong);
}
