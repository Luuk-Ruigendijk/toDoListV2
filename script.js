var currentFilter;
var pressed = 0;

/*
	this function is called when a filter is applied, setting the variable currentFilter 
	to the status that needs to be shown. Afterwards it starts the function loadLists()
*/
function insertFilter(requiredStatus){
	currentFilter = requiredStatus;
	loadLists();
}

/*
	this function retrieves the lists stored on the database, and creates the lists in the 
	webpage. 
*/
function loadLists(sortingDirection){
	var xmlhttp = new XMLHttpRequest();
	xmlhttp.onreadystatechange = function() {
		document.getElementById('allLists').innerHTML = "";
	    if (this.readyState == 4 && this.status == 200) {
	    	lists = JSON.parse(this.response);
	    	for(list of lists){
	    		let newList = document.createElement('div');
	    		let addListName = document.createElement('h2');
	    		addListName.innerHTML = list.listname;
	    		newList.id = list.listsId;
	    		newList.appendChild(addListName);
	    		newList.classList.add("list");
	    		document.getElementById('allLists').appendChild(newList);
				let addTaskButton = document.createElement('button');
	    		addTaskButton.innerHTML = "Add task";
	    		addTaskButton.setAttribute("onclick", "addTask("+list.listsId+")");
	    		newList.appendChild(addTaskButton);

	    		let renameListButton = document.createElement('button');
	    		renameListButton.innerHTML = "Rename list";
	    		renameListButton.setAttribute("onclick", "renameList("+list.listsId+")");
	    		newList.appendChild(renameListButton);

	    		let removeListButton = document.createElement('button');
	    		removeListButton.innerHTML = "Remove list";
	    		removeListButton.setAttribute("onclick", "removeList("+list.listsId+")");
	    		newList.appendChild(removeListButton);
	    	}
			loadTasks(sortingDirection);
		}
	};
	xmlhttp.open("GET", "loadLists.php", true);
	xmlhttp.send();
}

/*
	this function gets the JSON of the tasks, and based on whether or not a filter has been added, 
	only loads tasks with the current filter attached.
*/
function loadTasks(sortingDirection){
	var mainList = document.getElementById('allLists');
	var xmlhttp = new XMLHttpRequest();
	xmlhttp.onreadystatechange = function() {
		if (this.readyState == 4 && this.status == 200) {
		    tasks = JSON.parse(this.response);
			if (mainList.hasChildNodes() === true) {
		    	for (let list of mainList.childNodes){
		    		for (let task of tasks){
		    			if (task.listsId == list.id) {
		    				if (currentFilter==undefined) {
		    					createTasks(list, task);
		    				}
		    				else if (task.status==currentFilter) {
		    					createTasks(list, task);
		    				}
		    			}
		    		}
		    	}
	    	}
		}
	}
	xmlhttp.open("GET", "loadTasks.php");
    xmlhttp.send();
    if (sortingDirection) {
    	xmlhttp.open("GET", "loadTasks.php?sortingDirection="+sortingDirection);
    	xmlhttp.send();
    }
    else {
    	xmlhttp.open("GET", "loadTasks.php");
    	xmlhttp.send();
    }
    
}

/*
	in this function the tasks are created and added into the previously created lists.
*/
function createTasks(list, task){
	let taskDiv = document.createElement('div');
	list.appendChild(taskDiv);
	taskDiv.classList.add("listOfTasks");

	let newTaskElement = document.createElement('h3');
	newTaskElement.innerHTML = task.taskname;
	taskDiv.appendChild(newTaskElement);

	let timeRequiredText = document.createElement('div');
	timeRequiredText.innerHTML = "Time to complete: ";
	taskDiv.appendChild(timeRequiredText);

	let timeRequiredNumbers = document.createElement('li');
	timeRequiredNumbers.innerHTML = task.requiredTime;
	timeRequiredText.appendChild(timeRequiredNumbers);

	let dropdownTaskStatus = document.createElement('div');
	dropdownTaskStatus.classList.add("dropdown");
	taskDiv.appendChild(dropdownTaskStatus);

	let taskStatus = document.createElement('div');
	taskStatus.innerHTML = "Status:" + task.status;
	dropdownTaskStatus.appendChild(taskStatus);

	let statusCollection = document.createElement('div');
	statusCollection.classList.add("dropdown-content");
	dropdownTaskStatus.appendChild(statusCollection);

	let statusUnstarted = document.createElement('p');
	statusUnstarted.innerHTML = "Not yet started";
	statusUnstarted.setAttribute("onclick", "setStatus("+task.id+", 'unstarted')");
	statusCollection.appendChild(statusUnstarted);

	let statusStarted = document.createElement('p');
	statusStarted.innerHTML = "Started";
	statusStarted.setAttribute("onclick", "setStatus("+task.id+", 'started')");
	statusCollection.appendChild(statusStarted);

	let statusFinished = document.createElement('p');
	statusFinished.innerHTML = "Finished";
	statusFinished.setAttribute("onclick", "setStatus("+task.id+", 'finished')");
	statusCollection.appendChild(statusFinished);

	let renameTaskButton = document.createElement('button');
	renameTaskButton.innerHTML = "Rename task";
	renameTaskButton.setAttribute("onclick", "renameTask("+task.id+")");
	taskDiv.appendChild(renameTaskButton);

	let retimeTaskButton = document.createElement('button');
	retimeTaskButton.innerHTML = "Change task time";
	retimeTaskButton.setAttribute("onclick", "retimeTask("+task.id+")");
	taskDiv.appendChild(retimeTaskButton);

	let removeTaskButton = document.createElement('button');
	removeTaskButton.innerHTML = "Remove task";
	removeTaskButton.setAttribute("onclick", "removeTask("+task.id+")");
	taskDiv.appendChild(removeTaskButton);
}

