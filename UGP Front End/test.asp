<%
dim lat,lon
lat=Request.Form("lat")
lon=Request.Form("lon")
Response.Write("Latitude: " & lat & ". ")
Response.Write("Longitude: " & lon & ".")
%>