"use strict";

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

/**
* @api {get} /users/ Get all users
* @apiPermission none
* @apiVersion 0.1.0
* @apiName GetUsers
* @apiGroup User
*
* @apiSuccess {String} name Name of the user.
* @apiSuccess {String} email Email of the user.
* @apiSuccess {String} address Address of the user.
* @apiSuccess {String} city City of the user.
* @apiSuccess {String} country Country of the user.
* @apiSuccess {String} picture Picture URL of the user.
* @apiSuccess {Object} songs All songs from the user.
* @apiSuccess {Object} achievements All achievements from the user.
*
* @apiSuccessExample Success-Response:
*    HTTP/1.1 200 OK
*      {
*        {
*          updatedAt: "2016-11-23T22:33:14.258Z",
*          updatedAt: "2016-11-23T22:33:14.258Z",
*          createdAt: "2016-09-23T15:21:58.000Z",
*          slug: "DEVOS-Tanguy",
*          author: "577ea485fee4ec632f5c663f",
*          description: "yeaaah",
*          name: "A big news",
*          __v: 2,
*          comments: [
*            "57f816c348165e7e18a84f37",
*            "5836192a48e54efc0a9b8695"
*          ],
*          picture: "uploads/news/default-news.jpg"
*         },
*         {
*          ...
*         }
*    }
*/
router.get('/', function(req, res, next) {
	User.find({}).populate("achievements").exec(function (err, users) {
		if (err) return next(err);
		res.status(200).json(users);
	});
});

/**
* @api {post} /users/songs Add a song to an user
* @apiPermission user
* @apiVersion 0.1.0
* @apiName AddSongUser
* @apiGroup Song
*
* @apiParam {Number} idSong Song you want to add to user.
*
* @apiSuccess {Boolean} success Notify the success of current request.
* @apiSuccess {String} message Response message.
*
* @apiSuccessExample Success-Response:
*     HTTP/1.1 200 OK
*     {
*       success: true,
*       message: 'Song added to user.'
*     }
*
* @apiError WrongArgs Missing arguments to add a song to the user.
*
* @apiErrorExample WrongArgs:
*     HTTP/1.1 400 Bad Request
*     {
*       success: false,
*       message: 'Wrong arguments'
*     }
*
* @apiError AlreadyExists Song already added to user.
*
* @apiErrorExample AlreadyExists:
*     HTTP/1.1 409 Conflict
*     {
*       success: false,
*       message: 'Song already added to user.'
*     }
*
* @apiError ServiceUnavailable Unable to add a song to the user.
*
* @apiErrorExample ServiceUnavailable:
*     HTTP/1.1 503 Service Unavailable
*     {
*       success: false,
*       message: "error message."
*     }
*/
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
});

/**
* @api {delete} /users/songs/:idSong Delete a song from an user
* @apiPermission user
* @apiVersion 0.1.0
* @apiName DeleteSongFromUser
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
*       message: 'Song removed.'
*     }
*
* @apiError ServiceUnavailable The token is not valid.
*
* @apiErrorExample ServiceUnavailable:
*     HTTP/1.1 503 Service Unavailable
*     {
*       success: false,
*       message: "error message."
*     }
*/
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
				message: "Song removed."
			});
		});
	});
});

