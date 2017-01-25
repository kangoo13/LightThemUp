"use strict";

var express     = require('express');
var superSecret = require('../../../config.js').secret;
var Song        = require('../../../models/Song.js');
var User        = require('../../../models/User.js');
var auth        = require('authenticate');
var mongoose    = require('mongoose');
var paypal      = require('paypal-rest-sdk');
var frontendUrl = "http://lightthemup.fr.nf/"
var router      = express.Router();


router.get('/cancel', function(req, res, next) {
  res.status(200).json({
    token: req.query.token
  });
});

router.get('/execute', auth({secret: superSecret}), function(req, res, next) {
  User.findOne({_id: req.decoded.id}, function (err, user) {
    if (user) {
      var paymentId = user.paymentId;
      var details = { "payer_id": req.query.PayerID };

      paypal.payment.execute(paymentId, details, function (error, payment) {
        if (error) {
          console.log(error);
        } else {
          console.log(payment);
          console.log(payment.description);
          addSongToUser(req, res, payment.description);
        }
      });
    } else {
      return res.status(404).json({
        success: false,
        message: "User not found."
      });
    }
  }
});

// Function from "/songs" from users routes but a little bit different
function addSongToUser(req, res, songSlug) {
  User.findOne({_id: req.decoded.id}, function (err, user) {
    Song.findOne({slug: songSlug}, function (err, song) {
      var objectid = new mongoose.mongo.ObjectID(song.id);
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


router.get('/:slug/:method/', auth({secret: superSecret}), function(req, res, next) {
  if (req.decoded.admin || req.decoded.id ) {
    if (req.params.slug && req.params.method) {
      User.findOne({_id: req.decoded.id}, function (err, user) {
        if (user) {
          Song.findOne({'slug': req.params.slug}, function (err, song) {
            if (song) {
              var method = req.params.method;
              var amount = song.price;
              var description = song.slug;

              var payment = {
                "intent": "sale",
                "payer": {
                },
                "transactions": [{
                  "amount": {
                    "currency": "EUR",
                    "total": amount
                  },
                  "description": description
                }]
              };

              if (method === 'paypal') {
                payment.payer.payment_method = method;
                payment.redirect_urls = {
                  "return_url": frontendUrl + "paypal/execute",
                  "cancel_url": frontendUrl + "paypal/cancel"
                };
              } else if (method === 'credit_card') {
                var funding_instruments = [
                  {
                    "credit_card": {
                      "type": req.param('type').toLowerCase(),
                      "number": req.param('number'),
                      "expire_month": req.param('expire_month'),
                      "expire_year": req.param('expire_year'),
                      "first_name": req.param('first_name'),
                      "last_name": req.param('last_name')
                    }
                  }
                ];
                payment.payer.payment_method = method;
                payment.payer.funding_instruments = funding_instruments;
              } else {
                return res.status(400).json({
                  success: false,
                  message: "Incorrect method."
                })
              }
              paypal.payment.create(payment, function (error, payment) {
                if (error) {
                  console.error(error);
                  return res.status(500).json({
                    success: false,
                    message: "Something went wrong with Paypal"
                  });
                } else {
                  console.log(payment);
                  if (payment.payer.payment_method === 'paypal') {
                    user.paymentId = payment.id;
                    user.save(function (err) {
                      if (err) {
                        return res.status(503).json({
                          success: false,
                          message: err.toString()
                        });
                      } else {
                        var redirectUrl;
                        for(var i=0; i < payment.links.length; i++) {
                          var link = payment.links[i];
                          if (link.method === 'REDIRECT') {
                            redirectUrl = link.href;
                          }
                        }
                        res.redirect(redirectUrl);
                      }
                    });
                  }
                }
              });
            } else {
              return res.status(404).json({
                success: false,
                message: "Song not found."
              });
            }
          });
        } else {
          return res.status(404).json({
            success: false,
            message: "User not found."
          });
        }
      });
    } else {
      return res.status(400).json({
        success: false,
        message: "Wrong arguments."
      });
    }
  } else {
    return res.status(401).send({
      success: false,
      message: 'Unauthorized.'
    });
  }
});

module.exports = router;
