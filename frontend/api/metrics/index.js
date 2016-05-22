'use strict';

var express = require('express');
var router = express.Router();
var Client = require('prom-client');
var Register = require('prom-client').register;

var errorCount = new Client.gauge('request_errors', '# of failed requests');
errorCount.set(0);

router.get('/', function (req, res) {
    return res.end(Register.metrics());
});

module.exports = router;