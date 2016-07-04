var mongoose = require('mongoose');
var Schema   = mongoose.Schema;

var CommentSchema = new mongoose.Schema({
	author: {type: Schema.Types.ObjectId, ref: 'User'},
	message: String
},
{
	timestamps: true
});

module.exports = mongoose.model('Comment', CommentSchema);