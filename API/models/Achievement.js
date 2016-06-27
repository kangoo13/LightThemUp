/**
 * Created by Kangoo13 on 15/10/2015.
 */
var mongoose = require('mongoose');

var AchievementSchema = new mongoose.Schema({
    name: String,
    description: String,
    picture: String
},
    {
        timestamps: true
    });

AchievementSchema.pre('save', function(next) {
    this.updated_at = Date.now();
    next();
});

module.exports = mongoose.model('Achievement', AchievementSchema);