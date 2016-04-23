/**
 * Created by Kangoo13 on 15/10/2015.
 */
var mongoose = require('mongoose');

var AchievementUserSchema = new mongoose.Schema({
    idAchievement: String,
    idUser: String,
    created_at: { type: Date, default: Date.now },
    updated_at: { type: Date, default: Date.now },
});

AchievementUserSchema.pre('save', function(next) {
    this.updated_at = Date.now();
    next();
});

module.exports = mongoose.model('AchievementUser', AchievementUserSchema);