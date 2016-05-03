/**
 * Created by Kangoo13 on 17/10/2015.
 */
var express     = require('express');
var Achievement = require('../../../models/Achievement.js');
var User        = require('../../../models/User.js');
var superSecret = require('../../../config.js').secret;
var auth        = require('authenticate');
var mongoose    = require('mongoose');
var router      = express.Router();

router.post('/:idAchievement', auth({secret: superSecret}), function(req, res, next) {
    if (req.body.idUser) {
        User.findOne({_id: req.body.idUser}, function (err, user) {
            if (req.decoded.id == req.body.idUser || req.decoded.admin) {
                Achievement.find({_id: req.params.idAchievement}, function (err, achiev) {
                    var objectid = new mongoose.mongo.ObjectID(req.params.idAchievement);
                    user.achievements.push(objectid);
                    user.save(function (err) {
                        if (err) {
                            return res.json({
                                success: false,
                                message: err.errors
                            });
                        }
                        res.json({
                            success: true,
                            message: 'Achievement added to the user !'
                        });
                    });
                });
            }
            else {
                return res.status(403).send({
                    success: false,
                    message: 'Unauthorized.'
                });
            }
            if (err) return next(err);

        });
    }
    else
        return res.json({
            success: false,
            message: 'Wrong arguments'
        });
});

router.get('/', function(req, res, next) {
    Achievement.find(function (err, achievements) {
        if (err) return next(err);
        res.json(achievements);
    });
});


router.post('/', auth({secret: superSecret}), function(req, res, next) {
    if (req.body.name && req.body.description && req.body.picture) {
        if (req.decoded.admin) {
            Achievement.find({name: req.body.name}, function (err, docs) {
                if (!docs.length) {
                    var achievement = new Achievement();

                    achievement.name = req.body.name;
                    achievement.description = req.body.description;
                    achievement.picture = req.body.picture;
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
                } else {
                    return res.json({
                        success: false,
                        message: 'Achievement already exists'
                    });
                }
            });
        }
    }
    else
        return res.json({
            success: false,
            message: 'Wrong arguments'
        });
});

router.get('/:idAchievement', function(req, res, next) {
        Achievement.findById(req.params.idAchievement, function (err, post) {
            if (err) return next(err);
            res.json(post);
        });
});

router.put('/:idAchievement', auth({secret: superSecret}), function(req, res, next) {
    if (req.decoded.admin) {
        Achievement.findByIdAndUpdate(req.params.idAchievement, req.body, function (err, post) {
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

router.delete('/:idAchievement', auth({secret: superSecret}), function(req, res, next) {
    if (req.decoded.admin) {
        Achievement.findByIdAndRemove(req.params.idAchievement, req.body, function (err, post) {
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