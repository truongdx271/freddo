const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const passport = require('passport');
const guard = require('express-jwt-permissions')();
const auth = require('../../config/auth');
const errorHandle = require('../../config/errorHandle');
const isEmpty = require('../../validation/is-empty');

// Load Group model
const Order = require('../../models/Order');

// Load validation
const validateOrderInput = require('../../validation/order');

//Check permission
const checkForPermissions = guard.check(['role:read', 'role:write']);
router.use(auth);
router.use(checkForPermissions);
router.use(errorHandle);

// @route   GET api/order/test
// @desc    Tests order route
// @access  Private
router.get('/test', (req, res) =>
  res.json({
    msg: 'Order Works'
  })
);

// @route   GET api/order
// @desc    Get all orders
// @access  Private
// Query var: page, perPage, user, status
router.get('/', (req, res) => {
  const errors = {};
  let perPage = 10;
  let page = Math.max(0, req.query.page);
  var query = {};

  if (req.query.perPage !== undefined) {
    perPage = req.query.perPage;
  }
  if (req.query.user !== undefined) {
    query.user = req.query.user;
  }
  if (req.query.status !== undefined) {
    query.status = req.query.status;
  }
  Order.find(query)
    .limit(perPage)
    .skip(perPage * page)
    .populate('user', ['name'])
    .populate('table', ['status', 'name'])
    .then(orders => {
      if (!orders) {
        errors.ordernotfound = 'Orders not found';
        res.status(404).json(errors);
      } else {
        res.json(orders);
      }
    })
    .catch(err => {
      errors.query = 'Error while quering';
      res.status(400).json(errors);
    });
});

// @route   GET api/order/:order_id
// @desc    Get all order by id
// @access  Private
router.get('/:order_id', (req, res) => {
  const errors = {};
  Order.find({
    _id: req.params.order_id
  })
    .then(order => {
      if (!order) {
        errors.ordernotfound = 'Orders not found';
        res.status(404).json(errors);
      } else {
        res.json(order);
      }
    })
    .catch(err => {
      errors.query = 'Error while quering';
      res.status(400).json(errors);
    });
});

// @route   POST api/group
// @desc    Create or edit order
// @access  Private
router.post('/', (req, res) => {
  // Validation
  const { errors, isValid } = validateOrderInput(req.body);

  // Check Validation
  if (!isValid) {
    return res.status(400).json(errors);
  }

  //Get fields
  const orderFields = {};
  if (req.body.user) orderFields.user = req.body.user;
  if (req.user) orderFields.user = req.user.id; // User id
  if (req.body.table) orderFields.table = req.body.table; // table ID
  if (req.body.billdate) orderFields.billdate = req.body.billdate;
  if (req.body.amount) orderFields.amount = req.body.amount;
  if (req.body.discount) orderFields.discount = req.body.discount;
  if (req.body.custpaid) orderFields.custpaid = req.body.custpaid;
  if (req.body.payback) orderFields.payback = req.body.payback;
  if (req.body.status) orderFields.status = req.body.status;
  if (req.body.total) orderFields.total = req.body.total;
  if (req.body.listitems)
    orderFields.listitems = JSON.parse(req.body.listitems);

  // console.log(JSON.parse(req.body.listitems));
  Order.findOne({
    _id: req.body.id
  })
    .then(order => {
      if (order) {
        // Update
        Order.findOneAndUpdate(
          {
            _id: req.body.id
          },
          {
            $set: orderFields
          },
          {
            new: true
          }
        ).then(order => res.json(order));
      } else {
        // Create
        new Order(orderFields).save().then(order => {
          res.json(order);
        });
      }
    })
    .catch(err => {
      errors.save = 'Error while quering';
      res.status(404).json(errors);
    });
});

// @route   POST api/order/complete/:_id
// @desc    Complete the order
// @access  Private
router.post('/complete/:_id', (req, res) => {
  // Validation
  //const { errors, isValid } = validateOrderInput(req.body);
  const errors = {};
  // Check Validation
  // if (!isValid) {
  //   return res.status(400).json(errors);
  // }

  let orderAmount = !isEmpty(req.body.amount) ? parseInt(req.body.amount) : 0;
  if (orderAmount === 0) {
    errors.amount = 'There is nothing to complete the order';
    res.status(400).json(errors);
  }
  let orderDiscount = !isEmpty(req.body.discount)
    ? parseInt(req.body.discount)
    : 0;
  let orderPaid = !isEmpty(req.body.custpaid) ? parseInt(req.body.custpaid) : 0;
  let orderBack = !isEmpty(req.body.payback) ? parseInt(req.body.payback) : 0;
  let orderTotal = !isEmpty(req.body.total) ? parseInt(req.body.total) : 0;

  // Skip this logic
  // if (orderPaid < orderTotal) {
  //   errors.custpaid = 'Not enough';
  //   res.status(400).json(errors);
  // }

  Order.findById(req.params._id, (err, order) => {
    if (err) {
      errors.query = 'Error while quering';
      res.status(404).json(errors);
    }

    order.amount = orderAmount;
    order.discount = orderDiscount;
    order.custpaid = orderPaid;
    order.payback = orderBack;
    order.total = orderTotal;
    order.billdate = Date.now;
    order.status = true;

    Order.findOneAndUpdate(
      {
        _id: req.params._id
      },
      {
        $set: order
      },
      {
        new: true
      }
    )
      .then(updatedOrder => res.json(updatedOrder))
      .catch(err => {
        errors.update = 'Error while update';
        res.status(400).json(errors);
      });
  });
});

// @route   DELETE api/order/:order_id
// @desc    Delete order by id
// @access  Private
router.delete(
  '/:order_id',
  guard.check(['role:delete']),
  errorHandle,
  (req, res) => {
    const errors = {};
    Order.findOneAndRemove({ _id: req.params.order_id })
      .then(() => {
        res.json({ success: true });
      })
      .catch(err => {
        errors.tablenotfound = 'Order not found';
        res.status(404).json(errors);
      });
  }
);

module.exports = router;
