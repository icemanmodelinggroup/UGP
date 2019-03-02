

//Boundary box around the map
var boundsOfMap = {
	north: 85,
	south: 72,
	west: -180,
	east: -145,
};

//Center Map Coordinates. 
centerOfMap = {lat: 81, lng: -158};


var currentMap = 'Velocity';
var map;
var mapEl;
var layer;
var layerID = 'my-custom-layer';

var TILE_URL = 'tiles/' + currentMap + '/{z}_{x}_{y}.png';


var menu = document.getElementById("mapType");
menu.addEventListener("change", changeMap);
function changeMap(event) {
	if (menu.value == '0') {
		TILE_URL = 'tiles/Velocity/{z}_{x}_{y}.png';
	} 
	else if (menu.value == '1') {
		TILE_URL = 'tiles/Bed/{z}_{x}_{y}.png';
	} 
	else if (menu.value == '2') {
		TILE_URL = 'tiles/Surface/{z}_{x}_{y}.png';
	}
	else if (menu.value == '3') {
		TILE_URL = 'tiles/Smb/{z}_{x}_{y}.png';
	}
	else if (menu.value == '4') {
		TILE_URL = 'tiles/Thickness/{z}_{x}_{y}.png';
	}
	else if (menu.value == '5') {
		TILE_URL = 'tiles/T2m/{z}_{x}_{y}.png';
	}

}	


window.initMap = function() {
	// Select the element with id="map".
	mapEl = document.querySelector('#map');

	// Create a new map.
	map = new google.maps.Map(mapEl, {
	center: centerOfMap,
	restriction: {
	latLngBounds: boundsOfMap,
	strictBounds:false,
	
	},
	
	//Turn OFF viewing options as tiles do not line up with world
	mapTypeControl: false,
	streetViewControl: false,

	//Initial Zoom Level
	zoom: 4
	});

	// Create a tile layer, configured to fetch tiles from TILE_URL.
	layer = new google.maps.ImageMapType({
		name: layerID,
		
		getTileUrl: function(coord, zoom) {
			//console.log(coord.x, coord.y, zoom);
			var url = TILE_URL
			.replace('{x}', coord.x)
			.replace('{y}', coord.y)
			.replace('{z}', zoom);
			return url;
		},
		
		tileSize: new google.maps.Size(256, 256),
		minZoom: 4,
		maxZoom: 10
	});

	map.mapTypes.set(layerID, layer);
	map.setMapTypeId(layerID);

	google.maps.event.addListener(map, 'click', function(event) {
		mapZoom = map.getZoom();
		lati = event.latLng.lat();
		longi = event.latLng.lng();
		
		point = getPixelLocation();
		console.log(point);
	});
};

function getPixelLocation(currentLatLng) {
		console.log(currentLatLng);
        var scale = Math.pow(2, map.getZoom());
        // The NorthWest corner of the current viewport corresponds
        // to the upper left corner of the map.
        // The script translates the coordinates of the map's center point
        // to screen coordinates. Then it subtracts the coordinates of the
        // coordinates of the map's upper left corner to translate the 
        // currentLatLng location into pixel values in the <div> element that hosts the map.
        var nw = new google.maps.LatLng(
            map.getBounds().getNorthEast().lat(),
            map.getBounds().getSouthWest().lng()
        );
        // Convert the nw location from geo-coordinates to screen coordinates
        var worldCoordinateNW = map.getProjection().fromLatLngToPoint(nw);
        // Convert the location that was clicked to screen coordinates also
        var worldCoordinate = map.getProjection().fromLatLngToPoint(currentLatLng);
        var currentLocation = new google.maps.Point(
            Math.floor((worldCoordinate.x - worldCoordinateNW.x) * scale),
            Math.floor((worldCoordinate.y - worldCoordinateNW.y) * scale)
        );

        console.log(currentLocation);
        return currentLocation;
    }
function clickEvent(zoomLevel) {
	console.log(zoomLevel);
}


