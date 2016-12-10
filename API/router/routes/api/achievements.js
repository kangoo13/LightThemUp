"use strict";

var express = require('express');
var Achievement = require('../../../models/Achievement.js');
var User = require('../../../models/User.js');
var superSecret = require('../../../config.js').secret;
var auth = require('authenticate');
var fs = require('fs');
var path = require('path');
var multer = require('multer');
var Promise = require('bluebird');
var mongoose = require('mongoose');
var upload = multer({
    dest: './public/uploads/tmp/'
});
var router = express.Router();

var uploadConfig = {
    acceptedMimeTypes: ["image/jpeg", "image/png", "image/gif", "image/tiff"],
    acceptedExtensions: ["jpg", "jpeg", "png", "gif", "tiff"],
    maxFileSize: 2000000
};

/**
 * @api {post} /achievements/:idAchievement Add an achievement to an user
 * @apiPermission user
 * @apiVersion 0.1.0
 * @apiName AddAnAchievementToUser
 * @apiGroup Achievement
 *
 * @apiParam {Number} idAchievement Achievement you want to edit.
 * @apiParam {String} token Token to be authentified.
 *
 * @apiSuccess {Boolean} success Notify the success of current request.
 * @apiSuccess {String} message Response message.
 *
 * @apiSuccessExample Success-Response:
 *     HTTP/1.1 200 OK
 *     {
 *        success: true,
 *        message: 'The achievement has been deleted.'
 *     }
 *
 *
 * @apiError Unauthorized The token is not valid.
 *
 * @apiErrorExample Unauthorized:
 *     HTTP/1.1 401 Unauthorized
 *     {
 *       "success": false,
 *       "message": "Unauthorized."
 *     }
 *
 * @apiError ServerError Impossible to add achievement to user.
 *
 * @apiErrorExample ServerError:
 *     HTTP/1.1 503 Service Unavailable
 *     {
 *       "success": false,
 *       "message": "Error message."
 *     }
 */
router.post('/:idAchievement', auth({
    secret: superSecret
}), function(req, res, next) {
    if (req.body.idUser) {
        User.findOne({
            _id: req.body.idUser
        }, function(err, user) {
            if (req.decoded.id == req.body.idUser || req.decoded.admin) {
                Achievement.find({
                    _id: req.params.idAchievement
                }, function(err, achiev) {
                    var objectid = new mongoose.mongo.ObjectID(req.params.idAchievement);
                    user.achievements.push(objectid);
                    user.save(function(err) {
                        if (err) {
                            return res.status(503).json({
                                success: false,
                                message: err.errors
                            });
                        }
                        res.status(200).json({
                            success: true,
                            message: 'Achievement added to the user !'
                        });
                    });
                });
            } else {
                return res.status(401).send({
                    success: false,
                    message: 'Unauthorized.'
                });
            }
            if (err) return next(err);

        });
    } else
        return res.status(400).json({
            success: false,
            message: 'Wrong arguments'
        });
});


/**
 * @api {get} /achievements/ Get all achievements
 * @apiPermission none
 * @apiVersion 0.1.0
 * @apiName GetAchievements
 * @apiGroup Achievement
 *
 * @apiSuccess {String} description Description of the achievement.
 * @apiSuccess {String} name Name of the achievement.
 * @apiSuccess {string} picture Picture of the achievement.
 *
 * @apiSuccessExample Success-Response:
 *     HTTP/1.1 200 OK
 *     {
 *        {
 *           "_id": "577cff520e5f32a50ac407c1",
 *            "updatedAt": "2016-07-06T12:53:38.000Z",
 *            "createdAt": "2016-07-06T12:53:38.000Z",
 *            "description": "Compléter 100 musiques sans la moindre fausse note",
 *            "name": "Virtuose",
 *            "__v": 0,
 *            "picture": "uploads/achievements/577cff520e5f32a50ac407c1/achievement.png"
 *        },
 *        {
 *            ...
 *        }
 */
router.get('/', function(req, res, next) {
    Achievement.find(function(err, achievements) {
        if (err) return next(err);
        res.status(200).json(achievements);
    });
});

