var path = require('path'),
    Hapi = require('hapi'),
    seaport = require('seaport'),
    React = require('react'),
    boot = require('widget-boot'),
    WidgetHolder = React.createFactory(require('./WidgetHolder')),
    config = require('config'),
    version = require('version-route')(path.resolve(__dirname, '..')),
    about = require('../package.json'),
    widget_path = about.name.replace(/^widget-/, '');

exports.start = function(){
  var ports = seaport.connect('localhost', 5001);
  var server = new Hapi.Server(ports.register(widget_path + '@' + about.version))

  server.route(version);
  server.route({
    method: 'GET',
    path: '/',
    handler: function(req, reply) {
      boot.load_settings(config.settings_db, req.query, req.headers.host, function(err, settings){
        var props = boot.relative_urls(req, widget_path, '/widget-proxy',  {
          asset_url: '/static'
        })
        boot.react(about.name, props, React, WidgetHolder, reply);
      });

    }
  })
  server.route({
      method: 'GET',
      path: '/static/{path*}',
      handler: {
        directory: {
          path: path.resolve(__dirname, '../static')
        }
      }
  })


  server.start();
};



