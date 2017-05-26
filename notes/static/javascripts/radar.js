function initMap() {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(function (position) {
            var pos = {
                lat: position.coords.latitude,
                lng: position.coords.longitude
            };

            var map = new google.maps.Map(document.getElementById('map'), {
                zoom: 16
            });

            map.setCenter(pos);

            var marker = new google.maps.Marker({
                position: pos,
                map: map
            });

            var data = !{ stringify(notes) }

            for (var i = 0; i < data.length; i++) {
                var note = data[i];
                var noteMarker = new google.maps.Marker({
                    position: {
                        lat: parseFloat(note.lat),
                        lng: parseFloat(note.lng)
                    },
                    map: map
                });
            }
        });
    }
}