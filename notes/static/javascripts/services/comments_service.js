'use strict';

const datastore = require('../datastore');

function commentNote(req, res) {
    var comment = [
        {
            name: 'comment',
            value: req.body['comment']
        },
        {
            name: 'user',
            value: req.body['user']
        },
        {
            name: 'date',
            value: Date.now()
        },
        {
            name: 'note',
            value: req.body['note']
        }
    ];

    datastore.save('Comment', comment).then(function (key) {
        res.sendStatus(200);
    });
}


module.exports = {
    commentNote
}