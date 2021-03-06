'use strict';

const express = require('express');
const path = require('path');
const logger = require('morgan');

const config = require('./config.js');

const bodyParser = require('body-parser');

const session = require('express-session');
const FirebaseStore = require('connect-session-firebase')(session);

const admin = require('firebase-admin');

var serviceAccount = require("./private/notesintheair_key.json");

const ref = admin.initializeApp({
	credential: admin.credential.cert(serviceAccount),
	databaseURL: "https://notesintheair-160023.firebaseio.com"
});

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

app.use(logger('dev'));

app.use(bodyParser.json({ limit: '2mb' }));
app.use(bodyParser.urlencoded({ extended: true, limit: '2mb' }));

const sessionConfig = {
	store: new FirebaseStore({
		database: ref.database()
	}),
	resave: false,
	saveUninitialized: false,
	secret: 'n0tesa1r',
	
};

app.use(session(sessionConfig));

app.use(express.static(path.join(__dirname, 'static')));
app.use('/bower_components', express.static(__dirname + '/bower_components'))

app.use(require('./routes/views'));
app.use(require('./routes/apis'));

// catch 404 and forward to error handler
app.get('*', function (req, res, next) {
	var err = new Error('Not Found');
	err.status = 404;
	next(err);
});

// error handler
app.use(function (err, req, res, next) {
	// set locals, only providing error in development
	res.locals.message = err.message;
	res.locals.error = req.app.get('env') === 'development' ? err : {};

	// render the error page
	res.status(err.status || 500);
	res.render('error');
});

app.listen(config.PORT, function () {
	console.log('app listening on port ' + config.PORT);
})

module.exports = app;