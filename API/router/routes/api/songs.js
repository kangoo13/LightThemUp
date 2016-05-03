/**
 * Created by Kangoo13 on 17/10/2015.
 */
var express     = require('express');
var Song        = require('../../../models/Song.js');
var superSecret = require('../../../config.js').secret;
var auth        = require('authenticate');
var fs          = require('fs');
var path        = require('path');
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

router.post('/', auth({secret: superSecret}), function(req, res, next) {
    if (req.body.name && req.body.artist && req.body.picture && req.body.price && req.body.file && req.body.difficulty ) {
        if (req.decoded.admin) {
            Song.find({name: req.body.name}, function (err, docs) {
                if (!docs.length) {
                    var song = new Song();

                    song.name = req.body.name;
                    song.artist = req.body.artist;
                    song.picture = req.body.picture;
                    song.price = req.body.price;
                    song.file = req.body.file;
                    song.difficulty = req.body.difficulty;
                    song.save(function (err) {
                        if (err) {
                            return res.status(503).json({
                                success: false,
                                message: err.errors
                            });
                        }
                        res.status(200).json({
                            success: true,
                            message: 'Song created !'
                        });
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

router.post('/:idSong/picture', upload.single('picture'), auth({secret: superSecret}), function(req, res, next) {
    if (req.decoded.admin) {
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
                if (!fs.existsSync(process.cwd()+"/public/uploads/songs/"+req.params.idSong+"/")){
                    fs.mkdirSync(process.cwd()+"/public/uploads/songs/"+req.params.idSong+"/");
                }
                var tempPath = image.path;
                var realPath = process.cwd()+"/public/uploads/songs/"+req.params.idSong+"/";
                //var ext = image.originalname.substr(image.originalname.lastIndexOf('.') + 1);
                picturePath = image.originalname;
                return fs.rename(tempPath, realPath+image.originalname);
            })
            .then(function(err) {
                if (err)
                    throw err;
                else
                {
                    Song.find({'_id': req.params.idSong}, function(err, song){
                        if (song.length)
                        {
                            song[0].picture = picturePath;
                            song[0].save(function (err) {
                                if (err) {
                                    throw err.message;
                                }
                            });
                        }
                        else
                            throw "Song not found to apply the picture";
                    });
                }
            })
            .then(function() {
                res.send({success: true, message: "Your image has been saved"});
            })
            .catch(function(err) {
                res.send({success: false, message: err});
            });
    }
    else {
        return res.status(401).send({
            success: false,
            message: 'Unauthorized.'
        });
    }
});

router.post('/:idSong/music', upload.single('music'),  auth({secret: superSecret}), function(req, res, next) {
    if (req.decoded.admin) {
        var musicPath = "";
        var music = req.file;
        Promise.resolve(music)
            .then(function(music) {
                if (uploadMusicConfig.acceptedMimeTypes.indexOf(music.mimetype) == -1) {
                    throw "Incorrect MIME type";
                }
                return music;
            })
            .then(function(music) {
                if (music.size > uploadMusicConfig.maxFileSize) {
                    throw "File is too large";
                }
                return music;
            })
            .then(function(music) {
                if (!fs.existsSync(process.cwd()+"/public/uploads/songs/"+req.params.idSong+"/")){
                    fs.mkdirSync(process.cwd()+"/public/uploads/songs/"+req.params.idSong+"/");
                }
                var tempPath = music.path;
                var realPath = process.cwd()+"/public/uploads/songs/"+req.params.idSong+"/";
                //var ext = music.originalname.substr(music.originalname.lastIndexOf('.') + 1);
                musicPath = music.originalname;
                return fs.rename(tempPath, realPath+music.originalname);
            })
            .then(function(err) {
                if (err)
                    throw err;
                else
                {
                    Song.find({'_id': req.params.idSong}, function(err, song){
                        if (song.length)
                        {
                            song[0].file = musicPath;
                            song[0].save(function (err) {
                                if (err) {
                                    throw err.message;
                                }
                            });
                        }
                        else
                            throw "Song not found to apply the music";
                    });
                }
            })
            .then(function() {
                res.send({success: true, message: "Your music has been saved"});
            })
            .catch(function(err) {
                res.send({success: false, message: err});
            });
    }
    else {
        return res.status(401).send({
            success: false,
            message: 'Unauthorized.'
        });
    }
});

router.post('/:idSong/preview', upload.single('preview'), auth({secret: superSecret}), function(req, res, next) {
    if (req.decoded.admin) {
        var musicPath = "";
        var music = req.file;
        Promise.resolve(music)
            .then(function(music) {
                if (uploadMusicConfig.acceptedMimeTypes.indexOf(music.mimetype) == -1) {
                    throw "Incorrect MIME type";
                }
                return music;
            })
            .then(function(music) {
                if (music.size > uploadMusicConfig.maxFileSize) {
                    throw "File is too large";
                }
                return music;
            })
            .then(function(music) {
                if (!fs.existsSync(process.cwd()+"/public/uploads/songs/"+req.params.idSong+"/")){
                    fs.mkdirSync(process.cwd()+"/public/uploads/songs/"+req.params.idSong+"/");
                }
                var tempPath = music.path;
                var realPath = process.cwd()+"/public/uploads/songs/"+req.params.idSong+"/";
                musicPath = music.originalname;
                return fs.rename(tempPath, realPath+musicPath);
            })
            .then(function(err) {
                if (err)
                    throw err;
                else
                {
                    Song.find({'_id': req.params.idSong}, function(err, song){
                        if (song.length)
                        {
                            song[0].preview = musicPath;
                            song[0].save(function (err) {
                                if (err) {
                                    throw err.message;
                                }
                            });
                        }
                        else
                            throw "Song not found to apply the preview";
                    });
                }
            })
            .then(function() {
                res.send({success: true, message: "Your preview has been saved"});
            })
            .catch(function(err) {
                res.send({success: false, message: err});
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