/**
 * Created by Kangoo13 on 17/10/2015.
 */
var express     = require('express');
var Achievement       = require('../../../models/Achievement.js');
var User       = require('../../../models/User.js');
var auth        = require('authenticate');
var superSecret = require('../../../config.js').secret;
var router      = express.Router();

router.get('/add', function(req, res, next) {
    User.find({}, function (err, playlist) {
        Achievement.find({}, function (err, songs){
            playlist[0].achievements = songs;
            playlist[0].save({ validateBeforeSave: false }, function (err) {
                if (err) {
                    return res.json({
                        success: false,
                        message: err.errors
                    });
                }
                res.json({
                    success: true,
                    message: 'Playlist created !'
                });
            });
        });
        if (err) return next(err);

    });
});

router.get('/', function(req, res, next) {
    Achievement.find(function (err, achievements) {
        if (err) return next(err);
        res.json(achievements);
    });
});


router.post('/', auth({secret: superSecret}), function(req, res, next) {
    if (req.body.name && req.body.description) {
        Achievement.find({name : req.body.name}, function (err, docs) {
            if (!docs.length){
                var achievement = new Achievement();

                achievement.name = req.body.name;
                achievement.description = req.body.description;
                achievement.save(function (err) {
                    if (err) {
                        return res.json({
                            success: false,
                            message: err.errors
                        });
                    }
                    res.json({
                        success: true,
                        message: 'Achievement created !'
                    });
                });
            }else{
                return res.json({
                    success: false,
                    message: 'Achievement already exists'
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
        Achievement.findById(req.params.id, function (err, post) {
            if (err) return next(err);
            res.json(post);
        });
    }
    else
    {
        var regex = new RegExp(req.params.id, 'i');
        return Achievement.find({name: regex}, function(err,q){
            if (err) return next(err);
            return res.json(q);
        });
    }

});

router.put('/:id', auth({secret: superSecret}), function(req, res, next) {
    if (req.decoded.admin || req.decoded.id == req.params.id) {
        Achievement.findByIdAndUpdate(req.params.id, req.body, function (err, post) {
            if (err) return next(err);
            res.json({
                success: true,
                message: 'Achievement updated !'
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
        Achievement.findByIdAndRemove(req.params.id, req.body, function (err, post) {
            if (err) return next(err);
            return res.status(200).send({
                success: true,
                message: 'The achievement has been deleted.'
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