function loadLists(){
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
	    		addTaskButton.innerHTML = "add task";
	    		addTaskButton.setAttribute("onclick", "addTask("+list.listsId+")");
	    		newList.appendChild(addTaskButton);

	    		let renameListButton = document.createElement('button');
	    		renameListButton.innerHTML = "rename list";
	    		renameListButton.setAttribute("onclick", "renameList("+list.listsId+")");
	    		newList.appendChild(renameListButton);

	    		let removeListButton = document.createElement('button');
	    		removeListButton.innerHTML = "remove list";
	    		removeListButton.setAttribute("onclick", "removeList("+list.listsId+")");
	    		newList.appendChild(removeListButton);
	    	}
			loadTasks();
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

function loadTasks(){
	var mainList = document.getElementById('allLists');
	var xmlhttp = new XMLHttpRequest();
	xmlhttp.onreadystatechange = function() {
		if (this.readyState == 4 && this.status == 200) {
		    tasks = JSON.parse(this.response);
			if (mainList.hasChildNodes() === true) {
		    	for (let list of mainList.childNodes){
		    		for (let task of tasks){
		    			if (task.listsId == list.id) {
		    				let newTaskElement = document.createElement('div');
							newTaskElement.innerHTML = task.taskname;
							list.appendChild(newTaskElement);

							let timeRequired = document.createElement('div');
							timeRequired.innerHTML = "time to complete:" + task.requiredTime;
							list.appendChild(timeRequired);

							let renameTaskButton = document.createElement('button');
				    		renameTaskButton.innerHTML = "rename task";
				    		renameTaskButton.setAttribute("onclick", "renameTask("+task.id+")");
				    		list.appendChild(renameTaskButton);

				    		let retimeTaskButton = document.createElement('button');
				    		retimeTaskButton.innerHTML = "change task time";
				    		retimeTaskButton.setAttribute("onclick", "retimeTask("+task.id+")");
				    		list.appendChild(retimeTaskButton);

				    		let removeTaskButton = document.createElement('button');
				    		removeTaskButton.innerHTML = "remove task";
				    		removeTaskButton.setAttribute("onclick", "removeTask("+task.id+")");
				    		list.appendChild(removeTaskButton);
		    			}
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
	var listNamePrompt = prompt("Please enter the new name of this list.", "different name");
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
	var taskNamePrompt = prompt("Please enter the new name of this task.", "different name");
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
    	xmlhttp.open("GET", "addTask.php?theName="+taskNamePrompt+"&listsId="+listsId+"&theTime="+roundedTime);
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