var React = require('react')
var ReactDOM = require('react-dom')
var Widget = React.createFactory(require('./Widget'))

module.exports = function (initalState, domId) {
  var r = ReactDOM.render(Widget(initalState), document.getElementById(domId).parentNode)
  return r
}
