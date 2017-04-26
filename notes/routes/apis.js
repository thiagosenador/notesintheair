'use strict';

var express = require('express');
var router = express.Router();

const securityMiddleware = require('../static/javascripts/middleware/security_middleware');
const notesService = require('../static/javascripts/services/notes_services');
const commentService = require('../static/javascripts/services/comments_service');

router.post('/login', securityMiddleware.login);

router.post('/api/v1/create_note', notesService.createNote);
router.get('/api/v1/my_notes/:user', notesService.getNotesFromUser);
router.get('/api/v1/note_detail/:note', notesService.getNoteDetail);

router.post('/api/v1/comment_note', commentService.commentNote);

module.exports = router;