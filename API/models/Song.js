/**
 * Created by Kangoo13 on 15/10/2015.
 */
var mongoose = require('mongoose');
var Schema   = mongoose.Schema;


var SongSchema = new mongoose.Schema({
    name: String,
    artist: String,
    picture: String,
    price: Number,
    file: String,
    preview: String,
    slug: String,
    difficulty: { type: Number, default: 0},
    bought:  { type: Number, default: 0},
    comments: [{type: Schema.Types.ObjectId, ref: 'Comment'}]
    },
    {
        timestamps: true
    });



module.exports = mongoose.model('Song', SongSchema);