'use strict';

var express = require('express');
var router = express.Router();

const http = require('http');
const securityMiddleware = require('../static/javascripts/middleware/security_middleware');
const notesService = require('../static/javascripts/services/notes_services');

/* login page */
router.get('/login', function (req, res, next) {
  res.render('login');
});

/* logout page */
router.get('/logout', function (req, res, next) {
  res.render('index');
});

/* index page */
router.get('/', function (req, res, next) {
  res.render('index');
});

router.all('/api/*', securityMiddleware.validateApiRequest);

/* home page */
router.get('/home', function (req, res, next) {
  res.render('home');
});


/* views */
router.get('/create_note', function (req, res, next) {
  res.render('create_note');
});

router.get('/my_notes', function (req, res, next) {
  res.render('my_notes');
});

/*
 * APIs
 * Routes that can be accessed only by autheticated users
 */
router.post('/api/v1/create_note', notesService.createNote);
router.get('/api/v1/my_notes/:user', notesService.getNotesFromUser);

module.exports = router;
