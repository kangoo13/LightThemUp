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
var upload      = multer({ dest: './public/uploads/avatar/'});
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
  // Method if user wants to save his music from his sheet music
  if (req.body.name && req.body.artist && req.files['picture'] && req.body.price && req.body.difficulty && req.files['scan']) {
    if (req.decoded.admin || req.decoded.id ) {
      Song.find({name: req.body.name}, function (err, docs) {
        if (!docs.length) {
          var song = new Song();
          var picturePath = "";
          var realPath = "";
          var filePath = "";
          var previewPath = "";
          var image = req.files;
          Promise.resolve(image)
          .then(function(image) {

            if (uploadConfig.acceptedMimeTypes.indexOf(image['picture'][0].mimetype) == -1) {
              throw "Incorrect MIME type for the picture";
            }
            if (uploadConfig.acceptedMimeTypes.indexOf(image['scan'][0].mimetype) == -1) {
              throw "Incorrect MIME type for the scan";
            }
            return image;
          })
          .then(function(image) {
            if (image['picture'][0].size > uploadConfig.maxFileSize) {
              throw "File is too large for the picture";
            }
            if (image['scan'][0].size > uploadConfig.maxFileSize) {
              throw "File is too large for the scan";
            }
            return image;
          })
          .then(function(image) {
            if (!fs.existsSync(process.cwd()+"/public/uploads/songs/"+song._id+"/")){
              fs.mkdirSync(process.cwd()+"/public/uploads/songs/"+song._id+"/");
            }
            var tempPath = image['picture'][0].path;
            realPath = process.cwd()+"/public/uploads/songs/"+song._id+"/";
            picturePath = "uploads/songs/"+song._id+"/"+image['picture'][0].originalname;
            var tempScanPath = image['scan'][0].path;
            scanPath = "uploads/songs/"+song._id+"/"+image['scan'][0].originalname;
            fs.renameSync(tempScanPath, realPath+image['scan'][0].originalname);
            return fs.rename(tempPath, realPath+image['picture'][0].originalname);
          }).then(function(err) {
            if (err)
            throw err;
            else
            {
              var exec = require('child_process').exec;
              exec("java -jar C:\\Users\\Administrator\\Documents\\LightThemUp\\API\\OpenOMR\\OpenOMR.jar " +
              path.resolve("C:\\Users\\Administrator\\Documents\\LightThemUp\\API\\public\\" + scanPath) +
              " " + path.resolve(realPath + "song.mid"), function callback(error, stdout, stderr){
                if (error){
                  return res.status(503).json({
                    success: false,
                    message: error.toString()
                  });
                }
                else  {
                  song.file = "uploads/songs/"+song._id+"/"+"song.mid";
                  song.preview = "uploads/songs/"+song._id+"/"+"song.mid";
                }
              });
              song.name = req.body.name;
              song.artist = req.body.artist;
              song.picture = picturePath;
              song.price = req.body.price;
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
        }
      });
    }
    else {
      return res.status(409).json({
        success: false,
        message: 'Song already exists'
      });
    }
  }
  else if (req.body.name && req.body.artist && req.files['picture'] && req.body.price && req.files['file'] && req.files['preview'] && req.body.difficulty) {
    if (req.decoded.admin) {
      Song.find({name: req.body.name}, function (err, docs) {
        if (!docs.length) {
          var song = new Song();
          var picturePath = "";
          var filePath = "";
          var previewPath = "";
          var image = req.files;
          Promise.resolve(image)
          .then(function(image) {

            if (uploadConfig.acceptedMimeTypes.indexOf(image['picture'][0].mimetype) == -1) {
              throw "Incorrect MIME type for the picture";
            }
            if (uploadMusicConfig.acceptedMimeTypes.indexOf(image['file'][0].mimetype) == -1) {
              throw "Incorrect MIME type for the song";
            }
            if (uploadMusicConfig.acceptedMimeTypes.indexOf(image['preview'][0].mimetype) == -1) {
              throw "Incorrect MIME type for the song";
            }
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
  else {
    return res.status(400).json({
      success: false,
      message: 'Wrong arguments'
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