/**
 * @api {post} /achievements/ New achievement
 * @apiPermission admin
 * @apiVersion 0.1.0
 * @apiName NewAchievement
 * @apiGroup Achievement
 *
 * @apiParam {String} token Token to be authentified.
 * @apiParam {String} name Name of the new achievement.
 * @apiParam {String} description Description of the new achievement.
 * @apiParam {Image{2 Mo}} [picture] Custom picture for the new achievement :
  MIME Type has to be : ["image/jpeg", "image/png", "image/gif", "image/tiff"] and
  accepted extensions ["jpg", "jpeg", "png", "gif", "tiff"].
 *
 * @apiSuccess {Boolean} success Notify the success of current request.
 * @apiSuccess {String} message Response message.
 *
 * @apiSuccessExample Success-Response:
 *     HTTP/1.1 200 OK
 *     {
 *        success: true,
 *        message: 'Achievement created !'
 *     }
 *
 * @apiError Unauthorized The token is not valid.
 *
 * @apiErrorExample Unauthorized:
 *     HTTP/1.1 401 Unauthorized
 *     {
 *       "success": false,
 *       "message": "Unauthorized."
 *     }
 *
 * @apiError WrongArgs Missing arguments to create the achievement.
 *
 * @apiErrorExample WrongArgs:
 *     HTTP/1.1 409 Conflict
 *     {
 *        success: false,
 *        message: 'Wrong arguments'
 *     }
 *
 * @apiError AlreadyExists Achievement already exists in database.
 *
 * @apiErrorExample AlreadyExists:
 *     HTTP/1.1 409 Conflict
 *     {
 *        success: false,
 *        message: 'Achievement already exists'
 *     }
 *
 * @apiError ServerError Impossible to create a new achievement.
 *
 * @apiErrorExample ServerError:
 *     HTTP/1.1 503/500 Service Unavailable or Server Error
 *     {
 *       "success": false,
 *       "message": "Error message."
 *     }
 */
router.post('/', auth({
    secret: superSecret
}), upload.single('picture'), function(req, res, next) {
    if (req.body.name && req.body.description) {
        if (req.decoded.admin) {
            Achievement.find({
                name: req.body.name
            }, function(err, docs) {
                if (!docs.length) {
                    var picturePath = "";
                    var achievement = new Achievement();
                    if (req.file) {
                        var image = req.file;
                        Promise.resolve(image)
                            .then(function(image) {
                                if (uploadConfig.acceptedMimeTypes.indexOf(image.mimetype) == -1) {
                                    throw "Incorrect MIME type";
                                }
                                return image;
                            })
                            .then(function(image) {
                                if (image.size > uploadConfig.maxFileSize) {
                                    throw "File is too large";
                                }
                                return image;
                            })
                            .then(function(image) {

                                if (!fs.existsSync(process.cwd() + "/public/uploads/achievements/" + achievement._id + "/")) {
                                    fs.mkdirSync(process.cwd() + "/public/uploads/achievements/" + achievement._id + "/");
                                }
                                var tempPath = image.path;
                                var realPath = process.cwd() + "/public/uploads/achievements/" + achievement._id + "/";
                                picturePath = "uploads/achievements/" + achievement._id + "/" + image.originalname;
                                return fs.rename(tempPath, realPath + image.originalname);
                            })
                            .then(function(err) {
                                if (err)
                                    throw err;
                                else {
                                    achievement.name = req.body.name;
                                    achievement.description = req.body.description;
                                    achievement.picture = picturePath;
                                    achievement.save(function(err) {
                                        if (err) {
                                            return res.status(503).json({
                                                success: false,
                                                message: err.errors
                                            });
                                        }

                                    });
                                }
                            })
                            .then(function() {
                                return res.status(200).json({
                                    success: true,
                                    message: 'Achievement created !'
                                });
                            })
                            .catch(function(err) {
                                res.status(500).send({
                                    success: false,
                                    message: err.toString()
                                });
                            });
                    } else {
                        achievement.name = req.body.name;
                        achievement.description = req.body.description;
                        achievement.save(function(err) {
                            if (err) {
                                return res.status(503).json({
                                    success: false,
                                    message: err.errors
                                });
                            }
                            return res.status(200).json({
                                success: true,
                                message: 'Achievement created !'
                            });
                        });
                    }
                } else {
                    return res.status(409).json({
                        success: false,
                        message: 'Achievement already exists'
                    });
                }
            });
        } else {
            return res.status(401).send({
                success: false,
                message: 'Unauthorized.'
            });
        }
    } else
        return res.status(400).json({
            success: false,
            message: 'Wrong arguments'
        });
});


