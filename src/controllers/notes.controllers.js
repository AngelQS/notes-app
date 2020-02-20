const notesCtrl = {};

notesCtrl.renderNoteForm = (req, res) => {
  res.render('notes/new-note');
};

notesCtrl.createNewNote = (req, res) => {
  console.log(req.body);
  res.send('New Note');
};

notesCtrl.renderNotes = (req, res) => {
  res.send('Render all notes');
};

notesCtrl.renderEditForm = (req, res) => {
  res.send('Render edit form');
};

notesCtrl.updateNote = (req, res) => {
  res.send('Update note');
};

notesCtrl.deleteNote = (req, res) => {
  res.send('Deleting note');
};

module.exports = notesCtrl;
