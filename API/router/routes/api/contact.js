 var express     = require('express');
 var router      = express.Router();
 var superSecret = require('../../../config.js').secret;
 var auth        = require('authenticate');
 var Contact     = require('../../../models/Contact.js');
 var request     = require('request');


 router.post('/',function(req,res){
  // g-recaptcha-response is the key that browser will generate upon form submit.
  // if its blank or null means user has not selected the captcha, so return the error.
  if(req.body['captcha'] === undefined || req.body['captcha'] === '' || req.body['captcha'] === null) {
  	return res.status(401).send({
  		success: false,
  		message: 'Captcha non renseigné.'
  	});
  }
  var secretKey = " 6Le_viMTAAAAABg-0OH0SWYE-gJz1GXFJxDwSsum";
  // req.connection.remoteAddress will provide IP address of connected user.
  var verificationUrl = "https://www.google.com/recaptcha/api/siteverify?secret=" + secretKey + "&response=" + req.body['captcha'] + "&remoteip=" + req.connection.remoteAddress;
  // Hitting GET request to the URL, Google will respond with success or error scenario.
  request(verificationUrl,function(error,response,body) {
  	body = JSON.parse(body);
    // Success will be true or false depending upon captcha validation.
    if(body.success !== undefined && !body.success) {
    	return res.status(401).send({
    		success: false,
    		message: 'Captcha invalide.'
    	});
    }

    var contact = new Contact();

    contact.name = req.body.name;
    contact.email = req.body.email;
    contact.message = req.body.message;
    contact.remoteIp = req.connection.remoteAddress;

    contact.save(function (err) {
      if (err) {
        return res.status(503).json({
          success: false,
          message: err.errors
        });
      }
      return res.status(200).json({
        success: true,
        message: 'Votre message a bien été envoyé.'
      });
    });
  });
});

 router.get('/', auth({secret: superSecret}), function(req, res, next) {
  if (req.decoded.admin) {
    Contact.find().sort("-createdAt").exec(function (err, contact) {
      if (err)
       next(err);
     res.status(200).json(contact);
   });  
  }
  else {
    res.status(401).send({
      success: false,
      message: 'Unauthorized.'
    });
  }
});

 router.get('/:idContact', auth({secret: superSecret}), function(req, res, next) {
   if (req.decoded.admin) {
    Contact.findById(req.params.idContact).exec(function (err, post) {
      if (err) return next(err);
      res.status(200).json(post);
    });
  }
  else {
   res.status(401).send({
    success: false,
    message: 'Unauthorized.'
  });
 }
});

 router.delete('/:idContact', auth({secret: superSecret}), function(req, res, next) {
  if (req.decoded.admin) {
    Contact.findByIdAndRemove(req.params.idContact, req.body, function (err, post) {
      if (err) return next(err);
      return res.status(200).send({
        success: true,
        message: 'The contact form has been deleted.'
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