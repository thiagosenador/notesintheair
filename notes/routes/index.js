var express = require('express');
var router = express.Router();
const passport = require('passport');

/* GET home page. */
router.get('/', function (req, res, next) {
  res.render('index');
});

/* GET login page. */
router.get('/signin', function (req, res, next) {
  res.render('login');
});

/* Handle Login POST */
router.post('/login', passport.authenticate('login', {
  successRedirect: '/create_note',
  failureRedirect: '/error',
  failureFlash: true
}));


router.get('/create_note', function (req, res, next) {
  res.render('create_note');
});

module.exports = router;
