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
            console.log(dsKey.id);
            return dsKey;
        });
}

function findBy(entityName, field, value, cb) {
    const query = datastore.createQuery(entityName).filter(field, '=', value);

    datastore.runQuery(query, (err, entities, nextQuery) => {
        if (err) {
            cb(err);
            return;
        }
        const hasMore = nextQuery.moreResults !== datastore.NO_MORE_RESULTS ? nextQuery.endCursor : false;
        cb(null, entities, hasMore);
    });
}

module.exports = {
    save: save,
    findBy: findBy
}