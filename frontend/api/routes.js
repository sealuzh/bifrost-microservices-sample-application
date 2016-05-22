'use strict';

module.exports = function (app) {
    app.use('/metrics', require('./metrics'));
};
