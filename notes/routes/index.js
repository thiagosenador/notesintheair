'use strict';

var express = require('express');
var router = express.Router();

const notesService = require('../static/javascripts/services/notes_services');

/* home page */
router.get('/', function (req, res, next) {
  res.render('index');
});

/* login page */
router.get('/signin', function (req, res, next) {
  res.render('login');
});

/* views */
router.get('/create_note', function (req, res, next) {
  res.render('create_note');
});

/*
 * APIs
 * Routes that can be accessed only by autheticated users
 */
router.post('/api/v1/create_note', notesService.createNote);

module.exports = router;
