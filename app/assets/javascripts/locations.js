// Place all the behaviors and hooks related to the matching controller here.
// All this logic will automatically be available in application.js.
// You can use CoffeeScript in this file: http://coffeescript.org/
// = require leaflet
// = require leaflet.draw
// = require_self
function arrayOfPoints(points){
    var array_of_points = [];
    points.forEach( function(point, index) {
        array_of_points.push(new L.LatLng(point['lat'], point['lng']));
    });

    return array_of_points;
}
function geoShapeSave(geodata) {
    alert('Registered!');
}
function geoShapeRegistration() {
    // issue pop up.
}
	var map, drawnItems;
	map_init();


$('#save-btn').on('click', function (e) {
	console.log('ss');
	$('#new_location').submit();
});

function map_init () {
	
	var osmUrl = 'http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
			osmAttrib = '&copy; <a href="http://openstreetmap.org/copyright">OpenStreetMap</a> contributors',
			osm = L.tileLayer(osmUrl, {maxZoom: 18, attribution: osmAttrib});
	map = new L.Map('map', {layers: [osm], center: new L.LatLng(53.912257, 27.581640), zoom: 15 });	
	drawnItems = new L.FeatureGroup();
	map.addLayer(drawnItems);
}

// Set the title to show on the polygon button
L.drawLocal.draw.toolbar.buttons.polygon = 'Draw a sexy polygon!';

map.on('draw:created', function (e) {
    //.target.getLatLngs()
    var type = e.layerType,
        layer = e.layer;

    if (type === 'marker') {
        layer.bindPopup('A popup!');
    }
    var raw_geo_data = e.layer.getLatLngs();

    var data = [];
    e.layer.getLatLngs().forEach( function(point, index) {
    	data.push(toPsqlCoor(point));
    });
    data.push(toPsqlCoor(raw_geo_data[0]));
    $('input[name="location[area]"]').val(data.join(','));
    $('#save-confirm').modal().show();
    drawnItems.addLayer(layer);
});
function toPsqlCoor (point) {
	return point.lat + ' ' + point.lng;
}
map.on('draw:edited', function (e) {
    var layers = e.layers;
    var countOfEditedLayers = 0;
    layers.eachLayer(function(layer) {
        countOfEditedLayers++;
    });
    console.log("Edited " + countOfEditedLayers + " layers");
 });