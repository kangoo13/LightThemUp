 var express     = require('express');
 var News        = require('../../../models/News.js');
 var Comment     = require('../../../models/Comment.js');
 var superSecret = require('../../../config.js').secret;
 var auth        = require('authenticate');
 var fs          = require('fs');
 var slug        = require('slug')
 var path        = require('path');
 var multer      = require('multer');
 var Promise     = require('bluebird');
 var mongoose    = require('mongoose');
 var upload      = multer({ dest: './public/uploads/tmp/'});
 var router      = express.Router();

 var uploadConfig = {
    acceptedMimeTypes : [ "image/jpeg", "image/png", "image/gif", "image/tiff" ],
    acceptedExtensions : [ "jpg", "jpeg", "png", "gif", "tiff" ],
    maxFileSize : 2000000
};

router.get('/', function(req, res, next) {
    News.find().sort("-createdAt").exec(function (err, news) {
        if (err) return next(err);
        res.status(200).json(news);
    });
});

router.post('/', auth({secret: superSecret}), upload.single('picture'), function(req, res, next) {
    if (req.body.name && req.body.description && req.file) {
        if (req.decoded.admin) {
            News.find({name: req.body.name}, function (err, docs) {
                if (!docs.length) {
                    var news = new News();
                    console.log(news._id);
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

                        if (!fs.existsSync(process.cwd()+"/public/uploads/news/"+news._id+"/")){
                            fs.mkdirSync(process.cwd()+"/public/uploads/news/"+news._id+"/");
                        }
                        var tempPath = image.path;
                        var realPath = process.cwd()+"/public/uploads/news/"+news._id+"/";
                        picturePath = "uploads/news/"+news._id+"/"+image.originalname;
                        return fs.rename(tempPath, realPath+image.originalname);
                    })
                    .then(function(err) {
                        if (err)
                            throw err;
                        else
                        {
                            news.name = req.body.name;
                            news.description = req.body.description;
                            news.picture = picturePath;
                            news.author = req.decoded.id;
                            news.slug = slug(req.body.name);
                            news.save(function (err) {
                                if (err) {
                                    return res.status(503).json({
                                        success: false,
                                        message: err
                                    });
                                }

                            });
                        }
                    })
                    .then(function() {
                        return res.status(200).json({
                            success: true,
                            message: 'News created !'
                        });
                    })
                    .catch(function(err) {
                        res.status(500).send({success: false, message: err.toString()});
                    });

                } else {
                    return res.status(409).json({
                        success: false,
                        message: 'News already exists'
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
    else
        return res.status(400).json({
            success: false,
            message: 'Wrong arguments'
        });
});

router.get('/:idNews', function(req, res, next) {
    News.findOne({ 'slug': req.params.idNews }).populate({ 
       path: 'comments',
       populate: {
         path: 'author',
         select: "name picture",
         model: 'User'
     } 
 }).exec(function (err, post) {
    if (err) return next(err);
    res.status(200).json(post);
});
});

router.put('/:idNews/comments/:idComment', auth({secret: superSecret}), function(req, res, next) {
   if (req.params.idComment && req.body.message) {
    News.findOne({ 'slug': req.params.idNews }).exec(function (err, news) {
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

router.delete('/:idNews/comments/:idComment', auth({secret: superSecret}), function(req, res, next) {
    if (req.params.idComment) {
      News.findOne({ 'slug': req.params.idNews }).exec(function (err, news) {
        Comment.findById(req.params.idComment, function (err, comment) {
            if (comment == null) {
                return res.status(503).json({
                    success: false,
                    message: "Comment doesn't exist."
                });
            }
            if (req.decoded.admin || req.decoded.id == comment.author) {
                var objectid = new mongoose.mongo.ObjectID(req.params.idComment);
                news.comments.pull(objectid);
                comment.remove();
                news.save(function (err) {
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


router.get('/getNewsFromComment/:idComment', function(req, res, next){
    News.find().exec(function (err, news){
        if (err) return next(err);
        var goodNews = null;
        for (var i = 0; i != news.length; i++)
        {
            for (var j = 0; j != news[i].comments.length; j++)
            {
                if (news[i].comments[j]._id == req.params.idComment) {
                    goodNews = news[i];
                    break;
                }
            }
            if (goodNews != null)
                break;
        }
        if (goodNews)
            return res.status(200).json(goodNews);
        else
            return res.status(503).json({
                success: false,
                message: "La news n'a pas été trouvée"
            });
    })
});

router.post('/:idNews/comments', auth({secret: superSecret}), function(req, res, next) {
    News.findOne({ 'slug': req.params.idNews }).exec(function (err, post) {
        if (err) return next(err);
        if (req.decoded.id && req.body.message) {
            var comment = new Comment();
            if (err) return next(err);
            var author = new mongoose.mongo.ObjectID(req.decoded.id);
            comment.author = author;
            comment.message = req.body.message;
            comment.type = "news";
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


router.put('/:idNews', auth({secret: superSecret}), function(req, res, next) {
    if (req.decoded.admin) {
        News.findByIdAndUpdate(req.params.idNews, req.body, function (err, post) {
            if (err) return next(err);
            res.status(200).json({
                success: true,
                message: 'News updated !'
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

router.delete('/:idNews', auth({secret: superSecret}), function(req, res, next) {
    if (req.decoded.admin) {
        News.findByIdAndRemove(req.params.idNews, req.body, function (err, post) {
            if (err) return next(err);
            return res.status(200).send({
                success: true,
                message: 'The news has been deleted.'
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