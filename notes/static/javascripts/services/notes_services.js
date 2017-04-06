'use strict';

const datastore = require('../datastore');

var notes = {
    createNote: function (req, res) {
        var note = {
            content: req.body['note'],
            user: req.body['user'],
            lat: req.body['lat'],
            lng: req.body['lng'],
            date: Date.now()
        }

        console.log(note);
        // datastore.save('Note', note);
    }
};

module.exports = notes;