const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const passport = require('passport');
const guard = require('express-jwt-permissions')();
const auth = require('../../config/auth');
const errorHandle = require('../../config/errorHandle');
const codegenerator = require('../../utils/codegenerator');

// Load MenuItem model
const MenuItem = require('../../models/MenuItem');

// Load validation
const validateMenuItemInput = require('../../validation/menuitem');

//Check permission
const checkForPermissions = guard.check(['role:read', 'role:write']);
router.use(auth);
router.use(checkForPermissions);
router.use(errorHandle);

// @route   GET api/menuitem/test
// @desc    Tests MenuItem route
// @access  Private
router.get('/test', (req, res) => res.json({
  msg: 'MenuItem Works'
}));

// @route   GET api/menuitem
// @desc    Return all menu item
// @access  Private
router.get('/', (req, res) => {
  const errors = {};
  MenuItem.find()
    .populate('group', ['name'])
    .then(menuitems => {
      if (!menuitems) {
        errors.itemsnotfound = 'Items not found';
        res.status(404).json(errors);
      } else {
        res.json(menuitems);
      }
    });
});

// @route   GET api/menuitem/:menuitem_id
// @desc    Get menuitem by id
// @access  Private
router.get('/:menuitem_id', (req, res) => {
  const errors = {};
  MenuItem.find({
      _id: req.params.menuitem_id
    })
    .populate('group', ['name'])
    .then(menuitem => {
      if (!menuitem) {
        errors.itemnotfound = 'Item not found';
        res.status(404).json(errors);
      } else {
        res.json(menuitem);
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
  const {
    errors,
    isValid
  } = validateMenuItemInput(req.body);

  // Check Validation
  if (!isValid) {
    return res.status(400).json(errors);
  }

  //Get fields
  const menuitemFields = {};
  if (req.body.name) menuitemFields.name = req.body.name;
  if (req.body.group) menuitemFields.group = req.body.group;
  if (!req.body.code) {
    codegenerator(req.body.name, (err, code) => {
      if (err) errors.code = 'Error code';
      if (code) menuitemFields.code = code;
    });
  } else {
    menuitemFields.code = req.body.code;
  }
  if (req.body.image) menuitemFields.image = req.body.image;
  if (req.body.unit) menuitemFields.unit = req.body.unit;
  if (req.body.price) menuitemFields.price = req.body.price;
  if (req.body.discount) menuitemFields.discount = req.body.discount;
  if (req.body.description) menuitemFields.description = req.body.description;

  MenuItem.findOne({
      code: req.body.code
    })
    .then(menuitem => {
      if (menuitem) {
        // Update
        MenuItem.findOneAndUpdate({
            code: req.body.code
          }, {
            $set: menuitemFields
          }, {
            new: true
          })
          .then(menuitem => res.json(menuitem));
      } else {
        //Create
        new MenuItem(menuitemFields).save().then(menuitem => {
          res.json(menuitem);
        });
      }
    })
    .catch(err => {
      errors.save = 'Error while quering';
      res.status(404).json(errors);
    });
});

// @route   DELETE api/menuitem/:menuitem_id
// @desc    Delete menuitem by id
// @access  Private
router.delete(
  '/:menuitem_id',
  guard.check(['role:delete']),
  errorHandle,
  (req, res) => {
    errors = {};
    MenuItem.findOneAndRemove({
        _id: req.params.menuitem_id
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