/**
 * Created by Kangoo13 on 17/10/2015.
 */
var express                     = require('express');
var PlaylistSong        = require('../../../models/PlaylistSong.js');
var superSecret                 = require('../../../config.js').secret;
var auth                        = require('authenticate');
var router                      = express.Router();

router.get('/', function(req, res, next) {
    PlaylistSong.find(function (err, playlistSongs) {
        if (err) return next(err);
        res.json(playlistSongs);
    });
});

router.post('/', auth({secret: superSecret}), function(req, res, next) {
    if (req.body.idSong && req.body.idPlaylist) {
        PlaylistPlaylistSong.find({idSong : req.body.idSong, idPlaylist : req.body.idPlaylist}, function (err, docs) {
            if (!docs.length){
                var playlist = new PlaylistSong();

                playlist.idSong = req.body.idSong;
                playlist.idPlaylist = req.body.idPlaylist;
                playlist.save(function (err) {
                    if (err) {
                        return res.json({
                            success: false,
                            message: err.errors
                        });
                    }
                    res.json({
                        success: true,
                        message: 'PlaylistSong added to the playlist !'
                    });
                });
            }else{
                return res.json({
                    success: false,
                    message: 'PlaylistSong already exists in the playlist ! '
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
        PlaylistSong.findById(req.params.id, function (err, post) {
            if (err) return next(err);
            res.json(post);
        });
    }
    else
    {
        var regex = new RegExp(req.params.id, 'i');
        return PlaylistSong.find({name: regex}, function(err,q){
            if (err) return next(err);
            return res.json(q);
        });
    }
});

router.put('/:id', auth({secret: superSecret}), function(req, res, next) {
    if (req.decoded.admin || req.decoded.id == req.params.id) {
        PlaylistSong.findByIdAndUpdate(req.params.id, req.body, function (err, post) {
            if (err) return next(err);
            res.json({
                success: true,
                message: 'PlaylistSong updated !'
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
        PlaylistSong.findByIdAndRemove(req.params.id, req.body, function (err, post) {
            if (err) return next(err);
            return res.status(200).send({
                success: true,
                message: 'The playlistSong has been deleted.'
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