const mongoose = require('mongoose');
const { Schema } = mongoose;

const NOTE_SCHEMA = new Schema({
    title: { type: String, required: true },
    note: { type: String, required: true },
    color: { type: String, required: true }
});

module.exports = mongoose.model('note-schema', NOTE_SCHEMA);