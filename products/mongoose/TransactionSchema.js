"use strict";

var mongoose = require('mongoose');

var TransactionSchema = new mongoose.Schema({
    buyer: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Customer"
    },
    product: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Product"
    }
});

module.exports = mongoose.model('Transaction', TransactionSchema);