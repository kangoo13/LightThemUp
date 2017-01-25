var mongoose    = require('mongoose');
var bcrypt      = require('bcrypt-nodejs');
var Schema      = mongoose.Schema;

var userSchema = mongoose.Schema({
  admin: { type: Boolean, default: false, select: false },
  email        : { type: String },
  password     : { type: String , select: false},
  name : { type: String },
  picture : { type: String, default: "uploads/avatar/default-avatar.png" },
  address : { type: String },
  description : { type: String },
  city : { type: String },
  country : { type: String },
  paymentId : { type: String },
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
  if (user.isModified('password')) {
    if (!/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{4,12}$/.test(this.password)) {
      var error = new Error("Invalid password")
      return next(error);
    }
  }
  if (user.isModified('email')) {
    if (!/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(this.email)) {
      var error = new Error("Invalid email")
      return next(error);
    }
  }

  if (!user.isModified('password')) return next();
  bcrypt.hash(user.password, null, null, function (err, hash) {
    if (err) return next(err);

    // change the password to the hashed version
    user.password = hash;
    next();
  });
});

userSchema.methods.comparePassword = function(password) {
  var user = this;
  return bcrypt.compareSync(password, user.password);
};

userSchema.methods.isAdmin = function(){
  return this.admin;
}


module.exports = mongoose.model('User', userSchema);
