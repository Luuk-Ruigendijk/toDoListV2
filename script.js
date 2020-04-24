function loadLists(){
	var xhttp = new XMLHttpRequest();

	xhttp.onreadystatechange = function() {
		var childRemoval = document.getElementById('allLists');
		if (childRemoval.hasChildNodes() == true) {
			while (childRemoval.hasChildNodes()) {  
				childRemoval.removeChild(childRemoval.firstChild);
			}
		}
	    if (this.readyState == 4 && this.status == 200) {
			console.log(this.response);
	    	lists = JSON.parse(this.response);
	    	console.dir(lists);
	    	for(list of lists){
	    		let el = document.createElement('div');
	    		el.innerHTML = list.listname;
	    		document.getElementById('allLists').appendChild(el);
	    	}
	    	console.log("onreadystatechange");
	    	//console.dir(this);
	        //document.getElementById("demo").innerHTML = this.responseText;
		}

	};
	xhttp.open("GET", "backend.php", true);
	xhttp.send();
}

loadLists()

function addList(){
	var tableNamePrompt = prompt("Please enter the name of the new list.", "New list");
	if (tableNamePrompt == null || tableNamePrompt == "") {
  		 alert("Please insert a name.");
  	}
  	else {
  		var xmlhttp = new XMLHttpRequest();
    	xmlhttp.onreadystatechange = function() {
      		if (this.readyState == 4 && this.status == 200) {
      			
      		}
    	};
    xmlhttp.open("GET", "addList.php");
    xmlhttp.send();
  	}
}