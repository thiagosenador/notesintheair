'use strict';

const config = require('../../../config');
const Storage = require('@google-cloud/storage');
const Multer = require('multer');

const CLOUD_BUCKET = config.get('CLOUD_BUCKET');

const multer = Multer({
    storage: Multer.MemoryStorage,
    limits: {
        fileSize: 2 * 1024 * 1024 // no larger than 2mb
    }
});

const storage = Storage({
    projectId: config.get('GCLOUD_PROJECT'),
    keyFilename: config.get('KEYFILE')
});

const bucket = storage.bucket(CLOUD_BUCKET);

function sendUploadToGCS(req, res, next) {
    if (!req.file) {
        return next();
    }

    const gcsname = Date.now() + req.file.originalname;
    const file = bucket.file(gcsname);

    const stream = file.createWriteStream({
        metadata: {
            contentType: req.file.mimetype
        }
    });

    stream.on('error', (err) => {
        req.file.cloudStorageError = err;
        next(err);
    });

    stream.on('finish', () => {
        req.file.cloudStorageObject = gcsname;
        next();
    });

    stream.end(req.file.buffer);
}

module.exports = {
    getPublicUrl,
    multer
};
