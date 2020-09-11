const Note = require('../models/Note');

exports.getAllNotes = (req, res, next) => {
	Note.find({})
		.select('-__v -updatedAt')
		.then((notes) => {
			// console.log(notes);
			res.json(notes);
		})
		.catch((err) => {
			next(err);
		});
};

exports.getNote = (req, res, next) => {
	Note.findById(req.params.noteId)
		.then((note) => {
			// console.log(note);
			res.json(note);
		})
		.catch((err) => {
			console.log(err);
			next(err);
		});
};
