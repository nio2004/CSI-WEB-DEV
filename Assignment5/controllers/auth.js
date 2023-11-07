// controllers/auth.js
const User = require('../models/user');
const bcrypt = require('bcrypt');
const saltRounds = 10;

exports.getSignup = (req, res) => {
  res.render('signup');
};

exports.postSignup = (req, res) => {
  const { username, password } = req.body;

  bcrypt.hash(password, saltRounds, (err, hash) => {
    if (err) {
      return res.status(500).send('An error occurred');
    }

    const newUser = new User({
      username,
      password: hash,
    });

    newUser.save((err) => {
      if (err) {
        return res.status(500).send('An error occurred');
      }

      res.redirect('/login');
    });
  });
};

exports.getLogin = (req, res) => {
  res.render('login');
};

exports.postLogin = (req, res) => {
  const { username, password } = req.body;

  User.findOne({ username }, (err, user) => {
    if (err || !user) {
      return res.status(401).send('Invalid username or password');
    }

    bcrypt.compare(password, user.password, (err, result) => {
      if (result) {
        req.session.user = user;
        res.redirect('/');
      } else {
        res.status(401).send('Invalid username or password');
      }
    });
  });
};

exports.logout = (req, res) => {
  req.session.destroy(() => {
    res.redirect('/login');
  });
};
