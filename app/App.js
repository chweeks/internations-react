var React = require('react');
var UsersList = require('./UsersList.js');
var GroupsList = require('./GroupsList.js')
var EditGroups = require('./EditGroups.js')

var App = React.createClass({

	render: function() {
    return(
      <div>
        <UsersList />
        <GroupsList />
        <EditGroups />
      </div>
    );
	}

});

module.exports = App;
