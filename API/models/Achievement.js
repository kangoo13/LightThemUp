var mongoose = require('mongoose');

var AchievementSchema = new mongoose.Schema({
	name: String,
	description: String,
	picture: {type: String, default: "uploads/achievements/default-achievement.png"}
},
{
	timestamps: true
});

module.exports = mongoose.model('Achievement', AchievementSchema);