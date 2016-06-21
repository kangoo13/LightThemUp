/**
 * Created by Kangoo13 on 17/10/2015.
 */
 var express         = require('express');
 var mongoose        = require('mongoose');
 var Playlist        = require('../../../models/Playlist.js');
 var Song            = require('../../../models/Song.js');
 var superSecret     = require('../../../config.js').secret;
 var auth            = require('authenticate');
 var async           = require('async');
 var router          = express.Router();

 router.post('/:idPlaylist/', auth({secret: superSecret}), function(req, res, next) {
    if (req.body.idSong) {
        Playlist.findOne({_id: req.params.idPlaylist}, function (err, playlist) {
            if (req.decoded.admin || req.decoded.id == playlist.created_by) {
                Song.find({_id: req.body.idSong}, function (err, song) {
                    var objectid = new mongoose.mongo.ObjectID(req.body.idSong);
                    playlist.songs.push(objectid);
                    playlist.save(function (err) {
                        if (err) {
                            return res.status(503).json({
                                success: false,
                                message: err.errors
                            });
                        }
                        res.status(200).json({
                            success: true,
                            message: 'Song added to the playlist !'
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

 router.delete('/:idPlaylist/:idSong', auth({secret: superSecret}), function(req, res, next) {
    Playlist.findOne({_id: req.params.idPlaylist}, function (err, playlist) {
        if (req.decoded.admin || req.decoded.id == playlist.created_by) {
            Song.find({_id: req.body.idSong}, function (err, song) {
                var objectid = new mongoose.mongo.ObjectID(req.body.idSong);
                playlist.songs.pull(objectid);
                playlist.save(function (err) {
                    if (err) {
                        return res.status(503).json({
                            success: false,
                            message: err.errors
                        });
                    }
                    res.status(200).json({
                        success: true,
                        message: 'Song removed from the playlist !'
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
});

/*
 router.get('/', function(req, res, next) {
    Playlist.find({}).populate("songs").exec(function (err, songs) {
        if (err) return next(err);
        res.status(200).json(songs);
    });
});
*/


 router.post('/', auth({secret: superSecret}), function(req, res, next) {
    if (req.body.name ) {
        Playlist.find({name : req.body.name}, function (err, docs) {
            if (!docs.length){
                var playlist = new Playlist();

                playlist.name = req.body.name;
                playlist.created_by = req.decoded.id;
                playlist.save(function (err) {
                    if (err) {
                        return res.status(503).json({
                            success: false,
                            message: err.errors
                        });
                    }
                    res.status(200).json({
                        success: true,
                        message: 'Playlist created !'
                    });
                });
            }else{
                return res.status(409).json({
                    success: false,
                    message: 'Playlist already exists'
                });
            }
        });
    }
    else
        return res.status(400).json({
            success: false,
            message: 'Wrong arguments'
        });
});

router.get('/user', auth({secret: superSecret}), function(req, res, next) {
    Playlist.find({'created_by': req.decoded.id}).populate("songs").exec(function (err, post) {
        if (err) return next(err);
        res.status(200).json(post);
    });
});

router.get('/:idPlaylist', auth({secret: superSecret}), function(req, res, next) {
    Playlist.findById(req.params.idPlaylist).populate("songs").exec(function (err, post) {
        if (err) return next(err);
        res.status(200).json(post);
    });
});


 router.put('/:idPlaylist', auth({secret: superSecret}), function(req, res, next) {
    if (req.decoded.admin || req.decoded.id == req.params.idPlaylist && req.body.name) {
        Playlist.findByIdAndUpdate(req.params.idPlaylist,  { $set: { name: req.body.name}}, function (err, post) {
            if (err) return next(err);
            res.status(200).json({
                success: true,
                message: 'Playlist updated !'
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

 router.delete('/:idPlaylist', auth({secret: superSecret}), function(req, res, next) {
    if (req.decoded.admin || req.decoded.id == req.params.idPlaylist) {
        Playlist.findByIdAndRemove(req.params.idPlaylist, req.body, function (err, post) {
            if (err) return next(err);
            return res.status(200).send({
                success: true,
                message: 'The playlist has been deleted.'
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