/**
 * @api {get} /achievements/:idAchievement Get an achievement by id
 * @apiPermission none
 * @apiVersion 0.1.0
 * @apiName GetAchievementById
 * @apiGroup Achievement
 *
 * @apiParam {Number} idAchievement Achievement you want to get.
 *
 * @apiSuccess {String} description Description of the achievement.
 * @apiSuccess {String} name Name of the achievement.
 * @apiSuccess {String} picture Picture of the achievement.
 *
 * @apiSuccessExample Success-Response:
 *     HTTP/1.1 200 OK
 *     {
 *        {
 *           "_id": "577cff520e5f32a50ac407c1",
 *            "updatedAt": "2016-07-06T12:53:38.000Z",
 *            "createdAt": "2016-07-06T12:53:38.000Z",
 *            "description": "Compléter 100 musiques sans la moindre fausse note",
 *            "name": "Virtuose",
 *            "__v": 0,
 *            "picture": "uploads/achievements/577cff520e5f32a50ac407c1/achievement.png"
 *        }
 */
router.get('/:idAchievement', function(req, res, next) {
    Achievement.findById(req.params.idAchievement, function(err, post) {
        if (err) return next(err);
        res.status(200).json(post);
    });
});


/**
 * @api {put} /achievements/:idAchievement Edit an achievement by id
 * @apiPermission admin
 * @apiVersion 0.1.0
 * @apiName EditAchievementById
 * @apiGroup Achievement
 *
 * @apiParam {Number} idAchievement Achievement you want to edit.
 * @apiParam {String} token Token to be authentified.
 * @apiParam {String} [description] Description of the achievement.
 * @apiParam {String} [name] Name of the achievement.
 * @apiParam {String} [picture] Picture of the achievement.
 *
 * @apiSuccess {Boolean} success Notify the success of current request.
 * @apiSuccess {String} message Response message.
 *
 * @apiSuccessExample Success-Response:
 *     HTTP/1.1 200 OK
 *     {
 *        success: true,
 *        message: 'Achievement updated !'
 *     }
 *
 * @apiError Unauthorized The token is not valid.
 *
 * @apiErrorExample Unauthorized:
 *     HTTP/1.1 401 Unauthorized
 *     {
 *       "success": false,
 *       "message": "Unauthorized."
 *     }
 */
router.put('/:idAchievement', auth({
    secret: superSecret
}), function(req, res, next) {
    if (req.decoded.admin) {
        Achievement.findByIdAndUpdate(req.params.idAchievement, req.body, function(err, post) {
            if (err) return next(err);
            res.status(200).json({
                success: true,
                message: 'Achievement updated !'
            });
        });
    } else {
        return res.status(401).send({
            success: false,
            message: 'Unauthorized.'
        });
    }
});

/**
 * @api {delete} /achievements/:idAchievement Delete an achievement by id
 * @apiPermission admin
 * @apiVersion 0.1.0
 * @apiName DeleteAchievementById
 * @apiGroup Achievement
 *
 * @apiParam {Number} idAchievement Achievement you want to edit.
 * @apiParam {String} token Token to be authentified.
 *
 * @apiSuccess {Boolean} success Notify the success of current request.
 * @apiSuccess {String} message Response message.
 *
 * @apiSuccessExample Success-Response:
 *     HTTP/1.1 200 OK
 *     {
 *        success: true,
 *        message: 'The achievement has been deleted.'
 *     }
 *
 * @apiError Unauthorized The token is not valid.
 *
 * @apiErrorExample Unauthorized:
 *     HTTP/1.1 401 Unauthorized
 *     {
 *       "success": false,
 *       "message": "Unauthorized."
 *     }
 */
router.delete('/:idAchievement', auth({
    secret: superSecret
}), function(req, res, next) {
    if (req.decoded.admin) {
        Achievement.findByIdAndRemove(req.params.idAchievement, req.body, function(err, post) {
            if (err) return next(err);
            return res.status(200).send({
                success: true,
                message: 'The achievement has been deleted.'
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
