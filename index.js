var
  util = require('util'),
  path = require('path'),
  useragent = require('useragent'),
  fs = require('fs'),

  joolaio = require('joola.io.sdk');

module.exports = function (options) {
  options = util._extend({
    host: 'http://localhost:8080',
    debug: {
      enabled: true,
      level: 'warn'
    }
  }, options);

  var joola_ready = false;

  joolaio.init(options, function (err, result) {
    if (err)
      return console.error('Failed to initialize joola.io', err);

    joola_ready = true;
  });

  return function (req, res, next) {
    if (!joola_ready)
      return next();
    var start = new Date(),
      method = req.method,
      url = req.url || '-',
      referer = req.header('referer') || '-',
      ua = useragent.parse(req.header('user-agent')),
      httpVersion = req.httpVersionMajor + '.' + req.httpVersionMinor,
      ip = ip || req.ip || req.connection.remoteAddress ||
        (req.socket && req.socket.remoteAddress) ||
        (req.socket.socket && req.socket.socket.remoteAddresss) ||
        '127.0.0.1';

    if (res._analytics)
      return next();
    res._analytics = true;

    res.on('header', function () {
      var duration = new Date() - start;

      var status = res.statusCode;

      var message = {
        timestamp: null,
        statusCode: status.toString(),
        httpVersion: httpVersion,
        referer: referer,
        url: url,
        method: method,
        ua: ua.source,
        browser: ua.family,
        os: ua.os.family,
        device: ua.device.family,
        ip: ip,
        duration: duration,
        requests: 1
      };

      joolaio.beacon.insert('expressanalytics', message, function (err) {
        if (err)
          return console.error('Failed to save beacon message', err);

        console.log('saved beacon', message);
      });
    });

    if (req.url === '/analytics') {
      return res.render(path.join(__dirname, '/content/views/analytics'));
    }
    else if (req.url === '/express.analytics.js') {
      fs.readFile(path.join(__dirname, 'node_modules/joola.io.sdk/bin/joola.io.js'), function (err, data) {
        if (err)
          return next(err);

        fs.readFile(path.join(__dirname, 'content/js/analytics.js'), function (err, jsdata) {
          if (err)
            return next(err);

          res.end(data + '\n' + jsdata);
        });
      });
    }
    else if (req.url === '/express.analytics.css') {
      fs.readFile(path.join(__dirname, 'content/css/analytics.css'), function (err, data) {
        if (err)
          return next(err);

        res.end(data);
      });
    }
    else {
      return next(null);
    }
  };

};

/*
 module.exports = function (opts) {
 //console.log(opts);

 var options = {
 host: 'http://localhost:8080'
 };

 joolaio.init(options, function (err, result) {
 if (err)
 throw err;
 joolaio.users.authenticate('admin', 'password', function (err, token) {
 //joolaio.TOKEN = token._;

 console.log('joola is ready');

 //joola.io is now ready for work, event `core.ready` is emitted
 });
 });

 return function (req, res, next) {
 console.log('aaaa');
 };
 };

 */