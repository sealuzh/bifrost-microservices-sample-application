'use strict';

var express = require('express');
var auth = require('../../components/auth');
var router = express.Router();

var Client = require('prom-client');
var Register = require('prom-client').register;

router.get('/', function (req, res) {
    return res.sendStatus(404);
});

module.exports = router;