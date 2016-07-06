 var express     = require('express');
 var superSecret = require('../../../config.js').secret;
 var mongoose    = require('mongoose');
 var auth        = require('authenticate');
 var router      = express.Router();

 router.post('/', auth({secret: superSecret}), function(req, res, next) {
 	res.status(200).json({
 		success: true,
 		message: 'Token valid'
 	});
 });

 module.exports = router;