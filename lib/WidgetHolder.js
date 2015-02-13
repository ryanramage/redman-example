var React = require('react'),
    DOM = React.DOM,
    div = DOM.div,
    widgetHolderMixin = require('widget-boot/lib/widgetHolderMixin')(React);


module.exports = React.createClass({

  mixins: [widgetHolderMixin],

  render: function() {
    return div({'className': this.state.className, 'id': this.state.domId},
      this.getBundleLink() // from widgetHolderMixin
    )
  },
})
