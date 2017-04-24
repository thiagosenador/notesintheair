'use strict';

const datastore = require('../datastore');

function commentNote(req, res) {
    var comment = [
        {
            name: 'comment',
            value: req.body['comment'],
            excludeFromIndexes: true
        },
        {
            name: 'user',
            value: req.body['user']
        },
        {
            name: 'date',
            value: Date.now(),
            excludeFromIndexes: true
        }
    ];

    datastore.save('Comment', comment).then(function (key) {
        res.sendStatus(200);
    });
}


module.exports = {
    commentNote
}