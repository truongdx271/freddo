const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const passport = require('passport');
const guard = require('express-jwt-permissions')();
const auth = require('../../config/auth');
const errorHandle = require('../../config/errorHandle');

// Load Role model
const MenuGroup = require('../../models/MenuGroup');

// Load validation
const validateMenuGroupInput = require('../../validation/menugroup');

//Check permission
const checkForPermissions = guard.check(['role:read', 'role:write']);
router.use(auth);
router.use(checkForPermissions);
router.use(errorHandle);

// @route   GET api/menugroup/test
// @desc    Tests role route
// @access  Private
router.get('/test', (req, res) => res.json({ msg: 'MenuGroup Works' }));

// @route   GET api/menugroup
// @desc    Return all menu group
// @access  Private
router.get('/', (req, res) => {
  const errors = {};
  MenuGroup.find().then(menugroups => {
    if (!menugroups) {
      errors.groupnotfound = 'Groups not found';
      res.status(404).json(errors);
    } else {
      res.json(menugroups);
    }
  });
});

// @route   GET api/menugroup/:menugroup_id
// @desc    Get menugroup by id
// @access  Private
router.get('/:menugroup_id', (req, res) => {
  const errors = {};
  MenuGroup.find({ _id: req.params.menugroup_id })
    .then(menugroup => {
      if (!menugroup) {
        errors.groupnotfound = 'Groups not found';
        res.status(404).json(errors);
      } else {
        res.json(menugroup);
      }
    })
    .catch(err => res.status(404).json({ groupnotfound: 'Groups not found' }));
});

// @route   POST api/menugroup
// @desc    Create or edit a menugroup
// @access  private
router.post('/', (req, res) => {
  // Validation
  const { errors, isValid } = validateMenuGroupInput(req.body);

  // Check Validation
  if (!isValid) {
    return res.status(400).json(errors);
  }

  //Get fields
  const menugroupFields = {};
  if (req.body.name) menugroupFields.name = req.body.name;
  if (req.body.description) menugroupFields.description = req.body.description;

  MenuGroup.findOne({ name: req.body.name }).then(menugroup => {
    if (menugroup) {
      // Update
      MenuGroup.findOneAndUpdate(
        { name: req.body.name },
        { $set: menugroupFields },
        { new: true }
      ).then(menugroup => res.json(menugroup));
    } else {
      //Create
      new MenuGroup(menugroupFields).save().then(menugroup => {
        res.json(menugroup);
      });
    }
  });
});

// @route   DELETE api/menugroup/:menugroup_id
// @desc    Delete menugroup by id
// @access  Private
router.delete(
  '/:menugroup_id',
  guard.check(['role:delete']),
  errorHandle,
  (req, res) => {
    MenuGroup.findOneAndRemove({ _id: req.params.menugroup_id })
      .then(() => {
        res.json({ success: true });
      })
      .catch(err => res.status(404).json({ groupnotfound: 'Group not found' }));
  }
);

module.exports = router;
