/**
 * Express configuration
 */

'use strict';

var express = require('express');
var compression = require('compression');
var bodyParser = require('body-parser');
var errorHandler = require('errorhandler');
var morgan = require('morgan');

//CORS middleware
var allowCrossDomain = function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Authorization,X-Requested-With");
    next();
};

module.exports = function (app) {
    var env = app.get('env');

    app.use(compression());
    app.use(bodyParser.urlencoded({extended: false}));
    app.use(bodyParser.json());
    app.use(allowCrossDomain);

    app.use(morgan('dev'));
    app.use(errorHandler()); // Error handler - has to be last

};