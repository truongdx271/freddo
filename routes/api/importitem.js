const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const passport = require('passport');
const guard = require('express-jwt-permissions')();
const auth = require('../../config/auth');
const errorHandle = require('../../config/errorHandle');
const codegenerator = require('../../utils/codegenerator');

// Load ImportItem model
const ImportItem = require('../../models/ImportItem');

// Load validation
const validateImportItemInput = require('../../validation/importitem');

//Check permission
const checkForPermissions = guard.check(['role:read', 'role:write']);
router.use(auth);
router.use(checkForPermissions);
router.use(errorHandle);

// @route   GET api/importitem/test
// @desc    Tests ImportItem route
// @access  Private
router.get('/test', (req, res) =>
  res.json({
    msg: 'ImportItem Works'
  })
);

// @route   GET api/importitem
// @desc    Return all import item
// @access  Private
router.get('/', (req, res) => {
  const errors = {};
  ImportItem.find()
    .populate('group', ['name'])
    .then(importitems => {
      if (!importitems) {
        errors.itemsnotfound = 'Items not found';
        res.status(404).json(errors);
      } else {
        res.json(importitems);
      }
    });
});

// @route   GET api/importitem/:importitem_id
// @desc    Get importitem by id
// @access  Private
router.get('/:importitem_id', (req, res) => {
  const errors = {};
  ImportItem.find({
    _id: req.params.importitem_id
  })
    .populate('group', ['name'])
    .then(importitem => {
      if (!importitem) {
        errors.itemnotfound = 'Item not found';
        res.status(404).json(errors);
      } else {
        res.json(importitem);
      }
    })
    .catch(err => {
      errors.fetchdata = 'Error while fetching data';
      res.status(404).json(errors);
    });
});

// @route   POST api/menuitem
// @desc    Create or edit a menuitem
// @access  private
router.post('/', (req, res) => {
  // Validation
  const { errors, isValid } = validateImportItemInput(req.body);

  // Check Validation
  if (!isValid) {
    return res.status(400).json(errors);
  }

  //Get fields
  const importitemFields = {};
  if (req.body.name) importitemFields.name = req.body.name;
  if (req.body.group) importitemFields.group = req.body.group;
  if (!req.body.code) {
    codegenerator(req.body.name, (err, code) => {
      if (err) errors.code = 'Error code';
      if (code) importitemFields.code = code;
    });
  } else {
    importitemFields.code = req.body.code;
  }
  if (req.body.image) importitemFields.image = req.body.image;
  if (req.body.unit) importitemFields.unit = req.body.unit;
  if (req.body.price) importitemFields.price = req.body.price;
  if (req.body.quantity) importitemFields.quantity = req.body.quantity;
  if (req.body.description) importitemFields.description = req.body.description;

  ImportItem.findOne({
    code: req.body.code
  })
    .then(importitem => {
      if (importitem) {
        // Update
        ImportItem.findOneAndUpdate(
          {
            code: req.body.code
          },
          {
            $set: importitemFields
          },
          {
            new: true
          }
        ).then(importitem => res.json(importitem));
      } else {
        //Create
        new ImportItem(importitemFields).save().then(importitem => {
          res.json(importitem);
        });
      }
    })
    .catch(err => {
      errors.save = 'Error while quering';
      res.status(404).json(errors);
    });
});

// @route   DELETE api/importitem/:importitem_id
// @desc    Delete importitem by id
// @access  Private
router.delete(
  '/:importitem_id',
  guard.check(['role:delete']),
  errorHandle,
  (req, res) => {
    errors = {};
    ImportItem.findOneAndRemove({
      _id: req.params.importitem_id
    })
      .then(() => {
        res.json({
          success: true
        });
      })
      .catch(err => {
        errors.delete = 'Errors while delete the object';
        res.status(404).json(errors);
      });
  }
);

module.exports = router;
