var React = require('react');
var Store = require('./Store.js');
var actions = require('./actions.js');

var App = React.createClass({
  getInitialState: function() {
    return {
      users: Store.getUsers(),
      newUser: ""
    };
  },

  renderUsers: function(user) {
    return (
      <div key={user.id}>{user.name}</div>
    );
  },

  updateNewUser: function(event) {
    this.setState({
      newUser: event.target.value
    })
  },

	render: function() {
    return(
      <div>
        <h1>Add New User</h1>
        <form>
          <input type="text" placeholder="User Name" value={this.state.newUser}
            onChange={this.updateNewUser}/>
        </form>
        {this.state.users.map(this.renderUsers)}
      </div>
    );
	}

});

module.exports = App;
