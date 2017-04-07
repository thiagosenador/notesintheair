'use strict';

const config = require('../../config');

var datastore = require('@google-cloud/datastore')({
    projectId: config.get('GCLOUD_PROJECT'),
    keyFilename: config.get('KEYFILE')
});

function save(entityName, entity) {
    var entityKey = datastore.key(entityName);

    datastore.save({
        key: entityKey,
        data: entity
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