 var express     = require('express');
 var superSecret = require('../../../config.js').secret;
 var mongoose    = require('mongoose');
 var auth        = require('authenticate');
 var router      = express.Router();

 router.get('/', auth({secret: superSecret}), function(req, res, next) {
 });

 module.exports = router;