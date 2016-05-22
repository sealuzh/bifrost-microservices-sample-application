'use strict';

var express = require('express');
var auth = require('../../components/auth');
var controller = require('./customer.controller.js');

var router = express.Router();

router.get('/login', controller.login);
router.get('/checkLogin', auth.isAuthenticated, controller.checkLogin);

module.exports = router;