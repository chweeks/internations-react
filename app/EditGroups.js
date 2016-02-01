var React = require('react');
var Store = require('./Store.js');
var actions = require('./actions.js');

var EditGroups = React.createClass({
  getInitialState: function() {
    return {
      users: Store.getUsers(),
      groups: Store.getGroups(),
      user: ""
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

  updateUser: function(event) {
    this.setState({
     user: event.target.value
    })
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

  addUserToGroup: function(event) {
    event.preventDefault();
    var userName = this.refs.user.value;
    var selectedGroup = this.refs.selectedGroup.value;
    actions.addUserToGroup(userName, selectedGroup);
    this.setState({
      user: ''
    })
  },

  kickUserFromGroup: function() {
    var userName = this.refs.user.value;
    var selectedGroup = this.refs.selectedGroup.value;
    actions.kickUserFromGroup(userName, selectedGroup);
    this.setState({
      user: ''
    })
  },

  render: function() {
    return(
      <div className="form">
        <h1>Edit Groups</h1>
        <input type="text" ref="user" placeholder="User Name"
          value={this.state.user} onChange={this.updateUser}/>
        <select name='groups' ref="selectedGroup" defaultValue="">
          <option value="">Please select a group...</option>
          {this.state.groups.map(this.renderGroupDropDown)}
        </select>
        <div>
          <button onClick={this.addUserToGroup}>Add To Group</button>
          <button onClick={this.kickUserFromGroup}>Remove From Group</button>
        </div>
      </div>
    );
  }

});

module.exports = EditGroups;
