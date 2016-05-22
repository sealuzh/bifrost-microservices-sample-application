"use strict";

var mongoose = require('mongoose');

var ProductSchema = new mongoose.Schema({
    name: String,
    category: String,
    description: String,
    image: String
});

ProductSchema.set('toJSON', {getters: true, virtuals: true});

module.exports = mongoose.model('Product', ProductSchema);