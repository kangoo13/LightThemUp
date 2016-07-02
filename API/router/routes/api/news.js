/**
 * Created by Kangoo13 on 17/10/2015.
 */
var express     = require('express');
var News        = require('../../../models/News.js');
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

router.get('/', function(req, res, next) {
    News.find().sort("-created_at").exec(function (err, news) {
        if (err) return next(err);
        res.status(200).json(news);
    });
});

router.post('/', auth({secret: superSecret}), upload.single('picture'), function(req, res, next) {
    if (req.body.name && req.body.description && req.file && req.body.slug) {
        if (req.decoded.admin) {
            News.find({name: req.body.name}, function (err, docs) {
                if (!docs.length) {
                    var news = new News();
                    console.log(news._id);
                    var picturePath = "";
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

                            if (!fs.existsSync(process.cwd()+"/public/uploads/news/"+news._id+"/")){
                                fs.mkdirSync(process.cwd()+"/public/uploads/news/"+news._id+"/");
                            }
                            var tempPath = image.path;
                            var realPath = process.cwd()+"/public/uploads/news/"+news._id+"/";
                            picturePath = "uploads/news/"+news._id+"/"+image.originalname;
                            return fs.rename(tempPath, realPath+image.originalname);
                        })
                        .then(function(err) {
                            if (err)
                                throw err;
                            else
                            {
                                news.name = req.body.name;
                                news.description = req.body.description;
                                news.picture = picturePath;
                                news.author = req.decoded.id;
                                news.slug = req.body.slug;
                                news.save(function (err) {
                                    if (err) {
                                        return res.status(503).json({
                                            success: false,
                                            message: err
                                        });
                                    }

                                });
                            }
                        })
                        .then(function() {
                            return res.status(200).json({
                                success: true,
                                message: 'News created !'
                            });
                        })
                        .catch(function(err) {
                            res.status(500).send({success: false, message: err.toString()});
                        });

                } else {
                    return res.status(409).json({
                        success: false,
                        message: 'News already exists'
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

router.get('/:idNews', function(req, res, next) {
        News.findOne({ 'slug': req.params.idNews }, function (err, post) {
            if (err) return next(err);
            res.status(200).json(post);
        });
});

router.put('/:idNews', auth({secret: superSecret}), function(req, res, next) {
    if (req.decoded.admin) {
        News.findByIdAndUpdate(req.params.idNews, req.body, function (err, post) {
            if (err) return next(err);
            res.status(200).json({
                success: true,
                message: 'News updated !'
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

router.delete('/:idNews', auth({secret: superSecret}), function(req, res, next) {
    if (req.decoded.admin) {
        News.findByIdAndRemove(req.params.idNews, req.body, function (err, post) {
            if (err) return next(err);
            return res.status(200).send({
                success: true,
                message: 'The news has been deleted.'
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