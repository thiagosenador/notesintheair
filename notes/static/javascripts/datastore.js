'use strict';

const config = require('../../config');

var datastore = require('@google-cloud/datastore')({
    projectId: config.GCLOUD_PROJECT,
    keyFilename: config.KEYFILE
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

function findById(entityName, id) {
    var key = datastore.key([entityName, Number.parseInt(id)]);

    return datastore.get(key).then((result) => {
        var entity = result[0];

        if (entity) {
            entity.id = entity[datastore.KEY].id;
            return entity;
        }

        return null;
    });
}

module.exports = {
    save,
    findNotesFromUser,
    findById
}