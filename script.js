var listNumber = 0;

function addList(){
	var makeList = document.createElement("div");
	var listItem = document.createElement("p");
	var removeList = document.createElement("button");
	listItem.innerText = "dit is de lijst nummer " + (listNumber+1);
	removeList.innerText = "Remove list";
	removeList.setAttribute("onclick", "removeMyList(" + listNumber + ")");
	document.getElementById("listGroup").appendChild(makeList);
	makeList.appendChild(listItem);
	makeList.appendChild(removeList);
	makeList.setAttribute("id", "list" + listNumber);
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