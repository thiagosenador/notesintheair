'use strict';

const config = require('../../config');

var datastore = require('@google-cloud/datastore')({
    projectId: config.GCLOUD_PROJECT,
    keyFilename: config.KEY_FILE
});

function save(entityName, entity) {
    const dsKey = datastore.key(entityName);

    const dsEntity = {
        key: dsKey,
        data: entity
    };

    return datastore.save(dsEntity)
        .then(() => {
            return dsKey;
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
    var key = datastore.key(['Note', Number.parseInt(id)]);

    return datastore.get(key).then((result) => {
        var note = result[0];

        if (note) {
            note.id = note[datastore.KEY].id;

            var query = datastore.createQuery('Comment').filter('note', '=', note.id);

            datastore.runQuery(query, function (err, comments) {
                if (comments.length > 0) {
                    note['comments'] = comments;
                }

                return note;
            });
        }

        return null;
    });
}

module.exports = {
    save,
    findNotesFromUser,
    findNoteById
}