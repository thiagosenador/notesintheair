'use strict';

// Hierarchical node.js configuration with command-line arguments, environment variables, and files.
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
        'MONGO_URL',
        'MONGO_COLLECTION',
        'MYSQL_USER',
        'MYSQL_PASSWORD',
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
        // Typically you will create a bucket with the same name as your project ID.
        CLOUD_BUCKET: 'notesintheair-160023',

        // dataBackend can be 'datastore', 'cloudsql', or 'mongodb'. Be sure to
        // configure the appropriate settings for each storage engine below.
        // If you are unsure, use datastore as it requires no additional
        // configuration.
        DATA_BACKEND: 'datastore',

        // This is the id of your project in the Google Cloud Developers Console.
        GCLOUD_PROJECT: 'notesintheair-160023',

        OAUTH2_CLIENT_ID: '581730209736-am152g2d88qp4hco5vqetpjuqfvat5i4.apps.googleusercontent.com',
        OAUTH2_CLIENT_SECRET: 'd8IwUZt6fiOUhp5YaJCK3pNK',
        OAUTH2_CALLBACK: 'http://localhost:8080/auth/google/callback',

        // Port the HTTP server
        PORT: 8080,

        SECRET: 'keyboardcat'
    });

// Check for required settings
checkConfig('GCLOUD_PROJECT');
checkConfig('CLOUD_BUCKET');
checkConfig('OAUTH2_CLIENT_ID');
checkConfig('OAUTH2_CLIENT_SECRET');

if (nconf.get('DATA_BACKEND') === 'cloudsql') {
    checkConfig('MYSQL_USER');
    checkConfig('MYSQL_PASSWORD');
    if (nconf.get('NODE_ENV') === 'production') {
        checkConfig('INSTANCE_CONNECTION_NAME');
    }
} else if (nconf.get('DATA_BACKEND') === 'mongodb') {
    checkConfig('MONGO_URL');
    checkConfig('MONGO_COLLECTION');
}

function checkConfig(setting) {
    if (!nconf.get(setting)) {
        throw new Error(`You must set ${setting} as an environment variable or in config.json!`);
    }
}
