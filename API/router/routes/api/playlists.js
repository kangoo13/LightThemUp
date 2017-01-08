'use strict';

var express         = require('express');
var mongoose        = require('mongoose');
var slug            = require('slug');
var Playlist        = require('../../../models/Playlist.js');
var Song            = require('../../../models/Song.js');
var superSecret     = require('../../../config.js').secret;
var auth            = require('authenticate');
var async           = require('async');
var router          = express.Router();

router.post('/:slug/', auth({secret: superSecret}), function(req, res, next) {
  if (req.body.idSong) {
    Playlist.findOne({slug: req.params.slug}, function (err, playlist) {
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

router.delete('/:slugPlaylist/:idSong', auth({secret: superSecret}), function(req, res, next) {
  Playlist.findOne({'slug': req.params.slugPlaylist}, function (err, playlist) {
    if (req.decoded.admin || req.decoded.id == playlist.created_by) {
      Song.find({_id: req.params.idSong}, function (err, song) {
        var objectid = new mongoose.mongo.ObjectID(req.params.idSong);
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

/**
* @api {post} /playlists/ Add a playlist
* @apiPermission user
* @apiVersion 0.1.0
* @apiName AddPlaylist
* @apiGroup Playlist
*
* @apiParam {String} token Token to be authentified.
* @apiParam {String} [name] Name of the playlist.
*
* @apiSuccess {Boolean} success Notify the success of current request.
* @apiSuccess {String} message Response message.
*
* @apiSuccessExample Success-Response:
*     HTTP/1.1 200 OK
*     {
*       success: true,
*       message: 'Playlist created !'
*     }
*
* @apiError Unauthorized The token is not valid.
*
* @apiErrorExample Unauthorized:
*     HTTP/1.1 401 Unauthorized
*     {
*       success: false,
*       message: "Unauthorized."
*     }
*
* @apiError WrongArgs Missing arguments to create the playlist.
*
* @apiErrorExample WrongArgs:
*     HTTP/1.1 400 Bad Request
*     {
*       success: false,
*       message: 'Wrong arguments'
*     }
*
* @apiError AlreadyExists Playlist already exists in database.
*
* @apiErrorExample AlreadyExists:
*     HTTP/1.1 409 Conflict
*     {
*       success: false,
*       message: "Playlist already exists"
*     }
*
* @apiError ServerError Impossible to create a playlist.
*
* @apiErrorExample ServerError:
*     HTTP/1.1 503 Service Unavailable
*     {
*       success: false,
*       message: "Error message."
*     }
*/
router.post('/', auth({secret: superSecret}), function(req, res, next) {
  if (req.body.name ) {
    if (req.decoded.admin || req.decoded.id ) {
      Playlist.find({name : req.body.name, 'created_by': req.decoded.id}, function (err, docs) {
        if (!docs.length) {
          var playlist = new Playlist();
          playlist.name = req.body.name;
          playlist.created_by = req.decoded.id;
          playlist.slug = slug(req.body.name);
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
        }
        else {
          return res.status(409).json({
            success: false,
            message: 'Playlist already exists'
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
  else {
    return res.status(400).json({
      success: false,
      message: 'Wrong arguments'
    });
  }
});

/**
* @api {get} /news/ Get all playlists by user
* @apiPermission none
* @apiVersion 0.1.0
* @apiName GetNews
* @apiGroup News
*
* @apiSuccess {String} slug Url translate of news' title.
* @apiSuccess {String} author Author of the news.
* @apiSuccess {String} description Description of the news.
* @apiSuccess {String} name Name / Title of the news.
* @apiSuccess {Array} comments Array with all comments id.
* @apiSuccess {Image} picture Picture of the news.
*
* @apiSuccessExample Success-Response:
*     HTTP/1.1 200 OK
*     {
*       {
*         _id: "57e54896ce58658110cd855e",
*         updatedAt: "2016-11-23T22:33:14.258Z",
*         createdAt: "2016-09-23T15:21:58.000Z",
*         slug: "DEVOS-Tanguy",
*         author: "577ea485fee4ec632f5c663f",
*         description: "yeaaah",
*         name: "A big news",
*         "__v": 2,
*         comments: [
*           "57f816c348165e7e18a84f37",
*           "5836192a48e54efc0a9b8695"
*         ],
*         picture: "uploads/news/default-news.jpg"
*        },
*        {
*         ...
*        }
*/
router.get('/user', auth({secret: superSecret}), function(req, res, next) {
  Playlist.find({'created_by': req.decoded.id}).populate("songs").exec(function (err, post) {
    if (err) return next(err);
    res.status(200).json(post);
  });
});

router.get('/user/:slug', auth({secret: superSecret}), function(req, res, next) {
  Playlist.findOne({'slug': req.params.slug, 'created_by': req.decoded.id}).populate("songs").exec(function (err, post) {
    if (err) return next(err);
    res.status(200).json(post);
  });
});

router.get('/:idPlaylist', auth({secret: superSecret}), function(req, res, next) {
  Playlist.findById(req.params.idPlaylist).populate("songs").exec(function (err, post) {
    if (err || post == null) {
      res.status(404).json({
        success: false,
        message: 'Playlist doesn\'t exist !'
      });
    }
    else {
      res.status(200).json(post);
    }
  });
});

router.put('/:idPlaylist', auth({secret: superSecret}), function(req, res, next) {
  Playlist.findOne({'_id': req.params.idPlaylist}, function (err, playlist) {
    if (req.decoded.admin || req.decoded.id == playlist.created_by) {
      if (req.body.name) {
        Playlist.findByIdAndUpdate(req.params.idPlaylist,  { $set: { name: req.body.name}}, function (err, post) {
          if (err) {
            return res.status(500).send({
              success: false,
              message: err.errors
            });
          }
          else {
            return res.status(200).send({
              success: true,
              message: 'Playlist updated !'
            });
          }
        });
      }
      else {
        return res.status(400).json({
          success: false,
          message: 'Wrong arguments'
        });
      }
    }
    else {
      return res.status(401).send({
        success: false,
        message: 'Unauthorized.'
      });
    }
  });
});

/**
* @api {delete} /news/:idPlaylist Delete a playlist by id
* @apiPermission user
* @apiVersion 0.1.0
* @apiName DeletePlaylistById
* @apiGroup Playlist
*
* @apiParam {Number} idPlaylist Playlist id that you want to delete.
* @apiParam {String} token authentification token is mandatory.
*
* @apiSuccess {Boolean} success Notify the success of current request.
* @apiSuccess {String} message Response message.
*
* @apiSuccessExample Success-Response:
*     HTTP/1.1 200 OK
*     {
*       success: true,
*       message: 'The playlist has been deleted.'
*     }
*
* @apiError Unauthorized The token is not valid.
*
* @apiErrorExample Unauthorized:
*     HTTP/1.1 401 Unauthorized
*     {
*       success: false,
*       message: "Unauthorized."
*     }
*/
router.delete('/:idPlaylist', auth({secret: superSecret}), function(req, res, next) {
  Playlist.findOne({'_id': req.params.idPlaylist}, function (err, playlist) {
    if (req.decoded.admin || req.decoded.id == playlist.created_by) {
      Playlist.findByIdAndRemove(req.params.idPlaylist, req.body, function (err, post) {
        if (err) {
          return next(err);
        }
        else {
          return res.status(200).send({
            success: true,
            message: 'The playlist has been deleted.'
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
  });
});

module.exports = router;
