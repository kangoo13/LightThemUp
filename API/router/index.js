/**
 * Created by Kangoo13 on 15/10/2015.
 */

module.exports = function (app) {
    /* API ROUTING */
    app.use('/achievements', require('./routes/api/achievements'));
    app.use('/news', require('./routes/api/news'));
    app.use('/songs', require('./routes/api/songs'));
    app.use('/playlists', require('./routes/api/playlists'));
    app.use('/playlistsong', require('./routes/api/playlistsong'));
    app.use('/users', require('./routes/api/users'));
};


