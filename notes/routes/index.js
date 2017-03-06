'use strict';

var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function (req, res, next) {
  res.render('index');
});

/* GET login page. */
router.get('/signin', function (req, res, next) {
  res.render('login');
});

router.get('/create_note', function (req, res, next) {
  res.render('create_note');
});

module.exports = router;
