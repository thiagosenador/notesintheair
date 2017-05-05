'use strict';

const datastore = require('../datastore');
const mapServices = require('./map_services');
const bucketServices = require('./bucket_services');


function createNote(req, res) {
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
                value: Date.now()
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
}

function getNotesFromUser(req, res) {
    var userId = req.params.user;

    datastore.findNotesFromUser(userId, function (err, entities) {
        res.json(entities);
    });
}

function getNoteDetail(req, res) {
    datastore.findById('Note', req.params.note).then((note) => {
        if (!note) {
            res.json(404, 'No note found!');
            return;
        }

        if (note.hasMedia) {
            bucketServices.getFileFromGCS(req, res);
        }

        res.json(note);
    });
}

module.exports = {
    createNote,
    getNotesFromUser,
    getNoteDetail
}