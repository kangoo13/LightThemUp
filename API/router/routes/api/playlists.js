/**
 * Created by Kangoo13 on 17/10/2015.
 */
var express         = require('express');
var Playlist        = require('../../../models/Playlist.js');
var PlaylistSong    = require('../../../models/PlaylistSong.js');
var Song            = require('../../../models/Song.js');
var superSecret     = require('../../../config.js').secret;
var auth            = require('authenticate');
var async           = require('async');
var router          = express.Router();


router.get('/', function(req, res, next) {
    Playlist.find(function (err, playlists) {
        if (err) return next(err);
        var getSongsFns = playlists.map(function(playlist) {
            return function(callback) {
                PlaylistSong.findSongsByPlaylistId(playlist._id, callback)
            }
        })
        async.parallel(getSongsFns, function(err, songs) {
            if (err) {
                res.status(500).send()
                return
            }
            res.contentType('application/json');
            res.send(JSON.stringify(songs));
        })
    });
});

router.post('/', auth({secret: superSecret}), function(req, res, next) {
    if (req.body.name ) {
        Playlist.find({name : req.body.name}, function (err, docs) {
            if (!docs.length){
                var playlist = new Playlist();

                playlist.name = req.body.name;
                playlist.created_by = req.decoded.id;
                playlist.save(function (err) {
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
            }else{
                return res.json({
                    success: false,
                    message: 'Playlist already exists'
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
        Playlist.findById(req.params.id, function (err, post) {
            if (err) return next(err);
            res.json(post);
        });
    }
    else
    {
        return Playlist.find({name: req.params.id, created_by: req.decoded.id}, function(err,q){
            if (err) return next(err);
            return res.json(q);
        });
    }
});

router.put('/:id', auth({secret: superSecret}), function(req, res, next) {
    if (req.decoded.admin || req.decoded.id == req.params.id) {
        Playlist.findByIdAndUpdate(req.params.id, req.body, function (err, post) {
            if (err) return next(err);
            res.json({
                success: true,
                message: 'Playlist updated !'
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
        Playlist.findByIdAndRemove(req.params.id, req.body, function (err, post) {
            if (err) return next(err);
            return res.status(200).send({
                success: true,
                message: 'The playlist has been deleted.'
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