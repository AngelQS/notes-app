// Core
const path = require('path');

// Third
const express = require('express');
const nunjucks = require('nunjucks');
const morgan = require('morgan');
const methodOverride = require('method-override');
const flash = require('connect-flash');
const session = require('express-session');
const passport = require('passport');

// INITIALIZATIONS
const app = express();
require('../config/passport');

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
// Passport tiene que ser colocado luego de session, ya que se basa en ese modulo
app.use(passport.initialize());
app.use(passport.session());

// GLOBAL VARIABLES
app.use((req, res, next) => {
  res.locals.success_msg = req.flash('success_msg');
  res.locals.error_msg = req.flash('error_msg');
  res.locals.error = req.flash('error');
  res.locals.user = req.user || null; // passport guarda la sesion del usuario en req.user
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
