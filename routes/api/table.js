const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const passport = require('passport');
const guard = require('express-jwt-permissions')();
const auth = require('../../config/auth');
const errorHandle = require('../../config/errorHandle');

// Load Role model
const Table = require('../../models/Table');

// Load validation
const validateTableInput = require('../../validation/table');

//Check permission
const checkForPermissions = guard.check(['role:read', 'role:write']);
router.use(auth);
router.use(checkForPermissions);
router.use(errorHandle);

// @route   GET api/table/test
// @desc    Tests role route
// @access  Private
router.get('/test', (req, res) => {
  if (req.query.test) console.log(`TEST PARAM: ${req.query.test}`);
  res.json({ msg: 'Table Works' });
});

// @route   GET api/table
// @desc    Return all table
// @access  Private
router.get('/', (req, res) => {
  const errors = {};
  Table.find()
    .then(tables => {
      if (!tables) {
        errors.tablenotfound = 'Tables not found';
        res.status(404).json(errors);
      } else {
        res.json(tables);
      }
    })
    .catch(err => {
      errors.tablenotfound = 'Tables not found';
      res.status(404).json(errors);
    });
});

// @route   GET api/table/:table_id
// @desc    Get table by id
// @access  Private
router.get('/:table_id', (req, res) => {
  const errors = {};
  Table.find({ _id: req.params.table_id })
    .then(table => {
      if (!table) {
        errors.tablenotfound = 'Tables not found';
        res.status(404).json(errors);
      } else {
        res.json(table);
      }
    })
    .catch(err => {
      errors.tablenotfound = 'Tables not found';
      res.status(404).json(errors);
    });
});

// @route   POST api/table
// @desc    Create or edit a table
// @access  private
router.post('/', (req, res) => {
  // Validation
  const { errors, isValid } = validateTableInput(req.body);

  // Check Validation
  if (!isValid) {
    return res.status(400).json(errors);
  }

  //Get fields
  const tableFields = {};
  if (req.body.name) tableFields.name = req.body.name;
  if (req.body.section) tableFields.section = req.body.section;
  if (req.body.status) tableFields.status = req.body.status;

  Table.findOne({ name: req.body.name }).then(table => {
    if (table) {
      // Update
      Table.findOneAndUpdate(
        { name: req.body.name },
        { $set: tableFields },
        { new: true }
      ).then(table => res.json(table));
    } else {
      //Create
      new Table(tableFields).save().then(table => {
        res.json(table);
      });
    }
  });
});

// @route   DELETE api/table/:table_id
// @desc    Delete table by id
// @access  Private
router.delete(
  '/:table_id',
  guard.check(['role:delete']),
  errorHandle,
  (req, res) => {
    const errors = {};
    MenuGroup.findOneAndRemove({ _id: req.params.table_id })
      .then(() => {
        res.json({ success: true });
      })
      .catch(err => {
        errors.tablenotfound = 'Table not found';
        res.status(404).json(errors);
      });
  }
);

module.exports = router;
