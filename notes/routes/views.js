'use strict';

const express = require('express');
const router = express.Router();
const config = require('../config.js');

const http = require('http');
const securityMiddleware = require('../static/javascripts/middleware/security_middleware');

/* index page */
router.get('/', function (req, res, next) {
    if (req.session && req.session.user) {
        res.render('home');
    } else {
        res.render('index');
    }
});

/* login page */
router.get('/login', function (req, res, next) {
    res.render('login');
});

/* logout page */
router.get('/logout', function (req, res, next) {
    securityMiddleware.logout(req, res, next);
    res.sendStatus(200);
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
        result.on('data', function (data) {
            res.render('my_notes', { notes: JSON.parse(data) });
        });
    });
});

router.get('/note_detail/:note', function (req, res, next) {
    var options = {
        port: config.PORT,
        host: config.HOST,
        method: 'GET',
        path: '/api/v1/note_detail/' + req.params.note
    }

    var api = http.request(options);
    api.end();

    api.on('response', function (result) {
        result.on('data', function (data) {
            res.render('note_detail', { note: JSON.parse(data) });
        });
    });
});

router.get('/notes_here/:lat,:lng', function (req, res, next) {
    var options = {
        port: config.PORT,
        host: config.HOST,
        method: 'GET',
        path: `/api/v1/notes_here/${req.params.lat},${req.params.lng}`
    }

    var api = http.request(options);
    api.end();

    api.on('response', function (result) {
        result.on('data', function (data) {
            res.render('notes_here', { notes: JSON.parse(data) });
        });
    });
});

module.exports = router;