(function () {

    if (navigator.geolocation) {
        var position = navigator.geolocation.getCurrentPosition(loadMap);
    }

    function loadMap(position) {
        var lat = position.coords.latitude;
        var lng = position.coords.longitude;

        var query = 'https://maps.googleapis.com/maps/api/staticmap?markers=color:red%7C{0},{1}&zoom=16&size=600x300&maptype=roadmap&key=AIzaSyDgPuoKOXkzo3_Pvir_Ocn7cosZ1cTCZfU&path=weight:0|fillcolor:orange';
        query = query.replace('{0}', lat).replace('{1}', lng);

        var rad = 200;
        var detail = 8;
        var r = 6371;

        var pi = Math.PI;

        var _lat = (lat * pi) / 180;
        var _lng = (lng * pi) / 180;
        var d = (rad / 1000) / r;

        var i = 0;

        for (i = 0; i <= 360; i += detail) {
            var brng = i * pi / 180;

            var pLat = Math.asin(Math.sin(_lat) * Math.cos(d) + Math.cos(_lat) * Math.sin(d) * Math.cos(brng));
            var pLng = ((_lng + Math.atan2(Math.sin(brng) * Math.sin(d) * Math.cos(_lat), Math.cos(d) - Math.sin(_lat) * Math.sin(pLat))) * 180) / pi;
            pLat = (pLat * 180) / pi;

            query += "|" + pLat + "," + pLng;
        }

        var imgElement = document.getElementById('mapImg');
        imgElement.src = query;

        var lat_field = document.getElementById('latTxt');
        lat_field.value = lat;

        var lng_field = document.getElementById('lngTxt');
        lng_field.value = lng;
    }
}());
