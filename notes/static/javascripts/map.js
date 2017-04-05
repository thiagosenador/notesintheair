//Calling the locateme function when the document finishes loading
$(document).ready(function () {
    locateMe();
});

//Function to locate the user
var locateMe = function () {
    var map_element = $('#map');
    if (navigator.geolocation) {
        var position = navigator.geolocation.getCurrentPosition(loadMap);
    } else {
        map_element.innerHTML = "Geolocation is not supported by this browser.";
    }
};

//Lets load the mop using the position
var loadMap = function (position) {
    var loading = $('#loading');
    var latitude = position.coords.latitude;
    var longitude = position.coords.longitude;
    var myLatlng = new google.maps.LatLng(latitude, longitude);

    //Initializing the options for the map
    var myOptions = {
        center: myLatlng,
        zoom: 15,
        mapTypeId: google.maps.MapTypeId.ROADMAP,
        streetViewControl: false,
		mapTypeControl: false
    };

    //Creating the map in teh DOM
    var map_element = document.getElementById("map");
    var map = new google.maps.Map(map_element, myOptions);

    //Adding markers to it
    var marker = new google.maps.Marker({
        position: myLatlng,
        map: map,
        title: 'You are here'
    });

    circle = new google.maps.Circle({
		strokeColor: '#FF0000',
		strokeOpacity: 0.8,
		strokeWeight: 1,
		fillColor: '#FF0000',
		fillOpacity: 0.35,
		map: map,
        center: myLatlng,
        radius: 200
	});

	circle.setMap(map);

    //Adding the Marker content to it
    var infowindow = new google.maps.InfoWindow({
        content: "<h2>You are here :)</h2>",
        //Settingup the maxwidth
        maxWidth: 300
    });

    //Event listener to trigger the marker content
    google.maps.event.addListener(marker, 'click', function () {
        infowindow.open(map, marker);
    });

    var lat_field = $('#latTxt');
    lat_field.val(myLatlng.lat);
    lat_field.trigger('input');

    var lng_field = $('#lngTxt');
    lng_field.val(myLatlng.lng);
    lng_field.trigger('input');

    // $("#lat").val(myLatlng.lat);
	// $("#lng").val(myLatlng.lng);
};