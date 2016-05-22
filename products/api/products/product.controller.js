'use strict';

var Product = require('../../mongoose/ProductSchema');
var Transaction = require('../../mongoose/TransactionSchema');
var request = require('request');

exports.index = function (req, res) {
    Product.find({}).exec(function (err, products) {
        if (err) {
            return res.sendStatus(500);
        }

        return res.json(products);
    });
};

exports.get = function (req, res) {
    Product.findOne({
        _id: req.params.id
    }).lean().exec(function (err, product) {
        if (err) {
            return res.sendStatus(500);
        }

        Transaction.count({product: req.params.id}, function (err, count) {
            if (err) {
                return res.sendStatus(500);
            }

            if (product) {
                product.buyers = count;
                return res.json(product);
            } else {
                return res.sendStatus(404);
            }
        });
    });
};

exports.buy = function (req, res) {
    Transaction.create({buyer: req.customer._id, product: req.params.id}, function (err, transaction) {
        if (err) {
            return res.sendStatus(500);
        }

        Product.findOne({
            _id: req.params.id
        }).lean().exec(function (err, product) {
            if (err) {
                return res.sendStatus(500);
            }

            Transaction.count({product: req.params.id}, function (err, count) {
                if (err) {
                    return res.sendStatus(500);
                }

                if (product) {
                    product.buyers = count;
                    return res.json(product);
                } else {
                    return res.sendStatus(404);
                }
            });

        });

    });
};

exports.buyers = function (req, res) {
    Transaction.find({product: req.params.id}).exec(function (err, transactions) {
        if (err) {
            return res.sendStatus(500);
        }

        return res.json(transactions);
    });
};

exports.search = function (req, res) {
    request({url: 'http://' + process.env.SEARCH_HOST + ':' + process.env.SEARCH_PORT + '/search?query=' + req.query.query, headers: req.headers, gzip: true}, function (err, result, body) {
        if (err) {
            console.log(err);
            return res.sendStatus(401);
        }

        if (result.statusCode !== 200) {
            return res.sendStatus(401);
        }

        return res.json(JSON.parse(body));
    });
};