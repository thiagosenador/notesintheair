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

        datastore.save('Note', note);

        res.json(JSON.stringify(note));
    },

    getNotesFromUser: function (req, res) {
        //var userId = req.body['user'];
        var userId = 'CjcR83yDSjM1wfJIaMJ0x2neKXZ2';

        datastore.findBy('Note', 'user', userId, (err, entities, cursor) => {
            if (err) {
                res.writeHead(500, { "Content-Type": "application/text" });
                res.end(err);
                return;
            }

            res.json({
                notes: entities
            });
        });
    }
};

module.exports = notes;