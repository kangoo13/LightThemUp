/**
 * Created by Kangoo13 on 17/10/2015.
 */
var express     = require('express');
var Song  = require('../../../models/Song.js');
var superSecret = require('../../../config.js').secret;
var auth        = require('authenticate');
var router      = express.Router();

router.get('/', function(req, res, next) {
    Song.find(function (err, songs) {
        if (err) return next(err);
        res.json(songs);
    });
});

router.post('/', auth({secret: superSecret}), function(req, res, next) {
    if (req.body.name && req.body.description ) {
        Song.find({name : req.body.name}, function (err, docs) {
            if (!docs.length){
                var song = new Song();

                song.name = req.body.name;
                song.description = req.body.description;
                song.save(function (err) {
                    if (err) {
                        return res.json({
                            success: false,
                            message: err.errors
                        });
                    }
                    res.json({
                        success: true,
                        message: 'Song created !'
                    });
                });
            }else{
                return res.json({
                    success: false,
                    message: 'Song already exists'
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
        Song.findById(req.params.id, function (err, post) {
            if (err) return next(err);
            res.json(post);
        });
    }
    else
    {
        var regex = new RegExp(req.params.id, 'i');
        return Song.find({name: regex}, function(err,q){
            if (err) return next(err);
            return res.json(q);
        });
    }
});

router.put('/:id', auth({secret: superSecret}), function(req, res, next) {
    if (req.decoded.admin || req.decoded.id == req.params.id) {
        Song.findByIdAndUpdate(req.params.id, req.body, function (err, post) {
            if (err) return next(err);
            res.json({
                success: true,
                message: 'Song updated !'
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
        Song.findByIdAndRemove(req.params.id, req.body, function (err, post) {
            if (err) return next(err);
            return res.status(200).send({
                success: true,
                message: 'The song has been deleted.'
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