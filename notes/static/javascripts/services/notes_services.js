const datastore = require('../datastore');

var notes = {
    createNote: function (req, res) {
        var note = {
            content: req.body['note'],
            user: 'Thiago',
            lat: req.body['lat'],
            lng: req.body['lng'],
            date: Date.now()
        }

        // datastore.save('Note', note);
    }
};

module.exports = notes;