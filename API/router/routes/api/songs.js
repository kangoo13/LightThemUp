"use strict";

var express     = require('express');
var Song        = require('../../../models/Song.js');
var User        = require('./users.js');
var Comment     = require('../../../models/Comment.js');
var User        = require('../../../models/User.js');
var superSecret = require('../../../config.js').secret;
var auth        = require('authenticate');
var fs          = require('fs');
var path        = require('path');
var slug        = require('slug')
var multer      = require('multer');
var Promise     = require('bluebird');
var mongoose    = require('mongoose');
var upload      = multer({ dest: './public/uploads/tmp/'});
var exec        = require('child_process').exec;
var router      = express.Router();

var uploadConfig = {
  acceptedMimeTypes : [ "image/jpeg", "image/png", "image/gif", "image/tiff" ],
  acceptedExtensions : [ "jpg", "jpeg", "png", "gif", "tiff" ],
  maxFileSize : 2000000
};

var uploadMusicConfig = {
  acceptedMimeTypes : [ "audio/midi", "audio/mid" ],
  acceptedExtensions : [ "midi", "mp3", "wav", "mid" ],
  maxFileSize : 200000000
};

/**
* @api {get} /songs/ Get all songs
* @apiPermission none
* @apiVersion 0.1.0
* @apiName GetSongs
* @apiGroup Song
*
* @apiSuccess {String} slug Slug of the song.
* @apiSuccess {String} preview Preview of the song (path to preview audio file).
* @apiSuccess {String} file Audio file of the song.
* @apiSuccess {Number} price Price of the song.
* @apiSuccess {String} picture Picture of the song (path to image file).
* @apiSuccess {String} artist Artist of the song.
* @apiSuccess {String} name Name of the song.
* @apiSuccess {Object} comments Comments from the song.
* @apiSuccess {Number} bought Number of how many times the song was bought.
* @apiSuccess {Number} difficulty Difficulty of the song.
*
* @apiSuccessExample Success-Response:
*   HTTP/1.1 200 OK
*     {
*       {
*         "_id": "581e1eedfae905040b64874b",
*         "updatedAt": "2016-11-08T12:28:42.926Z",
*         "createdAt": "2016-11-05T18:03:25.000Z",
*         "slug": "Pirates-des-Caraibes",
*         "preview": "",
*         "file": "uploads/songs/581e1eedfae905040b64874b/Pirates of the Caribbean - He's a Pirate.mid",
*         "price": 12,
*         "picture": "uploads/songs/581e1eedfae905040b64874b/cover.jpg",
*         "artist": "Disney",
*         "name": "Pirates des Caraïbes",
*         "__v": 0,
*         "comments": [],
*         "bought": 1,
*         "difficulty": 5
*         },
*         {
*          ...
*         }
*    }
*/
router.get('/', function(req, res, next) {
  Song.find(function (err, songs) {
    if (err) return next(err);
    res.status(200).json(songs);
  });
});

/**
* @api {get} /songs/newSongs/:nbSong Get new songs (limit by n)
* @apiPermission none
* @apiVersion 0.1.0
* @apiName GetNewSongs
* @apiGroup Song
*
* @apiParam {Number} nbSong Number of songs you want to retrieve.
*
* @apiSuccess {String} slug Slug of the song.
* @apiSuccess {String} preview Preview of the song (path to preview audio file).
* @apiSuccess {String} file Audio file of the song.
* @apiSuccess {Number} price Price of the song.
* @apiSuccess {String} picture Picture of the song (path to image file).
* @apiSuccess {String} artist Artist of the song.
* @apiSuccess {String} name Name of the song.
* @apiSuccess {Object} comments Comments from the song.
* @apiSuccess {Number} bought Number of how many times the song was bought.
* @apiSuccess {Number} difficulty Difficulty of the song.
*
* @apiSuccessExample Success-Response:
*   HTTP/1.1 200 OK
*     {
*       {
*         "_id": "581e1eedfae905040b64874b",
*         "updatedAt": "2016-11-08T12:28:42.926Z",
*         "createdAt": "2016-11-05T18:03:25.000Z",
*         "slug": "Pirates-des-Caraibes",
*         "preview": "",
*         "file": "uploads/songs/581e1eedfae905040b64874b/Pirates of the Caribbean - He's a Pirate.mid",
*         "price": 12,
*         "picture": "uploads/songs/581e1eedfae905040b64874b/cover.jpg",
*         "artist": "Disney",
*         "name": "Pirates des Caraïbes",
*         "__v": 0,
*         "comments": [],
*         "bought": 1,
*         "difficulty": 5
*         },
*         {
*          ...
*         }
*    }
*/
router.get('/newSongs/:nbSong', function(req, res, next) {
  Song.find().limit(parseInt(req.params.nbSong, 10)).sort({'createdAt': -1}).exec(function (err, songs) {
    if (err) return next(err);
    res.status(200).json(songs);
  });
});

