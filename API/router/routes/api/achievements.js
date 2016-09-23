 var express     = require('express');
 var Achievement = require('../../../models/Achievement.js');
 var User        = require('../../../models/User.js');
 var superSecret = require('../../../config.js').secret;
 var auth        = require('authenticate');
 var fs          = require('fs');
 var path        = require('path');
 var multer      = require('multer');
 var Promise     = require('bluebird');
 var mongoose    = require('mongoose');
 var upload      = multer({ dest: './public/uploads/tmp/'});
 var router      = express.Router();

 var uploadConfig = {
    acceptedMimeTypes : [ "image/jpeg", "image/png", "image/gif", "image/tiff" ],
    acceptedExtensions : [ "jpg", "jpeg", "png", "gif", "tiff" ],
    maxFileSize : 2000000
};

router.post('/:idAchievement', auth({secret: superSecret}), function(req, res, next) {
    if (req.body.idUser) {
        User.findOne({_id: req.body.idUser}, function (err, user) {
            if (req.decoded.id == req.body.idUser || req.decoded.admin) {
                Achievement.find({_id: req.params.idAchievement}, function (err, achiev) {
                    var objectid = new mongoose.mongo.ObjectID(req.params.idAchievement);
                    user.achievements.push(objectid);
                    user.save(function (err) {
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
            }
            else {
                return res.status(401).send({
                    success: false,
                    message: 'Unauthorized.'
                });
            }
            if (err) return next(err);

        });
    }
    else
        return res.status(400).json({
            success: false,
            message: 'Wrong arguments'
        });
});

router.get('/', function(req, res, next) {
    Achievement.find(function (err, achievements) {
        if (err) return next(err);
        res.status(200).json(achievements);
    });
});


router.post('/',  auth({secret: superSecret}), upload.single('picture'), function(req, res, next) {
    if (req.body.name && req.body.description) {
        if (req.decoded.admin) {
            Achievement.find({name: req.body.name}, function (err, docs) {
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

                        if (!fs.existsSync(process.cwd()+"/public/uploads/achievements/"+achievement._id+"/")){
                            fs.mkdirSync(process.cwd()+"/public/uploads/achievements/"+achievement._id+"/");
                        }
                        var tempPath = image.path;
                        var realPath = process.cwd()+"/public/uploads/achievements/"+achievement._id+"/";
                        picturePath = "uploads/achievements/"+achievement._id+"/"+image.originalname;
                        return fs.rename(tempPath, realPath+image.originalname);
                    })
                      .then(function(err) {
                        if (err)
                            throw err;
                        else
                        {
                            achievement.name = req.body.name;
                            achievement.description = req.body.description;
                            achievement.picture = picturePath;
                            achievement.save(function (err) {
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
                        res.status(500).send({success: false, message: err.toString()});
                    });
                  }
                  else {
                    achievement.name = req.body.name;
                    achievement.description = req.body.description;
                    achievement.save(function (err) {
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
        }
        else {
            return res.status(401).send({
                success: false,
                message: 'Unauthorized.'
            });
        }
    }
    else
        return res.status(400).json({
            success: false,
            message: 'Wrong arguments'
        });
});

 router.get('/:idAchievement', function(req, res, next) {
    Achievement.findById(req.params.idAchievement, function (err, post) {
        if (err) return next(err);
        res.status(200).json(post);
    });
});

 router.put('/:idAchievement', auth({secret: superSecret}), function(req, res, next) {
    if (req.decoded.admin) {
        Achievement.findByIdAndUpdate(req.params.idAchievement, req.body, function (err, post) {
            if (err) return next(err);
            res.status(200).json({
                success: true,
                message: 'Achievement updated !'
            });
        });
    }
    else {
        return res.status(401).send({
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
        return res.status(401).send({
            success: false,
            message: 'Unauthorized.'
        });
    }
});

 module.exports = router;