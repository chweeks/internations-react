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
    var userName = this.refs.newUser;
    var selectedGroup = this.refs.selectedGroup;
    actions.addUser(userName.value, selectedGroup.value);
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

  renderGroups: function(userGroup, i) {
    return(
      <div className='UserGroup' key={i}>
        {userGroup}
      </div>
    );
  },

  renderUsers: function(user) {
    return(
      <div className="userContainer" key={user.id}>
        <div>
          <h3>{user.name}</h3>
        </div>
        <div>
          <h4>Groups:</h4>
          {user.groups.map(this.renderGroups)}
        </div>
        <button className='delete' onClick={this.deleteUser.bind(this, user)}>
          Delete User
        </button>
      </div>
    );
  },

	render: function() {
    return(
      <div className="userList">
        <div className="form">
          <h1>Add New User</h1>
          <form onSubmit={this.addUser}>
            <input type="text" ref="newUser" placeholder="User Name"
              value={this.state.newUser} onChange={this.updateNewUser}/>
            <select name='groups' ref="selectedGroup" defaultValue="">
              <option value="">Please select a group...</option>
              {this.state.groups.map(this.renderGroupDropDown)}
            </select>
          </form>
        </div>
        <div className="usersContainer">
          {this.state.users.map(this.renderUsers)}
        </div>
      </div>
    );
	}

});

module.exports = UsersList;
