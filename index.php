<!DOCTYPE html>
<html>
	<head>
		<title>To Do List</title>
		<link rel="stylesheet" type="text/css" href="style.css">
	</head>
	<body>
		<div>
			<h1>Sort by status</h1>
			<button onclick="insertFilter()">See all</button>
			<button onclick="insertFilter('unstarted')">Not yet started</button>
			<button onclick="insertFilter('started')">Started</button>
			<button onclick="insertFilter('finished')">Finished</button>
		</div>
		<br>
		<div id="allLists">
			
		</div>
		<p>Press the button below to add a list.</p>
		<div id="addList">
			<button onclick="addList()">Add list</button>
		</div>
		<script type="text/javascript" src="script.js"></script>
	</body>
</html>