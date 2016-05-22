'use strict';

module.exports = function (app) {
    app.use('/products', require('./products'));
    app.use('/metrics', require('./metrics'));
};
