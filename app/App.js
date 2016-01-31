var React = require('react');
var Store = require('./Store.js');
var actions = require('./actions.js');

var App = React.createClass({
	render: function() {
    return(
      <div>
        <h1>Add New User</h1>
        <form>
          <input type="text" placeholder="User Name" />
        </form>
      </div>
    );
	}

});

module.exports = App;
