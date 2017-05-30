(function () {

    if (navigator.geolocation) {
        var position = navigator.geolocation.getCurrentPosition(loadMap);
    }

    function loadMap(position) {
        var lat = position.coords.latitude;
        var lng = position.coords.longitude;

        var lat_field = document.getElementById('latTxt');
        lat_field.value = lat;

        var lng_field = document.getElementById('lngTxt');
        lng_field.value = lng;
    }
}());