/**
* @api {get} /songs/mostBoughtSongs/:nbSong Get most bought songs (limit by n)
* @apiPermission none
* @apiVersion 0.1.0
* @apiName GetMostBoughtSongs
* @apiGroup Song
*
* @apiParam {Number} nbSong Number of songs you want to retrieve.
*
* @apiSuccess {String} slug Slug of the song.
* @apiSuccess {String} preview Preview of the song (path to preview audio file).
* @apiSuccess {String} file Audio file of the song.
* @apiSuccess {Number} price Price of the song.
* @apiSuccess {String} picture Picture of the song (path to image file).
* @apiSuccess {String} artist Artist of the song.
* @apiSuccess {String} name Name of the song.
* @apiSuccess {Object} comments Comments from the song.
* @apiSuccess {Number} bought Number of how many times the song was bought.
* @apiSuccess {Number} difficulty Difficulty of the song.
*
* @apiSuccessExample Success-Response:
*   HTTP/1.1 200 OK
*     {
*       {
*         "_id": "581e1eedfae905040b64874b",
*         "updatedAt": "2016-11-08T12:28:42.926Z",
*         "createdAt": "2016-11-05T18:03:25.000Z",
*         "slug": "Pirates-des-Caraibes",
*         "preview": "",
*         "file": "uploads/songs/581e1eedfae905040b64874b/Pirates of the Caribbean - He's a Pirate.mid",
*         "price": 12,
*         "picture": "uploads/songs/581e1eedfae905040b64874b/cover.jpg",
*         "artist": "Disney",
*         "name": "Pirates des Caraïbes",
*         "__v": 0,
*         "comments": [],
*         "bought": 1,
*         "difficulty": 5
*         },
*         {
*          ...
*         }
*    }
*/
router.get('/mostBoughtSongs/:nbSong', function(req, res, next) {
  Song.find().limit(parseInt(req.params.nbSong, 10)).sort({'bought': -1}).exec(function (err, songs) {
    if (err) return next(err);
    res.status(200).json(songs);
  });
});

/**
* @api {get} /songs/getSongFromComment/:idComment/:index Get a song from a comment
* @apiPermission none
* @apiVersion 0.1.0
* @apiName GetSongFromComment
* @apiGroup Song
*
* @apiParam {Number} idComment Comment you want to select.
* @apiParam {Number} index ???.
*
* @apiSuccess {String} slug Slug of the song.
* @apiSuccess {String} preview Preview of the song (path to preview audio file).
* @apiSuccess {String} file Audio file of the song.
* @apiSuccess {Number} price Price of the song.
* @apiSuccess {String} picture Picture of the song (path to image file).
* @apiSuccess {String} artist Artist of the song.
* @apiSuccess {String} name Name of the song.
* @apiSuccess {Object} comments Comments from the song.
* @apiSuccess {Number} bought Number of how many times the song was bought.
* @apiSuccess {Number} difficulty Difficulty of the song.
*
* @apiSuccessExample Success-Response:
*   HTTP/1.1 200 OK
*     {
*       {
*         "_id": "581e1eedfae905040b64874b",
*         "updatedAt": "2016-11-08T12:28:42.926Z",
*         "createdAt": "2016-11-05T18:03:25.000Z",
*         "slug": "Pirates-des-Caraibes",
*         "preview": "",
*         "file": "uploads/songs/581e1eedfae905040b64874b/Pirates of the Caribbean - He's a Pirate.mid",
*         "price": 12,
*         "picture": "uploads/songs/581e1eedfae905040b64874b/cover.jpg",
*         "artist": "Disney",
*         "name": "Pirates des Caraïbes",
*         "__v": 0,
*         "comments": [],
*         "bought": 1,
*         "difficulty": 5
*         }
*    }
*
* @apiError NotFound Song doesn't exist in database.
*
* @apiErrorExample NotFound:
*     HTTP/1.1 404 Not Found
*     {
*       success: false,
*       message: "La musique n'a pas été trouvée"
*     }
*/
router.get('/getSongFromComment/:idComment/:index', function(req, res, next){
  Song.find().populate("comments").exec(function (err, songs){
    if (err) return next(err);
    var goodSong = null;
    for (var i = 0; i != songs.length; i++)
    {
      for (var j = 0; j != songs[i].comments.length; j++)
      {
        if (songs[i].comments[j]._id == req.params.idComment) {
          goodSong = songs[i].toObject();
          goodSong.index = req.params.index;
          break;
        }
      }
      if (goodSong != null)
      break;
    }
    if (goodSong)
    return res.status(200).json(goodSong);
    else
    return res.status(404).json({
      success: false,
      message: "La musique n'a pas été trouvée"
    });
  })
});

