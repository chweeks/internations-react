var React = require('react');
var Store = require('./Store.js');
var actions = require('./actions.js');

var GroupsList = React.createClass({
  getInitialState: function() {
    return {
      groups: Store.getGroups(),
      users: Store.getUsers(),
      newGroup: ""
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
      groups: Store.getGroups(),
      users: Store.getUsers()
    });
  },

  updateNewGroup: function(event) {
    this.setState({
      newGroup: event.target.value
    })
  },

  addGroup: function(event) {
    event.preventDefault();
    var input = this.refs.newGroup;
    actions.addGroup(input.value);
    this.setState({
      newGroup: ''
    })
  },

  deleteGroup: function(group) {
    actions.deleteGroup(group);
  },

  renderGroupMembers: function(groupMember, i) {
    return(
      <div className='groupMember' key={i}>
        {groupMember}
      </div>
    );
  },

  renderGroups: function(group) {
    return (
      <div className='groupContainer' key={group.id}>
        <div>
          <h3>{group.name}</h3>
        </div>
        <div className='groupMembers'>
          {group.members.map(this.renderGroupMembers)}
        </div>
        <button onClick={this.deleteGroup.bind(this, group)}>Delete Group</button>
      </div>
    );
  },

	render: function() {
    return(
      <div>
        <div className="form">
          <h1>Add New Group</h1>
          <form onSubmit={this.addGroup}>
            <input type="text" ref="newGroup" placeholder="Group Name"
              value={this.state.newGroup} onChange={this.updateNewGroup}/>
          </form>
        </div>
        <div className="groupsContainer">
          {this.state.groups.map(this.renderGroups)}
        </div>
      </div>
    );
	}

});

module.exports = GroupsList;
