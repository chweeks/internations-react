var React = require('react');
var UsersList = require('./UsersList.js');

var App = React.createClass({

	render: function() {
    return(
      <UsersList />
    );
	}

});

module.exports = App;
