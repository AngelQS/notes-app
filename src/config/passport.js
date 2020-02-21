// Third
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;

// Local
const User = require('../models/User');

// Guarda la sesion del usuario en la base de datos
passport.use(
  new LocalStrategy(
    {
      usernameField: 'email',
      passwordField: 'password',
    },
    async (email, password, done) => {
      // Match Email's User
      const user = await User.findOne({ email });
      if (!user) {
        return done(null, false, { message: 'User not found.' });
      } else {
        // Match Password's User
        const match = await user.matchPassword(password);
        if (match) {
          return done(null, user);
        } else {
          done(null, false, { message: 'Incorrect Password.' });
        }
      }
    },
  ),
);

// Cuando el usuario sea registrado se guardara en la sesion del servidor
passport.serializeUser((user, done) => {
  done(null, user._id);
});

/* Cuando el usuario empiece a navegar y ya esta registrado, passport hara
una consulta a la BD para ver si el id tiene autorizacion. Si es encontrado,
terminara con la sesion del usuario, va a obtener los datos relacionados con el usuario */
passport.deserializeUser((id, done) => {
  User.findById(id, (err, user) => {
    done(err, user);
  });
});
