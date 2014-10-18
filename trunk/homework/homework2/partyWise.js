
var senatorList = [];
var republicanDropListHTML;
var democratDropListHTML;
var dropSuccessful = false;
var msg;

window.onload = function() {
    // see if our senators exist in localStorage. If so, load
    // up our JSON senator list from localStorage. If not, load
    // via an AJAX call from the partyList.xml file.
    msg = document.getElementById('msg');
    var foundKey = false;
    if (window.localStorage.length > 0) {
        for (var i = 0; i < window.localStorage.length; i++) {
            var keyValue = localStorage.key(i);
            // make sure data belongs to senators, and not something else
            if (keyValue === 'senators') {
                senatorList = JSON.parse(window.localStorage.getItem('senators'));
                foundKey = true;
            }
        }
        
        // if we did not find our key, then load from the AJAX call
        if (foundKey === false) {
            loadFromAJAX();
        }
        else {
            // display the list of senators
            displaySenators();
            msg.innerHTML = 'From LocalStorage Loaded ' + senatorList.length + ' senators';
        }    
    }
    else {
        // empty localStorage, also load from AJAX call
        loadFromAJAX();
    }
};

function loadFromAJAX() {
    var data_file = "http://localhost/homework2/partyList.xml";
    var http_request = new XMLHttpRequest();

    // handle the AJAX callback when readyState is 4 and has a good return status
    http_request.onreadystatechange = function() {
        if (http_request.readyState === 4 && http_request.status === 200) {
            // parse the returned XML Object using the HTMLDocument interface
            // Assumes the format of the XML file and directly access the
            // fields without any checking. Build the senatorList which will be
            // used throughout the rest of the application.
            var xmlObj = http_request.responseXML;
            var senators = xmlObj.children[0].children;
            for (var i = 0; i < senators.length; i++) {
                var senator = senators[i];
                var senatorName = senator.children[0].innerHTML;
                var partyName = senator.children[1].innerHTML;
                var senatorJSON = {name : senatorName, party : partyName, voted : false};
                senatorList.push(senatorJSON);
            }
      
            // display the list of senators
            displaySenators();
     
            // initialize local storage
            initializeLocalStorage();
            
            // show AJAX result in msg area
            msg.innerHTML = 'From AJAX Loaded ' + senatorList.length + ' senators';
        }
    };
  
    // make AJAX request passing the xml file asynchronously
    http_request.open("GET", data_file, true);
    http_request.send();
}

// The local storage will be initialized only if the data has been read
// from the AJAX call. Otherwise, the local storage will represent the
// latest state of how the senators have voted.
function initializeLocalStorage() {
    window.localStorage.clear();
    window.localStorage.setItem('senators', JSON.stringify(senatorList));
}

function displaySenators() {
    // display the list of senators
    var membersHTML = document.getElementById('members');
    republicanDropListHTML = document.getElementById("republicans");
    republicanDropListHTML.innerHTML='';
    democratDropListHTML = document.getElementById("democrats");
    democratDropListHTML.innerHTML='';
    membersHTML.innerHTML='';
     
    // for each senator, we need to add to the members list as a new list item.
    // If the senator has already voted, make sure to disable the draggable on
    // the senator list item and show the senator in the republican or 
    // democrat voted drop list.
    for (var i = 0; i < senatorList.length; i++) {
         var nextLi = document.createElement("li");
         nextLi.setAttribute("id", senatorList[i].name);
         if (senatorList[i].voted === false) {
             nextLi.setAttribute("draggable", true);  // not voted, can drag
         }
         else {
             nextLi.setAttribute("draggable", false); // voted already, cannot drag
             var dropLi = document.createElement("li");
             dropLi.setAttribute("id", senatorList[i].name + ' Dropped');
             dropLi.innerHTML = senatorList[i].name;
             if (senatorList[i].party === 'Republican') {
                 republicanDropListHTML.appendChild(dropLi);
             }
             else {
                 democratDropListHTML.appendChild(dropLi);
             }
         }
         nextLi.innerHTML = senatorList[i].name;
         membersHTML.appendChild(nextLi);
     }
     
     // Add event handlers for the source
     membersHTML.ondragstart = dragStartHandler;
     membersHTML.ondragend = dragEndHandler;
     membersHTML.ondrag = dragHandler;
     
     setupTargetDragAndDropListeners();
}

