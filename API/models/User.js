/**
 * Created by Kangoo13 on 18/10/2015.
 */
var mongoose    = require('mongoose');
var bcrypt      = require('bcrypt-nodejs');
var Schema      = mongoose.Schema;

var userSchema = mongoose.Schema({
    admin: { type: Boolean, default: false, select: false },
    emailLocal        : { type: String },
    passwordLocal     : { type: String , select: false},
    name : { type: String },
    picture : { type: String },
    address : { type: String },
    description : { type: String },
    city : { type: String },
    country : { type: String },
    achievements: [{type: Schema.Types.ObjectId, ref: 'Achievement'}],
    songs: [{type: Schema.Types.ObjectId, ref: 'Song'}],
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
    }
},
    {
        timestamps: true
    });

userSchema.pre('save', function(next) {
    var user = this;
    if (user.isModified('passwordLocal')) {
        if (!/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{4,12}$/.test(this.passwordLocal)) {
            var error = new Error("Invalid password")
            return next(error);
        }
    }
    if (user.isModified('emailLocal')) {
        if (!/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(this.emailLocal)) {
            var error = new Error("Invalid email")
            return next(error);
        }
    }

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