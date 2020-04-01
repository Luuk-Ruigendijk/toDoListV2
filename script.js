var listNumber = 0;
var taskNumber = 0;

function addList(){
	var makeList = document.createElement("div");
	var listItem = document.createElement("h1");
	var addTask = document.createElement("button");
	var renameList = document.createElement("button");
	var removeList = document.createElement("button");
	var listName = prompt("Please enter the name of this list", "list number "+(listNumber+1));
	if (listName != null) {
		listItem.innerText = listName;
	};
	if (listName == null || listName == "") {
		listItem.innerText = "unnamed list.";
	};
	//listItem.innerText = "dit is de lijst nummer " + (listNumber+1);
	removeList.innerText = "Remove list";
	removeList.setAttribute("onclick", "removeMyList(" + listNumber + ")");
	renameList.innerText = "Rename list";
	renameList.setAttribute("onclick", "renameMyList(" + listNumber + ")");
	addTask.innerText = "Add a task";
	addTask.setAttribute("onclick", "addTask(" + listNumber + ")");
	document.getElementById("listGroup").appendChild(makeList);
	makeList.appendChild(listItem);
	makeList.appendChild(addTask);
	makeList.appendChild(renameList);
	makeList.appendChild(removeList);
	makeList.setAttribute("id", "list" + listNumber);
	makeList.setAttribute("class", "list");
	listNumber++;
}

function checkListId(){
	
}

function removeMyList(removeList) {
	let removeableList = document.getElementById("list"+removeList);
	while (removeableList.hasChildNodes()) {  
		removeableList.removeChild(removeableList.firstChild);
	}
	removeableList.remove();
}

function renameMyList(whichList) {
	let renameableList = document.getElementById("list"+whichList).getElementsByTagName('p')[0];
	let newListName = prompt("Please enter the new name of this list", "enter new name here");
	if (newListName != null && newListName != "") {
		renameableList.innerText = newListName;
	};
	if (newListName == null || newListName == "") {
		alert("please enter something to change the list name.");
	};
}

function addTask(whatList) {
	//checkForTask(whatList)

	var currentTaskNumber = 0;
	while (document.body.contains(document.getElementById("taskList" + whatList + "taskNumber" + currentTaskNumber))){
		currentTaskNumber++;
		checkForTask(whatList);
		console.log(currentTaskNumber);
	}
	taskNumber = currentTaskNumber;
	console.log(taskNumber);
	var taskItem = document.createElement("p");
	taskItem.setAttribute("id", "tasklist" + whatList + "task" + taskNumber);
	var taskName = prompt("Please enter the name of this list", "Enter your task here.");
	if (taskName != null) {
		taskItem.innerText = taskName;
	};
	if (taskName == null || taskName == "") {
		taskItem.innerText = "unnamed task.";
	};
	document.getElementById("list"+whatList).appendChild(taskItem);
};

function checkForTask(whatList) {
	var currentTaskNumber = 0;
	while (document.body.contains(document.getElementById("taskList" + whatList + "taskNumber" + taskNumber))){
		currentTaskNumber++;
		checkForTask(whatList);
		console.log(currentTaskNumber);
	}
	taskNumber = currentTaskNumber;
	console.log(taskNumber);
}