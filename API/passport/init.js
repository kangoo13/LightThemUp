var FacebookStrategy    = require('passport-facebook').Strategy;
var User                = require('../models/User');
var configAuth          = require('../config.js');

    module.exports = function(passport) {
        // used to serialize the user for the session
        passport.serializeUser(function(user, done) {
            done(null, user.id);
        });

        // used to deserialize the user
        passport.deserializeUser(function(id, done) {
            User.findById(id, function(err, user) {
                done(err, user);
            });
        });

        // code for login (use('local-login', new LocalStategy))
        // code for signup (use('local-signup', new LocalStategy))

        passport.use(new FacebookStrategy({

                clientID        : configAuth.facebookAuth.clientID,
                clientSecret    : configAuth.facebookAuth.clientSecret,
                callbackURL     : configAuth.facebookAuth.callbackURL,
                profileFields: ["emails", "displayName"],
                passReqToCallback : true // allows us to pass in the req from our route (lets us check if a user is logged in or not)

            },
            function(req, token, refreshToken, profile, done) {

                // asynchronous
                process.nextTick(function() {

                    // check if the user is already logged in
                    if (!req.user) {

                        User.findOne({ 'facebook.id' : profile.id }, function(err, user) {
                            if (err)
                                return done(err);

                            if (user) {

                                // if there is a user id already but no token (user was linked at one point and then removed)
                                if (!user.facebook.token) {
                                    user.facebook.token = token;
                                    user.facebook.name = profile.displayName;
                                    user.facebook.email = profile.emails[0].value;

                                    user.save(function(err) {
                                        if (err)
                                            throw err;
                                        return done(null, user);
                                    });
                                }

                                return done(null, user); // user found, return that user
                            } else {
                                // if there is no user, create them
                                var newUser            = new User();

                                newUser.facebook.id    = profile.id;
                                newUser.facebook.token = token;
                                newUser.facebook.name = profile.displayName;
                                newUser.facebook.email = profile.emails[0].value;

                                newUser.save(function(err) {
                                    if (err)
                                        throw err;
                                    return done(null, newUser);
                                });
                            }
                        });

                    } else {
                        // user already exists and is logged in, we have to link accounts
                        var user            = req.user; // pull the user out of the session

                        user.facebook.id    = profile.id;
                        user.facebook.token = token;
                        user.facebook.name = profile.displayName;
                        user.facebook.email = profile.emails[0].value;

                        user.save(function(err) {
                            if (err)
                                throw err;
                            return done(null, user);
                        });

                    }
                });

            }));
    };