/**
* Created by Kangoo13 on 18/10/2015.
*/
var express     = require('express');
var Song        = require('../../../models/Song.js');
var User        = require('../../../models/User.js');
var superSecret = require('../../../config.js').secret;
var jwt         = require('jsonwebtoken');
var auth        = require('authenticate');
var fs          = require('fs');
var path        = require('path');
var multer      = require('multer');
var Promise     = require('bluebird');
var mongoose    = require('mongoose');
var util        = require("util");
var Achievement = require("../../../models/Achievement.js");
var upload      = multer({ dest: './public/uploads/tmp/'});
var router      = express.Router();

var uploadConfig = {
  acceptedMimeTypes : [ "image/jpeg", "image/png", "image/gif", "image/tiff" ],
  acceptedExtensions : [ "jpg", "jpeg", "png", "gif", "tiff" ],
  maxFileSize : 2000000
};

router.get('/', function(req, res, next) {
  User.find({}).populate("achievements").exec(function (err, users) {
    if (err) return next(err);

    res.status(200).json(users);
  });
});

router.post('/songs', auth({secret: superSecret}), function(req, res) {
  if (req.body.idSong) {
    User.findOne({_id: req.decoded.id}, function (err, user) {
      Song.findOne({_id: req.body.idSong}, function (err, song) {
        var objectid = new mongoose.mongo.ObjectID(req.body.idSong);
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
              message: 'Musique ajouté à l\'utilisateur !'
            });
          });
        }
        else {
          res.status(409).json({
            success: false,
            message: 'Musique déjà ajoutée à l\'utilisateur'
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
});


router.delete('/songs/:idSong', auth({secret: superSecret}), function(req, res, next) {
  User.findOne({_id: req.decoded.id}, function (err, user) {
    var objectid = new mongoose.mongo.ObjectID(req.params.idSong);
    user.songs.pull(objectid);
    user.save(function (err) {
      if (err) {
        return res.status(503).json({
          success: false,
          message: err.toString()
        });
      }
      Song.findOne({_id: req.body.idSong}, function (err, song) {
        if (song) {
          song.bought -= 1;
          song.save(function (err){
            if (err) {
              return res.status(503).json({
                success: false,
                message: err.toString()
              });
            }
          });
        }
      });
      res.status(200).json({
        success: true,
        message: 'Musique supprimée !'
      });
    });
  });
});

router.post('/', upload.single('picture'), function(req, res, next) {
  if (req.body.email && req.body.password){
    User.find({emailLocal : req.body.email}, function (err, docs) {
      if (!docs.length){
        var user = new User();
        user.emailLocal = req.body.email;
        user.passwordLocal = req.body.password;
        if (req.body.name)
        user.name = req.body.name;
        if (req.body.address)
        user.address = req.body.address;
        if (req.body.description)
        user.description = req.body.description;
        if (req.body.city)
        user.city = req.body.city;
        if (req.body.country)
        user.country = req.body.country;
        if (req.file)
        {
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
            if (!fs.existsSync(process.cwd()+"/public/uploads/avatar/"+user._id+"/")){
              fs.mkdirSync(process.cwd()+"/public/uploads/avatar/"+user._id+"/");
            }
            var tempPath = image.path;
            var realPath = process.cwd()+"/public/uploads/avatar/"+user._id+"/";
            picturePath = "uploads/avatar/"+user._id+"/"+image.originalname;
            return fs.rename(tempPath, realPath+image.originalname);
          })
          .then(function(err) {
            if (err)
            throw err;
            else
            {
              user.picture = picturePath;
              user.save(function (err) {
                if (err) {
                  return res.status(503).json({
                    success: false,
                    message: err.message
                  });
                }
                res.status(200).json({
                  success: true,
                  message: 'User created !'
                });
              });
            }
          }).catch(function(err) {
            res.status(500).send({success: false, message: err.toString()});
          });
        }
        else {
          user.save(function (err) {
            if (err) {
              return res.status(503).json({
                success: false,
                message: err.message
              });
            }
            res.status(200).json({
              success: true,
              message: 'User created !'
            });
          });
        }
      }else{
        return res.status(409).json({
          success: false,
          message: 'User already exists'
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

router.put('/:idUser', auth({secret: superSecret}), function(req, res, next) {
  if (req.decoded.admin || req.decoded.id == req.params.idUser) {
    console.log(req.body.email);
    console.log(req.body);
    User.findByIdAndUpdate(req.params.idUser, req.body,  { $addToSet: {emailLocal: req.body.email} }, function (err, post) {
        if (err) {
          console.log(err);
          return next(err);
        }
        res.status(200).json({
          success: true,
          message: 'User updated !'
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

  router.delete('/:idUser', auth({secret: superSecret}), function(req, res, next) {
    if (req.decoded.admin || req.decoded.id == req.params.idUser) {
      User.findByIdAndRemove(req.params.idUser, req.body, function (err, post) {
        if (err) return next(err);
        return res.status(200).send({
          success: true,
          message: 'The user has been deleted.'
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

  router.get('/:idUser', function(req, res, next) {
    User.findById(req.params.idUser).populate("achievements").populate("songs").exec(function (err, post) {
      if (err) return next(err);
      res.status(200).json(post);
    });
  });

  router.post('/authenticate', function(req, res) {
    if (req.body.email && req.body.password) {
      User.findOne({
        'emailLocal': req.body.email
      }).select('emailLocal +passwordLocal +admin').exec(function (err, user) {
        if (err) throw err;

        if (!user) {
          res.status(404).json({
            success: false,
            message: 'Authentication failed. User not found.'
          });
        } else if (user) {
          var validPassword = user.comparePassword(req.body.password);
          if (!validPassword) {
            res.status(401).json({
              success: false,
              message: 'Authentication failed. Wrong password.'
            });
          } else {

            var token = jwt.sign({
              'emailLocal': user.emailLocal,
              'id': user.id,
              'admin': user.admin,
            }, superSecret, {
              expiresInMinutes: 1440 // expires in 24 hours
            });

            res.status(200).json({
              success: true,
              message: 'Enjoy your token!',
              token: token,
              id: user.id
            });
          }

        }

      });
    }
    else
    return res.json({
      success: false,
      message: 'Wrong arguments'
    });
  });

  module.exports = router;
