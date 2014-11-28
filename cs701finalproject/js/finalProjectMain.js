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

var mapDataDetailObject = {};
var mapDataDetail = [];

var itemList = [];
var markers = [];
var youAreHereMarker;
var callbackCount;

var directionsDisplay;
var directionsService=null;

var formattedAddress;


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
            getPositionFromAddress(address);
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
            
    // Test the Yelp API which still needs to be integrated more completely.
    $("#goYelp").click(function() {
        testYelpAPI();
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
