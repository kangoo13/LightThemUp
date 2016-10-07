'use strict';

module.exports = function(app) {
  app.get('/admin', function(req, res) {
    res.sendfile("public/admin.html");
  });

  app.get('*', function(req, res) {
    res.sendfile("public/index.html");
  });
};
