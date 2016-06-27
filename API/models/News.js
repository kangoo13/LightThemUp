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

NewsSchema.pre('save', function(next) {
    this.updated_at = Date.now();
    next();
});

module.exports = mongoose.model('News', NewsSchema);