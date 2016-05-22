require('dotenv').config();

var express = require('express');
var app = express();
var path = require('path');

require('./config/express')(app);
require('./api/routes')(app);

app.route('/overview.html').get(function (req, res) {
    if (process.env.VERSION) {
        return res.sendFile(path.normalize(__dirname + '/public/overview_alternative.html'));
    }
    return res.sendFile(path.normalize(__dirname + '/public/overview.html'));
});

app.use(express.static('public'));

app.route('/*').get(function (req, res) {
    res.sendFile(path.normalize(__dirname + '/public/index.html'));
});

app.listen(process.env.PORT || 80, function () {
    console.log('BiFrost Sample Up. This is the %s version', process.env.VERSION ? 'redesigned' : 'classic');
});
