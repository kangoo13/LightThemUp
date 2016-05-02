/**
 * Created by Kangoo13 on 17/10/2015.
 */
var express     = require('express');
var Song        = require('../../../models/Song.js');
var superSecret = require('../../../config.js').secret;
var auth        = require('authenticate');
var router      = express.Router();

router.get('/', function(req, res, next) {
    Song.find(function (err, songs) {
        if (err) return next(err);
        res.json(songs);
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
                            return res.json({
                                success: false,
                                message: err.errors
                            });
                        }
                        res.json({
                            success: true,
                            message: 'Song created !'
                        });
                    });
                } else {
                    return res.json({
                        success: false,
                        message: 'Song already exists'
                    });
                }
            });
        }
        else {
            return res.status(403).send({
                success: false,
                message: 'Unauthorized.'
            });
        }
    }
    else
        return res.json({
            success: false,
            message: 'Wrong arguments'
        });
});

router.get('/:idSong', function(req, res, next) {
        Song.findById(req.params.idSong, function (err, post) {
            if (err) return next(err);
            res.json(post);
        });
});

router.put('/:idSong', auth({secret: superSecret}), function(req, res, next) {
    if (req.decoded.admin) {
        Song.findByIdAndUpdate(req.params.idSong, req.body, function (err, post) {
            if (err) return next(err);
            res.json({
                success: true,
                message: 'Song updated !'
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
        return res.status(403).send({
            success: false,
            message: 'Unauthorized.'
        });
    }
});

module.exports = router;