/**
 * Created by Kangoo13 on 17/10/2015.
 */
var express     = require('express');
var News  = require('../../../models/News.js');
var superSecret = require('../../../config.js').secret;
var auth        = require('authenticate');
var router      = express.Router();

router.get('/', function(req, res, next) {
    News.find(function (err, news) {
        if (err) return next(err);
        res.json(news);
    });
});

router.post('/', auth({secret: superSecret}), function(req, res, next) {
    if (req.body.name && req.body.description && req.body.picture ) {
        if (req.decoded.admin) {
            News.find({name: req.body.name}, function (err, docs) {
                if (!docs.length) {
                    var news = new News();

                    news.name = req.body.name;
                    news.description = req.body.description;
                    news.picture = req.body.picture;
                    news.author = req.decoded.id;
                    news.save(function (err) {
                        if (err) {
                            return res.json({
                                success: false,
                                message: err.errors
                            });
                        }
                        res.json({
                            success: true,
                            message: 'News created !'
                        });
                    });
                } else {
                    return res.json({
                        success: false,
                        message: 'News already exists'
                    });
                }
            });
        }
        else {
            return res.status(403).send({
                success: false,
                message: 'Unauthorized.'
            });
        }
    }
    else
        return res.json({
            success: false,
            message: 'Wrong arguments'
        });
});

router.get('/:idNews', function(req, res, next) {
        News.findById(req.params.idNews, function (err, post) {
            if (err) return next(err);
            res.json(post);
        });
});

router.put('/:idNews', auth({secret: superSecret}), function(req, res, next) {
    if (req.decoded.admin) {
        News.findByIdAndUpdate(req.params.idNews, req.body, function (err, post) {
            if (err) return next(err);
            res.json({
                success: true,
                message: 'News updated !'
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
        return res.status(403).send({
            success: false,
            message: 'Unauthorized.'
        });
    }
});

module.exports = router;