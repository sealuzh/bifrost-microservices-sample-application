var request = require('request');

function isAuthenticated(req, res, next) {
    request({url: 'http://' + process.env.AUTH_HOST + ':' + process.env.AUTH_PORT + '/customers/checkLogin', headers: req.headers}, function(err, result) {
        if (err) {
            console.log(err);
            return res.sendStatus(401);
        }
        if (result.statusCode !== 200) {
            return res.sendStatus(401);
        }
        req.customer = JSON.parse(result.body);
        next();
    });
}

exports.isAuthenticated = isAuthenticated;