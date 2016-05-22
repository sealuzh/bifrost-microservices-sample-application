'use strict';

var Product = require('../../mongoose/ProductSchema');

exports.index = function (req, res) {
    var query = req.query.query;
    Product.find({$text: {$search: query}}).exec(function (err, products) {
        if (err) {
            console.log(err);
            return res.sendStatus(500);
        }

        return res.status(200).send(products);
    });
};