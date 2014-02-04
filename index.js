var
  util = require('util'),
  path = require('path'),
  useragent = require('ua-parser-js'),
  fs = require('fs'),

  joolaio = require('joola.io.sdk');

module.exports = function (options) {
  options = util._extend({
    readKey: null,
    writeKey: null,
    endPoint: '/analytics',
    host: 'http://reflect.io:8080',
    engine: {
      debug: {
        enabled: false,
        level: 'warn'
      }
    }
  }, options);

  var joola_ready = false;

  joolaio.init(joolaio.common.extend({
    host: options.host,
    APIToken: options.writeKey
  }, options.engine), function (err, result) {
    if (err)
      return console.error('Failed to initialize joola.io', err);

    joola_ready = true;
  });

  return function (req, res, next) {
    if (!joola_ready)
      return next();

    var parser = new useragent();
    parser.setUA(req.header('user-agent'));
    var start = new Date(),
      method = req.method,
      url = req.url || '-',
      referer = req.header('referer') || '-',
      ua = parser.getResult(),
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
        statusCode: status,
        httpVersion: httpVersion,
        referer: referer,
        url: url,
        method: method,
        ua: ua,
        ip: ip,
        duration: duration,
        requests: 1
      };

      joolaio.beacon.insert('expressanalytics', message, function (err) {
        if (err)
          return console.error('Failed to save beacon message', err);
      });
    });

    if (req.url === options.endPoint) {
      return res.render(path.join(__dirname, '/content/views/analytics'), {readKey: options.readKey});
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