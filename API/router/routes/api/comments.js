"use strict";

var express = require('express');
var Comment = require('../../../models/Comment.js');
var superSecret = require('../../../config.js').secret;
var mongoose = require('mongoose');
var router = express.Router();

/**
 * @api {get} /comments/lastComments/:nbComments Request the last comments
 * @apiPermission none
 * @apiVersion 0.1.0
 * @apiName GetLastComments
 * @apiGroup Comment
 *
 * @apiParam {Number} nbComments Number of comments wanted.
 *
 * @apiSuccess {User} author Comment's author.
 * @apiSuccess {String} message Comment's message.
 * @apiSuccess {String} type Comment's type.
 *
 * @apiSuccessExample Success-Response:
 *     HTTP/1.1 200 OK
 *     {
 *       author: "John",
 *       message: "Hey !",
 *       type:  "news"
 *     }
 *
 */
router.get('/lastComments/:nbComments', function(req, res, next) {
    Comment.find().limit(parseInt(req.params.nbComments, 10)).sort({
        'createdAt': -1
    }).populate({
        path: 'author',
        select: "name",
        model: 'User'
    }).exec(function(err, comments) {
        if (err) return next(err);
        res.status(200).json(comments);
    });
});

module.exports = router;
