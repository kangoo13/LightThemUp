/**
 * Created by aurelienschiltz on 05/04/2016.
 */

var mongoose    = require('mongoose');
var async       = require('async');
var Song        = require('./Song.js');


var PlaylistSongSchema = new mongoose.Schema({
    idPlaylist: String,
    idSong: String,
    created_at: { type: Date, default: Date.now },
    updated_at: { type: Date, default: Date.now },
});

PlaylistSongSchema.pre('save', function(next) {
    this.updated_at = Date.now();
    next();
});

PlaylistSongSchema.statics.findSongsByPlaylistId = function(id, done) {
    this.find({idPlaylist: id}, function(err, songs) {
        if (err) {
            done(err)
            return
        }
        var getSongsFns = songs.map(function(song) {
            return function(callback) {
                Song.find({_id: song.idSong}, callback)
            }
        })
        console.log(getSongsFns);
        async.parallel(getSongsFns, done)
    })
}

module.exports = mongoose.model('PlaylistSong', PlaylistSongSchema);