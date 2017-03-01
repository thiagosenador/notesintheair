var express = require('express');
var router = express.Router();
var datastore = require('@google-cloud/datastore')({
  projectId: 'notesintheair-160023',
  keyFilename: './private/notesintheair_key.json'
});


router.post('/create_note', function (req, res, next) {
  var noteKey = datastore.key('Note');
  
  var note = {
    content: req.query.note,
    user: 'Thiago',
    lat: req.query.lat,
    lng: req.query.lng,
    date: Date.now()
  };

  datastore.save({
    key: noteKey,
    data: note
  });

  res.json({ message: 'thiago rocksssss!!!' })
});

module.exports = router;