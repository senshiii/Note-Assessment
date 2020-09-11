const mongoose = require('mongoose');

const NoteSchema = mongoose.Schema(
	{
        autho: String,
        pages: Array,
        pageCount: Number,
	},
	{
		timestamps: true
	}
);

module.exports = mongoose.model('Note', NoteSchema);
