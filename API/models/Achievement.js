var mongoose = require('mongoose');

var AchievementSchema = new mongoose.Schema({
    name: String,
    description: String,
    picture: String
},
    {
        timestamps: true
    });

module.exports = mongoose.model('Achievement', AchievementSchema);