const express = require('express');
const router = express.Router();
const NoteModel = require('../models/note.model');

/* FETCH ALL NOTES ON DATABASE */
router.get('/', async (req, res) => {
    const muro = await NoteModel.find();
    res.json(muro);
});

router.get('/:id', async (req, res) => {
    const noteRequired = await NoteModel.findById(req.params.id);
    res.json(noteRequired);
});

// recive data from post
router.post('/', async (req, res) => {
    const { title, note, color } = req.body;
    const NoteToAdd = new NoteModel({ title, note, color });
    await NoteToAdd.save();
    res.json({ "status": "note added successfully" });
});

router.put('/:id', async (req, res) => {
    const { title, note, color } = req.body;
    const noteDataUpdated = { title, note, color };
    await NoteModel.findByIdAndUpdate(req.params.id, noteDataUpdated);
    res.json({ "status": "note updated" });
});

router.delete('/:id', async (req, res) => {
    await NoteModel.findByIdAndDelete(req.params.id);
    res.json({ "status": "note removed sucessfully" });
});

module.exports = router;