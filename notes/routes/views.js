'use strict';

const express = require('express');
const router = express.Router();
const config = require('../config.js');

const http = require('http');
const securityMiddleware = require('../static/javascripts/middleware/security_middleware');

/* index page */
router.get('/', function (req, res, next) {
    res.render('index');
});

/* login page */
router.get('/login', function (req, res, next) {
    res.render('login');
});

/* logout page */
router.get('/logout', function (req, res, next) {
    res.render('index');
});

//router.get('/*', securityMiddleware.validateViews);

/* home page */
router.get('/home', function (req, res, next) {
    res.render('home');
});

/* views */
router.get('/create_note', function (req, res, next) {
    res.render('create_note');
});

router.get('/my_notes', function (req, res, next) {
    var options = {
        port: config.PORT,
        host: config.HOST,
        method: 'GET',
        path: '/api/v1/my_notes/' + req.session.user.uid
    }

    var api = http.request(options);
    api.end();
    api.on('response', function (result) {
        result.on('data', function (chunk) {
            res.render('my_notes', { notes: chunk });
        });
    });
});

module.exports = router;