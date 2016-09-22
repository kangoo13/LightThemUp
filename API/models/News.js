 var mongoose = require('mongoose');
 var Schema   = mongoose.Schema;

 var NewsSchema = new mongoose.Schema({
 	name: String,
 	description: String,
 	picture: { type: String, default: "uploads/news/default-news.jpg" },
 	author: String,
 	comments: [{type: Schema.Types.ObjectId, ref: 'Comment'}],
 	slug: String
 },
 {
 	timestamps: true
 });

 module.exports = mongoose.model('News', NewsSchema);