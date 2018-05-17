const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const passport = require('passport');
const guard = require('express-jwt-permissions')();
const auth = require('../../config/auth');
const errorHandle = require('../../config/errorHandle');

// Load Group model
const Group = require('../../models/Group');

// Load validation
const validateGroupInput = require('../../validation/group');

//Check permission
const checkForPermissions = guard.check(['role:read', 'role:write']);
router.use(auth);
router.use(checkForPermissions);
router.use(errorHandle);

// @route   GET api/group/test
// @desc    Tests role route
// @access  Private
router.get('/test', (req, res) => res.json({
  msg: 'Group Works'
}));

// @route   GET api/group
// @desc    Return all menu group
// @access  Private
router.get('/', (req, res) => {
  const errors = {};
  Group.find().then(groups => {
    if (!groups) {
      errors.groupnotfound = 'Groups not found';
      res.status(404).json(errors);
    } else {
      res.json(groups);
    }
  });
});

// @route   GET api/group/:group_id
// @desc    Get group by id
// @access  Private
router.get('/:group_id', (req, res) => {
  const errors = {};
  Group.find({
      _id: req.params.group_id
    })
    .then(group => {
      if (!group) {
        errors.groupnotfound = 'Groups not found';
        res.status(404).json(errors);
      } else {
        res.json(menugroup);
      }
    })
    .catch(err => res.status(404).json({
      groupnotfound: 'Groups not found'
    }));
});

// @route   POST api/group
// @desc    Create or edit a group
// @access  private
router.post('/', (req, res) => {
  // Validation
  const {
    errors,
    isValid
  } = validateGroupInput(req.body);

  // Check Validation
  if (!isValid) {
    return res.status(400).json(errors);
  }

  //Get fields
  const groupFields = {};
  if (req.body.name) groupFields.name = req.body.name;
  if (req.body.name) groupFields.grouptype = req.body.grouptype;
  if (req.body.description) groupFields.description = req.body.description;

  Group.findOne({
    name: req.body.name
  }).then(group => {
    if (group) {
      // Update
      Group.findOneAndUpdate({
        name: req.body.name
      }, {
        $set: groupFields
      }, {
        new: true
      }).then(group => res.json(group));
    } else {
      //Create
      new Group(groupFields).save().then(group => {
        res.json(group);
      });
    }
  });
});

// @route   DELETE api/group/:group_id
// @desc    Delete group by id
// @access  Private
router.delete(
  '/:group_id',
  guard.check(['role:delete']),
  errorHandle,
  (req, res) => {
    Group.findOneAndRemove({
        _id: req.params.group_id
      })
      .then(() => {
        res.json({
          success: true
        });
      })
      .catch(err => res.status(404).json({
        groupnotfound: 'Group not found'
      }));
  }
);

module.exports = router;