// Module dependencies

var express = require('express'),
    bodyParser = require('body-parser'),
    methodOverride = require('method-override'),
    morgan = require('morgan'),
    routes = require('./routes'),
    http = require('http'),
    path = require('path');

var app = module.exports = express();

// Configuration

var port = 80;

// all environments
app.set('port', process.env.PORT || port);
app.set('views', __dirname + '/views');
app.set('view engine', 'ejs');
app.use(morgan('dev'));
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());
app.use(methodOverride());
app.use(express.static(path.join(__dirname, 'public')));

// Get some modules from node_modules
app.use('/cookies', express.static(__dirname + '/node_modules/angular-cookies/'));
app.use('/language', express.static(__dirname + '/node_modules/angular-i18n/'));
app.use('/sanitize', express.static(__dirname + '/node_modules/angular-sanitize/'));
app.use('/ng-admin', express.static(__dirname + '/node_modules/ng-admin/'));
app.use('/uploads', express.static(__dirname + '/../API/public/uploads/'));

var env = process.env.NODE_ENV || 'development';
app.use(function (err, req, res, next) {
    return res.status(500).send({
        success: false,
        message: err.toString()
    });
});

// production only
if (env === 'production') {
    // TODO
}

require('./routes')(app);

app.listen(port, function (err) {
    console.log("App listen to " + port);
});

module.export = app;
