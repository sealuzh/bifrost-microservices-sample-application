'use strict';

var express = require('express');
var auth = require('../../components/auth');
var controller = require('./search.controller.js');

var router = express.Router();

router.get('/', controller.index);

module.exports = router;