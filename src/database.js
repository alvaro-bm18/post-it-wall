const mongoose = require('mongoose');
const URI = 'mongodb://localhost/notes-muro-db';

// strictQuery could change in mongo 7, necessary set it.
mongoose.set('strictQuery', false);
mongoose.connect(URI)
    .then(db => console.log('Database conected'))
    .catch(error => console.error(error));

module.exports = mongoose;