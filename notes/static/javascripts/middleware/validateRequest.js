'use strict';

const admin = require('firebase-admin');

module.exports = function (req, res, next) {
    var token = req.headers['authorization'];

    var url = req.url;

    if (url.startsWith('/api/')) {
        if (!token) {
            res.status(401);
            res.json({
                "status": 401,
                "message": "Token not found!"
            });
            return;
        }

        admin.auth().verifyIdToken(token)
            .then(function (decodedToken) {
                if (decodedToken.exp * 1000 <= Date.now()) {
                    res.status(401);
                    res.json({
                        "status": 401,
                        "message": "Token Expired!"
                    });
                    return;
                } else {
                    next();
                }
            }).catch(function (error) {
                res.status(401);
                res.json({
                    "status": 401,
                    "message": "Invalid User!"
                });
                return;
            });
    } else if (url != '/' && url != '/login' && (!token || ecodedToken.exp * 1000 <= Date.now())) {
        res.render('login');
    } else {
        next();
    }
};
