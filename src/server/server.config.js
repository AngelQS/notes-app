// Core
const path = require('path');

// Third
const express = require('express');
const nunjucks = require('nunjucks');
const morgan = require('morgan');
const methodOverride = require('method-override');
const flash = require('connect-flash');
const session = require('express-session');

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
app.use(morgan('dev'));
app.use(methodOverride('_method'));
// Agrega una funcion extra al request llamada flash(): req.flash() para darle un nombre al mensaje
app.use(flash());
app.use(
  session({
    secret: 'secret',
    resave: true,
    saveUninitialized: true,
  }),
);

// GLOBAL VARIABLES
app.use((req, res, next) => {
  res.locals.success_msg = req.flash('success_msg');
  next();
});

// ROUTES
app.use(require('../routes/index.routes'));
app.use(require('../routes/notes.routes'));
app.use(require('../routes/users.routes'));

// STATIC FILES
app.set('static files', path.join(__dirname, '../', 'public'));
app.use(express.static(app.get('static files')));

module.exports = app;
