
function retrieveData(latitude, longitude){
	
	values = [0.0, 0.0, 0.0, 0.0, 0.0, 0.0]
	j = 8;
	
	//Simulates creating values  - Real code to communicate w/server will go here
	for(i = 0; i < 6; i++){
		values[i] = ((longitude+j-2*i) - (1/5)*latitude*(i**2 - (j+i)**(.3)));
		j--;
	}
	
	return values;
}

//This function takes in the array of data values at a point and prints them to the table
function printData(pointValues, numRows){
	
	//Find table and insert row
	var tab = document.getElementById("consoletable");
	var row = tab.insertRow(numRows);
	
	var pointText = "" + $("#latinput").val() + " N, " + $("#longinput").val() + "S";
	
	//Create strings
	var text1 = pointValues[0].toFixed(2);
	var text2 = pointValues[1].toFixed(2);
	var text3 = pointValues[2].toFixed(2);
	var text4 = pointValues[3].toFixed(2);	
	var text5 = pointValues[4].toFixed(2);
	var text6 = pointValues[5].toFixed(2);
		
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
	
//This is the main function	
$(function(){
	
	var numRows = 1;
	
	//Event handler for go button
	$("#gobutton").on("click", function(){	
	
		var pointValues = [0.0, 0.0, 0.0, 0.0, 0.0, 0.0];
		
		pointValues = retrieveData($("#latinput").val(), $("#longinput").val());
		
		printData(pointValues, numRows);
		
	});
 

});