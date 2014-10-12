
var senatorList = [];
window.onload = function() {

  // get the JSON representation of the party.xml file via an
  // AJAX call. Then load the HTML members unordered list with
  // the names from the JSON constructed senator object.
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
        //console.log(nodeNameName + ': ' + senatorName);
        //console.log(nodeNameParty + ': ' + partyName);
      }
     // display the list of senators
     var membersHTML = document.getElementById('members');
     membersHTML.innerHTML='';
     for (i = 0; i < senatorList.length; i++) {
         var nextLi = document.createElement("li");
         nextLi.innerHTML = senatorList[i].name;
         membersHTML.appendChild(nextLi);
     }
    }
  };
  
  // make AJAX request passing the xml file asynchronously
  http_request.open("GET", data_file, true);
  http_request.send();
};
