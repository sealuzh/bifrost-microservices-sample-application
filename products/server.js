/* global process */
/* global __dirname */
"use strict";

require('dotenv').config();
var http = require('http');
var express = require('express');
var app = express();
var mongoose = require('mongoose');

app.set('port', process.env.PORT || 80);

require('./config/express')(app);
require('./api/routes')(app);

var server = http.createServer(app);

var start = function (cb) {
    mongoose.connect("mongodb://" + process.env.MONGO_HOST + '/' + process.env.MONGO_DBNAME);

    server.listen(app.get('port'), function(){
        console.info('Express server listening on port ' + app.get('port'));
        if (cb) {
            cb();
        }
    });
};

var stop = function(cb) {
    server.close(function() {
        console.info('Express server stopped');
        mongoose.disconnect();
        if (cb) {
            cb();
        }
    });
};

if (require.main === module) {
    start();
}
else {
    console.info('Running app as a module');
    exports.start = start;
    exports.server = server;
    exports.stop = stop;
}
