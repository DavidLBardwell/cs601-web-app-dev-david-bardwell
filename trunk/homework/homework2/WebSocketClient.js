/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
window.onload = init;
var url = "ws://echo.websocket.org";
var socket;

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
    
    // call the sendToServer every 5 seconds or 5000 milliseconds and
    // disable the start button so it cannot be clicked on again.
    setInterval(sendToServer, 5000);
    document.getElementById("startButton").disabled = true;
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
        var data = JSON.stringify({lat: changeInLatitude, lon : changeInLongitude});
        socket.send(data);
    }
    else
    {
        log("Not Connected");    
    }
}

// WebSocket event handlers
function handleOpenConnection(event) {
    log("Open");
}

function handleCloseConnection(event) {
    log("Close");
    socket = null;
}

// the client receives a message from the server.
// We parse the stringified JSON object back into an object so
// we can easily get the data for latitude and longitude.
function handleMessage(event) {
    var data = JSON.parse(event.data);
    log("Received: Lat: " + data.lat + " Lon: " + data.lon);
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
