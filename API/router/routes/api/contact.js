"use strict";

var express = require('express');
var router = express.Router();
var superSecret = require('../../../config.js').secret;
var auth = require('authenticate');
var Contact = require('../../../models/Contact.js');
var request = require('request');

/**
 * @api {post} /contact/ Save a contact form
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
router.post('/', function(req, res) {
    // g-recaptcha-response is the key that browser will generate upon form submit.
    // if its blank or null means user has not selected the captcha, so return the error.
    if (req.body['captcha'] === undefined || req.body['captcha'] === '' || req.body['captcha'] === null) {
        return res.status(404).send({
            success: false,
            message: 'Captcha non renseigné.'
        });
    }
    var secretKey = " 6Le_viMTAAAAABg-0OH0SWYE-gJz1GXFJxDwSsum";
    // req.connection.remoteAddress will provide IP address of connected user.
    var verificationUrl = "https://www.google.com/recaptcha/api/siteverify?secret=" + secretKey + "&response=" + req.body['captcha'] + "&remoteip=" + req.connection.remoteAddress;
    // Hitting GET request to the URL, Google will respond with success or error scenario.
    request(verificationUrl, function(error, response, body) {
        body = JSON.parse(body);
        // Success will be true or false depending upon captcha validation.
        if (body.success !== undefined && !body.success) {
            return res.status(401).send({
                success: false,
                message: 'Captcha invalide.'
            });
        }

        var contact = new Contact();

        contact.name = req.body.name;
        contact.email = req.body.email;
        contact.message = req.body.message;
        contact.remoteIp = req.connection.remoteAddress;

        contact.save(function(err) {
            if (err) {
                return res.status(503).json({
                    success: false,
                    message: err.errors
                });
            }
            return res.status(200).json({
                success: true,
                message: 'Votre message a bien été envoyé.'
            });
        });
    });
});

/**
 * @api {get} /contact/ Get all contacts demands
 * @apiPermission admin
 * @apiVersion 0.1.0
 * @apiName GetContact
 * @apiGroup Contact
 *
 * @apiParam {String} token authentification token is mandatory.
 *
 * @apiSuccess {String} name Name of the contact.
 * @apiSuccess {String} email Email of the contact.
 * @apiSuccess {String} message Message of the contact.
 * @apiSuccess {String} remoteIp Remote IP of the contact.
 *
 * @apiSuccessExample Success-Response:
 *     HTTP/1.1 200 OK
 *     {
 *        {
 *            "_id": "584932b0ea6f19740c2faee8",
 *            "updatedAt": "2016-12-08T10:15:12.000Z",
 *            "createdAt": "2016-12-08T10:15:12.000Z",
 *            "remoteIp": "::ffff:163.5.220.100",
 *            "message": "peti test",
 *            "email": "test@test.fr",
 *            "name": "Tanguy",
 *            "__v": 0
 *        }
 *        {
 *            ...
 *        }
 *      }
 *
 * @apiError Unauthorized The token is not valid.
 *
 * @apiErrorExample Unauthorized:
 *     HTTP/1.1 401 Unauthorized
 *     {
 *       "success": "false",
 *       "message": "Unauthorized."
 *     }
 */
router.get('/', auth({
    secret: superSecret
}), function(req, res, next) {
    if (req.decoded.admin) {
        Contact.find().sort("-createdAt").exec(function(err, contact) {
            if (err)
                next(err);
            res.status(200).json(contact);
        });
    } else {
        res.status(401).send({
            success: false,
            message: 'Unauthorized.'
        });
    }
});

/**
 * @api {get} /contact/:idContact Get a contact form by id
 * @apiPermission admin
 * @apiVersion 0.1.0
 * @apiName GetContactByid
 * @apiGroup Contact
 *
 * @apiParam {String} idContact Contact form id that you want to get.
 * @apiParam {String} token authentification token is mandatory.
 *
 * @apiSuccess {String} name Name of the contact.
 * @apiSuccess {String} email Email of the contact.
 * @apiSuccess {String} message Message of the contact.
 * @apiSuccess {String} remoteIp Remote IP of the contact.
 *
 * @apiSuccessExample Success-Response:
 *     HTTP/1.1 200 OK
 *     {
 *        "_id": "584932b0ea6f19740c2faee8",
 *        "updatedAt": "2016-12-08T10:15:12.000Z",
 *        "createdAt": "2016-12-08T10:15:12.000Z",
 *        "remoteIp": "::ffff:163.5.220.100",
 *        "message": "peti test",
 *        "email": "test@test.fr",
 *        "name": "Tanguy",
 *        "__v": 0
 *     }
 *
 * @apiError Unauthorized The token is not valid.
 *
 * @apiErrorExample Unauthorized:
 *     HTTP/1.1 401 Unauthorized
 *     {
 *       "success": "false",
 *       "message": "Unauthorized."
 *     }
 */
router.get('/:idContact', auth({
    secret: superSecret
}), function(req, res, next) {
    if (req.decoded.admin) {
        Contact.findById(req.params.idContact).exec(function(err, post) {
            if (err) return next(err);
            res.status(200).json(post);
        });
    } else {
        res.status(401).send({
            success: false,
            message: 'Unauthorized.'
        });
    }
});


/**
 * @api {delete} /contact/:idContact Delete a contact form by id
 * @apiPermission admin
 * @apiVersion 0.1.0
 * @apiName DeleteContactByid
 * @apiGroup Contact
 *
 * @apiParam {String} idContact Contact form id that you want to delete.
 * @apiParam {String} token authentification token is mandatory.
 *
 * @apiSuccess {String} name Name of the contact.
 * @apiSuccess {String} email Email of the contact.
 * @apiSuccess {String} message Message of the contact.
 * @apiSuccess {String} remoteIp Remote IP of the contact.
 *
 * @apiSuccessExample Success-Response:
 *     HTTP/1.1 200 OK
 *     {
 *        "_id": "584932b0ea6f19740c2faee8",
 *        "updatedAt": "2016-12-08T10:15:12.000Z",
 *        "createdAt": "2016-12-08T10:15:12.000Z",
 *        "remoteIp": "::ffff:163.5.220.100",
 *        "message": "peti test",
 *        "email": "test@test.fr",
 *        "name": "Tanguy",
 *        "__v": 0
 *     }
 *
 * @apiError Unauthorized The token is not valid.
 *
 * @apiErrorExample Unauthorized:
 *     HTTP/1.1 401 Unauthorized
 *     {
 *       "success": "false",
 *       "message": "Unauthorized."
 *     }
 */
router.delete('/:idContact', auth({
    secret: superSecret
}), function(req, res, next) {
    if (req.decoded.admin) {
        Contact.findByIdAndRemove(req.params.idContact, req.body, function(err, post) {
            if (err) return next(err);
            return res.status(200).send({
                success: true,
                message: 'The contact form has been deleted.'
            });
        });
    } else {
        return res.status(401).send({
            success: false,
            message: 'Unauthorized.'
        });
    }
});

module.exports = router;
