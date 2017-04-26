'use strict';

const admin = require('firebase-admin');

function validateApiRequest(req, res, next) {
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
}

function validateViewRequests(req, res, next) {
    var user = req.body.user;

    if (user) {
        if (req.session && req.session.user) {
            next();
        }
    } else {
        res.redirect('/login');
    }
}

function login(req, res, next) {
    var user = req.body.user;

    if (user) {
        req.session.user = user;
        req.session.save();
        res.sendStatus(200);
    } else {
        res.sendStatus(401);
    }
}

module.exports = {
    validateApiRequest,
    validateViewRequests,
    login
};
