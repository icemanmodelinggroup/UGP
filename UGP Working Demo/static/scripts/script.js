
//Creates a Line object
function Line(pointList, numPoints, name){
	this.name = name;
	this.numPoints = numPoints;
	this.pointList = pointList;
	this.getPoint = function (i){
		return pointList[i];
	};	
}

//Creates a Point object
function Point(lat, lon, pointValues){
	this.name = "" + lat + "N, " + lon + "E";
	this.lat = lat;
	this.lon = lon;
	this.velocity = pointValues[0];
	this.bed = pointValues[1];
	this.surface = pointValues[2];
	this.SMB = pointValues[3];
	this.thickness = pointValues[4];
	this.T2M = pointValues[5];
	
}

//Ajax call for sending data to table
function ajaxPoint(lat, lon, callback){

	var values = [];
	pointSend = {"lon": lon, "lat": lat};
	var pointOutput;

	$.ajax({
		type: 'POST',
		url: '/ajax/get_point_data/', //this url is specified on server
		data: JSON.stringify(pointSend),
		contentType: 'application/json',
		success: function (d) {
			console.log("AJAX Success!");
		},
		failure: function (d) {
			console.log("AJAX Failed");
		}
	})
		.done(function (data) {

			pointOutput = data;
			//Pushing the data sets to the values
			values.push(pointOutput.velocity);
			values.push(pointOutput.bed);
			values.push(pointOutput.surface);
			values.push(pointOutput.smb);
			values.push(pointOutput.thickness);
			values.push(pointOutput.t2m);
			console.log("Sending values to point...");
			var point = new Point(lat, lon, values);
			//Return statement for the Ajax, returning the new point
			callback(point)
		})
		.fail(function (data) {
			console.log("Could not retrieve point.")
		});
}

function handle_point(point, oldPoints, numPoints, numRows){

	points = [];
	points.push(point);

	//Create a line (with a single point in it, in this case)
	var line = new Line(points, 1, (points[0].name));

	//Load the point and line dropdowns
	loadPointDD(line, numPoints, oldPoints);
	loadLineDD(line);

	//Print the point data to the console
	printData(point, numRows);
	return line;
}

//This function takes in the array of data values at a point and prints them to the table
function printData(point, numRows){
	
	//Find table and insert row
	var tab = document.getElementById("consoletable");
	var row = tab.insertRow(numRows);
	
	var pointText = point.name;
	
	//Create strings
	var text1 = point.velocity.toFixed(2);
	var text2 = point.bed.toFixed(2);
	var text3 = point.surface.toFixed(2);
	var text4 = point.SMB.toFixed(2);
	var text5 = point.thickness.toFixed(2);
	var text6 = point.T2M.toFixed(2);
		
	//Create cells
	var cell0 = row.insertCell(0);
	var cell1 = row.insertCell(1);
	var cell2 = row.insertCell(2);
	var cell3 = row.insertCell(3);
	var cell4 = row.insertCell(4);
	var cell5 = row.insertCell(5);
	var cell6 = row.insertCell(6);
	
	//Assign text to cell data
	cell0.innerHTML = pointText;
	cell1.innerHTML = text1;
	cell2.innerHTML = text2;
	cell3.innerHTML = text3;
	cell4.innerHTML = text4;
	cell5.innerHTML = text5;
	cell6.innerHTML = text6;

	numRows++;
	return;
}

//This function loads the Point dropdown list with values
function loadPointDD(line, numPoints, oldPoints){
	
	pointList = document.getElementById('pointList');
	
	//Remove old points
	for(var i = 0; i < oldPoints; i++){
		pointList.remove(i);
	}
	
	//Iterate through points in line and add to dropdown
	for(var i = 0; i < numPoints; i++) {
		
        var newOption = document.createElement('option');
        newOption.text = "(" + line.pointList[i].name + ")";
		newOption.value = i;
		newOption.point = line.pointList[i];
		pointList.add(newOption, 0);	
    }
	
	return;
}

//This function loads the Line dropdown list with values
function loadLineDD(line){

 	var label = "";
	
	lineList = document.getElementById('lineList');
	
	//Add line to dropdown
    var newOption = document.createElement('option');
	if(line.numPoints > 1){
		label = "Line: ";
	}
	else{
		label = "Point: ";
	}
    newOption.text = label + line.name;
	newOption.line = line;
	lineList.add(newOption, 0);
   
	return; 

}

//Clears all rows of the console table
function clearTable()
{
	var table = document.getElementById("consoletable");
	
	//Delete the previous values
	var currNumRows = table.rows.length;
	for (var i = 1; i < currNumRows; i++){
		table.deleteRow(i);
	}
}

//This is the main function	
$(function(){
	
	var lines = [];
	var points = [];
	var numPoints = 0;
	var numLines = 0;
	var numRows = 1;
	// var lat = 0.0;
	// var lon = 0.0;
	// var list = "";
	var oldPoints = 0;
	//var num = 0;
	var i;

	//Event handler for point dropdown
	$('#pointList').change(function () {

		clearTable();
		
		//Grab selected point
		var optionSelected = $(this).find("option:selected");
		selectedPoint = Object.values(optionSelected)[0].point;
		printData(selectedPoint,numRows);
	 });
	 
	 //Event handler for line dropdown
	$('#lineList').change(function () {

		clearTable();
		
		//Grab selected line
		var optionSelected = $(this).find("option:selected");
		
		//Iterate through line and print points
		for(i = 0; i < Object.values(optionSelected)[0].line.numPoints; i++){
			selectedPoint = Object.values(optionSelected)[0].line.pointList[i];
			printData(selectedPoint,numRows);
		}

		//Increment numPoints and reload point dropdown
		numPoints = Object.values(optionSelected)[0].line.numPoints;
		loadPointDD(Object.values(optionSelected)[0].line, numPoints, oldPoints);

	 });
	//Event handler for go button
	$("#gobutton").on("click", function(){
		//Select table
		var table = document.getElementById("consoletable");
		clearTable();
		
		//Get lat and long input
		var lat  = $("#latinput").val();
		var lon = $("#longinput").val(); 

		points = [];
		mode = 0;

		//Create point with data from server & add to points list
		//var point = retrieveData(lat, lon);
		console.log("Point made it!");

		//This line ensures that the AJAX call finishes before initiating callback to the rest of the table update
		ajaxPoint(lat, lon, function (result) {

			var line = handle_point(result, oldPoints, 1, 1);
			lines.push(line);
			numLines++;
			numRows = 1;
			oldPoints = numPoints;
			numPoints = 1;

		});



	});
});