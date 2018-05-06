const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const passport = require('passport');
const guard = require('express-jwt-permissions')();
const auth = require('../../config/auth');
const errorHandle = require('../../config/errorHandle');

// Load Role model
const Role = require('../../models/Role');

//Check permission
const checkForPermissions = guard.check(['role:read', 'role:write']);
router.use(auth);
router.use(checkForPermissions);
router.use(errorHandle);

// @route   GET api/role/test
// @desc    Tests role route
// @access  Public
router.get('/test', (req, res) => res.json({ msg: 'Roles Works' }));

// @route   POST api/role
// @desc    Create or edit a role
// @access  private
router.post('/', (req, res) => {
  // Validation

  //Get fields
  const roleFields = {};
  if (req.body.name) roleFields.name = req.body.name;
  if (req.body.description) roleFields.description = req.body.description;
  if (typeof req.body.permissions !== 'undefined')
    roleFields.permissions = req.body.permissions.split(',');

  Role.findOne({ name: req.body.name }).then(role => {
    if (role) {
      // Update
      Role.findOneAndUpdate(
        { name: req.body.name },
        { $set: roleFields },
        { new: true }
      ).then(role => res.json(role));
    } else {
      //Create
      new Role(roleFields).save().then(role => {
        res.json(role);
      });
    }
  });
});

// @route   GET api/role
// @desc    Get all roles
// @access  private
router.get('/', (req, res) => {
  const errors = {};
  Role.find()
    .then(roles => {
      if (!roles) {
        errors.norole = 'There are no roles';
        return res.status(404).json(errors);
      }

      res.json(roles);
    })
    .catch(err => res.status(404).json({ role: 'There are no roles' }));
});

// @route   DELETE api/role/:role_id
// @desc    Delete role by id
// @access  Private
router.delete(
  '/:role_id',
  guard.check(['role:delete']),
  errorHandle,
  (req, res) => {
    Role.findOneAndRemove({ _id: req.params.role_id }).then(() => {
      res.json({ success: true });
    });
  }
);

module.exports = router;
