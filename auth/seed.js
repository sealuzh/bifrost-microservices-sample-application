"use strict";

require('dotenv').config();

var bcrypt = require('bcryptjs');
var mongoose = require('mongoose');
var Customer = require('./mongoose/CustomerSchema');

mongoose.connect("mongodb://" + process.env.MONGO_HOST + '/' + process.env.MONGO_DBNAME);

Customer.remove({}, function () {
    Customer.create([
        {
            email: "demouser@demo.ch",
            password: bcrypt.hashSync("test", bcrypt.genSaltSync(10))
        },
        {
            email: "demouser2@demo.ch",
            password: bcrypt.hashSync("test", bcrypt.genSaltSync(10))
        },
        {
            email: "demouser3@demo.ch",
            password: bcrypt.hashSync("test", bcrypt.genSaltSync(10))
        },
        {
            email: "demouser4@demo.ch",
            password: bcrypt.hashSync("test", bcrypt.genSaltSync(10))
        }
    ], function (err, insertedCustomers) {
        if (err) console.log(err);
        console.log('seeding %s customers', insertedCustomers.length);
        console.log(insertedCustomers);
        mongoose.disconnect();
    })
});