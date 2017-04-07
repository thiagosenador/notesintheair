'use strict';

var express = require('express');
var router = express.Router();

const http = require('http');
const notesService = require('../static/javascripts/services/notes_services');

/* home page */
router.get('/', function (req, res, next) {
  res.render('index');
});

/* login page */
router.get('/login', function (req, res, next) {
  res.render('login');
});

/* views */
router.get('/create_note', function (req, res, next) {
  res.render('create_note');
});

router.get('/my_notes', function (req, res, next) {

  var requestOptions = {
    path: '/api/v1/my_notes',
    method: 'POST',
    port: 8080
  };

  var r = notesService.getNotesFromUser(req, res);
  res.render('my_notes', { notes: r });

  // http.request(requestOptions, function (apiResponse) {
  //   apiResponse.on('data', function (body) {
  //     console.log(body);
  //     res.render('my_notes', { notes: body });
  //   })
  // });
});

/*
 * APIs
 * Routes that can be accessed only by autheticated users
 */
router.post('/api/v1/create_note', notesService.createNote);
router.post('/api/v1/my_notes', notesService.getNotesFromUser);

module.exports = router;
