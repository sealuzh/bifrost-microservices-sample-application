'use strict';

module.exports = function (app) {
    app.use('/customer', require('./customer'));
    app.use('/location', require('./location'));
    app.use('/event', require('./event'));
};
