
/**
 * Module dependencies
 */

var express = require('express'),
  bodyParser = require('body-parser'),
  methodOverride = require('method-override'),
  morgan = require('morgan'),
  routes = require('./routes'),
  http = require('http'),
  path = require('path');

var app = module.exports = express();


/**
 * Configuration
 */

// all environments
app.set('port', process.env.PORT || 3000);
app.set('views', __dirname + '/views');
app.set('view engine', 'ejs');
app.use(morgan('dev'));
app.use(bodyParser());
app.use(methodOverride());
app.use(express.static(path.join(__dirname, 'public')));

var env = process.env.NODE_ENV || 'development';
app.use(function(err, req, res, next) {
  return res.status(500).send({
    success: false,
    message: err.toString(),
  });
});

// production only
if (env === 'production') {
  // TODO
}


/**
 * Routes
 */


require('./routes')(app);


/**
 * Start Server
 */

var port = 80;
app.listen(port);

console.log("App listen to " + port);

module.export = app;