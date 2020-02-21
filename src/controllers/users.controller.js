// Local
const User = require('../models/User');

const usersCtrl = {};

usersCtrl.renderSignUpForm = (req, res) => {
  res.render('users/signup');
};

usersCtrl.signUp = async (req, res) => {
  const errors = [];
  const { name, email, password, confirm_password } = req.body;
  if (password != confirm_password) {
    errors.push({ text: 'Passwords do not match.' });
  }
  if (password.length < 4) {
    errors.push({ text: 'Passwords must be at least 4 characters.' });
  }
  if (errors.length > 0) {
    res.render('users/signup', { errors, name, email });
  } else {
    const emailUser = await User.findOne({ email: email });
    if (emailUser) {
      req.flash('error_msg', 'The email is already in use.');
      res.redirect('/users/signup');
    } else {
      const newUser = new User({ name, email, password });
      newUser.password = await newUser.encryptPassword(password);
      await newUser.save();
      req.flash('success_msg', 'You are registered.');
      res.redirect('/users/signin');
    }
  }
};

usersCtrl.renderSignInForm = (req, res) => {
  res.render('users/signin');
};

usersCtrl.signIn = (req, res) => {
  res.send('SignIn');
};

usersCtrl.logOut = (req, res) => {
  res.send('LogOut');
};

module.exports = usersCtrl;
