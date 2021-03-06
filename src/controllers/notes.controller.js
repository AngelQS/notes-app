// Local
const Note = require('../models/Note');

const notesCtrl = {};

notesCtrl.renderNoteForm = (req, res) => {
  res.render('notes/new-note');
};

notesCtrl.createNewNote = async (req, res) => {
  const { title, description } = req.body;
  const newNote = new Note({
    title,
    description,
  });
  // el id puede ser obtenido ya sea desde req.user._id o req.user.id
  newNote.user = req.user._id;
  await newNote.save();
  req.flash('success_msg', 'Note has been created.');
  res.redirect('/notes');
};

notesCtrl.renderNotes = async (req, res) => {
  const notes = await Note.find({ user: req.user._id }).sort({
    createdAt: 'desc',
  });
  res.render('notes/all-notes', { notes });
};

notesCtrl.renderEditForm = async (req, res) => {
  const note = await Note.findById(req.params.id);
  if (note.user != req.user._id) {
    req.flash('error_msg', 'Not authorized. You can only edit your own notes.');
    return res.redirect('/notes');
  }
  res.render('notes/edit-note', { note });
};

notesCtrl.updateNote = async (req, res) => {
  const { title, description } = req.body;
  await Note.findByIdAndUpdate(req.params.id, { title, description });
  req.flash('success_msg', 'Note has been updated.');
  res.redirect('/notes');
};

notesCtrl.deleteNote = async (req, res) => {
  await Note.findByIdAndDelete(req.params.id);
  req.flash('success_msg', 'Note has been deleted.');
  res.redirect('/notes');
};

module.exports = notesCtrl;
