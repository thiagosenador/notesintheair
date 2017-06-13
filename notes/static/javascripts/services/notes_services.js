'use strict';

const datastore = require('../datastore');
const mapServices = require('./map_services');

function createNote(req, res) {
    mapServices.getCity(req.body['lat'], req.body['lng'], (location) => {
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
                name: 'location',
                value: location
            },
            {
                name: 'date',
                value: Date.now()
            },
            {
                name: 'picture',
                value: req.body['picture'] ? req.body['picture'] : ''
            }
        ];

        datastore.saveNote(note).then(function (key) {
            if (key) {
                res.json(200, key);
            } else {
                res.sendStatus(500);
            }
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
    datastore.findNoteById(req.params.note).then((note) => {
        if (!note) {
            res.json(404, 'No note found!');
            return;
        }

        if (note.hasMedia) {
            note['media'] = 'https://storage.cloud.google.com/notes_media/' + req.params.note + '.jpeg';
        }

        res.json(note);
    });
}

function getNotesHere(req, res) {
    var lat = req.params.lat;
    var lng = req.params.lng;

    var R = 6378.137; // Radius of earth in KM

    var right = lat + (0.2 / R) * (180 / Math.PI);
    var left = lat + (-0.2 / R) * (180 / Math.PI);
    var bottom = lng + (-0.2 / R) * (180 / Math.PI) / Math.cos(lat * Math.PI / 180);
    var top = lng + (0.2 / R) * (180 / Math.PI) / Math.cos(lat * Math.PI / 180);

    datastore.findNotesHere(top, bottom, left, right).then((notes) => {
        res.json(notes);
    });
}

module.exports = {
    createNote,
    getNotesFromUser,
    getNoteDetail,
    getNotesHere
}