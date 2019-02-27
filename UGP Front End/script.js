
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
	
	this.name = "" + lat + ", " + lon;
	this.lat = lat;
	this.lon = lon;
	this.velocity = pointValues[0];
	this.bed = pointValues[1];
	this.surface = pointValues[2];
	this.SMB = pointValues[3];
	this.thickness = pointValues[4];
	this.T2M = pointValues[5];
	
}

//This is the function that will retrieve point data from the server
function retrieveData(latitude, longitude){
	
	values = [0.0, 0.0, 0.0, 0.0, 0.0, 0.0];
	j = 8;

/* 	$.post("test.asp", {lat: "d", lon: "S"},   
	function(data, status){
		alert("Data: " + data + "\nStatus: " + status);
	}); 
	 */
	 
	//Simulates creating values  - Real code to communicate w/server will go here
	
	for(i = 0; i < 6; i++){
		values[i] = ((longitude+j-2*i) - (1/5)*latitude*(i**2 - (j+i)**(.3)));
		j--;
	}
	var point = new Point(latitude, longitude, values);
	
	return point;
}

//This function takes in the array of data values at a point and prints them to the table
function printData(point, numRows){
	
	//Find table and insert row
	var tab = document.getElementById("consoletable");
	var row = tab.insertRow(numRows);
	
	var pointText = "" + $("#latinput").val() + " N, " + $("#longinput").val() + "S";
	
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
function loadPointDD(line, numPoints){
	
	var list = "";
	var i;
	var id = "Pddlink";
	
	//Iterates through the points in the line and creates a button for each
	for(i = 0; i < numPoints; i++){
		id1 = id + i;
		list += ("<li><button type='button' class='btn btn-primary' id='" + id1 + "'>P" + i + ": (" + line.pointList[i].name + ")</button></li>");
	}
	
	//Add the HTML code to the document
	$("#pointList").html(list);
	
	return;
}

//This function loads the Line dropdown list with values
function loadLineDD(lines, numLines){
	
	var list = "";
	var i;
	var id = "Lddlink";
	
	//Iterates through the lines in the line list and creates a button for each
	for(i = 0; i < numLines; i++){
		
		//TODO -- This is where is assign a button to each dropdown list element. There may be a better way of doing this
		
		if(lines[i].numPoints >= 1){
			id1 = id + i;
			list += ("<li><button type='button' class='btn btn-primary' id='" + id1 + "'>P" + i + ": (" + lines[i].name + ")</button></li>");
		}
		else{
			id1 += id + i;
			list += ("<li><button type='button' class='btn btn-primary' id='" + id1 + "'>L" + i + ": (" + lines[i].name + ")</button></li>");
		}
	}
	
	$("#lineList").html(list);
	

	
	return;
}

	
//This is the main function	
$(function(){
	
	var lines = [];
	var points = [];
	var numPoints = 0;
	var numLines = 0;
	var numRows = 1;
	var lat = 0.0;
	var lon = 0.0;
	var list = "";
	var mode = 0;
	var num = 0;
	var i;

	//Event handler for go button
	$("#gobutton").on("click", function(){	
	
		points = [];
		mode = 0;
		
		//Get lat and long input
		var lat  = $("#latinput").val();
		var lon = $("#longinput").val(); 

		//Select table
		var table = $("#consoletable");
		
		//TODO - Clear contents of table -- I cannot figure out how to do this, deleteRow() seems to break it, so does removeAll()
		
		numPoints = 0;
		
		//Create point with data from server & add to points list
		var point = retrieveData(lat, lon);
		points.push(point);
		numPoints = 1;

		//Create a line (with a single point in it, in this case)
 		var line = new Line(points, 1, ("Point " + points[0].name));
		lines.push(line);
		numLines++;
		
		//Load the point and line dropdowns
		loadPointDD(line, numPoints);
		loadLineDD(lines, numLines);
		
		//Print the point data to the console
		printData(point, numRows);
		
		str = "#Lddlink" + (numLines-1);
		
		
		/*TODO -- This is where my program breaks down. I want it to create dropdowns which allow you to print to the console 
		lines and points which you have created in the past.  I already have a system in place for storing points and lines.
		*/
		
/* 		$(str).on("click", function(){
			points = [];
			newLine = lines[numLines];
			for(i = 0; i < newLine.numPoints; i++){
				printData(newLine.getPoint(i), newLine.numPoints);
			}

		}	
 */

		
	});
	
	
/* 	$("#lineList").on('change', function(){
		index = $("#lineList").val();
		alert("index");
		line = lines[index];
		for(i = 0; i < line.numPoints; i++){
			printData(line[i], numRows);
		}
									
	}); */
	
	

 

})