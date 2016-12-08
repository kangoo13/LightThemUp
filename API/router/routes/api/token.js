"use strict";

 var express     = require('express');
 var superSecret = require('../../../config.js').secret;
 var mongoose    = require('mongoose');
 var auth        = require('authenticate');
 var router      = express.Router();

 /**
  * @api {post} /token/ Token validation checker
  * @apiPermission user
  * @apiVersion 0.1.0
  * @apiName GetTokenValidation
  * @apiGroup Token
  *
  * @apiParam {String} token Token value to check.
  *
  * @apiSuccess {Boolean} success Notify the success of current request.
  * @apiSuccess {String} message Response message.
  *
  * @apiSuccessExample Success-Response:
  *     HTTP/1.1 200 OK
  *     {
  *       "success": true,
  *       "message": "Token valid."
  *     }
  *
  * @apiError TokenInvalid The token is invalid.
  *
  * @apiErrorExample TokenInvalid:
  *     HTTP/1.1 404 Not Found
  *     {
  *       "success": false,
  *       "message": "Failed to authenticate token."
  *     }
  */
 router.post('/', auth({secret: superSecret}), function(req, res, next) {
 	res.status(200).json({
 		success: true,
 		message: 'Token valid'
 	});
 });

 module.exports = router;
