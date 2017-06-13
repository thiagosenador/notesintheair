'use strict';

const express = require('express');
const router = express.Router();
const config = require('../config.js');

const request = require('request');
const securityMiddleware = require('../static/javascripts/middleware/security_middleware');

const endpoint = `http://${config.HOST}:${config.PORT}`;

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
    res.render('create_note', { user: req.session.user.uid });
});


router.get('/my_notes', function (req, res, next) {
    const api = `${endpoint}/api/v1/my_notes/${req.session.user.uid}`;

    request.get(api, function (error, response, body) {
        res.render('my_notes', { notes: JSON.parse(body) });
    });
});

router.get('/note_detail/:note', function (req, res, next) {
    const api = `${endpoint}/api/v1/note_detail/${req.params.note}`;

    request.get(api, function (error, response, body) {
        res.render('note_detail', { note: JSON.parse(body) });
    });
});

router.get('/notes_here/:lat,:lng', function (req, res, next) {

    const api = `${endpoint}/api/v1/notes_here/${req.params.lat},${req.params.lng}`;

    request.get(api, function (error, response, body) {
        res.render('notes_here', { notes: JSON.parse(body) });
    });
});

router.post('/process_note_creation', function (req, res, next) {

    const api = `${endpoint}/api/v1/create_note`;

    req.body['user'] = req.session.user.uid;

    if (req.body['picture']) {
        req.body['picture'] = `${req.session.user.uid}-${req.body['picture']}`;
    }

    request.post({
        headers: { 'content-type': 'application/json' },
        url: api,
        form: req.body
    }, function (error, response, body) {
        res.render('note_creation_success', { note: JSON.parse(JSON.stringify(req.body)) });
    });
});

module.exports = router;