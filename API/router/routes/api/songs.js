"use strict";

var express     = require('express');
var Song        = require('../../../models/Song.js');
var Comment     = require('../../../models/Comment.js');
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

router.get('/', function(req, res, next) {
  Song.find(function (err, songs) {
    if (err) return next(err);
    res.status(200).json(songs);
  });
});

router.get('/newSongs/:nbSong', function(req, res, next) {
  Song.find().limit(parseInt(req.params.nbSong, 10)).sort({'createdAt': -1}).exec(function (err, songs) {
    if (err) return next(err);
    res.status(200).json(songs);
  });
});


router.get('/mostBoughtSongs/:nbSong', function(req, res, next) {
  Song.find().limit(parseInt(req.params.nbSong, 10)).sort({'bought': -1}).exec(function (err, songs) {
    if (err) return next(err);
    res.status(200).json(songs);
  });
});

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
    return res.status(503).json({
      success: false,
      message: "La musique n'a pas été trouvée"
    });
  })
});

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


router.put('/:idSong/comments/:idComment', auth({secret: superSecret}), function(req, res, next) {
  if (req.params.idComment && req.body.message) {
    Song.findOne({ 'slug': req.params.idSong }).exec(function (err, song) {
      Comment.findById(req.params.idComment, function (err, comment) {
        if (comment == null) {
          return res.status(503).json({
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

router.delete('/:idSong/comments/:idComment', auth({secret: superSecret}), function(req, res, next) {
  if (req.params.idComment) {
    Song.findOne({ 'slug': req.params.idSong }).exec(function (err, song) {
      Comment.findById(req.params.idComment, function (err, comment) {
        if (comment == null) {
          return res.status(503).json({
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

router.post('/:idSong/comments', auth({secret: superSecret}), function(req, res, next) {
  Song.findOne({ 'slug': req.params.idSong }).exec(function (err, post) {
    if (err) return next(err);
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
    else
    return res.status(400).json({
      success: false,
      message: 'Wrong arguments'
    });
  });
});


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
      // Remove tmp files
      for (var fieldname in req.files){
        fs.unlinkSync(req.files[fieldname][0].path);
      }
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
          // Check the correct MIME for images
          if (uploadConfig.acceptedMimeTypes.indexOf(files['picture'][0].mimetype) == -1) {
            return res.status(400).json({
              success: false,
              message: "Incorrect MIME type for picture : " + files['picture'][0].mimetype
            });
          }
          if (method == SCAN_PARTITION) {
            if (uploadConfig.acceptedMimeTypes.indexOf(files['scan'][0].mimetype) == -1) {
              return res.status(400).json({
                success: false,
                message: "Incorrect MIME type for scan : " + files['scan'][0].mimetype
              });
            }
          }
          if (method == BASIC_UPLOAD) {
            // Check the correct MIME for sounds
            if (uploadMusicConfig.acceptedMimeTypes.indexOf(files['file'][0].mimetype) == -1) {
              return res.status(400).json({
                success: false,
                message: "Incorrect MIME type for file : " + files['file'][0].mimetype
              });
            }
            if (uploadMusicConfig.acceptedMimeTypes.indexOf(files['preview'][0].mimetype) == -1) {
              return res.status(400).json({
                success: false,
                message: "Incorrect MIME type for preview : " + files['preview'][0].mimetype
              });
            }
          }
          return files;
        })
        .then(function(files) {
          // Check the maxsize for images
          if (files['picture'][0].size > uploadConfig.maxFileSize) {
            return res.status(400).json({
              success: false,
              message: "File is too large for the picture : " + files['picture'][0].size + " instead of  " + uploadConfig.maxFileSize
            });
          }
          if (method == SCAN_PARTITION) {
            if (files['scan'][0].size > uploadConfig.maxFileSize) {
              return res.status(400).json({
                success: false,
                message: "File is too large for the scan : " + files['scan'][0].size + " instead of " + uploadConfig.maxFileSize
              });
            }
          }
          if (method == BASIC_UPLOAD) {
            // Check the maxsize for sounds
            if (files['file'][0].size > uploadMusicConfig.maxFileSize) {
              return res.status(400).json({
                success: false,
                message: "File is too large for the song : " + files['file'][0].size + " instead of  " + uploadConfig.maxFileSize
              });
            }
            if (files['preview'][0].size > uploadMusicConfig.maxFileSize) {
              return res.status(400).json({
                success: false,
                message: "File is too large for the preview : " + files['preview'][0].size + " instead of  " + uploadConfig.maxFileSize
              });
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
              return res.status(500).json({
                success: false,
                message: "Server error about moving tmp picture file"
              });
            }
            if (method == SCAN_PARTITION) {
              return fs.rename(tempScanPath, realPath + files['scan'][0].originalname);
            }
            if (method == BASIC_UPLOAD) {
              fs.rename(tempFilePath, realPath + files['file'][0].originalname, function(err){
                if (err) {
                  return res.status(500).json({
                    success: false,
                    message: "Server error about moving tmp song file"
                  });
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
            return res.status(500).json({
              success: false,
              message: "Server error about moving tmp " + errorFrom + " file"
            });
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
                return res.status(503).json({
                  success: false,
                  message: err.toString()
                });
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
              if (error) {
                return res.status(503).json({
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
              song.save(function (err) {
                if (err) {
                  return res.status(503).json({
                    success: false,
                    message: err.toString()
                  });
                }
                return res.status(200).json({
                  success: true,
                  message: 'Song created from your sheet music !'
                });
              });
            });
          }
        });
      }
      else {
        // Remove tmp files if song already exists
        for (var fieldname in req.files){
          fs.unlinkSync(req.files[fieldname][0].path);
        }
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
