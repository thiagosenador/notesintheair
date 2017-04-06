const datastore = require('../datastore');
const admin = require('firebase-admin');

var notes = {
    createNote: function (req, res) {
        admin.auth().verifyIdToken(req.headers['authorization'])
            .then(function () {
                var note = {
                    content: req.body['note'],
                    user: req.body['user'],
                    lat: req.body['lat'],
                    lng: req.body['lng'],
                    date: Date.now()
                }

                datastore.save('Note', note);

            }).catch(function (error) {
                console.error(error);
            });
    }
};

module.exports = notes;