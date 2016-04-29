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
 var upload      = multer({ dest: './uploads/avatar/'});
 var util        = require("util");
 var Achievement = require("../../../models/Achievement.js");
 var router      = express.Router();
 var uploadConfig = {
    acceptedMimeTypes : [ "image/jpeg", "image/png", "image/gif", "image/tiff" ],
    acceptedExtensions : [ "jpg", "jpeg", "png", "gif", "tiff" ],
    maxFileSize : 2000000
};



router.get('/picture/', auth({secret: superSecret}), function(req, res, next) {
    var path = "./uploads/avatar/";
    console.log("debut get");
    fs.readdir(path, function(err, items) {

        for (var i=0; i<items.length; i++) {
            console.log(items[i]);
        }
    });
    console.log("FIN get");

    

});

router.get('/pictures/', auth({secret: superSecret}), function(req, res, next) {
    var path = "./uploads/avatar/";
    console.log("debut geta");
    fs.readdir(path+"56fa3f7e7614a31100c67163/", function(err, items) {
        for (var i=0; i<items.length; i++) {
            console.log(items[i]);
        }
    });
    console.log("FIN getza");
});



router.get('/', function(req, res, next) {
    User.find({}).populate("achievements").exec(function (err, users) {
        if (err) return next(err);
        res.json(users);
    });
});

router.post('/', function(req, res, next) {
    if (req.body.email && req.body.password){ //&& req.body.type) {
        User.find({emailLocal : req.body.email}, function (err, docs) {
            if (!docs.length){
                var user = new User();

                user.emailLocal = req.body.email;
                user.passwordLocal = req.body.password;
                //user.type = req.body.type;
                user.save(function (err) {
                    if (err) {
                        return res.json({
                            success: false,
                            message: err.message
                        });
                    }
                    res.json({
                        success: true,
                        message: 'User created !'
                    });
                });
            }else{
                return res.json({
                    success: false,
                    message: 'User already exists'
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

router.get('/:email', function(req, res, next) {
    User.findOne({
        'emailLocal': req.params.email
    }).select('emailLocal').exec(function (err, user) {
        if (err) throw err;

        if (user) {
            res.json(user);
        }
        else {
            res.json({
                success: false,
                message: 'User not found.'
            });
        }
    });
});

router.put('/:id', auth({secret: superSecret}), function(req, res, next) {
    if (req.decoded.admin || req.decoded.id == req.params.id) {
        User.findByIdAndUpdate(req.params.id, req.body, function (err, post) {
            if (err) return next(err);
            res.json({
                success: true,
                message: 'User updated !'
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
        User.findByIdAndRemove(req.params.id, req.body, function (err, post) {
            if (err) return next(err);
            return res.status(200).send({
                success: true,
                message: 'The user has been deleted.'
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

router.post('/picture/:id', upload.single('avatar'), auth({secret: superSecret}), function(req, res, next) {
    if (req.decoded.admin || req.decoded.id == req.params.id) {
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
            if (!fs.existsSync("uploads/avatar/"+req.decoded.id+"/")){
                fs.mkdirSync("uploads/avatar/"+req.decoded.id+"/");
            }
            var tempPath = image.path;
            var realPath = "uploads/avatar/"+req.decoded.id+"/";
            var ext = image.originalname.substr(image.originalname.lastIndexOf('.') + 1);
            console.log("TempPath:"+tempPath+" autre:"+ realPath+image.filename+"."+ext);
            return fs.rename(tempPath, realPath+image.filename+"."+ext);
        })
        .then(function(err) {
            if (err)
                throw err;
        })
        .then(function() {
            res.send({success: true, message: "Your image has been saved"});
        })
        .catch(function(err) {
            res.send({success: false, message: err});
        });
    }
    else {
        return res.status(403).send({
            success: false,
            message: 'Unauthorized.'
        });
    }
});

router.post('/authenticate', function(req, res) {
    User.findOne({
        'emailLocal': req.body.email
    }).select('emailLocal passwordLocal').exec(function (err, user) {
        if (err) throw err;

        if (!user) {
            res.json({
                success: false,
                message: 'Authentication failed. User not found.'
            });
        } else if (user) {
            var validPassword = user.comparePassword(req.body.password);
            if (!validPassword) {
                res.json({
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

                res.json({
                    success: true,
                    message: 'Enjoy your token!',
                    token: token
                });
            }

        }

    });
});

module.exports = router;