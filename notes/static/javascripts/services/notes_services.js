'use strict';

const datastore = require('../datastore');
const mapServices = require('./map_services');
const bucketServices = require('./bucket_services');

var notes = {
    createNote: function (req, res) {
        mapServices.getCity(req.body['lat'], req.body['lng'], (location) => {
            var note = [
                {
                    name: 'content',
                    value: req.body['note'],
                    excludeFromIndexes: true
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
                    name: 'location',
                    value: location
                },
                {
                    name: 'date',
                    value: Date.now(),
                    excludeFromIndexes: true
                },
                {
                    name: 'hasMedia',
                    value: req.body['picture'] ? true : false,
                    excludeFromIndexes: true
                }
            ];

            datastore.save('Note', note).then(function (key) {
                if (req.body['picture']) {
                    req.body['picture_id'] = key.id;

                    bucketServices.sendUploadToGCS(req, res);
                }

                res.sendStatus(200);
            });
        });
    },

    getNotesFromUser: function (req, res) {
        // var userId = req.params.user;
        var userId = 'CjcR83yDSjM1wfJIaMJ0x2neKXZ2'

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