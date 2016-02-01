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
    var userName = this.refs.newUser.value;
    var selectedGroup = this.refs.selectedGroup.value;
    actions.addUser(userName, selectedGroup);
    this.setState({
      newUser: ''
    })
  },

  deleteUser: function(user) {
    actions.deleteUser(user);
  },

  renderGroupDropDown: function(group) {
    return(
      <option key={group.id} value={group.name}>{group.name}</option>
    );
  },

  renderUsers: function(user) {
    return(
      <div key={user.id}>
        {user.name}:{user.groups}
        <button onClick={this.deleteUser.bind(this, user)}></button>
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
          <select name='groups' ref="selectedGroup" defaultValue="">
            <option value="">Please select a group...</option>
            {this.state.groups.map(this.renderGroupDropDown)}
          </select>
        </form>
        {this.state.users.map(this.renderUsers)}
      </div>
    );
	}

});

module.exports = UsersList;
