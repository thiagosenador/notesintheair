'use strict';

const admin = require('firebase-admin');

var middleware = {

    validateApiRequest: function (req, res, next) {
        var token = req.headers['authorization'];

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
    },

    validateViewRequests: function (req, res, next) {
        var token = req.headers['authorization'];

        if (!token) {
            res.render('login', { message: 'please log in!' });
            return;
        }

        admin.auth().verifyIdToken(token)
            .then(function (decodedToken) {
                if (decodedToken.exp * 1000 <= Date.now()) {
                    res.render('login', { message: 'session expired. please log in!' });
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
    }
}

module.exports = middleware;
