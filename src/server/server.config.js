// Core
const path = require('path');

// Third
const express = require('express');
const nunjucks = require('nunjucks');

// INITIALIZATIONS
const app = express();

// SETTINGS
app.set('port', process.env.PORT || 4000);
app.set('views', path.join(__dirname, '../', 'views'));
nunjucks.configure(app.get('views'), {
  express: app,
});
app.set('view engine', '.njk');

// MIDDLEWARES
/*
express.urlencoded cada vez que llegan datos de un formulario a travez de cualquier
tipo de metodo, tratara de convertir esos datos en un objeto JSON para poder manipularlo
en codigo.
*/
app.use(express.urlencoded({ extended: false }));

// GLOBAL VARIABLES

// ROUTES
app.get('/', (req, res) => {
  res.render('index');
});

// STATIC FILES
app.set('static files', path.join(__dirname, '../', 'public'));
app.use(express.static(app.get('static files')));

module.exports = app;
