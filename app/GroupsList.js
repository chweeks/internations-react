var React = require('react');
var Store = require('./Store.js');
var actions = require('./actions.js');

var GroupsList = React.createClass({
  getInitialState: function() {
    return {
      groups: Store.getGroups(),
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
      groups: Store.getGroups()
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

  renderGroups: function(group) {
    return (
      <div key={group.id}>{group.name}</div>
    );
  },

	render: function() {
    return(
      <div>
        <h1>Add New Group</h1>
        <form onSubmit={this.addGroup}>
          <input type="text" ref="newGroup" placeholder="Group Name"
            value={this.state.newGroup} onChange={this.updateNewGroup}/>
        </form>
        {this.state.groups.map(this.renderGroups)}
      </div>
    );
	}

});

module.exports = GroupsList;
