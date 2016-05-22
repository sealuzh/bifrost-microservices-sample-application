'use strict';

var express = require('express');
var auth = require('../../components/auth');
var controller = require('./product.controller.js');

var router = express.Router();

router.get('/', auth.isAuthenticated, controller.index);
router.get('/search', auth.isAuthenticated, controller.search);
router.get('/:id', auth.isAuthenticated, controller.get);
router.get('/:id/buy', auth.isAuthenticated, controller.buy);
router.get('/:id/buyers', auth.isAuthenticated, controller.buyers);

module.exports = router;