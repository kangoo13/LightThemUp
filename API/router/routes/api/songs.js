/**
 * Created by Kangoo13 on 17/10/2015.
 */
var express     = require('express');
var Song        = require('../../../models/Song.js');
var superSecret = require('../../../config.js').secret;
var auth        = require('authenticate');
var fs          = require('fs');
var path        = require('path');
var slug        = require('slug')
var multer      = require('multer');
var Promise     = require('bluebird');
var upload      = multer({ dest: './public/uploads/avatar/'});
var router      = express.Router();

var uploadConfig = {
    acceptedMimeTypes : [ "image/jpeg", "image/png", "image/gif", "image/tiff" ],
    acceptedExtensions : [ "jpg", "jpeg", "png", "gif", "tiff" ],
    maxFileSize : 2000000
};

var uploadMusicConfig = {
    acceptedMimeTypes : [ "audio/midi" ],
    acceptedExtensions : [ "midi", "mp3", "wav", "mid" ],
    maxFileSize : 200000000
};

router.get('/', function(req, res, next) {
    Song.find(function (err, songs) {
        if (err) return next(err);
        res.status(200).json(songs);
    });
});

router.post('/', upload.fields([{ name: 'picture', maxCount: 1 }, { name: 'preview', maxCount: 1 }, { name: 'file', maxCount: 1 }]),  function(req, res, next) {
    if (req.body.name && req.body.artist && req.files['picture'] && req.body.price && req.files['file'] && req.files['preview'] && req.body.difficulty ) {
        if (true) {
            Song.find({name: req.body.name}, function (err, docs) {
                if (!docs.length) {
                    var song = new Song();
                    var picturePath = "";
                    var filePath = "";
                    var previewPath = "";
                    var image = req.files;
                    Promise.resolve(image)
                        .then(function(image) {
                            console.log("before mime");

                            if (uploadConfig.acceptedMimeTypes.indexOf(image['picture'][0].mimetype) == -1) {
                                throw "Incorrect MIME type for the picture";
                            }
                            if (uploadMusicConfig.acceptedMimeTypes.indexOf(image['file'][0].mimetype) == -1) {
                                throw "Incorrect MIME type for the song";
                            }
                            if (uploadMusicConfig.acceptedMimeTypes.indexOf(image['preview'][0].mimetype) == -1) {
                                throw "Incorrect MIME type for the song";
                            }
                            console.log("mime");
                            return image;
                        })
                        .then(function(image) {
                            if (image['picture'][0].size > uploadConfig.maxFileSize) {
                                throw "File is too large for the picture";
                            }
                            if (image['file'][0].size > uploadMusicConfig.maxFileSize) {
                                throw "File is too large for the song";
                            }
                            if (image['preview'][0].size > uploadMusicConfig.maxFileSize) {
                                throw "File is too large for the song";
                            }
                            console.log("size");

                            return image;
                        })
                        .then(function(image) {

                            if (!fs.existsSync(process.cwd()+"/public/uploads/songs/"+song._id+"/")){
                                fs.mkdirSync(process.cwd()+"/public/uploads/songs/"+song._id+"/");
                            }
                            var tempPath = image['picture'][0].path;
                            var realPath = process.cwd()+"/public/uploads/songs/"+song._id+"/";
                            picturePath = "uploads/songs/"+song._id+"/"+image['picture'][0].originalname;
                            var tempFilePath = image['file'][0].path;
                            filePath = "uploads/songs/"+song._id+"/"+image['file'][0].originalname;
                            var tempPreviewPath = image['preview'][0].path;
                            previewPath = "uploads/songs/"+song._id+"/"+image['preview'][0].originalname;
                            fs.renameSync(tempPreviewPath, realPath+image['preview'][0].originalname);
                            fs.renameSync(tempFilePath, realPath+image['file'][0].originalname);
                            return fs.rename(tempPath, realPath+image['picture'][0].originalname);
                        }).then(function(err) {
                            if (err)
                                throw err;
                            else
                            {
                                song.name = req.body.name;
                                song.artist = req.body.artist;
                                song.picture = picturePath;
                                song.price = req.body.price;
                                song.difficulty = req.body.difficulty;
                                song.file = filePath;
                                song.preview = previewPath;
                                song.slug = slug(req.body.name);
                                song.save(function (err) {
                                    if (err) {
                                        return res.status(503).json({
                                            success: false,
                                            message: err.toString()
                                        });
                                    }

                                });

                            }
                        })
                        .then(function() {
                            return res.status(200).json({
                                success: true,
                                message: 'Song created !'
                            });
                        })
                        .catch(function(err) {
                            res.status(500).send({success: false, message: err.toString()});
                        });

                } else {
                    return res.status(409).json({
                        success: false,
                        message: 'Song already exists'
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

router.get('/:idSong', function(req, res, next) {
        Song.findById(req.params.idSong, function (err, post) {
            if (err) return next(err);
            res.status(200).json(post);
        });
});

router.put('/:idSong', auth({secret: superSecret}), function(req, res, next) {
    if (req.decoded.admin) {
        Song.findByIdAndUpdate(req.params.idSong, req.body, function (err, post) {
            if (err) return next(err);
            res.status(200).json({
                success: true,
                message: 'Song updated !'
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

router.delete('/:idSong', auth({secret: superSecret}), function(req, res, next) {
    if (req.decoded.admin) {
        Song.findByIdAndRemove(req.params.idSong, req.body, function (err, post) {
            if (err) return next(err);
            return res.status(200).send({
                success: true,
                message: 'The song has been deleted.'
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
