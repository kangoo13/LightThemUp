var mongoose    = require('mongoose');
var Schema      = mongoose.Schema;

var PlaylistSchema = new mongoose.Schema({
  name: String,
  created_by: String,
  slug: String,
  songs: [{type: Schema.Types.ObjectId, ref: 'Song'}]
},
{
  timestamps: true
});

module.exports = mongoose.model('Playlist', PlaylistSchema);
