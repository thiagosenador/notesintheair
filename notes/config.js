'use strict';

const nconf = module.exports = require('nconf');
const path = require('path');

nconf
    // 1. Command-line arguments
    .argv()
    // 2. Environment variables
    .env([
        'CLOUD_BUCKET',
        'DATA_BACKEND',
        'GCLOUD_PROJECT',
        'NODE_ENV',
        'OAUTH2_CLIENT_ID',
        'OAUTH2_CLIENT_SECRET',
        'OAUTH2_CALLBACK',
        'PORT',
        'SECRET'
    ])
    // 3. Config file
    .file({ file: path.join(__dirname, 'config.json') })
    // 4. Defaults
    .defaults({
        CLOUD_BUCKET: 'notesintheair-160023',
        DATA_BACKEND: 'datastore',
        GCLOUD_PROJECT: 'notesintheair-160023',
        OAUTH2_CLIENT_ID: '581730209736-am152g2d88qp4hco5vqetpjuqfvat5i4.apps.googleusercontent.com',
        OAUTH2_CLIENT_SECRET: 'd8IwUZt6fiOUhp5YaJCK3pNK',
        OAUTH2_CALLBACK: 'http://localhost:8080/auth/google/callback',
        PORT: 3000,
        SECRET: 'keyboardcat',
        KEYFILE: './private/notesintheair_key.json'
    });

// Check for required settings
checkConfig('GCLOUD_PROJECT');
checkConfig('CLOUD_BUCKET');
checkConfig('OAUTH2_CLIENT_ID');
checkConfig('OAUTH2_CLIENT_SECRET');

function checkConfig(setting) {
    if (!nconf.get(setting)) {
        throw new Error(`You must set ${setting} as an environment variable or in config.json!`);
    }
}
