 var express = require('express');
 var News = require('../../../models/News.js');
 var Comment = require('../../../models/Comment.js');
 var superSecret = require('../../../config.js').secret;
 var auth = require('authenticate');
 var fs = require('fs');
 var slug = require('slug')
 var path = require('path');
 var multer = require('multer');
 var Promise = require('bluebird');
 var mongoose = require('mongoose');
 var upload = multer({
     dest: './public/uploads/tmp/'
 });
 var router = express.Router();

 var uploadConfig = {
     acceptedMimeTypes: ["image/jpeg", "image/png", "image/gif", "image/tiff"],
     acceptedExtensions: ["jpg", "jpeg", "png", "gif", "tiff"],
     maxFileSize: 2000000
 };

 /**
  * @api {get} /news/ Get all news
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
 router.get('/', function(req, res, next) {
     News.find().sort("-createdAt").exec(function(err, news) {
         if (err) return next(err);
         res.status(200).json(news);
     });
 });


 /**
  * @api {post} /news/ Add a news
  * @apiPermission admin
  * @apiVersion 0.1.0
  * @apiName AddNews
  * @apiGroup News
  *
  * @apiParam {String} token Token to be authentified.
  * @apiParam {String} name Name of the news.
  * @apiParam {String} description Description of the news.
  * @apiParam {String} author Author of the news.
  * @apiParam {Image{2 Mo}} [picture] Custom picture for the news :
   MIME Type has to be : ["image/jpeg", "image/png", "image/gif", "image/tiff"] and
   accepted extensions ["jpg", "jpeg", "png", "gif", "tiff"].
  *
  * @apiSuccess {Boolean} success Notify the success of current request.
  * @apiSuccess {String} message Response message.
  *
  * @apiSuccessExample Success-Response:
  *     HTTP/1.1 200 OK
  *     {
  *       success: true,
  *       message: 'News created !'
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
  * @apiError WrongArgs Missing arguments to create the news.
  *
  * @apiErrorExample WrongArgs:
  *     HTTP/1.1 400 Bad Request
  *     {
  *       success: false,
  *       message: 'Wrong arguments'
  *     }
  *
  * @apiError AlreadyExists News already exists in database.
  *
  * @apiErrorExample AlreadyExists:
  *     HTTP/1.1 409 Conflict
  *     {
  *       success: false,
  *       message: "News already exists"
  *     }
  *
  * @apiError ServerError Impossible to create a news.
  *
  * @apiErrorExample ServerError:
  *     HTTP/1.1 503 Service Unavailable
  *     {
  *       success: false,
  *       message: "Error message."
  *     }
  */
 router.post('/', auth({
     secret: superSecret
 }), upload.single('picture'), function(req, res, next) {
     if (req.body.name && req.body.description) {
         if (req.decoded.admin) {
             News.find({
                 name: req.body.name
             }, function(err, docs) {
                 if (!docs.length) {
                     var news = new News();
                     var picturePath = "";
                     if (req.file) {
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

                                 if (!fs.existsSync(process.cwd() + "/public/uploads/news/" + news._id + "/")) {
                                     fs.mkdirSync(process.cwd() + "/public/uploads/news/" + news._id + "/");
                                 }
                                 var tempPath = image.path;
                                 var realPath = process.cwd() + "/public/uploads/news/" + news._id + "/";
                                 picturePath = "uploads/news/" + news._id + "/" + image.originalname;
                                 return fs.rename(tempPath, realPath + image.originalname);
                             })
                             .then(function(err) {
                                 if (err)
                                     throw err;
                                 else {
                                     news.name = req.body.name;
                                     news.description = req.body.description;
                                     news.picture = picturePath;
                                     news.author = req.decoded.id;
                                     news.slug = slug(req.body.name);
                                     news.save(function(err) {
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
                                 res.status(503).send({
                                     success: false,
                                     message: err.toString()
                                 });
                             });
                     } else {
                         news.name = req.body.name;
                         news.description = req.body.description;
                         news.author = req.decoded.id;
                         news.slug = slug(req.body.name);
                         news.save(function(err) {
                             if (err) {
                                 return res.status(503).json({
                                     success: false,
                                     message: err
                                 });
                             }
                             return res.status(200).json({
                                 success: true,
                                 message: 'News created !'
                             });
                         });
                     }
                 } else {
                     return res.status(409).json({
                         success: false,
                         message: 'News already exists'
                     });
                 }
             });
         } else {
             return res.status(401).send({
                 success: false,
                 message: 'Unauthorized.'
             });
         }
     } else
         return res.status(400).json({
             success: false,
             message: 'Wrong arguments'
         });
 });

 /**
  * @api {get} /news/idNews Get a news by id
  * @apiPermission none
  * @apiVersion 0.1.0
  * @apiName GetNewsById
  * @apiGroup News
  *
  * @apiParam {Number} idNews News you want to get.
  *
  * @apiSuccess {String} slug Url translate of news' title.
  * @apiSuccess {String} author Author of the news.
  * @apiSuccess {String} description Description of the news.
  * @apiSuccess {String} name Name / Title of the news.
  * @apiSuccess {Array} comments Array with all comments (see comment section
  for an explanation about fields).
  * @apiSuccess {Image} picture Picture of the news.
  *
  * @apiSuccessExample Success-Response:
  *     HTTP/1.1 200 OK
  *     {
  *        {
  *            _id: "57e54896ce58658110cd855e",
  *            updatedAt: "2016-11-23T22:33:14.258Z",
  *            createdAt: "2016-09-23T15:21:58.000Z",
  *            slug: "DEVOS-Tanguy",
  *            author: "577ea485fee4ec632f5c663f",
  *            description: "yeaaah",
  *            name: "A big news",
  *            __v: 2,
  *            comments: [
  *                   _id: "5836192a48e54efc0a9b8695",
  *                   updatedAt: "2016-11-23T22:33:14.000Z",
  *                   createdAt: "2016-11-23T22:33:14.000Z",
  *                   type: "news",
  *                   message: "Super actualité ! :)",
  *                   author: {
  *                         _id: "581e67289043e3880cad7ec0",
  *                         name: "Faucheur",
  *                         picture: "uploads/avatar/581e67289043e3880cad7ec0/reaper.jpg"
  *                    },
  *                   __v: 0
  *                   ],
  *            picture: "uploads/news/default-news.jpg"
  *       }
  */
 router.get('/:idNews', function(req, res, next) {
     News.findOne({
         'slug': req.params.idNews
     }).populate({
         path: 'comments',
         populate: {
             path: 'author',
             select: "name picture",
             model: 'User'
         }
     }).exec(function(err, post) {
         if (!post) {
             News.findOne({
                 '_id': req.params.idNews
             }).populate({
                 path: 'comments',
                 populate: {
                     path: 'author',
                     select: "name picture",
                     model: 'User'
                 }
             }).exec(function(err, postNews) {
                 if (err) return next(err);
                 res.status(200).json(postNews);
             });
         } else {
             if (err) return next(err);
             res.status(200).json(post);
         }
     });

 });

 /**
  * @api {put} /news/:idNews/comments/:idComment Edit a news' comment
  * @apiPermission user
  * @apiVersion 0.1.0
  * @apiName EditNewsComment
  * @apiGroup Comment
  *
  * @apiParam {Number} idNews News you want to select.
  * @apiParam {Number} idComment Comment you want to edit.
  * @apiParam {String} token Token to be authentified.
  * @apiParam {String} [message] Message of the comment.
  *
  * @apiSuccess {Boolean} success Notify the success of current request.
  * @apiSuccess {String} message Response message.
  *
  * @apiSuccessExample Success-Response:
  *     HTTP/1.1 200 OK
  *     {
  *       success: true,
  *       message: 'Comment edited.'
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
  * @apiError NotFound Comment doesn't exist in database.
  *
  * @apiErrorExample NotFound:
  *     HTTP/1.1 404 Conflict
  *     {
  *       success: false,
  *       message: "Comment doesn't exist."
  *     }
  *
  * @apiError ServerError Impossible to edit the comment.
  *
  * @apiErrorExample ServerError:
  *     HTTP/1.1 503 Service Unavailable
  *     {
  *       success: false,
  *       message: "Error message."
  *     }
  */
 router.put('/:idNews/comments/:idComment', auth({
     secret: superSecret
 }), function(req, res, next) {
     if (req.params.idComment && req.body.message) {
         News.findOne({
             'slug': req.params.idNews
         }).exec(function(err, news) {
             Comment.findById(req.params.idComment, function(err, comment) {
                 if (comment == null) {
                     return res.status(503).json({
                         success: false,
                         message: "Comment doesn't exist."
                     });
                 }
                 if (req.decoded.admin || req.decoded.id == comment.author) {
                     comment.message = req.body.message;
                     comment.save(function(err) {
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
                 } else {
                     return res.status(401).send({
                         success: false,
                         message: 'Unauthorized.'
                     });
                 }
             });
             if (err) return next(err)
         });
     } else {
         return res.status(400).json({
             success: false,
             message: 'Wrong arguments'
         });
     }
 });

 /**
  * @api {delete} /news/:idNews/comments/:idComment Delete a news' comment
  * @apiPermission user
  * @apiVersion 0.1.0
  * @apiName DeleteNewsComment
  * @apiGroup Comment
  *
  * @apiParam {Number} idNews News id that you want to select.
  * @apiParam {Number} idComment Comment id that you want to delete.
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
  * @apiError WrongArgs Missing arguments to delete the comment.
  *
  * @apiErrorExample WrongArgs:
  *     HTTP/1.1 400 Bad Request
  *     {
  *       success: false,
  *       message: 'Wrong arguments'
  *     }
  *
  * @apiError NotFound Comment doesn't exist in database.
  *
  * @apiErrorExample NotFound:
  *     HTTP/1.1 404 Conflict
  *     {
  *       success: false,
  *       message: "Comment doesn't exist."
  *     }
  *
  * @apiError ServerError Impossible to delete the comment.
  *
  * @apiErrorExample ServerError:
  *     HTTP/1.1 503 Service Unavailable
  *     {
  *       success: false,
  *       message: "Error message."
  *     }
  */
 router.delete('/:idNews/comments/:idComment', auth({
     secret: superSecret
 }), function(req, res, next) {
     if (req.params.idComment) {
         News.findOne({
             'slug': req.params.idNews
         }).exec(function(err, news) {
             Comment.findById(req.params.idComment, function(err, comment) {
                 if (comment == null) {
                     return res.status(404).json({
                         success: false,
                         message: "Comment doesn't exist."
                     });
                 }
                 if (req.decoded.admin || req.decoded.id == comment.author) {
                     var objectid = new mongoose.mongo.ObjectID(req.params.idComment);
                     news.comments.pull(objectid);
                     comment.remove();
                     news.save(function(err) {
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
                 } else {
                     return res.status(401).send({
                         success: false,
                         message: 'Unauthorized.'
                     });
                 }
             });
             if (err) return next(err);
         });
     } else {
         return res.status(400).json({
             success: false,
             message: 'Wrong arguments'
         });
     }
 });

 /**
  * @api {get} /getNewsFromComment/:idComment/:index Get a news by comment id
  * @apiPermission none
  * @apiVersion 0.1.0
  * @apiName GetNewsByCommentId
  * @apiGroup News
  *
  * @apiParam {Number} idComment News you want to get.
  * @apiParam {Number} index WTF is that param.
  *
  * @apiSuccess {String} slug Url translate of news' title.
  * @apiSuccess {String} author Author of the news.
  * @apiSuccess {String} description Description of the news.
  * @apiSuccess {String} name Name / Title of the news.
  * @apiSuccess {Array} comments Array with all comments (see comment section
  for an explanation about fields).
  * @apiSuccess {Image} picture Picture of the news.
  *
  * @apiSuccessExample Success-Response:
  *     HTTP/1.1 200 OK
  *     {
  *        {
  *            _id: "57e54896ce58658110cd855e",
  *            updatedAt: "2016-11-23T22:33:14.258Z",
  *            createdAt: "2016-09-23T15:21:58.000Z",
  *            slug: "DEVOS-Tanguy",
  *            author: "577ea485fee4ec632f5c663f",
  *            description: "yeaaah",
  *            name: "A big news",
  *            __v: 2,
  *            comments: [
  *                   _id: "5836192a48e54efc0a9b8695",
  *                   updatedAt: "2016-11-23T22:33:14.000Z",
  *                   createdAt: "2016-11-23T22:33:14.000Z",
  *                   type: "news",
  *                   message: "Super actualité ! :)",
  *                   author: {
  *                         _id: "581e67289043e3880cad7ec0",
  *                         name: "Faucheur",
  *                         picture: "uploads/avatar/581e67289043e3880cad7ec0/reaper.jpg"
  *                    },
  *                   __v: 0
  *                   ],
  *            picture: "uploads/news/default-news.jpg"
  *       }
  *
  * @apiError NewsNotFound Impossible to create a news.
  *
  * @apiErrorExample NewsNotFound:
  *     HTTP/1.1 404 Service Not found
  *     {
  *       success: false,
  *       message: "La news n'a pas été trouvée."
  *     }
  */
 router.get('/getNewsFromComment/:idComment/:index', function(req, res, next) {
     News.find().populate("comments").exec(function(err, news) {
         if (err) return next(err);
         var goodNews = null;
         for (var i = 0; i != news.length; i++) {
             for (var j = 0; j != news[i].comments.length; j++) {
                 if (news[i].comments[j]._id == req.params.idComment) {
                     goodNews = news[i].toObject();
                     goodNews.index = req.params.index;
                     break;
                 }
             }
             if (goodNews != null)
                 break;
         }
         if (goodNews)
             return res.status(200).json(goodNews);
         else
             return res.status(404).json({
                 success: false,
                 message: "La news n'a pas été trouvée"
             });
     })
 });

 /**
  * @api {post} /news/:idNews/comments/ Add a comment to a news
  * @apiPermission user
  * @apiVersion 0.1.0
  * @apiName AddCommentToNews
  * @apiGroup Comment
  *
  * @apiParam {String} token Token to be authentified.
  * @apiParam {String} message Message of the comment.
  *
  * @apiSuccess {Boolean} success Notify the success of current request.
  * @apiSuccess {String} message Response message.
  *
  * @apiSuccessExample Success-Response:
  *     HTTP/1.1 200 OK
  *     {
  *       success: true,
  *       message: 'Comment added.'
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
  * @apiError WrongArgs Missing arguments to create the comment.
  *
  * @apiErrorExample WrongArgs:
  *     HTTP/1.1 400 Bad Request
  *     {
  *       success: false,
  *       message: 'Wrong arguments'
  *     }
  *
  * @apiError ServerError Impossible to save the comment.
  *
  * @apiErrorExample ServerError:
  *     HTTP/1.1 503 Service Unavailable
  *     {
  *       success: false,
  *       message: "Error message."
  *     }
  */
 router.post('/:idNews/comments', auth({
     secret: superSecret
 }), function(req, res, next) {
     News.findOne({
         'slug': req.params.idNews
     }).exec(function(err, post) {
         if (err) return next(err);
         if (req.decoded.id) {
             if (req.body.message) {
                 var comment = new Comment();
                 if (err) return next(err);
                 var author = new mongoose.mongo.ObjectID(req.decoded.id);
                 comment.author = author;
                 comment.message = req.body.message;
                 comment.type = "news";
                 comment.save(function(err) {
                     if (err) {
                         return res.status(503).json({
                             success: false,
                             message: err.errors
                         });
                     } else {
                         var objectid = new mongoose.mongo.ObjectID(comment._id);
                         post.comments.push(objectid);
                         post.save(function(err) {
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
             } else
                 return res.status(400).json({
                     success: false,
                     message: 'Wrong arguments'
                 });
         } else {
             return res.status(401).send({
                 success: false,
                 message: 'Unauthorized.'
             });
         }
     });
 });

 /**
  * @api {put} /news/:idNews Edit a news by id
  * @apiPermission admin
  * @apiVersion 0.1.0
  * @apiName EditNewsById
  * @apiGroup News
  *
  * @apiParam {Number} idNews News you want to edit.
  * @apiParam {String} token Token to be authentified.
  * @apiParam {String} [name] Name of the news.
  * @apiParam {String} [description] Description of the news.
  * @apiParam {String} [author] Author of the news.
  * @apiParam {String} [slug] Slug of the news.
  * @apiParam {Image{2 Mo}} [picture] Custom picture for the news :
   MIME Type has to be : ["image/jpeg", "image/png", "image/gif", "image/tiff"] and
   accepted extensions ["jpg", "jpeg", "png", "gif", "tiff"].
  *
  * @apiSuccess {Boolean} success Notify the success of current request.
  * @apiSuccess {String} message Response message.
  *
  * @apiSuccessExample Success-Response:
  *     HTTP/1.1 200 OK
  *     {
  *       success: true,
  *       message: 'News updated !'
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
 router.put('/:idNews', auth({
     secret: superSecret
 }), function(req, res, next) {
     if (req.decoded.admin) {
         News.findByIdAndUpdate(req.params.idNews, req.body, function(err, post) {
             if (err) return next(err);
             res.status(200).json({
                 success: true,
                 message: 'News updated !'
             });
         });
     } else {
         return res.status(401).send({
             success: false,
             message: 'Unauthorized.'
         });
     }
 });


 /**
  * @api {delete} /news/:idNews Delete a news by id
  * @apiPermission admin
  * @apiVersion 0.1.0
  * @apiName DeleteNewsById
  * @apiGroup News
  *
  * @apiParam {Number} idNews News id that you want to delete.
  * @apiParam {String} token authentification token is mandatory.
  *
  * @apiSuccess {Boolean} success Notify the success of current request.
  * @apiSuccess {String} message Response message.
  *
  * @apiSuccessExample Success-Response:
  *     HTTP/1.1 200 OK
  *     {
  *       success: true,
  *       message: 'The news has been deleted.'
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
 router.delete('/:idNews', auth({
     secret: superSecret
 }), function(req, res, next) {
     if (req.decoded.admin) {
         News.findByIdAndRemove(req.params.idNews, req.body, function(err, post) {
             if (err) return next(err);
             return res.status(200).send({
                 success: true,
                 message: 'The news has been deleted.'
             });
         });
     } else {
         return res.status(401).send({
             success: false,
             message: 'Unauthorized.'
         });
     }
 });

 module.exports = router;
