var path = require('path')
var Hapi = require('hapi')
var seaportautopilot = require('seaport-autopilot')
var React = require('react')
var ReactDOM = require('react-dom/server')
var isomorphic = require('isomorphic-react-boot')
var Widget = React.createFactory(require('./Widget'))
var config = require('config')
var version = require('version-route')(path.resolve(__dirname, '..'))
var about = require('../package.json')
var widget_path = about.name.replace(/^widget-/, '')

exports.start = function () {
  seaportautopilot(widget_path + '@' + about.version, config.seaportautopilot, function (err, port, pathname) {
    if (err) return console.log('could not bind', err)
    var relative = require('redman-relative-urls')({
      widget_path: pathname
    })

    var server = new Hapi.Server()
    server.connection({ 'port': port })
    server.route(version)
    server.route({
      method: 'GET',
      path: '/',
      handler: function (req, reply) {
        var props = relative(req, {
          asset_url: '/static'
        })
        isomorphic(about.name, props, ReactDOM, Widget, reply)
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
    server.start()
  })
}
