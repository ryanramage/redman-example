var React = require('react')
var Header = require('./Header.jsx')

module.exports = React.createClass({
  'displayName': 'BlankPage.jsx',
  render: function () {
    var title = 'This page is under construction'

    var header = <Header title={title} />
    return <div className='Page'>
      {header}
    </div>
  }
})