/*
	as seen here, the lists and tasks are automatically loaded once the page has been opened
*/
loadLists()

/*
	this function adds a list to the database, after which it starts the loadLists() function,
	adding the new list immediatly to the webpage
*/
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

/*
	this function adds a task to the database, after which it starts the loadLists() function,
	adding the new task immediatly to the webpage
*/
function addTask(listsId){
	var taskNamePrompt = prompt("Please enter the name of the new task.", "New task");
	if (taskNamePrompt == null || taskNamePrompt == "") {
  		 alert("Please insert a name.");
  	}
  	else {
  		var taskTimePrompt = prompt("Please enter the time in minutes for the new task.", 15);
  		var timeInMinutes = parseInt(taskTimePrompt);
  		var roundedTime = Math.round(timeInMinutes);
		if (roundedTime == null || roundedTime == "" || roundedTime == NaN) {
	  		alert("Please insert a time in minutes.");
	  	}
	  	else {
  			var xmlhttp = new XMLHttpRequest();
	    	xmlhttp.onreadystatechange = function() {
	      		if (this.readyState == 4 && this.status == 200) {
	      			loadLists();
	      		}
	    	};
	    	xmlhttp.open("GET", "addTask.php?theName="+taskNamePrompt+"&listsId="+listsId+"&theTime="+roundedTime);
    		xmlhttp.send();
	  	}
  	}
}

/*
	this function renames a list and notifies the database, 
	after which it starts the loadLists() function,
	changing the name immediatly on the webpage
*/
function renameList(listsId){
	var listNamePrompt = prompt("Please enter the new name of this list.", "Different name");
	if (listNamePrompt == null || listNamePrompt == "") {
  		 alert("Please insert a name.");
  	}
  	else {
  		var xmlhttp = new XMLHttpRequest();
    	xmlhttp.onreadystatechange = function() {
      		if (this.readyState == 4 && this.status == 200) {
      			loadLists();
      		}
    	};
   		xmlhttp.open("GET", "renameList.php?theName="+listNamePrompt+"&listsId="+listsId);
    	xmlhttp.send();
  	}
}

/*
	this function renames a task and notifies the database, 
	after which it starts the loadLists() function,
	changing the name immediatly on the webpage
*/
function renameTask(id){
	var taskNamePrompt = prompt("Please enter the new name of this task.", "Different name");
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
    	xmlhttp.open("GET", "renameTask.php?theName="+taskNamePrompt+"&id="+id);
    	xmlhttp.send();
  	}
}

/*
	this function changes the time a task takes and notifies the database, 
	after which it starts the loadLists() function,
	changing the time immediatly on the webpage
*/
function retimeTask(id){
	var taskTimePrompt = prompt("Please enter the time in minutes for the new task.", 15);
	var timeInMinutes = parseInt(taskTimePrompt);
	var roundedTime = Math.round(timeInMinutes);
	if (roundedTime == null || roundedTime == "" || roundedTime == NaN) {
  		alert("Please insert a time in minutes.");
  	}
  	else {
		var xmlhttp = new XMLHttpRequest();
    	xmlhttp.onreadystatechange = function() {
      		if (this.readyState == 4 && this.status == 200) {
      			loadLists();
      		}
    	};
    	xmlhttp.open("GET", "retimeTask.php?id="+id+"&theTime="+roundedTime);
		xmlhttp.send();
  	}
}

/*
	this function removes a list from the database, 
	after which it starts the removeListTasks() function,
	removing the tasks related to the list
*/
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

/*
	this function removes all tasks related to a deleted list, after which
	it starts the loadLists() function, removing the list from the webpage
*/
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

/*
	this function removes a task from the database, 
	after which it starts the loadLists() function,
	showing the webpage with the task removed
*/
function removeTask(id){
	var xmlhttp = new XMLHttpRequest();
	xmlhttp.onreadystatechange = function() {
  		if (this.readyState == 4 && this.status == 200) {
  			loadLists();
  		}
	};
    xmlhttp.open("GET", "deleteTask.php?id="+id);
    xmlhttp.send();
}

/*
	this function changes the status a task has and alters in the database,
	after which it starts the loadLists() function, showing the new status a function has
*/
function setStatus(id, status){
	var xmlhttp = new XMLHttpRequest();
	xmlhttp.onreadystatechange = function() {
  		if (this.readyState == 4 && this.status == 200) {
  			loadLists();
  		}
	};
    xmlhttp.open("GET", "setStatus.php?id="+id+"&status="+status);
    xmlhttp.send();
}

/*
	this function changes the direction a list is sorted from, alternating between ascending
	and descending, based on the amount of minutes a task takes.
*/
function sortTime(){
	if (pressed==0) {
		document.getElementById("sortButton").innerHTML="Sort by time (descending)";
		loadLists(" DESC");
		pressed++;
	}
	else {
		pressed=0;
		document.getElementById("sortButton").innerHTML="Sort by time (ascending)";
		loadLists(" ASC");
	}
}