var currentFilter;
var pressed = 0;

function insertFilter(requiredStatus){
	currentFilter = requiredStatus;
	loadLists();
}
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

/**
	LoadTasks ..... purpose



*/

/**
 * Description of this function.
 * 
 * @param {string}      name 
 * @param {Date}        birthday 
 * @param {boolean=}    isMarried       Optional parameter.
 * @param {string|null} [bloodType]
 * @param {number=}     [weight=0]      Optional parameter with default value.
 * @param {string[]}    favoriteFoods   Array of String.
 * 
 * @returns {Object}
 

/*function Person(name, birthday, isMarried, bloodType = null, weight = 0, favoriteFoods = []) {
  return {
    name,
    birthday,
    weight,
    bloodType,
    isMarried,
    favoriteFoods,
  }
}

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
PHP ORDER BY

if ($_GET['sorting']=="asc"){

}

onthoud hoe isset werkt

leer over php sort, specifiek usort
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