 var express     = require('express');
 var superSecret = require('../../../config.js').secret;
 var router      = express.Router();
 var request = require('request');


 router.post('/',function(req,res){
  // g-recaptcha-response is the key that browser will generate upon form submit.
  // if its blank or null means user has not selected the captcha, so return the error.
  if(req.body['captcha'] === undefined || req.body['captcha'] === '' || req.body['captcha'] === null) {
    return res.json({"responseCode" : 1,"responseDesc" : "Please select captcha"});
}
  // Put your secret key here.
  var secretKey = " 6Le_viMTAAAAABg-0OH0SWYE-gJz1GXFJxDwSsum";
  // req.connection.remoteAddress will provide IP address of connected user.
  var verificationUrl = "https://www.google.com/recaptcha/api/siteverify?secret=" + secretKey + "&response=" + req.body['captcha'] + "&remoteip=" + req.connection.remoteAddress;
  // Hitting GET request to the URL, Google will respond with success or error scenario.
  request(verificationUrl,function(error,response,body) {
    body = JSON.parse(body);
    // Success will be true or false depending upon captcha validation.
    if(body.success !== undefined && !body.success) {
      return res.json({"responseCode" : 1,"responseDesc" : "Failed captcha verification"});
  }
  res.json({"responseCode" : 0,"responseDesc" : "Sucess"});
});
});

 module.exports = router;