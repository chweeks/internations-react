var React = require('react');
var UsersList = require('./UsersList.js');
var GroupsList = require('./GroupsList.js')
var EditGroups = require('./EditGroups.js')

var App = React.createClass({

	render: function() {
    return(
      <div className="container">
        <div className="listContainer">
          <UsersList />
          <GroupsList />
        </div>
        <EditGroups />
      </div>
    );
	}

});

module.exports = App;
