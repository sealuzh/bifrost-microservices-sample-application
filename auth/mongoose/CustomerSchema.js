"use strict";

var mongoose = require('mongoose');
var jwt = require('jsonwebtoken');

var CustomerSchema = new mongoose.Schema({
    firstName: {
        type: String,
        trim: true
    },
    lastName: {
        type: String,
        trim: true
    },
    email: {
        type: String,
        trim: true,
        lowercase: true
    },
    password: String
});

CustomerSchema.virtual('jsonwebtoken').get(function () {
    return jwt.sign({id: this._id}, process.env.JSONWEBTOKEN);
});

CustomerSchema.set('toJSON', {getters: true, virtuals: true});

module.exports = mongoose.model('Customer', CustomerSchema);