(function() {
  var livereload;

  livereload = require('./lib/livereload');

  module.exports = function(app, config) {
    var server;
    if (config == null) {
      config = {};
    }
    if (app.settings.env === 'production') {
      return app.locals.LRScript = "";
    } else {
      app.locals.LRScript = "<script>document.write('<script src=\"http://' + (location.host || 'localhost').split(':')[0] + ':" + (config.port || 35729) + "/livereload.js\"></' + 'script>')</script>";
      server = livereload.createServer(config);
      return server.watch(config.watchDir || process.cwd() + "/public");
    }
  };

}).call(this);