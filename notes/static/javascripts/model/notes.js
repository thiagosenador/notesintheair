const datastore = require('../datastore');

var notes = {
    createNote: function (req, res) {
        var note = {
            content: req.query.note,
            user: 'Thiago',
            lat: req.query.lat,
            lng: req.query.lng,
            date: Date.now()
        }

        datastore.save('Note', note);
    }
};

module.exports = notes;