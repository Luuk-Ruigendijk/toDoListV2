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
	    		let newList = document.createElement('div');
	    		newList.innerHTML = list.listname;
	    		newList.setAttribute("listsId", list.listsId);
	    		document.getElementById('allLists').appendChild(newList);
	    		let removeListButton = document.createElement('button');
	    		removeListButton.innerHTML = "remove list";
	    		removeListButton.setAttribute("onclick", "removeList("+list.listsId+")");
	    		newList.appendChild(removeListButton);
	    	}
	    	console.log("onreadystatechange");
	    	//console.dir(this);
	        //document.getElementById("demo").innerHTML = this.responseText;
		}

	};
	xhttp.open("GET", "loadLists.php", true);
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
    xmlhttp.open("GET", "addList.php?theName="+tableNamePrompt);
    xmlhttp.send();
  	}
  	setTimeout(loadLists(), 500)
  	
}

function removeList(list){
	let listRemoval = document.getElementById(list);
	if (listRemoval.hasChildNodes() == true) {
		while (listRemoval.hasChildNodes()) {  
			listRemoval.removeChild(listRemoval.firstChild);
		}
	}
	listRemoval = document.getElementById(list);
	listRemoval.parentNode.removeChild(list);

}