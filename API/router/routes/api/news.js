/**
 * Created by Kangoo13 on 17/10/2015.
 */
var express     = require('express');
var News  = require('../../../models/News.js');
var superSecret = require('../../../config.js').secret;
var auth        = require('authenticate');
var router      = express.Router();

router.get('/', function(req, res, next) {
    News.find(function (err, newss) {
        if (err) return next(err);
        res.json(newss);
    });
});

router.post('/', auth({secret: superSecret}), function(req, res, next) {
    if (req.body.name && req.body.description ) {
        News.find({name : req.body.name}, function (err, docs) {
            if (!docs.length){
                var news = new News();

                news.name = req.body.name;
                news.description = req.body.description;
                news.save(function (err) {
                    if (err) {
                        return res.json({
                            success: false,
                            message: err.errors
                        });
                    }
                    res.json({
                        success: true,
                        message: 'News created !'
                    });
                });
            }else{
                return res.json({
                    success: false,
                    message: 'News already exists'
                });
            }
        });
    }
    else
        return res.json({
            success: false,
            message: 'Wrong arguments'
        });
});

router.get('/:id', function(req, res, next) {
    if (req.params.id.match(/^[0-9a-fA-F]{24}$/)) {
        News.findById(req.params.id, function (err, post) {
            if (err) return next(err);
            res.json(post);
        });
    }
    else
    {
        var regex = new RegExp(req.params.id, 'i');
        return News.find({name: regex}, function(err,q){
            if (err) return next(err);
            return res.json(q);
        });
    }
});

router.put('/:id', auth({secret: superSecret}), function(req, res, next) {
    if (req.decoded.admin || req.decoded.id == req.params.id) {
        News.findByIdAndUpdate(req.params.id, req.body, function (err, post) {
            if (err) return next(err);
            res.json({
                success: true,
                message: 'News updated !'
            });
        });
    }
    else {
        return res.status(403).send({
            success: false,
            message: 'Unauthorized.'
        });
    }
});

router.delete('/:id', auth({secret: superSecret}), function(req, res, next) {
    if (req.decoded.admin || req.decoded.id == req.params.id) {
        News.findByIdAndRemove(req.params.id, req.body, function (err, post) {
            if (err) return next(err);
            return res.status(200).send({
                success: true,
                message: 'The news has been deleted.'
            });
        });
    }
    else {
        return res.status(403).send({
            success: false,
            message: 'Unauthorized.'
        });
    }
});

module.exports = router;