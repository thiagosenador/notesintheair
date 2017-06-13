'use strict';

const config = require('../../config');

var datastore = require('@google-cloud/datastore')({
    projectId: config.GCLOUD_PROJECT,
    keyFilename: config.KEY_FILE
});

function saveNote(entity) {
    const dsKey = datastore.key('Note');

    const dsEntity = {
        key: dsKey,
        data: entity
    };

    return datastore.save(dsEntity)
        .then(() => {
            return dsEntity.key.id;
        });
}

function findNotesFromUser(user, cb) {
    const query = datastore.createQuery('Note').filter('user', '=', user);

    return datastore.runQuery(query, function (err, entities) {
        entities.forEach((entity) => entity.id = entity[datastore.KEY].id);
        cb(err, entities);
    });
}

function findNoteById(id) {
    // TODO FIND A BETTER WAY TO PASS NOTE.ID TO FIND COMMENTS
    var key = datastore.key(['Note', Number.parseInt(id)]);

    var note = null;

    return datastore.get(key).then((result) => {
        note = result[0];

        if (note) {
            note.id = note[datastore.KEY].id;
        }
    }).then(() => {
        var query = datastore.createQuery('Comment').filter('note', '=', Number.parseInt(note.id));

        return datastore.runQuery(query).then((results) => {
            if (results[0].length > 0) {
                note['comments'] = results[0];
            }

            return note;
        });
    });
}

function findNotesHere(top, bottom, left, right) {
    const query = datastore.createQuery('Note');

    return datastore.runQuery(query).then((results) => {
        var entities = results[0];
        entities.forEach((entity) => entity.id = entity[datastore.KEY].id);
        return entities;
    });
}


module.exports = {
    saveNote,
    findNotesFromUser,
    findNoteById,
    findNotesHere
}