/**
 * Created by Kangoo13 on 15/10/2015.
 */
var mongoose = require('mongoose');

var SongSchema = new mongoose.Schema({
    name: String,
    artist: String,
    picture: String,
    price: Number,
    file: String,
    difficulty: Number,
    downloaded: Number,
    created_at: { type: Date, default: Date.now },
    updated_at: { type: Date, default: Date.now }
});

SongSchema.pre('save', function(next) {
    this.updated_at = Date.now();
    next();
});


module.exports = mongoose.model('Song', SongSchema);