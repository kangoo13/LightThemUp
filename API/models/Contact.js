var mongoose = require('mongoose');

var ContactSchema = new mongoose.Schema({
	name: String,
	email: String,
	message: String,
	remoteIp: String
},
{
	timestamps: true
});

module.exports = mongoose.model('Contact', ContactSchema);