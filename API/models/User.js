/**
 * Created by Kangoo13 on 18/10/2015.
 */
var mongoose    = require('mongoose');
var bcrypt      = require('bcrypt-nodejs');

var userSchema = mongoose.Schema({
    admin: { type: Boolean, default: false },
    emailLocal        : { type: String, match: [/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/, 'Please fill a valid email address']},
    passwordLocal     : { type: String, match: [/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{4,12}$/, 'Please provid a valid password']},
    name : { type: String },
    picture : { type: String },
    address : { type: String },
    description : { type: String },
    city : { type: String },
    country : { type: String },
    facebook         : {
        id           : String,
        token        : String,
        email        : String,
        name         : String
    },
    twitter          : {
        id           : String,
        token        : String,
        displayName  : String,
        username     : String
    },
    google           : {
        id           : String,
        token        : String,
        email        : String,
        name         : String
    },
    created_at: { type: Date, default: Date.now },
    updated_at: { type: Date, default: Date.now },
});

userSchema.pre('save', function(next) {
    var user = this;
    this.updated_at = Date.now();
    if (!user.isModified('passwordLocal')) return next();
    bcrypt.hash(user.passwordLocal, null, null, function (err, hash) {
        if (err) return next(err);

        // change the passwordLocal to the hashed version
        user.passwordLocal = hash;
        next();
    });
});

userSchema.methods.comparePassword = function(password) {
    var user = this;
    return bcrypt.compareSync(password, user.passwordLocal);
    };

userSchema.methods.isAdmin = function(){
    return this.admin;
}


module.exports = mongoose.model('User', userSchema);