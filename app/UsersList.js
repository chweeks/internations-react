var React = require('react');
var Store = require('./Store.js');
var actions = require('./actions.js');

var UsersList = React.createClass({
  getInitialState: function() {
    return {
      users: Store.getUsers(),
      groups: Store.getGroups(),
      newUser: ""
    };
  },

  componentWillMount: function() {
    Store.addChangeListener(this.changeState);
  },

  componentWillUnmount: function () {
    Store.removeChangeListener(this.changeState);
  },

  changeState: function() {
    this.setState({
      users: Store.getUsers(),
      groups: Store.getGroups()
    });
  },

  updateNewUser: function(event) {
    this.setState({
      newUser: event.target.value
    })
  },

  addUser: function(event) {
    event.preventDefault();
    var input = this.refs.newUser;
    actions.addUser(input.value);
    this.setState({
      newUser: ''
    })
  },

  renderGroupDropDown: function(group) {
    return(
      <option key={group.id} value={group.name}>{group.name}</option>
    );
  },

  renderUsers: function(user) {
    return(
      <div key={user.id}>
        {user.name}
      </div>
    );
  },

	render: function() {
    return(
      <div>
        <h1>Add New User</h1>
        <form onSubmit={this.addUser}>
          <input type="text" ref="newUser" placeholder="User Name"
            value={this.state.newUser} onChange={this.updateNewUser}/>
          <select name='groups' defaultValue='InterNations'>
            {this.state.groups.map(this.renderGroupDropDown)}
          </select>
        </form>
        {this.state.users.map(this.renderUsers)}
      </div>
    );
	}

});

module.exports = UsersList;
