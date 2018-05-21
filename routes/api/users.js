const express = require('express');
const router = express.Router();
const gravatar = require('gravatar');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const keys = require('../../config/keys');
const passport = require('passport');
const auth = require('../../config/auth');
const guard = require('express-jwt-permissions')();
const errorHandle = require('../../config/errorHandle');

// Load Input Validation
const validateRegisterInput = require('../../validation/register');
const validateLoginInput = require('../../validation/login');

// Load User model
const User = require('../../models/User');
// Load Role model
const Role = require('../../models/Role');

// Permissions
const checkForPermissions = guard.check(['user:read']);
router.use(auth);
// router.use(checkForPermissions);
// router.use(errorHandle);

// @route   GET api/users/test
// @desc    Tests users route
// @access  Public
router.get('/test', checkForPermissions, errorHandle, (req, res) =>
  res.json({
    msg: 'Users Works'
  })
);

// @route   GET api/users/register
// @desc    Register user
// @access  Public
router.post('/register', (req, res) => {
  const { errors, isValid } = validateRegisterInput(req.body);

  // Check Validation
  if (!isValid) {
    return res.status(400).json(errors);
  }

  User.findOne({
    email: req.body.email
  }).then(user => {
    if (user) {
      errors.email = 'Email already exists';
      return res.status(400).json(errors);
    } else {
      const avatar = gravatar.url(req.body.email, {
        s: '200', // Size
        r: 'pg', // Rating
        d: 'mm' // Default
      });

      const newUser = new User({
        name: req.body.name,
        email: req.body.email,
        avatar,
        password: req.body.password
      });

      // Hash password
      bcrypt.genSalt(10, (err, salt) => {
        bcrypt.hash(newUser.password, salt, (err, hash) => {
          if (err) throw err;
          newUser.password = hash;

          // Set default Role
          Role.findOne({
            name: 'normal'
          }).then(role => {
            if (role) {
              newUser.role = role.id;
            }
            //Save user
            newUser
              .save()
              .then(user => res.json(user))
              .catch(err => console.log(err));
          });
        });
      });
    }
  });
});

// @route   GET api/users/login
// @desc    Login User / Returning JWT Token
// @access  Public
router.post('/login', (req, res) => {
  const { errors, isValid } = validateLoginInput(req.body);

  // Check Validation
  if (!isValid) {
    return res.status(400).json(errors);
  }

  const email = req.body.email;
  const password = req.body.password;

  // Find user by email
  User.findOne({
    email
  })
    .populate('role', ['name', 'permissions'])
    .then(user => {
      // Check for user
      if (!user) {
        errors.email = 'User not found';
        return res.status(404).json(errors);
      }

      // Check Password
      bcrypt.compare(password, user.password).then(isMatch => {
        if (isMatch) {
          // User Matched
          const payload = {
            id: user.id,
            name: user.name,
            role: user.role.name,
            permissions: user.role.permissions,
            avatar: user.avatar
          }; // Create JWT Payload

          // Sign Token
          jwt.sign(
            payload,
            keys.secretOrKey,
            {
              expiresIn: 3600 * 6
            },
            (err, token) => {
              res.json({
                success: true,
                token: 'Bearer ' + token
              });
            }
          );
        } else {
          errors.password = 'Password incorrect';
          return res.status(400).json(errors);
        }
      });
    });
});

// @route   GET api/users/current
// @desc    Return current user
// @access  Private
router.get('/current', checkForPermissions, errorHandle, (req, res) => {
  const errors = {};
  if (req.user) {
    res.json({
      id: req.user.id,
      name: req.user.name,
      role: req.user.role,
      email: req.user.email
    });
  } else {
    errors.usernotfound = 'User not found';
    res.status(404).json(errors);
  }
});

// @route   GET api/users/all
// @desc    Return all user
// @access  Private
router.get('/all', checkForPermissions, errorHandle, (req, res) => {
  const errors = {};
  User.find()
    .populate('role', ['name'])
    .then(users => {
      if (!users) {
        errors.usersnotfound = 'Users not found';
        res.status(404).json(errors);
      } else {
        res.json(users);
      }
    });
});

// @route   DELETE api/users/:user_id
// @desc    Delete user and profile by id
// @access  Private
router.delete('/:user_id', checkForPermissions, errorHandle, (req, res) => {
  // Old func
  // User.findOneAndRemove({ _id: req.params.user_id }).then(() => {
  //   Profile.findOneAndRemove({ user: req.params.user_id }).then(() =>
  //     res.json({ success: true })
  //   );
  // });

  // Test func
  User.findOneAndRemove({
    _id: req.params.user_id
  }).then(() => {
    res.json({
      success: true
    });
  });
});

// @route   POST api/users/role/:user_id
// @desc    Set role for a user
// @access  Private
router.post('/role/:user_id', checkForPermissions, errorHandle, (req, res) => {
  const errors = {};
  User.findOne({
    _id: req.params.user_id
  }).then(user => {
    if (!user) {
      errors.user = 'User not found';
      res.status(404).json(errors);
    } else {
      // If request send role name
      if (req.body.role_name) {
        Role.findOne({
          name: req.body.role_name
        }).then(role => {
          user.role = role.id;
          User.findOneAndUpdate(
            {
              _id: req.params.user_id
            },
            {
              $set: user
            },
            {
              new: true
            }
          ).then(user => res.json(user));
        });
      }

      // If request send role_id
      if (req.body.role_id) {
        user.role = req.body.role_id;
        //Update
        User.findOneAndUpdate(
          {
            _id: req.params.user_id
          },
          {
            $set: user
          },
          {
            new: true
          }
        ).then(user => res.json(user));
      }
    }
  });
});

module.exports = router;
