 module.exports = function (app) {
 	/* API ROUTING */
 	app.use('/achievements', require('./routes/api/achievements'));
 	app.use('/news', require('./routes/api/news'));
 	app.use('/songs', require('./routes/api/songs'));
 	app.use('/playlists', require('./routes/api/playlists'));
 	app.use('/users', require('./routes/api/users'));
 	app.use('/contact', require('./routes/api/contact'));
 	app.use('/comments', require('./routes/api/comments'));
 	app.use('/token', require('./routes/api/token'));
 };
