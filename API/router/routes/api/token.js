"use strict";

 var express     = require('express');
 var superSecret = require('../../../config.js').secret;
 var mongoose    = require('mongoose');
 var auth        = require('authenticate');
 var router      = express.Router();


 /**
  * @api {post} /token/ Token validation checker
  * @apiPermission none
  * @apiVersion 0.1.0
  * @apiName PostContact
  * @apiGroup Contact
  *
  * @apiParam {String} name Name of the contact.
  * @apiParam {String} email Email of the contact.
  * @apiParam {String} message Message of the contact.
  *
  * @apiSuccessExample Success-Response:
  *     HTTP/1.1 200 OK
  *     {
  *       "success": "true",
  *       "message": "Votre message a bien été envoyé."
  *     }
  *
  * @apiError CaptchaNotFound The form was submit without captcha.
  * @apiError CaptchaInvalid The captcha is not valid.
  * @apiError SaveError Impossible to save the contact form in database.
  *
  * @apiErrorExample CaptchaNotFound:
  *     HTTP/1.1 404 Not Found
  *     {
  *       "success": "false",
  *       "message": "Captcha non renseigné."
  *     }
  *
  * @apiErrorExample CaptchaInvalid:
  *     HTTP/1.1 401 Not Found
  *     {
  *       "success": "false",
  *       "message": "Captcha invalide."
  *     }
  *
  * @apiErrorExample ServerError:
  *     HTTP/1.1 503 Service Unavailable
  *     {
  *       "success": "false",
  *       "message": "Error message"
  *     }
  */
 router.post('/', auth({secret: superSecret}), function(req, res, next) {
 	res.status(200).json({
 		success: true,
 		message: 'Token valid'
 	});
 });

 module.exports = router;
