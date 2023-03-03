const express = require('express');
const morgan = require('morgan');
const path = require('path');
const app = express();

//DATABASE MODULES
const { mongoose } = require('./database');

//SETTINGS
const PORT = process.env.PORT || 3000;
app.set('port', PORT);

//MIDDLEWARE
app.use(morgan('dev'));
app.use(express.json());

//ROUTES
app.use('/notes', require('./routes/muro.routes'));

//STATIC FILES
app.use(express.static(path.join(__dirname, 'public')));

app.listen(PORT, () => { console.log(`server on port ${PORT}`) });