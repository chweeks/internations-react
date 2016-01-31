var React = require('react');
var Store = require('./Store.js');
var actions = require('./actions.js');

var App = React.createClass({
  getInitialState: function() {
    return {
      users: Store.getUsers()
    };
  },

	render: function() {
    return(
      <div>
        <h1>Add New User</h1>
        <form>
          <input type="text" placeholder="User Name" />
        </form>
        {this.state.users}
      </div>
    );
	}

});

module.exports = App;
