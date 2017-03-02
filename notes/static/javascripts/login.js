'use strict';

const express = require('express');
const config = require('../../config');

// [START setup]
const passport = require('passport');
const datastore = require('./datastore');
const LocalStrategy = require('passport-local').Strategy;
const GoogleStrategy = require('passport-google-oauth20').Strategy;

function extractProfile(profile) {
    let imageUrl = '';
    if (profile.photos && profile.photos.length) {
        imageUrl = profile.photos[0].value;
    }
    return {
        id: profile.id,
        displayName: profile.displayName,
        image: imageUrl
    };
}

passport.use('login', new LocalStrategy({
    passReqToCallback: true
},
    function (req, username, password, done) {
        // check in mongo if a user with username exists or not
        findInDataStore({ 'username': username },
            function (err, user) {
                // In case of any error, return using the done method
                if (err)
                    return done(err);
                // Username does not exist, log error & redirect back
                if (!user) {
                    console.log('User Not Found with username ' + username);
                    return done(null, false,
                        req.flash('message', 'User Not found.'));
                }
                // User exists but wrong password, log the error 
                if (!isValidPassword(user, password)) {
                    console.log('Invalid Password');
                    return done(null, false,
                        req.flash('message', 'Invalid Password'));
                }
                // User and password both match, return user from 
                // done method which will be treated like success
                return done(null, user);
            }
        );
    }));

passport.use('signup', new LocalStrategy({
    passReqToCallback: true
},
    function (req, username, password, done) {
        findOrCreateUser = function () {
            // find a user in Mongo with provided username
            User.findOne({ 'username': username }, function (err, user) {
                // In case of any error return
                if (err) {
                    console.log('Error in SignUp: ' + err);
                    return done(err);
                }
                // already exists
                if (user) {
                    console.log('User already exists');
                    return done(null, false,
                        req.flash('message', 'User Already Exists'));
                } else {
                    // if there is no user with that email
                    // create the user
                    var newUser = new User();
                    // set the user's local credentials
                    newUser.username = username;
                    newUser.password = createHash(password);
                    newUser.email = req.param('email');
                    newUser.firstName = req.param('firstName');
                    newUser.lastName = req.param('lastName');

                    // save the user
                    newUser.save(function (err) {
                        if (err) {
                            console.log('Error in Saving user: ' + err);
                            throw err;
                        }
                        console.log('User Registration succesful');
                        return done(null, newUser);
                    });
                }
            });
        };

        // Delay the execution of findOrCreateUser and execute 
        // the method in the next tick of the event loop
        process.nextTick(findOrCreateUser);
    })
);

function findInDataStore(username, callback) {
    var result = datastore.findBy('User', 'userName', username);
    callback(null, result);
}

// Configure the Google strategy for use by Passport.js.
// OAuth 2-based strategies require a `verify` function which receives the
// credential (`accessToken`) for accessing the Google API on the user's behalf,
// along with the user's profile. The function must invoke `cb` with a user
// object, which will be set at `req.user` in route handlers after
// authentication.
passport.use('google', new GoogleStrategy({
    clientID: config.get('OAUTH2_CLIENT_ID'),
    clientSecret: config.get('OAUTH2_CLIENT_SECRET'),
    callbackURL: config.get('OAUTH2_CALLBACK'),
    accessType: 'offline'
}, (accessToken, refreshToken, profile, cb) => {
    // Extract the minimal profile information we need from the profile object provided by Google
    cb(null, extractProfile(profile));
}));

passport.serializeUser((user, cb) => {
    cb(null, user);
});
passport.deserializeUser((obj, cb) => {
    cb(null, obj);
});
// [END setup]

const router = express.Router();

// [START middleware]
// Middleware that requires the user to be logged in. If the user is not logged
// in, it will redirect the user to authorize the application and then return
// them to the original URL they requested.
function authRequired(req, res, next) {
    if (!req.user) {
        req.session.oauth2return = req.originalUrl;
        return res.redirect('/login/google');
    }
    next();
}

// Middleware that exposes the user's profile as well as login/logout URLs to
// any templates. These are available as `profile`, `login`, and `logout`.
function addTemplateVariables(req, res, next) {
    res.locals.profile = req.user;
    res.locals.login = `/login/google?return=${encodeURIComponent(req.originalUrl)}`;
    res.locals.logout = `/auth/logout?return=${encodeURIComponent(req.originalUrl)}`;
    next();
}
// [END middleware]

// Begins the authorization flow. The user will be redirected to Google where
// they can authorize the application to have access to their basic profile
// information. Upon approval the user is redirected to `/auth/google/callback`.
// If the `return` query parameter is specified when sending a user to this URL
// then they will be redirected to that URL when the flow is finished.
// [START authorize]
router.get(
    // Login url
    '/login/google',

    // Save the url of the user's current page so the app can redirect back to it after authorization
    (req, res, next) => {
        if (req.query.return) {
            req.session.oauth2return = req.query.return;
        }
        next();
    },

    // Start OAuth 2 flow using Passport.js
    passport.authenticate('google', { scope: ['email', 'profile'] })
);
// [END authorize]

// [START callback]
router.get(
    // OAuth 2 callback url. Use this url to configure your OAuth client in the Google Developers console
    '/auth/google/callback',

    // Finish OAuth 2 flow using Passport.js
    passport.authenticate('google'),

    // Redirect back to the original page, if any
    (req, res) => {
        const redirect = req.session.oauth2return || '/';
        delete req.session.oauth2return;
        res.redirect(redirect);
    }
);
// [END callback]

// Deletes the user's credentials and profile from the session.
// This does not revoke any active tokens.
router.get('/auth/logout', (req, res) => {
    req.logout();
    res.redirect('/');
});

module.exports = {
    extractProfile: extractProfile,
    router: router,
    required: authRequired,
    template: addTemplateVariables
};
