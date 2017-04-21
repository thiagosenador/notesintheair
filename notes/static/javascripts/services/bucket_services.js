'use strict'

const config = require('../../../config');
const Storage = require('@google-cloud/storage');
const stream = require('stream');

const CLOUD_BUCKET = config.get('CLOUD_BUCKET');

const storage = Storage({
    projectId: config.get('GCLOUD_PROJECT'),
    keyFilename: config.get('KEYFILE')
});

const bucket = storage.bucket(CLOUD_BUCKET);

function sendUploadToGCS(req, res, next) {
    var file = bucket.file(req.body['picture_id'] + '.jpeg');
    
    var bufferStream = new stream.PassThrough();
    bufferStream.end(new Buffer(req.body['picture'], 'base64'));
    bufferStream.pipe(file.createWriteStream({
        metadata: {
            contentType: 'image/jpeg'
        },
        public: false,
        validation: "md5"
    }));
}



module.exports = {
    sendUploadToGCS
};
