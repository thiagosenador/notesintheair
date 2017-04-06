'use strict';

const admin = require('firebase-admin');

module.exports = function (req, res, next) {
    console.log('middleware validating');
    admin.auth().verifyIdToken(req.headers['authorization'])
        .then(function (decodedToken) {
            if (decodedToken.exp <= Date.now()) {
                res.status(400);
                res.json({
                    "status": 400,
                    "message": "Token Expired"
                });
                return;
            } else {
                next();
            }
        }).catch(function (error) {
            res.status(401);
            res.json({
                "status": 401,
                "message": "Invalid User"
            });
            return;
        });
};