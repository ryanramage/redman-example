var React = require('react')
var DOM = React.DOM
var div = DOM.div
if (!process.browser) {
  require('node-jsx').install({ 'extension': '.jsx' })
}
var insomorphic_utils = require('isomorphic-react-boot/lib/utils')
var Page = require('../jsx/Page.jsx')

module.exports = React.createClass({
  getInitialState: function () {
    return insomorphic_utils.getInitialState(React, this.props)
  },
  render: function () {
    return div({'className': this.state.className, 'id': this.state.domId},
      insomorphic_utils.getBundleLink(React, this.props),
      React.createElement(Page, {})
    )
  }
})
