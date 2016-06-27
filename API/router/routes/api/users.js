/**
 * Created by Kangoo13 on 18/10/2015.
 */
 var express     = require('express');
 var User        = require('../../../models/User.js');
 var superSecret = require('../../../config.js').secret;
 var jwt         = require('jsonwebtoken');
 var auth        = require('authenticate');
 var fs          = require('fs');
 var path        = require('path');
 var multer      = require('multer');
 var Promise     = require('bluebird');
 var util        = require("util");
 var Achievement = require("../../../models/Achievement.js");
 var upload      = multer({ dest: './public/uploads/avatar/'});
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

router.post('/', function(req, res, next) {
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
    	console.log(req.body);
        User.findByIdAndUpdate(req.params.idUser, req.body, function (err, post) {
            if (err) return next(err);
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
    User.findById(req.params.idUser).populate("achievements").exec(function (err, post) {
        if (err) return next(err);
        res.status(200).json(post);
    });
});

router.post('/:idUser/avatar', upload.single('avatar'), auth({secret: superSecret}),  function(req, res, next) {
    if (req.decoded.admin || req.decoded.id == req.params.idUser) {
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
            if (!fs.existsSync(process.cwd()+"/public/uploads/avatar/"+req.params.idUser+"/")){
                fs.mkdirSync(process.cwd()+"/public/uploads/avatar/"+req.params.idUser+"/");
            }
            var tempPath = image.path;
            var realPath = process.cwd()+"/public/uploads/avatar/"+req.params.idUser+"/";
            //var ext = image.originalname.substr(image.originalname.lastIndexOf('.') + 1);
            picturePath = "uploads/avatar/"+req.params.idUser+"/"+image.originalname;
            return fs.rename(tempPath, realPath+image.originalname);
        })
        .then(function(err) {
            if (err)
                throw err;
            else
            {
                User.find({'_id': req.params.idUser}, function(err, user){
                    if (user.length)
                    {
                        user[0].picture = picturePath;
                        user[0].save(function (err) {
                            if (err) {
                                throw err.message;
                            }
                        });
                    }
                    else
                        throw "User not found to apply the picture";
                });
            }
        })
        .then(function() {
            res.send({success: true, message: "Your image has been saved"});
        })
        .catch(function(err) {
            res.send({success: false, message: err});
        });
    }
    else {
        return res.status(401).send({
            success: false,
            message: 'Unauthorized.'
        });
    }
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