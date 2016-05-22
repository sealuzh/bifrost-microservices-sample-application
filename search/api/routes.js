'use strict';

module.exports = function (app) {
    app.use('/search', require('./search'));
    app.use('/metrics', require('./metrics'));
};
