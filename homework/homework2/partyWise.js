
var senatorList = [];
var debugMsg;
window.onload = function() {
  // see if our senators exist in localStorage. If so, load
  // up our JSON senator list from localStorage. If not, load
  // via an AJAX call from the partyList.xml file.
  debugMsg = document.getElementById("debugMsg");
  if (window.localStorage.length > 0) {
      for (var i = 0; i < window.localStorage.length; i++) {
          var keyValue = localStorage.key(i);
          // make sure data belongs to senators, and not something else
          if (keyValue.indexOf('senator:') !== -1) {
              var jsonSenator = JSON.parse(window.localStorage.getItem(keyValue));
              senatorList.push(jsonSenator);
          }
      }
      
      // display the list of senators
      displaySenators();
  }
  else {
      loadFromAJAX();
  }

};

function loadFromAJAX() {
  var data_file = "http://localhost/homework2/partyList.xml";
  var http_request = new XMLHttpRequest();

  // handle the AJAX callback when readyState is 4.
  http_request.onreadystatechange = function() {
    if (http_request.readyState === 4) {
      // Javascript function JSON.parse to parse JSON data
      // parse the returned XML Object using the HTMLDocument interface
      // Assumes the format of the XML file and directly access the
      // fields without any checking.
      var xmlObj = http_request.responseXML;
      var senators = xmlObj.children[0].children;
      for (i = 0; i < senators.length; i++) {
        var senator = senators[i];
        var nodeNameName = senator.children[0].nodeName;
        var senatorName = senator.children[0].innerHTML;
        var nodeNameParty = senator.children[1].nodeName;
        var partyName = senator.children[1].innerHTML;
        var senatorJSON = {name : senatorName, party : partyName, voted : false};
        senatorList.push(senatorJSON);
      }
      
      // display the list of senators
      displaySenators();
     
      // initialize local storage
      initializeLocalStorage();
    }
  };
  
  // make AJAX request passing the xml file asynchronously
  http_request.open("GET", data_file, true);
  http_request.send();
}

function initializeLocalStorage() {
    window.localStorage.clear();
    for (i = 0; i < senatorList.length; i++) {
        window.localStorage.setItem('senator:' + senatorList[i].name, 
                                    JSON.stringify(senatorList[i]));
    }
}

function displaySenators() {
     // display the list of senators
     var membersHTML = document.getElementById('members');
     membersHTML.innerHTML='';
     for (i = 0; i < senatorList.length; i++) {
         var nextLi = document.createElement("li");
         nextLi.setAttribute("id", senatorList[i].name);
         nextLi.setAttribute("draggable", true);
         nextLi.innerHTML = senatorList[i].name;
         membersHTML.appendChild(nextLi);
     }
     
     // Add event handlers for the source
     membersHTML.ondragstart = dragStartHandler;
     membersHTML.ondragend = dragEndHandler;
     membersHTML.ondrag = dragHandler;     
     
     var republicanDrop = document.getElementById("republicans");
     var democratDrop = document.getElementById("democrats");
     
    // Add event handlers for the target
    republicanDrop.ondragenter = dragEnterHandler;
    republicanDrop.ondragover = dragOverHandler;
    republicanDrop.ondrop = dropHandler;

    democratDrop.ondragenter = dragEnterHandler;
    democratDrop.ondragover = dragOverHandler;
    democratDrop.ondrop = dropHandler;
}

function dragStartHandler(e) {
    e.dataTransfer.setData("Text", e.target.id);
    debugMsg.innerHTML = "start dragging";
}

function dragEndHandler(e) {
    debugMsg.innerHTML = "Drop over the target";
}

function dragHandler(e) {
    debugMsg.innerHTML = "Dragging " + e.target.id;
}

function dragEnterHandler(e) {
    debugMsg.innerHTML = "Drag Entering " + e.target.id;
    e.preventDefault();
}

function dragOverHandler(e) {
    debugMsg.innerHTML = "Drag Over " + e.target.id;
    e.preventDefault();
}

function dropHandler(e) {
//    var sourceId = e.dataTransfer.getData("Text");  
//    var sourceElement = document.getElementById(sourceId);
//    var newElement = sourceElement.cloneNode(false);               
//    target.innerHTML = "";
//    target.appendChild(newElement);
    debugMsg.innerHTML = "Drop completed for " + e.target.id;
    e.preventDefault();
}