/**
* @api {get} /songs/randomSongs/:nbSong Get random songs (limit by n)
* @apiPermission none
* @apiVersion 0.1.0
* @apiName GetRandomSongs
* @apiGroup Song
*
* @apiParam {Number} nbSong Number of songs you want to retrieve.
*
* @apiSuccess {String} slug Slug of the song.
* @apiSuccess {String} preview Preview of the song (path to preview audio file).
* @apiSuccess {String} file Audio file of the song.
* @apiSuccess {Number} price Price of the song.
* @apiSuccess {String} picture Picture of the song (path to image file).
* @apiSuccess {String} artist Artist of the song.
* @apiSuccess {String} name Name of the song.
* @apiSuccess {Object} comments Comments from the song.
* @apiSuccess {Number} bought Number of how many times the song was bought.
* @apiSuccess {Number} difficulty Difficulty of the song.
*
* @apiSuccessExample Success-Response:
*   HTTP/1.1 200 OK
*     {
*       {
*         "_id": "581e1eedfae905040b64874b",
*         "updatedAt": "2016-11-08T12:28:42.926Z",
*         "createdAt": "2016-11-05T18:03:25.000Z",
*         "slug": "Pirates-des-Caraibes",
*         "preview": "",
*         "file": "uploads/songs/581e1eedfae905040b64874b/Pirates of the Caribbean - He's a Pirate.mid",
*         "price": 12,
*         "picture": "uploads/songs/581e1eedfae905040b64874b/cover.jpg",
*         "artist": "Disney",
*         "name": "Pirates des Caraïbes",
*         "__v": 0,
*         "comments": [],
*         "bought": 1,
*         "difficulty": 5
*         },
*         {
*          ...
*         }
*    }
*
* @apiError NumberTooBig There are not enough songs in database for requested number.
*
* @apiErrorExample NumberTooBig:
*     HTTP/1.1 503 Service Unavailable
*     {
*       success: false,
*       message: "Il n'y a pas assez de musiques pour cette demande."
*     }
*
*/
router.get('/randomSongs/:nbSong', function(req, res, next) {
  Song.find().exec(function (err, songs) {
    var maxRandom = songs.length - 1;
    if (req.params.nbSong-1 > maxRandom)
    return res.status(503).json({
      success: false,
      message: "Il n'y a pas assez de musiques pour cette demande."
    });
    else
    {
      var randomTab = [];
      var isContained;
      while (randomTab.length != req.params.nbSong)
      {
        var randTab = songs[Math.floor(Math.random() * (maxRandom - 0 + 1)) + 0];
        isContained = false;
        for (var i = 0; i != randomTab.length; i++)
        {
          if (randomTab[i].name == randTab.name) {
            isContained = true;
            break;
          }
        }
        if (isContained == false)
        randomTab.push(randTab);
      }
      res.status(200).json(randomTab);

    }
    if (err) return next(err);
  });
});