function setupTargetDragAndDropListeners() {
    // Add event handlers for the target
    republicanDropListHTML.ondragenter = dragEnterHandler;
    republicanDropListHTML.ondragover = dragOverHandler;
    republicanDropListHTML.ondrop = dropHandler;

    democratDropListHTML.ondragenter = dragEnterHandler;
    democratDropListHTML.ondragover = dragOverHandler;
    democratDropListHTML.ondrop = dropHandler;
}

function dragStartHandler(e) {
    // set the data transfer by the senator's name so we know
    // who is voting.
    e.dataTransfer.setData("Text", e.target.id);
    
    // with the css, we can show an opacity of 0.5
    e.target.classList.add("dragged");
}

function dragEndHandler(e) {
    if (dropSuccessful === true) {
        msg.innerHTML = "Drop over the target completed successfully";
    }
    else {
        msg.innerHTML = "Drop over the target not successful, wrong party";
    }
    
    // with the css, we can remove the temporary class tag on the list item
    var elems = document.querySelectorAll(".dragged");
    for (var i = 0; i < elems.length; i++) {
        elems[i].classList.remove("dragged");
    }
}

function dragHandler(e) {
    msg.innerHTML = "Dragging " + e.target.id;
}

function dragEnterHandler(e) {
    msg.innerHTML = "Drag Entering " + e.target.id;
    e.preventDefault();
}

function dragOverHandler(e) {
    msg.innerHTML = "Drag Over " + e.target.id;
    e.preventDefault();
}

// upon completing the drag and drop make sure the senator is dropped into
// the correct voting list that belongs to their party. If the vote is
// valid, add the senator to the appropriate voted list. Finally, call
// the voteCompleted function to update local storage.
function dropHandler(e) {
    dropSuccessful = false;
    if (e.target.id === 'republicans') {
        // for a republican vote, make sure senator is really a republican
        var senator = getJSONFromName(e.dataTransfer.getData("Text"));
        if (senator.party === 'Republican') {
            dropSuccessful = true;
            msg.innerHTML = "Drop completed for " + e.target.id;
            var nextLi = document.createElement("li");
            nextLi.setAttribute("id", senator.name + ' Dropped');
            nextLi.innerHTML = senator.name;
            republicanDropListHTML.appendChild(nextLi);
            voteCompleted(senator.name);
        }
    }
    else if (e.target.id === 'democrats') {
        // for a democrat vote, make sure the senator is really a democrat
        var senator = getJSONFromName(e.dataTransfer.getData("Text"));
        if (senator.party === 'Democrat') {
            dropSuccessful = true;
            msg.innerHTML = "Drop completed for " + e.target.id;
            var nextLi = document.createElement("li");
            nextLi.setAttribute("id", senator.name + ' Dropped');
            nextLi.innerHTML = senator.name;
            democratDropListHTML.appendChild(nextLi);
            voteCompleted(senator.name);
        }
    }
    e.preventDefault();
}

function getJSONFromName(name) {
    for (var i = 0; i < senatorList.length; i++) {
        if (senatorList[i].name === name) {
            return senatorList[i];
        }
    }
}

// upon completing a vote, make sure the senator cannot vote again by
// disabling the drag and drop for the senator. Also, update the
// local storage with the updated JSON senator list showing that the
// senator has voted.
function voteCompleted(name) {
    var membersHTML = document.getElementById('members');
    // find the li for the senator and make draggable false
    var liList = membersHTML.childNodes;
    for (var i = 0; i < liList.length; i++) {
        var liName = liList[i].getAttribute("id");
        if (name === liName) {
            liList[i].setAttribute("draggable", false);
            var senator = getJSONFromName(name);
            senator.voted = true;
            window.localStorage.setItem('senators', 
                                    JSON.stringify(senatorList));
            break;
        }
    }
}
