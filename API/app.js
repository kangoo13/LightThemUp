"use strict";

var express = require('express');
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
var morgan = require('morgan');
var config = require('./config');
var User = require('./models/User');
var passport = require('passport');
var expressSession = require('express-session');
var initPassport = require('./passport/init');
var fs = require('fs');
var path = require('path');
var paypal = require('paypal-rest-sdk');
var app = express();

// Set environment from config file
process.env.NODE_ENV = config.env;

// Try to connect to our NoSQL database
mongoose.connect(config.database, function(err) {
  if (err) {
    console.err('Connection error', err);
    return;
  } else {
    console.log('Connection successful to MongoDB :)');
  }
});

// Create required folders for uploads
createUploadFolders();

app.use(expressSession({
  secret: config.secret,
  resave: false,
  saveUninitialized: false
}));
app.use(bodyParser.urlencoded({
  extended: true
}));
app.use(bodyParser.json());
app.use(morgan('dev'));
app.use("/", express.static(path.join(__dirname, 'public')));
app.use("/apiDoc", express.static(path.join(__dirname, 'apidoc')));

// Add headers
app.use(function(req, res, next) {
  // Website you wish to allow to connect
  res.setHeader('Access-Control-Allow-Origin', '*');
  // Request methods you wish to allow
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
  // Request headers you wish to allow
  res.setHeader('Access-Control-Allow-Headers', "Content-Type, x-access-token, Access-Control-Allow-Headers, Authorization, X-Requested-With");
  // Set to true if you need the website to include cookies in the requests sent
  // to the API (e.g. in case you use sessions)
  res.setHeader('Access-Control-Allow-Credentials', true);
  // Pass to next layer of middleware
  next();
});

// Routes uses for our app
require('./router/')(app);

// For errors
app.use(function(err, req, res, next) {
  return res.status(500).send({
    success: false,
    message: err.toString(),
  });
});

paypal.configure(config.api);

// production only
if (process.env.NODE_ENV === 'production') {
  // TODO
}

// Set port depending on value from env or 3000 by force
var port;
if (!process.env.PORT) {
  port = config.port;
}
else {
  port = process.env.PORT;
}

console.log("Port used is : " + port);
app.listen(port);
module.exports = app;

function createUploadFolders() {
  if (!fs.existsSync("public")) {
    fs.mkdirSync("public");
  }
  if (!fs.existsSync("public/uploads")) {
    fs.mkdirSync("public/uploads");
  }
  if (!fs.existsSync("public/uploads/avatar")) {
    fs.mkdirSync("public/uploads/avatar");
  }
  if (!fs.existsSync("public/uploads/achievements")) {
    fs.mkdirSync("public/uploads/achievements");
  }
  if (!fs.existsSync("public/uploads/songs")) {
    fs.mkdirSync("public/uploads/songs");
  }
  if (!fs.existsSync("public/uploads/news")) {
    fs.mkdirSync("public/uploads/news");
  }
  if (!fs.existsSync("public/uploads/tmp")) {
    fs.mkdirSync("public/uploads/tmp");
  }
}