/**
* @api {put} /songs/:idSong/comments Edit a comment from a song
* @apiPermission user
* @apiVersion 0.1.0
* @apiName EditCommentFromSong
* @apiGroup Comment
*
* @apiParam {String} message Message of the comment.
* @apiParam {String} token authentification token is mandatory.
*
* @apiSuccess {Boolean} success Notify the success of current request.
* @apiSuccess {String} message Response message.
*
* @apiSuccessExample Success-Response:
*     HTTP/1.1 200 OK
*     {
*       success: true,
*       message: "Comment edited."
*     }
*
* @apiError WrongArgs Missing arguments to add a comment from a song.
*
* @apiErrorExample WrongArgs:
*     HTTP/1.1 400 Bad Request
*     {
*       success: false,
*       message: 'Wrong arguments'
*     }
*
* @apiError NotFound Missing arguments to edit a comment from a song.
*
* @apiErrorExample NotFound:
*     HTTP/1.1 404 Not Found
*     {
*       success: false,
*       message: "Comment doesn't exist."
*     }
*
* @apiError ServiceUnavailable Impossible to add a comment from a song.
*
* @apiErrorExample ServiceUnavailable:
*     HTTP/1.1 503 Service Unavailable
*     {
*       success: false,
*       message: "error message."
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
router.put('/:idSong/comments/:idComment', auth({secret: superSecret}), function(req, res, next) {
  if (req.params.idComment && req.body.message) {
    Song.findOne({ 'slug': req.params.idSong }).exec(function (err, song) {
      Comment.findById(req.params.idComment, function (err, comment) {
        if (comment == null) {
          return res.status(404).json({
            success: false,
            message: "Comment doesn't exist."
          });
        }
        if (req.decoded.admin || req.decoded.id == comment.author) {
          comment.message = req.body.message;
          comment.save(function (err) {
            if (err) {
              return res.status(503).json({
                success: false,
                message: err.errors
              });
            }
            res.status(200).json({
              success: true,
              message: 'Comment edited.'
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
      if (err) return next(err)
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
* @api {delete} /songs/:idSong/comments/:idComment Delete a comment from a song
* @apiPermission user
* @apiVersion 0.1.0
* @apiName DeleteCommentFromSong
* @apiGroup Comment
*
* @apiParam {Number} idSong Song that you want to select.
* @apiParam {Number} idComment Comment that you want to delete.
* @apiParam {String} token authentification token is mandatory.
*
* @apiSuccess {Boolean} success Notify the success of current request.
* @apiSuccess {String} message Response message.
*
* @apiSuccessExample Success-Response:
*     HTTP/1.1 200 OK
*     {
*       success: true,
*       message: 'Comment removed.'
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
* @apiError NotFound Comment doesn't exist in database.
*
* @apiErrorExample NotFound:
*     HTTP/1.1 404 Not Found
*     {
*       success: false,
*       message: "Comment doesn't exist."
*     }
*
* @apiErrorExample ServerError:
*     HTTP/1.1 503 Service Unavailable
*     {
*       success: false,
*       message: "Error message."
*     }
*
* @apiError WrongArgs Missing arguments to delete comment from song.
*
* @apiErrorExample WrongArgs:
*     HTTP/1.1 400 Bad Request
*     {
*       success: false,
*       message: 'Wrong arguments'
*     }
*/
router.delete('/:idSong/comments/:idComment', auth({secret: superSecret}), function(req, res, next) {
  if (req.params.idComment) {
    Song.findOne({ 'slug': req.params.idSong }).exec(function (err, song) {
      Comment.findById(req.params.idComment, function (err, comment) {
        if (comment == null) {
          return res.status(404).json({
            success: false,
            message: "Comment doesn't exist."
          });
        }
        if (req.decoded.admin || req.decoded.id == comment.author) {
          var objectid = new mongoose.mongo.ObjectID(req.params.idComment);
          song.comments.pull(objectid);
          comment.remove();
          song.save(function (err) {
            if (err) {
              return res.status(503).json({
                success: false,
                message: err.errors
              });
            }
            res.status(200).json({
              success: true,
              message: 'Comment removed.'
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
      if (err) return next(err);
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
* @api {post} /songs/:slug/comments Add a comment to a song
* @apiPermission user
* @apiVersion 0.1.0
* @apiName AddCommentToSong
* @apiGroup Comment
*
* @apiParam {String} slug The song you want to select.
* @apiParam {String} message Message of the comment.
* @apiParam {String} token authentification token is mandatory.
*
* @apiSuccess {Boolean} success Notify the success of current request.
* @apiSuccess {String} message Response message.
*
* @apiSuccessExample Success-Response:
*     HTTP/1.1 200 OK
*     {
*       success: true,
*       message: "Comment added."
*     }
*
* @apiError WrongArgs Missing arguments to add a comment to a song.
*
* @apiErrorExample WrongArgs:
*     HTTP/1.1 400 Bad Request
*     {
*       success: false,
*       message: 'Wrong arguments'
*     }
*
* @apiError NotFound The song is not found in database.
*
* @apiErrorExample NotFound:
*     HTTP/1.1 404 Not Found
*     {
*       success: false,
*       message: "Song is not found"
*     }
*
* @apiError ServiceUnavailable Impossible to add a comment to a song.
*
* @apiErrorExample ServiceUnavailable:
*     HTTP/1.1 503 Service Unavailable
*     {
*       success: false,
*       message: "error message."
*     }
*/
router.post('/:slug/comments', auth({secret: superSecret}), function(req, res, next) {
  Song.findOne({ 'slug': req.params.slug }).exec(function (err, post) {
    if (err) return next(err);
    if (post) {
      if (req.decoded.id && req.body.message) {
        var comment = new Comment();
        if (err) return next(err);
        var author = new mongoose.mongo.ObjectID(req.decoded.id);
        comment.author = author;
        comment.message = req.body.message;
        comment.type = "song";
        comment.save(function (err) {
          if (err) {
            return res.status(503).json({
              success: false,
              message: err.errors
            });
          }
          else {
            var objectid = new mongoose.mongo.ObjectID(comment._id);
            post.comments.push(objectid);
            post.save(function (err) {
              if (err) {
                return res.status(503).json({
                  success: false,
                  message: err.errors
                });
              }
              res.status(200).json({
                success: true,
                message: 'Comment added.'
              });
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
    } else {
      return res.status(404).json({
        success: false,
        message: "Song is not found"
      });
    }
  });
});

/**
* @api {post} /songs Add a song
* @apiPermission user
* @apiVersion 0.1.0
* @apiName AddSong
* @apiGroup Song
*
* @apiDescription This api method has to ways to run : there is a method to add a song with audio file and another one from a scanned partition, without audio file.
*
* For the first method, just add "file" and "preview" with basic fields (name, artist, price, difficulty and a picture).
*
* For the second method, just add "scan" with basic fields (name, artist, price (optionnal), difficulty and a picture).
*
* @apiParam {String} token authentification token is mandatory.
* @apiParam {String} name Name of the song.
* @apiParam {String} artist Artist of the song.
* @apiParam {Number} price Price of the song.
* @apiParam {String} difficulty Difficulty of the song.
* @apiParam {Image{2 Mo}} picture Custom picture for the song :
MIME Type has to be : ["image/jpeg", "image/png", "image/gif", "image/tiff"] and
accepted extensions ["jpg", "jpeg", "png", "gif", "tiff"].
* @apiParam {Image{2 Mo}} scan Custom scan for the song :
MIME Type has to be : ["image/jpeg", "image/png", "image/gif", "image/tiff"] and
accepted extensions ["jpg", "jpeg", "png", "gif", "tiff"].
* @apiParam {Song{20 Mo}} file Audio file for the song :
MIME Type has to be : ["midi", "mp3", "wav", "mid"] and
accepted extensions ["audio/midi", "audio/mid"].
* @apiParam {Song{20 Mo}} preview Audio preview file for the song :
MIME Type has to be : ["midi", "mp3", "wav", "mid"] and
accepted extensions ["audio/midi", "audio/mid"].
*
* @apiSuccess {Boolean} success Notify the success of current request.
* @apiSuccess {String} message Response message.
*
* @apiSuccessExample Success-Response:
*     HTTP/1.1 200 OK
*     {
*       success: true,
*       message: 'Song created !',
*     }
*
* @apiError WrongArgs Missing arguments to add a song.
*
* @apiErrorExample WrongArgs:
*     HTTP/1.1 400 Bad Request
*     {
*       success: false,
*       message: 'Wrong arguments'
*     }
*
* @apiError AlreadyExists This song already exists in database.
*
* @apiErrorExample AlreadyExists:
*     HTTP/1.1 409 Conflict
*     {
*       success: false,
*       message: 'Song already exists.'
*     }
*
* @apiError Unauthorized Impossible to add a song.
*
* @apiErrorExample Unauthorized:
*     HTTP/1.1 401 Unauthorized
*     {
*       success: false,
*       message: "Unauthorized."
*     }
*
* @apiError CannotConvertScan Impossible to create song from scan.
*
* @apiErrorExample CannotConvertScan:
*     HTTP/1.1 501 Service Unavailable
*     {
*       success: false,
*       message: "Error while trying to convert the sheet music into MIDI song"
*     }
*
* @apiError ServerError Impossible to save the song.
*
* @apiErrorExample ServerError:
*     HTTP/1.1 500 Server Error
*     {
*       success: false,
*       message: "error message"
*     }
*/
router.post('/', upload.fields([{ name: 'picture', maxCount: 1 }, { name: 'preview', maxCount: 1 }, { name: 'file', maxCount: 1 }, { name: 'scan', maxCount: 1 }]),
auth({secret: superSecret}), function(req, res, next) {
  // Only Admin or users are allowed here
  if (req.decoded.admin || req.decoded.id ) {
    var method = -1;
    var SCAN_PARTITION = 0;
    var BASIC_UPLOAD = 1;

    // Method if user wants to save his music from his sheet music (scan partition)
    if (req.body.name && req.body.artist && req.body.difficulty && req.files['picture'] && req.files['scan']) {
      method = SCAN_PARTITION;
    }
    // Method is user wants to save his music
    else if (req.body.name && req.body.artist  && req.body.price && req.body.difficulty && req.files['picture'] && req.files['file'] && req.files['preview']) {
      method = BASIC_UPLOAD;
    }
    // Wrong arguments and no methods have been found
    else {
      return res.status(400).json({
        success: false,
        message: "Wrong arguments"
      });
    }

    // Quick check if the song already exists in the database
    Song.find({name: req.body.name}, function (err, songFind) {
      // Cool, it's a new song
      if (!songFind.length) {
        // Get the current API's path (useful after to save song on disk)
        var apiPath = process.cwd();
        // Retrieve array of files
        var files = req.files;
        // Song is null by default, waiting for following verifications
        var song = null;
        // Var useful after in then statement from Promise
        var realPath = "";
        var picturePath = "";
        if (method == SCAN_PARTITION) {
          var scanPath = "";
        }
        if (method == BASIC_UPLOAD) {
          var filePath = "";
          var previewPath = "";
        }

        // Start the promise stuff (to handle files uplaoded and more)
        Promise.resolve(files)
        .then(function(files) {
          // FOR ANDROID
          // // Check the correct MIME for images
          // if (uploadConfig.acceptedMimeTypes.indexOf(files['picture'][0].mimetype) == -1) {
          //     throw "Incorrect MIME type for picture : " + files['picture'][0].mimetype;
          // }
          // if (method == SCAN_PARTITION) {
          //   if (uploadConfig.acceptedMimeTypes.indexOf(files['scan'][0].mimetype) == -1) {
          //     throw "Incorrect MIME type for scan : " + files['scan'][0].mimetype;
          //   }
          // }
          if (method == BASIC_UPLOAD) {
            // Check the correct MIME for sounds
            if (uploadMusicConfig.acceptedMimeTypes.indexOf(files['file'][0].mimetype) == -1) {
              throw "Incorrect MIME type for file : " + files['file'][0].mimetype;
            }
            if (uploadMusicConfig.acceptedMimeTypes.indexOf(files['preview'][0].mimetype) == -1) {
              throw "Incorrect MIME type for preview : " + files['preview'][0].mimetype;
            }
          }
          return files;
        })
        .then(function(files) {
          // Check the maxsize for images
          if (files['picture'][0].size > uploadConfig.maxFileSize) {
            throw "File is too large for the picture : " + files['picture'][0].size + " instead of  " + uploadConfig.maxFileSize;
          }
          if (method == SCAN_PARTITION) {
            if (files['scan'][0].size > uploadConfig.maxFileSize) {
              throw "File is too large for the scan : " + files['scan'][0].size + " instead of " + uploadConfig.maxFileSize;
            }
          }
          if (method == BASIC_UPLOAD) {
            // Check the maxsize for sounds
            if (files['file'][0].size > uploadMusicConfig.maxFileSize) {
              throw "File is too large for the song : " + files['file'][0].size + " instead of  " + uploadConfig.maxFileSize;
            }
            if (files['preview'][0].size > uploadMusicConfig.maxFileSize) {
              throw "File is too large for the preview : " + files['preview'][0].size + " instead of  " + uploadConfig.maxFileSize;
            }
          }
          return files;
        })
        .then(function(files) {
          // We can create the song now
          song = new Song();
          // Create repository if it doesn't exist to store the song
          if (!fs.existsSync(apiPath + "/public/uploads/songs/" + song._id + "/")){
            fs.mkdirSync(apiPath + "/public/uploads/songs/" + song._id + "/");
          }
          // Set paths
          realPath = apiPath + "/public/uploads/songs/" + song._id + "/";
          var tempPath = files['picture'][0].path;
          picturePath = "uploads/songs/" + song._id + "/" + files['picture'][0].originalname;
          if (method == SCAN_PARTITION) {
            var tempScanPath = files['scan'][0].path;
            scanPath = "uploads/songs/" + song._id + "/" + files['scan'][0].originalname;
          }
          if (method == BASIC_UPLOAD) {
            var tempFilePath = files['file'][0].path;
            var tempPreviewPath = files['preview'][0].path;
            filePath = "uploads/songs/" + song._id + "/" + files['file'][0].originalname;
            var previewPath = "uploads/songs/" + song._id + "/" + files['preview'][0].originalname;
          }

          // Moving files to song folder
          fs.rename(tempPath, realPath + files['picture'][0].originalname, function(err){
            if (err) {
              throw "Server error about moving tmp picture file";
            }
            if (method == SCAN_PARTITION) {
              return fs.rename(tempScanPath, realPath + files['scan'][0].originalname);
            }
            if (method == BASIC_UPLOAD) {
              fs.rename(tempFilePath, realPath + files['file'][0].originalname, function(err){
                if (err) {
                  throw  "Server error about moving tmp song file";
                }
                return fs.rename(tempPreviewPath, realPath + files['preview'][0].originalname);
              });
            }
          });
        })
        .then(function(err) {
          if (err) {
            var errorFrom = "";
            if (method ==  SCAN_PARTITION) {
              errorFrom = "scan"
            }
            if (method ==  BASIC_UPLOAD) {
              errorFrom = "preview";
            }
            throw "Server error about moving tmp " + errorFrom + " file";
          }

          if (method == BASIC_UPLOAD) {
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
                throw err;
              }
              return res.status(200).json({
                success: true,
                message: 'Song created !'
              });
            });
          }

          if (method == SCAN_PARTITION) {
            // Launch OpenORM (Java) to perform the scan
            exec("java -jar " + path.resolve(apiPath + "/OpenOMR/OpenOMR.jar") + " " +
            path.resolve(apiPath + "/public/" + scanPath) + " " +
            path.resolve(realPath +"song.mid"),
            function callback(error, stdout, stderr){
              console.log("Error = " + error + "\n - Sortie standard =  " + stdout + "\n - Sortie d'erreur = " + stderr);
              if (error || stdout === "") {
                return res.status(501).json({
                  success: false,
                  message: "Error while trying to convert the sheet music into MIDI song"
                });
              }
              song.file = "uploads/songs/" + song._id + "/" + "song.mid";
              song.preview = "uploads/songs/" + song._id + "/" + "song.mid";
              song.name = req.body.name;
              song.artist = req.body.artist;
              song.picture = picturePath;
              // Price is not mandatory, 0 if empty
              song.price = req.body.price || 0;
              song.difficulty = req.body.difficulty;
              song.scan = scanPath;
              song.slug = slug(req.body.name);
              song.save(function (err, songCreated) {
                if (err) {
                  return res.status(500).json({
                    success: false,
                    message: err.message
                  });
                }
                else {
                  addSongToUser(req, songCreated, res);
                }
              });
            });
          }
        })
        .catch(function(err) {
          res.status(500).send({success: false, message: err.toString()});
        });
      }
      else {
        // Notify that song already exists
        return res.status(409).json({
          success: false,
          message: 'Song already exists.'
        });
      }
    });
  }
  // Not allowed quit with unauthorized message
  else {
    return res.status(401).send({
      success: false,
      message: 'Unauthorized.'
    });
  }
});

// Function from "/songs" from users routes but a little bit different
function addSongToUser(req, songCreated, res) {
  if (songCreated) {
    User.findOne({_id: req.decoded.id}, function (err, user) {
      Song.findOne({_id: songCreated.id}, function (err, song) {
        var objectid = new mongoose.mongo.ObjectID(songCreated.id);
        if (user.songs.indexOf(objectid) === -1) {
          user.songs.push(objectid);
          user.save(function (err) {
            if (err) {
              return res.status(503).json({
                success: false,
                message: err.toString()
              });
            }
            song.bought += 1;
            song.save(function (err){
              if (err) {
                return res.status(503).json({
                  success: false,
                  message: err.toString()
                });
              }
            });
            res.status(200).json({
              success: true,
              message: 'Song added to user.'
            });
          });
        }
        else {
          res.status(409).json({
            success: false,
            message: 'Song already added to user.'
          });
        }
      });
    });
  }
  else
  return res.json({
    success: false,
    message: 'Wrong arguments'
  });
}

/**
* @api {get} /songs/:slug Get song by slug or id
* @apiPermission none
* @apiVersion 0.1.0
* @apiName GetSong
* @apiGroup Song
*
* @apiParam {String} [slug] Slug of the song to retrieve.
* @apiParam {String} [idSong] idSong of the song to retrieve.
*
* @apiSuccess {String} slug Slug of the song.
* @apiSuccess {String} preview Preview of the song (path to preview audio file).
* @apiSuccess {String} file Audio file of the song.
* @apiSuccess {Number} price Price of the song.
* @apiSuccess {String} picture Picture of the song (path to image file).
* @apiSuccess {String} artist Artist of the song.
* @apiSuccess {String} name Name of the song.
* @apiSuccess {Object} comments Comments from the song.
* @apiSuccess {Number} bought Number of how many times the song was bought.
* @apiSuccess {Number} difficulty Difficulty of the song.
*
* @apiSuccessExample Success-Response:
*   HTTP/1.1 200 OK
*     {
*       {
*         "_id": "581e1eedfae905040b64874b",
*         "updatedAt": "2016-11-08T12:28:42.926Z",
*         "createdAt": "2016-11-05T18:03:25.000Z",
*         "slug": "Pirates-des-Caraibes",
*         "preview": "",
*         "file": "uploads/songs/581e1eedfae905040b64874b/Pirates of the Caribbean - He's a Pirate.mid",
*         "price": 12,
*         "picture": "uploads/songs/581e1eedfae905040b64874b/cover.jpg",
*         "artist": "Disney",
*         "name": "Pirates des Caraïbes",
*         "__v": 0,
*         "comments": [],
*         "bought": 1,
*         "difficulty": 5
*         }
*    }
*/
router.get('/:slug', function(req, res, next) {
  Song.findOne({'slug': req.params.slug}).populate({
    path: 'comments',
    populate: {
      path: 'author',
      select: "name picture",
      model: 'User'
    }
  }).exec(function (err, post) {
    if (!post) {
      Song.findOne({'_id': req.params.slug}).populate({
        path: 'comments',
        populate: {
          path: 'author',
          select: "name picture",
          model: 'User'
        }
      }).exec(function (err, slug) {
        if (err) return next(err);
        return res.status(200).json(slug);
      });
    }
    else {
      if (err) return next(err);
      return res.status(200).json(post);
    }
  });
});

/**
* @api {put} /songs/:idSong Edit a song
* @apiPermission admin
* @apiVersion 0.1.0
* @apiName EditSong
* @apiGroup Song
*
* @apiParam {String} token authentification token is mandatory.
* @apiParam {String} [name] Name of the song.
* @apiParam {String} [artist] Artist of the song.
* @apiParam {Number} [price] Price of the song.
* @apiParam {String} [difficulty] Difficulty of the song.
* @apiParam {Image{2 Mo}} [picture] Custom picture for the song :
MIME Type has to be : ["image/jpeg", "image/png", "image/gif", "image/tiff"] and
accepted extensions ["jpg", "jpeg", "png", "gif", "tiff"].
* @apiParam {Image{2 Mo}} [scan] Custom scan for the song :
MIME Type has to be : ["image/jpeg", "image/png", "image/gif", "image/tiff"] and
accepted extensions ["jpg", "jpeg", "png", "gif", "tiff"].
* @apiParam {Song{20 Mo}} [file] Audio file for the song :
MIME Type has to be : ["midi", "mp3", "wav", "mid"] and
accepted extensions ["audio/midi", "audio/mid"].
* @apiParam {Song{20 Mo}} [preview] Audio preview file for the song :
MIME Type has to be : ["midi", "mp3", "wav", "mid"] and
accepted extensions ["audio/midi", "audio/mid"].
*
* @apiSuccess {Boolean} success Notify the success of current request.
* @apiSuccess {String} message Response message.
*
* @apiSuccessExample Success-Response:
*     HTTP/1.1 200 OK
*     {
*       success: true,
*       message: "Song updated !"
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

/**
* @api {delete} /songs/:idSong Delete a song
* @apiPermission admin
* @apiVersion 0.1.0
* @apiName DeleteSong
* @apiGroup Song
*
* @apiParam {Number} idSong Song that you want to delete.
* @apiParam {String} token authentification token is mandatory.
*
* @apiSuccess {Boolean} success Notify the success of current request.
* @apiSuccess {String} message Response message.
*
* @apiSuccessExample Success-Response:
*     HTTP/1.1 200 OK
*     {
*       success: true,
*       message: 'The song has been deleted.'
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
