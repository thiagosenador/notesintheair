'use strict';

const express = require('express');
const datastore = require('../static/javascripts/datastore');

var router = express.Router();

router.post('/create_note', function (req, res, next) {
  var note = {
    content: req.query.note,
    user: 'Thiago',
    lat: req.query.lat,
    lng: req.query.lng,
    date: Date.now()
  };

  datastore.save('Note', note);
});

module.exports = router;