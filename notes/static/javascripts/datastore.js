'use strict';

const config = require('../../config');

var datastore = require('@google-cloud/datastore')({
    projectId: config.get('GCLOUD_PROJECT'),
    keyFilename: config.get('KEYFILE')
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

function findBy(entityName, field, value) {
    const query = datastore.createQuery(entityName).filter(field, '=', value);

    return datastore.runQuery(query).then((results) => {
        var entities = results[0];

        entities.forEach((entity) => entity.id = entity[datastore.KEY].id);

        return entities;
    });
}

function findById(entityName, id) {
    const query = datastore.createQuery(entityName).filter('__key__', '=', datastore.key([entityName, id])).limit(1);

    return datastore.runQuery(query).then((result) => {
        var entities = results[0];

        entities.forEach((entity) => entity.id = entity[datastore.KEY].id);

        return entities;
    });

}

module.exports = {
    save,
    findBy,
    findById
}