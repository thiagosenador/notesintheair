(function () {

    if (navigator.geolocation) {
        var position = navigator.geolocation.getCurrentPosition(loadMap);
    }

    function loadMap(position) {
        var lat = position.coords.latitude;
        var lng = position.coords.longitude;

        var lat_field = document.getElementById('lat');
        lat_field.value = lat;

        var lng_field = document.getElementById('lng');
        lng_field.value = lng;
    }
}());
