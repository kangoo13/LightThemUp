var express         = require('express');
var bodyParser      = require('body-parser');
var mongoose        = require('mongoose');
var morgan          = require('morgan');
var config          = require('./test/config-test');
var User            = require('./models/User');
var passport        = require('passport');
var expressSession  = require('express-session');
var initPassport    = require('./passport/init');
var fs              = require('fs');
var app             = express();


app.use(expressSession({secret: config.secret}));
app.use(passport.initialize());
app.use(passport.session());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(morgan('dev'));

var db = mongoose.connection;

// Create DB for first use

// db.on('error', console.error);
// db.once('open', function() {
//   // Create schemas and models here.
//   var modelSchema = require('./models/Achievement.js');
//   var myModel = mongoose.model('Achievement', modelSchema);
//   new myModel().save();
//   modelSchema = require('./models/AchievementUser.js');
//   myModel = mongoose.model('AchievementUser', modelSchema);
//   new myModel().save();
//   modelSchema = require('./models/News.js');
//   myModel = mongoose.model('News', modelSchema);
//   new myModel().save();
//   modelSchema = require('./models/Playlist.js');
//   myModel = mongoose.model('Playlist', modelSchema);
//   new myModel().save();
//   modelSchema = require('./models/PlaylistSong.js');
//   myModel = mongoose.model('PlaylistSong', modelSchema);
//   new myModel().save();
//   modelSchema = require('./models/Song.js');
//   myModel = mongoose.model('Song', modelSchema);
//   new myModel().save();
//   modelSchema = require('./models/User.js');
//   myModel = mongoose.model('User', modelSchema);
//   new myModel().save();
// });

mongoose.connect(config.database, function(err) {
    if(err) {
        console.log('connection error', err);
    } else {
        console.log('connection successful');
    }
});


if (!fs.existsSync("uploads")){
    fs.mkdirSync("uploads");
}
if (!fs.existsSync("uploads/tmp/")){
    fs.mkdirSync("uploads/tmp");
}
if (!fs.existsSync("uploads/avatar")){
    fs.mkdirSync("uploads/avatar");
}
// Add headers
app.use(function (req, res, next) {

    // Website you wish to allow to connect
    res.setHeader('Access-Control-Allow-Origin', 'http://127.0.0.1/');

    // Request methods you wish to allow
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');

    // Request headers you wish to allow
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');
    // Set to true if you need the website to include cookies in the requests sent
    // to the API (e.g. in case you use sessions)
    res.setHeader('Access-Control-Allow-Credentials', true);

    // Pass to next layer of middleware
    next();
});
initPassport(passport);

require('./router')(app);
var routes = require('./router/passport.js')(passport);
app.use('/', routes);
app.use(function(err, req, res, next) {
    return res.status(500).send({
        success: false,
        message: err.toString(),
    });
});

// Set port depending on value from env or 3000 by force
var port;
if (!process.env.PORT)
    port = 3000;
else
    port = process.env.PORT;

console.log("Port used is : " + port);
app.listen(port);
module.exports = app;
