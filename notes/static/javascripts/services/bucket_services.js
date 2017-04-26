'use strict'

const config = require('../../../config');
const Storage = require('@google-cloud/storage');
const stream = require('stream');

const CLOUD_BUCKET = config.CLOUD_BUCKET;

const storage = Storage({
    projectId: config.GCLOUD_PROJECT,
    keyFilename: config.KEYFILE
});

const bucket = storage.bucket(CLOUD_BUCKET);

function sendUploadToGCS(req, res, next) {
    var rawData = req.body['picture'];
    var imageType = rawData.substring(0, rawData.indexOf(';base64')).split(':')[1];
    var fileName = req.body['picture_id'] + '.' + imageType.split('/')[1];

    rawData = rawData.substring(rawData.indexOf(';base64') + 8, rawData.length);

    var file = bucket.file(fileName);

    var bufferStream = new stream.PassThrough();
    bufferStream.end(new Buffer(rawData, 'base64'));
    bufferStream.pipe(file.createWriteStream({
        metadata: {
            contentType: imageType
        },
        public: false,
        validation: "md5"
    }));
}

module.exports = {
    sendUploadToGCS
};
