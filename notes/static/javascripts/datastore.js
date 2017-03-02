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
    })
}

function findBy(entityName, field, value) {
    const query = datastore.createQuery(entityName).filter('userName', '=', 'thiago');

    datastore.runQuery(query).then((results) => {
        const entities = results[0];
        return entities;
    });
}

module.exports = {
    save: save,
    findBy: findBy
}