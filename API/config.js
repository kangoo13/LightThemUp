module.exports = {
    'env': 'development',
    'secret': 'ilovebananas5328',
    'database': 'mongodb://lightthemup:lightthemup@ds011790.mlab.com:11790/apiforlightthemup',
    'facebookAuth': {
        'clientID': '893159310766341',
        'clientSecret': '8aa9a262261b4d2ed257935fae1429e4',
        'callbackURL': 'http://ec2-52-89-221-124.us-west-2.compute.amazonaws.com/auth/facebook/callback'
    },
    'twitterAuth': {
        'consumerKey': 'KcEwNTYlOhW6UpmmQWFmElkHR',
        'consumerSecret': 'k4KRFdnGYs9nDrgEX3nmFvE3SpeZX4D7YqfrAL6qq1dS2VZ2sM',
        'callbackURL': 'http://ec2-52-89-221-124.us-west-2.compute.amazonaws.com/auth/twitter/callback'
    },

    'googleAuth': {
        'clientID': '224809170991-gf00og7ihhadg8hl5rq723t09la9fh5o.apps.googleusercontent.com',
        'clientSecret': 'tUY2eEAxfVTE6rtFWOA3u_EX',
        'callbackURL': 'http://ec2-52-89-221-124.us-west-2.compute.amazonaws.com/auth/google/callback',
        'realm': 'http://ec2-52-89-221-124.us-west-2.compute.amazonaws.com/'
    }
};
