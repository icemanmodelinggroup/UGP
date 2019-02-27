
function Line(pointList, numPoints, name){
	
	this.name = name;
	this.numPoints = numPoints;
	this.pointList = pointList;
	this.getPoint = function (i){
		return pointList[i];
	};
		
}


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

function loadPointDD(line, numPoints){
	
	var list = "";
	var i;
	var id = "Pddlink";
	
	
	for(i = 0; i < numPoints; i++){
		id1 = id + i;
		list += ("<li><button type='button' class='btn btn-primary' id='" + id1 + "'>P" + i + ": (" + line.pointList[i].name + ")</button></li>");
	}
	
	$("#pointList").html(list);
	
	return;
}

function loadLineDD(lines, numLines){
	
	var list = "";
	var i;
	var id = "Lddlink";
	
	for(i = 0; i < numLines; i++){
		if(lines[i].numPoints >= 1){
			id1 = id + i;
			list += ("<li><button type='button' class='btn btn-primary' id='" + id1 + "'>P" + i + ": (" + lines[i].name + ")</button></li>");
			alert(id1)
		}
		else{
			id1 += id + i;
			list += ("<li><button type='button' class='btn btn-primary' id='" + id1 + "'>L" + i + ": (" + lines[i].name + ")</button></li>");
			alert(id1);
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
		
		var lat  = $("#latinput").val();
		var lon = $("#longinput").val(); 

		var table = $("#consoletable");
		numPoints = 0;
		
		var point = retrieveData(lat, lon);
		points.push(point);
		numPoints = 1;

 		var line = new Line(points, 1, ("Point " + points[0].name));
		lines.push(line);
		numLines++;
		
		loadPointDD(line, numPoints);
		loadLineDD(lines, numLines);
		
		printData(point, numRows);
		
		str = "#Lddlink" + (numLines-1);
		
		
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