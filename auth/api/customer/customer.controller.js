'use strict';

var Customer = require('../../mongoose/CustomerSchema');
var bcrypt = require('bcryptjs');

exports.login = function (req, res) {
    if (!req.query.email || !req.query.password) {
        return res.sendStatus(400);
    }

    Customer.findOne({
        email: req.query.email
    }).exec(function (err, customer) {
        if (err) {
            console.log(err);
            return res.sendStatus(500);
        }

        if (!customer) {
            console.log("Customer not found for email " + req.query.email);
            return res.sendStatus(401);
        }

        var userAsObject = customer.toObject();

        bcrypt.compare(req.query.password, userAsObject.password, function (err, result) {
            if (!result) {
                console.log("Wrong password");
                return res.sendStatus(401);
            } else {
                return res.status(200).json({
                    "firstName": userAsObject.firstName,
                    "lastName": userAsObject.lastName,
                    "email": userAsObject.email,
                    "jsonwebtoken": customer.jsonwebtoken
                });
            }
        });
    })
};

exports.checkLogin = function (req, res) {
    return res.status(200).send(req.customer);
};