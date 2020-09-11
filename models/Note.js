const mongoose = require("mongoose");

const NoteSchema = mongoose.Schema(
  {
		title: String,
    time: Number,
    blocks: Array 
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Note", NoteSchema);
