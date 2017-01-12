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

/**
* @api {post} /playlists/:slug/ Add a song to a playlist
* @apiPermission user
* @apiVersion 0.1.0
* @apiName AddSongToPlaylist
* @apiGroup Playlist
*
* @apiParam {String} token Token to be authentified.
* @apiParam {String} Slug from the playlist selected.
* @apiParam {Number} [idSong] Id of the song.
*
* @apiSuccess {Boolean} success Notify the success of current request.
* @apiSuccess {String} message Response message.
*
* @apiSuccessExample Success-Response:
*     HTTP/1.1 200 OK
*     {
*       success: true,
*       message: 'Song added to the playlist !'
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
*/
router.post('/:slug/', auth({secret: superSecret}), function(req, res, next) {
  if (req.body.idSong) {
    Playlist.findOne({slug: req.params.slug}, function (err, playlist) {
      if (req.decoded.admin || req.decoded.id == playlist.created_by) {
        Song.find({_id: req.body.idSong}, function (err, song) {
          var objectid = new mongoose.mongo.ObjectID(req.body.idSong);
          playlist.songs.push(objectid);
          playlist.save(function (err) {
            if (err) {
              return next(err);
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
      if (err) {
        return next(err);
      }
    });
  }
  else {
    return res.status(400).json({
      success: false,
      message: 'Wrong arguments'
    });
  }
});

/**
* @api {delete} /playlists/:slugPlaylist/:idSong Delete a song from a playlist
* @apiPermission user
* @apiVersion 0.1.0
* @apiName DeleteSongFromPlaylist
* @apiGroup Playlist
*
* @apiParam {String} slugPlaylist Playlist slug that you want to select.
* @apiParam {Number} idSong Song id that you want to delete.
* @apiParam {String} token authentification token is mandatory.
*
* @apiSuccess {Boolean} success Notify the success of current request.
* @apiSuccess {String} message Response message.
*
* @apiSuccessExample Success-Response:
*     HTTP/1.1 200 OK
*     {
*       success: true,
*       message: 'Song removed from the playlist !'
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
router.delete('/:slugPlaylist/:idSong', auth({secret: superSecret}), function(req, res, next) {
  Playlist.findOne({'slug': req.params.slugPlaylist}, function (err, playlist) {
    if (req.decoded.admin || req.decoded.id == playlist.created_by) {
      Song.find({_id: req.params.idSong}, function (err, song) {
        var objectid = new mongoose.mongo.ObjectID(req.params.idSong);
        playlist.songs.pull(objectid);
        playlist.save(function (err) {
          if (err) {
            return next(err);
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
* @api {get} /playlists/user Get all playlists from an user
* @apiPermission user
* @apiVersion 0.1.0
* @apiName GetPlaylistsFromUser
* @apiGroup Playlist
*
* @apiParam {String} token Token to be authentified.
*
* @apiSuccess {String} slug Slug of the playlist.
* @apiSuccess {Number} created_by Playlist created by this id.
* @apiSuccess {String} name Name of the playlist.
* @apiSuccess {Object} songs All songs from the playlist.
*
* @apiSuccessExample Success-Response:
*     HTTP/1.1 200 OK
*     {
*       {
*         _id: "5850501e16f93d1c0c6305f6",
*         updatedAt: "2016-12-13T19:46:38.000Z",
*         createdAt: "2016-12-13T19:46:38.000Z",
*         slug: "playlist1",
*         created_by: "581e67289043e3880cad7ec0",
*         name: "playlist1",
*         __v: 0,
*         songs: []
*       }
*       {
*         ...
*       }
*/
router.get('/user', auth({secret: superSecret}), function(req, res, next) {
  Playlist.find({'created_by': req.decoded.id}).populate("songs").exec(function (err, post) {
    if (err) return next(err);
    res.status(200).json(post);
  });
});

/**
* @api {get} /playlists/user Get songs from a playlist
* @apiPermission user
* @apiVersion 0.1.0
* @apiName GetSongsFromPlaylist
* @apiGroup Playlist
*
* @apiParam {String} token Token to be authentified.
* @apiParam {String} slug Slug from playlist.
*
* @apiSuccess {String} slug Slug of the playlist.
* @apiSuccess {Number} created_by Playlist created by this id.
* @apiSuccess {String} name Name of the playlist.
* @apiSuccess {Object} songs All songs from the playlist.
*
* @apiSuccessExample Success-Response:
*     HTTP/1.1 200 OK
*     {
*       {
*         _id: "5850501e16f93d1c0c6305f6",
*         updatedAt: "2016-12-13T19:46:38.000Z",
*         createdAt: "2016-12-13T19:46:38.000Z",
*         slug: "playlist1",
*         created_by: "581e67289043e3880cad7ec0",
*         name: "playlist1",
*         __v: 0,
*         songs: []
*       }
*       {
*         ...
*       }
*/
router.get('/user/:slug', auth({secret: superSecret}), function(req, res, next) {
  Playlist.findOne({'slug': req.params.slug, 'created_by': req.decoded.id}).populate("songs").exec(function (err, post) {
    if (err) return next(err);
    res.status(200).json(post);
  });
});

/**
* @api {get} /playlists/:idPlaylist Get a playlist by id
* @apiPermission none
* @apiVersion 0.1.0
* @apiName GetPlaylistById
* @apiGroup Playlist
*
* @apiParam {String} token Token to be authentified.
* @apiParam {Number} idPlaylist Id from the playlist.
*
* @apiSuccess {String} slug Slug of the playlist.
* @apiSuccess {Number} created_by Playlist created by this id.
* @apiSuccess {String} name Name of the playlist.
* @apiSuccess {Object} songs All songs from the playlist.
*
* @apiSuccessExample Success-Response:
*     HTTP/1.1 200 OK
*     {
*       {
*         _id: "5850501e16f93d1c0c6305f6",
*         updatedAt: "2016-12-13T19:46:38.000Z",
*         createdAt: "2016-12-13T19:46:38.000Z",
*         slug: "playlist1",
*         created_by: "581e67289043e3880cad7ec0",
*         name: "playlist1",
*         __v: 0,
*         songs: []
*       }
*       {
*         ...
*       }
*     }
*
* @apiError NotFound Playlist not found in database.
*
* @apiErrorExample NotFound:
*     HTTP/1.1 404 Not found
*     {
*       success: false,
*       message: "Playlist doesn't exist !"
*     }
*
*/
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

/**
* @api {put} /playlists/:idPlaylist/ Edit a playlist
* @apiPermission user
* @apiVersion 0.1.0
* @apiName EditPlaylist
* @apiGroup Playlist
*
* @apiParam {Number} idPlaylist Playlist you want to edit.
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
*       message: 'Playlist updated !'
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
* @apiError WrongArgs Missing arguments to edit the comment.
*
* @apiErrorExample WrongArgs:
*     HTTP/1.1 400 Bad Request
*     {
*       success: false,
*       message: 'Wrong arguments'
*     }
*
* @apiError ServerError Impossible to edit the playlist.
*
* @apiErrorExample ServerError:
*     HTTP/1.1 500 Service Error
*     {
*       success: false,
*       message: "Error message."
*     }
*/
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
* @api {delete} /playlists/:idPlaylist Delete a playlist by id
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
