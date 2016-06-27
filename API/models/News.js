/**
 * Created by Kangoo13 on 15/10/2015.
 */
var mongoose = require('mongoose');

var NewsSchema = new mongoose.Schema({
    name: String,
    description: String,
    picture: String,
    author: String,
    slug: String
},
    {
        timestamps: true
    });



module.exports = mongoose.model('News', NewsSchema);