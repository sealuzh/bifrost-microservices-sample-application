var jwt = require('jsonwebtoken');
var CustomerLogin = require('../mongoose/CustomerSchema');

function isAuthenticated(req, res, next) {
    var jsonwebtoken;

    if (!req.headers.authorization || req.headers.authorization.split(' ')[0] !== 'Bearer') {
        console.log("No token received");
        return res.sendStatus(401);
    }

    try {
        jsonwebtoken = jwt.verify(req.headers.authorization.split(' ')[1], process.env.JSONWEBTOKEN)
    } catch (err) {
        console.log('jwt verification failed');
        return res.sendStatus(401);
    }

    if (!jsonwebtoken.id) {
        console.log('no id set');
        return res.sendStatus(401);
    }

    CustomerLogin.findById(jsonwebtoken.id, function (err, customer) {
        if (err) {
            return res.sendStatus(500);
        }
        if (!customer) {
            return res.sendStatus(401);
        }

        req.customer = customer.toObject();

        next();
    });
}

exports.isAuthenticated = isAuthenticated;