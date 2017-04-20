'use strict';

const googleMapsClient = require('@google/maps').createClient({
    key: 'AIzaSyAmhHjISB0MUEDdB5-5OCbfuxmXwqVibSE'
});

var mapServices = {
    getCity: function (lat, lng, cb) {
        googleMapsClient.reverseGeocode({ latlng: [lat, lng] }, function (err, response) {
            var components = response.json.results[0]['address_components'];

            var city = null;
            var state = null;

            for (var i = 0; i < components.length; i++) {
                var element = components[i];

                if (element['types'].includes('locality')) {
                    city = element['short_name'];
                }

                if (element['types'].includes('administrative_area_level_1')) {
                    state = element['short_name'];
                }
            }

            cb(city + ' / ' + state);
        });
    }
};

module.exports = mapServices;


