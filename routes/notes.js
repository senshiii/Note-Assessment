const router = require('express').Router();

const { getAllNotes, getNote } = require('../controllers/note-controller');

router.get('/', getAllNotes);

router.get('/:noteId', getNote);

module.exports = router;
