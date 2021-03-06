"use strict";

var jwt = require('jsonwebtoken');

module.exports = function(options) {

    if (!options || !options.secret) {
        throw new Error('secret should be set');
    }

    var secretCallback = options.secret;
    return(function(req, res, next) {

        // Check header or url parameters or post parameters for token
        var token = req.body.token || req.param('token') || req.headers['x-access-token'];
        // Decode token
        if (token) {
            // verifies secret and checks exp
            jwt.verify(token, secretCallback, function (err, decoded) {
                if (err) {
                    return res.status(403).send({
                        success: false,
                        message: 'Failed to authenticate token.'
                    });
                } 
                else {
                    // if everything is good, save to request for use in other routes
                    req.decoded = decoded;
                    next();
                }
            });
        } 
        else {
            // if there is no token
            // return an HTTP response of 403 (access forbidden) and an error message
            return res.status(403).send({
                success: false,
                message: 'No token provided.'
            });
        }
    });
};