var express     = require('express');
var Comment     = require('../../../models/Comment.js');
var News        = require('../../../models/News.js');
var superSecret = require('../../../config.js').secret;
var auth        = require('authenticate');
var fs          = require('fs');
var mongoose    = require('mongoose');
var router      = express.Router();

router.get('/:slug', function(req, res, next) {
    var objectID = null;

    News.findOne({ 'slug': req.params.slug }, function (err, postNews) {
        if (err) return next(err);
        objectID = postNews.id;
        Comment.find({object : objectID}).populate("author").exec(function (err, postComment) {
            if (err) return next(err);
            res.status(200).json(postComment);
        });
    });
});

router.post('/', auth({secret: superSecret}), function(req, res, next) {
    if (req.body.slug && req.body.author && req.body.message ) {

        var comment = new Comment();
        var objectID = null;

        News.findOne({ 'slug': req.body.slug }, function (err, post) {
            if (err) return next(err);
            objectID = post.id;

            var author = new mongoose.mongo.ObjectID(req.body.author);
            comment.object = objectID;
            comment.author = author;
            comment.message = req.body.message;
            comment.save(function (err) {
                if (err) {
                    return res.status(503).json({
                        success: false,
                        message: err.errors
                    });
                }
                res.status(200).json({
                    success: true,
                    message: 'Comment added !'
                });
            });
        });
    }
    else
        return res.status(400).json({
            success: false,
            message: 'Wrong arguments'
        });
});

module.exports = router;