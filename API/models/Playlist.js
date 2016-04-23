/**
 * Created by Kangoo13 on 15/10/2015.
 */
var mongoose = require('mongoose');

var PlaylistSchema = new mongoose.Schema({
    name: String,
    created_by: String,
    created_at: { type: Date, default: Date.now },
    updated_at: { type: Date, default: Date.now },
});

PlaylistSchema.pre('save', function(next) {
    this.updated_at = Date.now();
    next();
});


module.exports = mongoose.model('Playlist', PlaylistSchema);