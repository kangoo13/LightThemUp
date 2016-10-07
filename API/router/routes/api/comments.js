 var express     = require('express');
 var Comment     = require('../../../models/Comment.js');
 var superSecret = require('../../../config.js').secret;
 var mongoose    = require('mongoose');
 var router      = express.Router();

 router.get('/lastComments/:nbComments', function(req, res, next) {
    Comment.find().limit(parseInt(req.params.nbComments, 10)).sort({'createdAt': -1}).populate({ 
       path: 'author',
       select: "name",
       model: 'User'
   }).exec(function (err, comments) {
    if (err) return next(err);
    res.status(200).json(comments);
});
});

module.exports = router;
