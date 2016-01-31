var React = require('react');
var UsersList = require('./UsersList.js');
var GroupsList = require('./GroupsList.js')

var App = React.createClass({

	render: function() {
    return(
      <div>
        <UsersList />
        <GroupsList />
      </div>
    );
	}

});

module.exports = App;
