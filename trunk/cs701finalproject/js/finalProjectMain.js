// File: finalProject.js
// This java script file contains the top-level initial function and is
// based on JQuery.

// current location
var latitude, longitude;
var latLong;
var startLocationForDirections;
var setStartLocationForDirections;

// Google map
var map = null;
var mapForDirections = null;
var service;

// create map
var createMap = true;

// map storage
var mapDataObject = {};
var mapData = [];
var mapDataCurrentIndex = 0;

var mapDataDetailObject = {};
var mapDataDetail = [];

var itemList = [];
var markers = [];
var youAreHereMarker;
var callbackCount;

var directionsDisplay;
var directionsService=null;

var formattedAddress;

var yelpResults = [];


// JQuery initialize function
$(function() {
    var options = {event: "click",
    fx: {opacity : "toggle", 
        duration: "fast"}};
    $("#target").tabs(options);
    $("#map").hide();
    $('#searchSelection').attr("disabled", "disabled");
    $("#previousResultButton").hide();
    $('#nextResultButton').hide();
    $('#searchResultsTableHeader').hide();
    $("#directionsPanelFirstTab").hide();
            
    // TODO: load from local storage, if empty default the following
    favoriteAddresses = [];
    favoriteAddresses.push("9 Saltonstall Parkway, Salem, MA");
    favoriteAddresses.push("10 Van de Graaff Drive, Burlington, MA");
    favoriteAddresses.push("808 Commonwealth Ave, Boston, MA");
            
    // add our favorite addresses - hard code for now
    for (var i = 0; i < favoriteAddresses.length; i++) {
        $("#favoriteAddress").append(
        $("<option>", {
            value: favoriteAddresses[i],
            text: favoriteAddresses[i]
        }));
    }
            
    // add change listener to the favorites, update the address field
    // and select from address also
    $("#favoriteAddress").change(function() {
        var selectedAddress = $("#favoriteAddress").val();
        var firstCommaPos = selectedAddress.indexOf(",");
        var address1 = selectedAddress.substring(0, firstCommaPos);
        var address2 = selectedAddress.substr(firstCommaPos + 1).trim();
        $("#street1").val(address1);
        $("#cityState").val(address2);
        $('input[type="radio"][value="address"]').attr('checked',true);
    });
            
    $("#orderChoice").change(function() {
        var orderChoice = $("#orderChoice").val();
        sortMapData(orderChoice);
        $("#searchResultsTable").empty();
        
        // add the link and the map marker after sorting
        for (i = 0; i < mapData.length; i++) {
            var nextMapData = mapData[i];
            
            // TODO: clean this code up with better DOM management
            // refactor common code now shared in two places
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
    });
    
    $("#goPlacesButton").click(function() {
        // get our starting location
        var userStartChoice = $('input[name="startingPosition"]:checked').val();
        setStartLocationForDirections = true;
        if (userStartChoice === 'currentLocation') {
            // make sure there is a location selection
            var locationSelection = $("#searchSelection").val();
            if (locationSelection !== null && locationSelection.length > 0) {
                $("#map").show();
                showMap();
            }
        }
        else {
            var addressStreet = $("#street1").val();
            var addressCityState = $("#cityState").val();
            var address = addressStreet + ", " + addressCityState;
            $("#map").show();
            getPositionFromAddress(address, true);
        }
    });
            
    // allow user to get the next 20 locations (if available)
    $("#nextResultButton").click(function() {
        if (mapDataObject.mapData.length === 20) {
            if (mapDataObject.pagination.hasNextPage === true) {
                mapDataObject.pagination.nextPage();
            }
        }
    });
            
    // load Google search items from items.xml file
    getGoogleSearchItems(); 
            
    // setup autocomplete options
    var options = {
        source : selectEntries,
        select : makeSelection
    };
    $('#searchSelection').autocomplete(options);
});
        
// request.term -- user entry
// callback -- to return array of values
function selectEntries (request, callback) {
    var result = [];
                
    // filter the data for matching entries on the item name
    // Only match if the search string matches from the 
    // beginning of the given name.
    result = $.grep(itemList,
        function(value, index) {
            if (request.term.length === 1 && request.term === '*') {
                return value.label.toLowerCase().length > 0; // all of them
            } else {
                return (value.label.toLowerCase().indexOf(
                    request.term.toLowerCase()) === 0);
            }
        });
    // return the results
    callback(result);
}

// when a selection is made
function makeSelection(event, ui) {
    $('#searchSelection').val(ui.item.data.name);
}
