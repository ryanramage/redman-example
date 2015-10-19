var React = require('react');

module.exports = React.createClass({

  'displayName': 'Header.jsx',

  render: function() {
    return (
      <div className="Header u-background--primary">
        {this.props.title}
      </div>
    );
  }

});
