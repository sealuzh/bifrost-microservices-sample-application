'use strict';

module.exports = function (app) {
    app.use('/customers', require('./customer'));
};
