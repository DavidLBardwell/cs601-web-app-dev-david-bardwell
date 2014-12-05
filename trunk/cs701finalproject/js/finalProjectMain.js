// File: finalProject.js
// This java script file contains the top-level initial function and is
// based on JQuery.

// current location
// latitude and longitude store the user's current location be it from
// their actual physical location or from a starting address.
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

// map data detail objects for second tab
var mapDataDetailObject = {};
var mapDataDetail = [];

var itemList = [];
var markers = [];
var youAreHereMarker;
var callbackCount;

var directionsDisplay;
var directionsService=null;

var favoriteAddresses = [];
var formattedAddress;

var yelpResults = [];


// JQuery initialize function
$(function() {
    var options = {event: "click",
    fx: {opacity : "toggle", 
        duration: "fast"}};
    $("#target").tabs(options);            // use jQuery tab ui for main interface
    $("#map").hide();                      // hide until the user as done a query
    $('#searchSelection').attr("disabled", "disabled");
    $('#nextResultButton').hide();         // hide until there are more results 
    $('#searchResultsTableHeader').hide(); // hide until user has done a query
    $("#directionsPanelFirstTab").hide();  // currently not displayed
    $("#target").tabs( "disable", 1);
    $("#target").tabs( "disable", 2);
            
    // load our favorite addresses from local storage if available otherwise
    // default to a starting set of addresses and initialize local storage
    loadFavoriteAddresses();
            
    // populate the favorite address selection list
    updateFavoriteAddressSelection();
    
    // default the initial address to the first favorite address
    var firstSelectedAddress = $("#favoriteAddress").val();
    var firstCommaPos = firstSelectedAddress.indexOf(",");
    var initialAddress1 = firstSelectedAddress.substring(0, firstCommaPos);
    var initialAddress2 = firstSelectedAddress.substr(firstCommaPos + 1).trim();
    $("#street1").val(initialAddress1);
    $("#cityState").val(initialAddress2);
    
    $("#addToFavoritesButton").click(function() {
        var newStreetAddress = $("#street1").val();
        var newCityState = $("#cityState").val();
        var fullAddress = newStreetAddress + ", " + newCityState;
        var duplicate = false;
        // make sure this is not a duplicate, if it is, ignore the add request
        for (var i = 0; i < favoriteAddresses.length; i++) {
            if (fullAddress === favoriteAddresses[i].address) {
                duplicate = true;
                break;
            }
        }
        
        if (duplicate === false) {
            favoriteAddresses.push({address : fullAddress, type: 'favorite'});
            window.localStorage.setItem('addresses', JSON.stringify(favoriteAddresses));
            updateFavoriteAddressSelection();
        }
    });
            
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
            
    // user decides to change how the result search links are sorted. The links
    // can be sorted by location name (default), rating (best to worst), or
    // distance (closest to farthest).
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
              "' href='www.cnn.com'>" + nextMapData.title +
              "</a><button class='mapButton' id='mapButton" + i + 
              "' type='button'>Center</button>" + 
              "<button class='startFromHereButton' id='startFromHereButton" + i +
              "' type='button'>Restart</button>" +
              "<button class='directionsButton' id='directionsButton" + i +
              "' type='button'>Directions</button>" +              
              "</td></tr>");
        }
        
        // need to dynamically bind the anchors, and this should work well
        $('a').click(function(e) {
            e.preventDefault();
            $(this).addClass('visited-link');
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
        
        // need to update address
        $('button.startFromHereButton').click(function() {
            var buttonId = this.id;
            var offset = buttonId.substr(19);
            
            getDetailAddress(offset);
        });
        
        // see how well we can add directions to first map
        $('button.directionsButton').click(function() {
            var buttonId = this.id;
            var offset = buttonId.substr(16);
            
            showDirectionsOnFirstMap(offset);
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
                showMapFromCurrentLocation();
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

function loadFavoriteAddresses() {
    var foundKey = false;
    if (window.localStorage.length > 0) {
        for (var i = 0; i < window.localStorage.length; i++) {
            var keyValue = localStorage.key(i);
            // make sure data belongs to addresses, and not something else
            if (keyValue === 'addresses') {
                favoriteAddresses = JSON.parse(window.localStorage.getItem('addresses'));
                foundKey = true;
            }
        }
        
        // if we did not find our key, default initial favorites
        if (foundKey === false) {
            defaultFavoriteAddresses();
        }
    }
    else {
        // if we did not find any localstorage keys, default initial favorites
        defaultFavoriteAddresses();
    }
}

function updateFavoriteAddressSelection() {
    // add our favorite addresses
    $("#favoriteAddress").empty();
    for (var i = 0; i < favoriteAddresses.length; i++) {
        $("#favoriteAddress").append(
        $("<option>", {
            value: favoriteAddresses[i].address,
            text: favoriteAddresses[i].address
        }));
    }
}

function defaultFavoriteAddresses() {
    favoriteAddresses.push({address : "9 Saltonstall Parkway, Salem, MA", type: 'home'});
    favoriteAddresses.push({address : "10 Van de Graaff Drive, Burlington, MA", type: 'work'});
    favoriteAddresses.push({address : "808 Commonwealth Ave, Boston, MA", type: 'school'});
    window.localStorage.setItem('addresses', JSON.stringify(favoriteAddresses));
}
