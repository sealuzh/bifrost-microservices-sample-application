"use strict";

var mongoose = require('mongoose');

var ProductSchema = new mongoose.Schema({
    name: {type: String, index: true},
    category: String,
    description: String,
    image: String
});

ProductSchema.index({description: 'text'});
ProductSchema.set('toJSON', {getters: true, virtuals: true});

module.exports = mongoose.model('Product', ProductSchema);