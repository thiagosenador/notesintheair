'use strict';

const datastore = require('../datastore');

var notes = {
    createNote: function (req, res) {
        var note = [
            {
                name: 'content',
                value: req.body['note']
            },
            {
                name: 'user',
                value: req.body['user']
            },
            {
                name: 'lat',
                value: req.body['lat']
            },
            {
                name: 'lng',
                value: req.body['lng']
            },
            {
                name: 'date',
                value: Date.now()
            }
        ];

        if (req.body['picture']) {
            note.push(
                {
                    name: 'picture',
                    value: req.body['picture'],
                    excludeFromIndexes: true
                });
        }

        datastore.save('Note', note);

        res.sendStatus(200);
    },

    getNotesFromUser: function (req, res) {
        var userId = req.params.user;

        datastore.findBy('Note', 'user', userId, (err, entities, cursor) => {
            if (err) {
                res.writeHead(500, { "Content-Type": "application/text" });
                res.end(err);
                return;
            }

            res.json(entities);
        });
    }
};

module.exports = notes;