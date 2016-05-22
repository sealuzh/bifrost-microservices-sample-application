'use strict';

var express = require('express');
var auth = require('../../components/auth');
var router = express.Router();
var Transaction = require('../../mongoose/TransactionSchema');

var Client = require('prom-client');
var Register = require('prom-client').register;

var productsSold = new Client.gauge('products_sold', '# of sold products');
productsSold.set(0);

var errorCount = new Client.gauge('request_errors', '# of failed requests');
errorCount.set(0);

var products = {};

router.get('/', function (req, res) {
    Transaction.count({}, function (err, count) {
        if (err) {
            return res.sendStatus(500);
        }

        productsSold.set(count);
        return res.end(Register.metrics());
    });

});

module.exports = router;