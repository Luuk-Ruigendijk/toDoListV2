<!DOCTYPE html>
<html>
	<head>
		<title>To Do List</title>
		<link rel="stylesheet" type="text/css" href="style.css">
	</head>
	<body>
		<p>this is a list of things to do.</p>
		<div id="listGroup"></div>
		<div id="addList">
			<button onclick="addList()">Add list</button>
		</div>
		<script>
			function addList() {
				console.log("addDoc");
			    var xhttp = new XMLHttpRequest();
			    xhttp.onreadystatechange = function() {
			    if (this.readyState == 4 && this.status == 200) {
			    		console.log(this.response);
				    	lists = JSON.parse(this.response);
				    	console.dir(lists);
				    	for(list of lists){
				    		let el = document.createElement('p');
				    		el.innerHTML = list.listname;
				    		document.getElementById('listGroup').appendChild(el);
				    	}
				    	console.log("onreadystatechange");
				    	//console.dir(this);
				        //document.getElementById("demo").innerHTML = this.responseText;
				    }
				};
			    xhttp.open("GET", "backend.php", true);
			    xhttp.send();
			}
		</script>
	</body>
</html>