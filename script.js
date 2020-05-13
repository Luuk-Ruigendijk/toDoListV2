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
	    		newList.id = list.listsId;

	    		document.getElementById('allLists').appendChild(newList);

				let addTaskButton = document.createElement('button');
	    		addTaskButton.innerHTML = "add task";
	    		addTaskButton.setAttribute("onclick", "addTask("+list.listsId+")");
	    		newList.appendChild(addTaskButton);

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
	loadTasks();
}

function loadTasks(){
	var mainList = document.getElementById('allLists').childNodes;
	var xmlhttp = new XMLHttpRequest();

	if (this.readyState == 4 && this.status == 200) {
		console.log(this.response);
	    tasks = JSON.parse(this.response);

	    if (mainList.hasChildNodes() === true) {
	    	for (var listNumber = 0; listNumber < mainList.length; listNumber++) {
	    		for(task of tasks){
	    			if (task.listsId == mainList[listNumber].id) {
	    				let newTask = document.createElement('div');
						newTask.innerHTML = task.taskname;
						newTask.id = "listId"+mainList[listNumber]+"taskId"+task.id;
						mainList[listNumber].appendChild(newTask);
	    			}
				} 
	    	}
	    }
	}
	xmlhttp.open("GET", "loadTasks.php");
    xmlhttp.send();
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
      			loadLists();
      		}
    	};
    xmlhttp.open("GET", "addList.php?theName="+tableNamePrompt);
    xmlhttp.send();
  	}
}

function addTask(listsId){
	var taskNamePrompt = prompt("Please enter the name of the new task.", "New task");
	if (taskNamePrompt == null || taskNamePrompt == "") {
  		 alert("Please insert a name.");
  	}
  	else {
  		var xmlhttp = new XMLHttpRequest();
    	xmlhttp.onreadystatechange = function() {
      		if (this.readyState == 4 && this.status == 200) {
      			loadLists();
      		}
    	};
    xmlhttp.open("GET", "addTask.php?theName="+taskNamePrompt+"&listsId="+listsId);
    xmlhttp.send();
  	}
}

function removeList(list){
	let listRemoval = document.getElementById(list);
	if (listRemoval.hasChildNodes() === true) {
		while (listRemoval.hasChildNodes()) {  
			listRemoval.removeChild(listRemoval.firstChild);
		}
	}
	listRemoval.remove();
	var xmlhttp = new XMLHttpRequest();
	xmlhttp.onreadystatechange = function() {
  		if (this.readyState == 4 && this.status == 200) {
  			removeListTasks(list);
  		}
	};
    xmlhttp.open("GET", "deleteList.php?idList="+list);
    xmlhttp.send();
}

function removeListTasks(list){
	var xmlhttp = new XMLHttpRequest();
	xmlhttp.onreadystatechange = function() {
  		if (this.readyState == 4 && this.status == 200) {
  			loadLists();
  		}
	};
    xmlhttp.open("GET", "deleteListTasks.php?idList="+list);
    xmlhttp.send();
}