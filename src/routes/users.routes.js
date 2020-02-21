// Local
const { Router } = require('express');
const {
  renderSignUpForm,
  renderSignInForm,
  signUp,
  signIn,
  logOut,
} = require('../controllers/users.controller');

// Initialization
const router = Router();

router.get('/users/signup', renderSignUpForm);

router.post('/users/signup', signUp);

router.get('/users/signin', renderSignInForm);

router.post('/users/signin', signIn);

router.get('/users/logout', logOut);

module.exports = router;
