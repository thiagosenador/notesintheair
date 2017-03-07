'use strict';

const express = require('express');
const router = express.Router();

const notes = require('../static/javascripts/model/notes');

/*
 * Routes that can be accessed only by autheticated users
 */
router.post('/create_note', notes.createNote);

module.exports = router;