/**
* @api {post} /users Add an user
* @apiPermission none
* @apiVersion 0.1.0
* @apiName AddUser
* @apiGroup User
*
* @apiParam {String} email Email of the user.
* @apiParam {String} password Password of the user.
* @apiParam {String} [name] Name of the user.
* @apiParam {String} [address] Address of the user.
* @apiParam {String} [description] Description of the user.
* @apiParam {String} [city] City of the user.
* @apiParam {String} [country] Country of the user.
* @apiParam {Image{2 Mo}} [picture] Custom picture for the user :
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
*       message: 'User created !',
*     }
*
* @apiError WrongArgs Missing arguments to add the user.
*
* @apiErrorExample WrongArgs:
*     HTTP/1.1 400 Bad Request
*     {
*       success: false,
*       message: 'Wrong arguments'
*     }
*
* @apiError AlreadyExists User already exists in database.
*
* @apiErrorExample AlreadyExists:
*     HTTP/1.1 409 Conflict
*     {
*       success: false,
*       message: 'User already exists'
*     }
*
* @apiError UserNotFound User not found in database.
*
* @apiErrorExample UserNotFound:
*     HTTP/1.1 404 Not Found
*     {
*       success: false,
*       message: "Authentication failed. User not found."
*     }
*
* @apiError ServiceUnavailable The token is not valid.
*
* @apiErrorExample ServiceUnavailable:
*     HTTP/1.1 503 Service Unavailable
*     {
*       success: false,
*       message: "error message."
*     }
*
* @apiError ServerError Unable to add an user.
*
* @apiErrorExample ServerError:
*     HTTP/1.1 500 Server Error
*     {
*       success: false,
*       message: "error message."
*     }
*/
router.post('/', upload.single('picture'), function(req, res, next) {
	if (req.body.email && req.body.password){
		User.find({email : req.body.email}, function (err, docs) {
			if (!docs.length){
				var user = new User();
				user.email = req.body.email;
				user.password = req.body.password;
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

/**
* @api {put} /users/:idUser Edit an user
* @apiPermission user
* @apiVersion 0.1.0
* @apiName EditUser
* @apiGroup User
*
* @apiParam {Number} idUser User you want to edit.
* @apiParam {String} email Email of the user.
* @apiParam {String} [password] Password of the user.
* @apiParam {String} [name] Name of the user.
* @apiParam {String} [address] Address of the user.
* @apiParam {String} [description] Description of the user.
* @apiParam {String} [city] City of the user.
* @apiParam {String} [country] Country of the user.
* @apiParam {Image{2 Mo}} [picture ] Custom picture for the user :
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
*       message: 'User updated !'
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
* @apiError NotFound User doesn't exist in database.
*
* @apiErrorExample NotFound:
*     HTTP/1.1 404 Not Found
*     {
*       success: false,
*       message: "User not found"
*     }
*
* @apiError BadRequest Minssing email field to edit user.
*
* @apiErrorExample BadRequest:
*     HTTP/1.1 400 Bad Request
*     {
*       success: false,
*       message: "Email cannot be empty"
*     }
*
* @apiError ServerError Impossible to edit the user.
*
* @apiErrorExample ServerError:
*     HTTP/1.1 500 Server Error
*     {
*       success: false,
*       message: "Error message."
*     }
*
*/
router.put('/:idUser', upload.single('picture'), auth({secret: superSecret}), function(req, res, next) {
	if (req.decoded.admin || req.decoded.id == req.params.idUser) {
		if (req.body.email) {
			User.findOne({email : req.body.email}, function (err, result1) {
				if (!result1) {
					User.findOne({_id : req.params.idUser}, function (err, result2) {
						if (!result2) {
							return res.status(404).json({
								success: false,
								message: "User not found"
							});
						}
						saveUser(result2);
					});
				}
				else {
					saveUser(result1);
				}
			});
		}
		else {
			return res.status(400).json({
				success: false,
				message: 'Email cannot be empty'
			});
		}
	}
	else {
		return res.status(401).send({
			success: false,
			message: 'Unauthorized.'
		});
	}

	function saveUser(user) {
		if (user && user._id == req.params.idUser) {
			user.email = req.body.email;
			if (req.body.password)
			user.password = req.body.password;
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
						throw "Incorrect MIME type for picture : " + image.mimetype;
					}
					return image;
				})
				.then(function(image) {
					if (image.size > uploadConfig.maxFileSize) {
						throw "File is too large for the picture : " + image.size + " instead of  " + uploadConfig.maxFileSize;
					}
					return image;
				})
				.then(function(image) {
					if (!fs.existsSync(process.cwd() + "/public/uploads/avatar/" + user._id + "/")){
						fs.mkdirSync(process.cwd() + "/public/uploads/avatar/" + user._id + "/");
					}
					var tempPath = image.path;
					var realPath = process.cwd() + "/public/uploads/avatar/"+ user._id + "/";
					picturePath = "uploads/avatar/" + user._id + "/" + image.originalname;
					return fs.rename(tempPath, realPath + image.originalname);
				})
				.then(function(err) {
					if (err) {
						throw "Server error about moving tmp picture file";
					}
					user.picture = picturePath;
					user.save(function (err) {
						if (err) {
							throw err.message;
						}
						res.status(200).json({
							success: true,
							message: 'User updated !'
						});
					});
				}).catch(function(err) {
					res.status(500).send({success: false, message: err.toString()});
				});
			}
			else {
				user.save(function (err) {
					if (err) {
						return res.status(500).json({
							success: false,
							message: err.toString()
						});
					}
					res.status(200).json({
						success: true,
						message: 'User updated !'
					});
				});
			}
		}
		else {
			return res.status(409).json({
				success: false,
				message: 'User already exists'
			});
		}
	}
});

/**
* @api {delete} /users/:idUser Delete an user by id
* @apiPermission user
* @apiVersion 0.1.0
* @apiName DeleteUserById
* @apiGroup User
*
* @apiParam {Number} idUser User that you want to delete.
* @apiParam {String} token authentification token is mandatory.
*
* @apiSuccess {Boolean} success Notify the success of current request.
* @apiSuccess {String} message Response message.
*
* @apiSuccessExample Success-Response:
*     HTTP/1.1 200 OK
*     {
*       success: true,
*       message: 'The user has been deleted.'
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

/**
* @api {get} /users/:idUser Get an user by id
* @apiPermission none
* @apiVersion 0.1.0
* @apiName GetUsersById
* @apiGroup User
*
* @apiParam {Number} idUser User you want to get.
*
* @apiSuccess {String} name Name of the user.
* @apiSuccess {String} email Email of the user.
* @apiSuccess {String} address Address of the user.
* @apiSuccess {String} city City of the user.
* @apiSuccess {String} country Country of the user.
* @apiSuccess {String} picture Picture URL of the user.
* @apiSuccess {Object} songs All songs from the user.
* @apiSuccess {Object} achievements All achievements from the user.
*
* @apiSuccessExample Success-Response:
*    HTTP/1.1 200 OK
*      {
*        {
*          updatedAt: "2016-11-23T22:33:14.258Z",
*          updatedAt: "2016-11-23T22:33:14.258Z",
*          createdAt: "2016-09-23T15:21:58.000Z",
*          slug: "DEVOS-Tanguy",
*          author: "577ea485fee4ec632f5c663f",
*          description: "yeaaah",
*          name: "A big news",
*          __v: 2,
*          comments: [
*            "57f816c348165e7e18a84f37",
*            "5836192a48e54efc0a9b8695"
*          ],
*          picture: "uploads/news/default-news.jpg"
*         },
*         {
*          ...
*         }
*    }
*/
router.get('/:idUser', function(req, res, next) {
	User.findById(req.params.idUser).populate("achievements").populate("songs").exec(function (err, post) {
		if (err) return next(err);
		res.status(200).json(post);
	});
});

/**
* @api {post} /users/authenticate Authenticate an user
* @apiPermission none
* @apiVersion 0.1.0
* @apiName AuthenticateUser
* @apiGroup User
*
* @apiParam {String} email Email to be authentified.
* @apiParam {String} password Password to be authentified.
*
* @apiSuccess {Boolean} success Notify the success of current request.
* @apiSuccess {String} message Response message.
* @apiSuccess {String} token Token of authentification.
* @apiSuccess {Number} id Id of user.
*
* @apiSuccessExample Success-Response:
*     HTTP/1.1 200 OK
*     {
*       success: true,
*       message: 'Enjoy your token!',
*       token: token,
*       id: user.id
*     }
*
* @apiError WrongPassword The password isn't correct.
*
* @apiErrorExample Unauthorized:
*     HTTP/1.1 401 Unauthorized
*     {
*       success: false,
*       message: "Authentication failed. Wrong password."
*     }
*
* @apiError WrongArgs Missing arguments to authenticate the user.
*
* @apiErrorExample WrongArgs:
*     HTTP/1.1 400 Bad Request
*     {
*       success: false,
*       message: 'Wrong arguments'
*     }
*
* @apiError UserNotFound User not found in database.
*
* @apiErrorExample UserNotFound:
*     HTTP/1.1 404 Not Found
*     {
*       success: false,
*       message: "Authentication failed. User not found."
*     }
*
*/
router.post('/authenticate', function(req, res) {
	if (req.body.email && req.body.password) {
		User.findOne({
			'email': req.body.email
		}).select('email +password +admin').exec(function (err, user) {
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
						'email': user.email,
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
	else {
		return res.status(400).json({
			success: false,
			message: 'Wrong arguments'
		});
	}
});

module.exports = router;
