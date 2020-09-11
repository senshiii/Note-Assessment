const router = require("express").Router();

const Note = require("../models/Note");

router.get("/", (req, res) => {
  Note.find({})
    .select("-__v -updatedAt")
    .then((notes) => res.json(notes))
    .catch((err) => cons);
});

router.get("/:noteId", (req, res) => {
  Note.findById(req.params.noteId)
    .select("-updatedAt -__v")
    .then((note) => res.json(note))
    .catch((err) => console.log(err));
});

router.put('/:noteId', (req, res) => {
  Note.findByIdAndUpdate(req.params.noteId, req.body).then(note => {
    res.json(note);
  }).catch(err => console.log(err));
})

router.post("/", (req, res) => {
  Note.create(req.body)
    .then((note) => res.json(note))
    .catch((err) => {
      console.log(err);
    });
});

module.exports = router;
