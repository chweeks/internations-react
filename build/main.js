(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({"/home/chweeks/Desktop/projects/internations-react/app/App.js":[function(require,module,exports){
'use strict';

var React = require('react');
var UsersList = require('./UsersList.js');
var GroupsList = require('./GroupsList.js');
var EditGroups = require('./EditGroups.js');

var App = React.createClass({
  displayName: 'App',

  render: function render() {
    return React.createElement(
      'div',
      { className: 'container' },
      React.createElement(
        'div',
        { className: 'listContainer' },
        React.createElement(UsersList, null),
        React.createElement(GroupsList, null)
      ),
      React.createElement(EditGroups, null)
    );
  }

});

module.exports = App;

},{"./EditGroups.js":"/home/chweeks/Desktop/projects/internations-react/app/EditGroups.js","./GroupsList.js":"/home/chweeks/Desktop/projects/internations-react/app/GroupsList.js","./UsersList.js":"/home/chweeks/Desktop/projects/internations-react/app/UsersList.js","react":"react"}],"/home/chweeks/Desktop/projects/internations-react/app/EditGroups.js":[function(require,module,exports){
'use strict';

var React = require('react');
var Store = require('./Store.js');
var actions = require('./actions.js');

var EditGroups = React.createClass({
  displayName: 'EditGroups',

  getInitialState: function getInitialState() {
    return {
      users: Store.getUsers(),
      groups: Store.getGroups(),
      user: ""
    };
  },

  componentWillMount: function componentWillMount() {
    Store.addChangeListener(this.changeState);
  },

  componentWillUnmount: function componentWillUnmount() {
    Store.removeChangeListener(this.changeState);
  },

  changeState: function changeState() {
    this.setState({
      users: Store.getUsers(),
      groups: Store.getGroups()
    });
  },

  updateUser: function updateUser(event) {
    this.setState({
      user: event.target.value
    });
  },

  renderGroupDropDown: function renderGroupDropDown(group) {
    return React.createElement(
      'option',
      { key: group.id, value: group.name },
      group.name
    );
  },

  renderGroups: function renderGroups(userGroup, i) {
    return React.createElement(
      'div',
      { className: 'UserGroup', key: i },
      userGroup
    );
  },

  addUserToGroup: function addUserToGroup(event) {
    event.preventDefault();
    var userName = this.refs.user.value;
    var selectedGroup = this.refs.selectedGroup.value;
    actions.addUserToGroup(userName, selectedGroup);
    this.setState({
      user: ''
    });
  },

  kickUserFromGroup: function kickUserFromGroup() {
    var userName = this.refs.user.value;
    var selectedGroup = this.refs.selectedGroup.value;
    actions.kickUserFromGroup(userName, selectedGroup);
    this.setState({
      user: ''
    });
  },

  render: function render() {
    return React.createElement(
      'div',
      { className: 'editForm' },
      React.createElement(
        'h1',
        null,
        'Edit Groups'
      ),
      React.createElement('input', { type: 'text', ref: 'user', placeholder: 'User Name',
        value: this.state.user, onChange: this.updateUser }),
      React.createElement(
        'select',
        { name: 'groups', ref: 'selectedGroup', defaultValue: '' },
        React.createElement(
          'option',
          { value: '' },
          'Please select a group...'
        ),
        this.state.groups.map(this.renderGroupDropDown)
      ),
      React.createElement(
        'div',
        null,
        React.createElement(
          'button',
          { className: 'addUserBtn', onClick: this.addUserToGroup },
          'Add To Group'
        ),
        React.createElement(
          'button',
          { className: 'removeUserBtn', onClick: this.kickUserFromGroup },
          'Remove From Group'
        )
      )
    );
  }

});

module.exports = EditGroups;

},{"./Store.js":"/home/chweeks/Desktop/projects/internations-react/app/Store.js","./actions.js":"/home/chweeks/Desktop/projects/internations-react/app/actions.js","react":"react"}],"/home/chweeks/Desktop/projects/internations-react/app/GroupsList.js":[function(require,module,exports){
'use strict';

var React = require('react');
var Store = require('./Store.js');
var actions = require('./actions.js');

var GroupsList = React.createClass({
  displayName: 'GroupsList',

  getInitialState: function getInitialState() {
    return {
      groups: Store.getGroups(),
      users: Store.getUsers(),
      newGroup: ""
    };
  },

  componentWillMount: function componentWillMount() {
    Store.addChangeListener(this.changeState);
  },

  componentWillUnmount: function componentWillUnmount() {
    Store.removeChangeListener(this.changeState);
  },

  changeState: function changeState() {
    this.setState({
      groups: Store.getGroups(),
      users: Store.getUsers()
    });
  },

  updateNewGroup: function updateNewGroup(event) {
    this.setState({
      newGroup: event.target.value
    });
  },

  addGroup: function addGroup(event) {
    event.preventDefault();
    var input = this.refs.newGroup;
    actions.addGroup(input.value);
    this.setState({
      newGroup: ''
    });
  },

  deleteGroup: function deleteGroup(group) {
    actions.deleteGroup(group);
  },

  renderGroupMembers: function renderGroupMembers(groupMember, i) {
    return React.createElement(
      'div',
      { className: 'groupMember', key: i },
      groupMember
    );
  },

  renderGroups: function renderGroups(group) {
    return React.createElement(
      'div',
      { className: 'groupContainer', key: group.id },
      React.createElement(
        'div',
        null,
        React.createElement(
          'h3',
          null,
          group.name
        )
      ),
      React.createElement(
        'div',
        { className: 'groupMembers' },
        React.createElement(
          'h4',
          null,
          'Members:'
        ),
        group.members.map(this.renderGroupMembers)
      ),
      React.createElement(
        'button',
        { className: 'delete', onClick: this.deleteGroup.bind(this, group) },
        'Delete Group'
      )
    );
  },

  render: function render() {
    return React.createElement(
      'div',
      { className: 'groupList' },
      React.createElement(
        'div',
        { className: 'form' },
        React.createElement(
          'h1',
          null,
          'Add New Group'
        ),
        React.createElement(
          'form',
          { onSubmit: this.addGroup },
          React.createElement('input', { type: 'text', ref: 'newGroup', placeholder: 'Group Name',
            value: this.state.newGroup, onChange: this.updateNewGroup })
        )
      ),
      React.createElement(
        'div',
        { className: 'groupsContainer' },
        this.state.groups.map(this.renderGroups)
      )
    );
  }

});

module.exports = GroupsList;

},{"./Store.js":"/home/chweeks/Desktop/projects/internations-react/app/Store.js","./actions.js":"/home/chweeks/Desktop/projects/internations-react/app/actions.js","react":"react"}],"/home/chweeks/Desktop/projects/internations-react/app/Store.js":[function(require,module,exports){
'use strict';

var flux = require('flux-react');
var actions = require('./actions.js');

module.exports = flux.createStore({
  users: [{ id: 1, name: 'Chris Weeks', groups: ['InterNations', 'Makers Academy', 'Lancaster University'] }],

  groups: [{ id: 1, name: 'InterNations', members: ['Chris Weeks'] }, { id: 2, name: 'Makers Academy', members: ['Chris Weeks'] }, { id: 3, name: 'Lancaster University', members: ['Chris Weeks'] }],

  actions: [actions.addUser, actions.addGroup, actions.addUserToGroup, actions.kickUserFromGroup, actions.deleteUser, actions.deleteGroup],

  getGroupByName: function getGroupByName(name) {
    for (var i = 0; i < this.groups.length; i++) {
      if (this.groups[i].name == name) {
        return this.groups[i];
      }
    };
  },

  getUserByName: function getUserByName(name) {
    for (var i = 0; i < this.users.length; i++) {
      if (this.users[i].name == name) {
        return this.users[i];
      }
    };
  },

  userAlreadyExists: function userAlreadyExists(userName) {
    for (var i = 0; i < this.users.length; i++) {
      if (this.users[i].name == userName) {
        return true;
      }
    }
  },

  groupProvided: function groupProvided(group) {
    if (group == '') {
      return alert('Please select a group');
    }
  },

  isAMember: function isAMember(userName, group) {
    for (var i = 0; i < group.members.length; i++) {
      if (group.members[i] == userName) {
        return true;
      }
    }
  },

  deleteUserFromUsers: function deleteUserFromUsers(user) {
    for (var i = 0; i < this.users.length; i++) {
      if (user.id == this.users[i].id) {
        this.users.splice(i, 1);
      }
    };
  },

  deleteUserFromAllGroups: function deleteUserFromAllGroups(user) {
    for (var i = 0; i < this.groups.length; i++) {
      for (var j = 0; j < this.groups[i].members.length; j++) {
        if (user.name == this.groups[i].members[j]) {
          this.groups[i].members.splice(j, 1);
        }
      }
    };
  },

  deleteUserFromAGroup: function deleteUserFromAGroup(userName, groupName) {
    var group = this.getGroupByName(groupName);
    for (var i = 0; i < group.members.length; i++) {
      if (group.members[i] == userName) {
        group.members.splice(i, 1);
      }
    };
  },

  deleteGroupFromUser: function deleteGroupFromUser(userName, groupName) {
    var user = this.getUserByName(userName);
    for (var i = 0; i < user.groups.length; i++) {
      if (user.groups[i] == groupName) {
        user.groups.splice(i, 1);
      }
    };
  },

  addUser: function addUser(userName, group) {
    if (this.userAlreadyExists(userName)) {
      return alert('That user already exists');
    };
    this.groupProvided(group);
    this.users.push({ id: this.users.length + 1, name: userName, groups: [group] });
    this.getGroupByName(group).members.push(userName);
    this.emitChange();
  },

  addGroup: function addGroup(group) {
    this.groups.push({ id: this.groups.length + 1, name: group, members: [] });
    this.emitChange();
  },

  addUserToGroup: function addUserToGroup(userName, groupName) {
    var group = this.getGroupByName(groupName);
    var user = this.getUserByName(userName);
    this.groupProvided(group);
    if (this.userAlreadyExists(userName) != true) {
      return alert(userName + ' does not exist');
    };
    if (this.isAMember(userName, group)) {
      return alert(userName + ' is already a member of ' + group.name);
    };
    group.members.push(user.name);
    user.groups.push(group.name);
    this.emitChange();
  },

  kickUserFromGroup: function kickUserFromGroup(userName, groupName) {
    this.deleteUserFromAGroup(userName, groupName);
    this.deleteGroupFromUser(userName, groupName);
    this.emitChange();
  },

  deleteUser: function deleteUser(user) {
    this.deleteUserFromUsers(user);
    this.deleteUserFromAllGroups(user);
    this.emitChange();
  },

  deleteGroup: function deleteGroup(group) {
    if (group.members.length == 0) {
      for (var i = 0; i < this.groups.length; i++) {
        if (group.id == this.groups[i].id) {
          this.groups.splice(i, 1);
          this.emitChange();
        }
      };
    } else {
      alert("Can only delete empty groups");
    }
  },

  exports: {
    getUsers: function getUsers() {
      return this.users;
    },
    getGroups: function getGroups() {
      return this.groups;
    }
  }
});

},{"./actions.js":"/home/chweeks/Desktop/projects/internations-react/app/actions.js","flux-react":"flux-react"}],"/home/chweeks/Desktop/projects/internations-react/app/UsersList.js":[function(require,module,exports){
'use strict';

var React = require('react');
var Store = require('./Store.js');
var actions = require('./actions.js');

var UsersList = React.createClass({
  displayName: 'UsersList',

  getInitialState: function getInitialState() {
    return {
      users: Store.getUsers(),
      groups: Store.getGroups(),
      newUser: ""
    };
  },

  componentWillMount: function componentWillMount() {
    Store.addChangeListener(this.changeState);
  },

  componentWillUnmount: function componentWillUnmount() {
    Store.removeChangeListener(this.changeState);
  },

  changeState: function changeState() {
    this.setState({
      users: Store.getUsers(),
      groups: Store.getGroups()
    });
  },

  updateNewUser: function updateNewUser(event) {
    this.setState({
      newUser: event.target.value
    });
  },

  addUser: function addUser(event) {
    event.preventDefault();
    var userName = this.refs.newUser;
    var selectedGroup = this.refs.selectedGroup;
    actions.addUser(userName.value, selectedGroup.value);
    this.setState({
      newUser: ''
    });
  },

  deleteUser: function deleteUser(user) {
    actions.deleteUser(user);
  },

  renderGroupDropDown: function renderGroupDropDown(group) {
    return React.createElement(
      'option',
      { key: group.id, value: group.name },
      group.name
    );
  },

  renderGroups: function renderGroups(userGroup, i) {
    return React.createElement(
      'div',
      { className: 'UserGroup', key: i },
      userGroup
    );
  },

  renderUsers: function renderUsers(user) {
    return React.createElement(
      'div',
      { className: 'userContainer', key: user.id },
      React.createElement(
        'div',
        null,
        React.createElement(
          'h3',
          null,
          user.name
        )
      ),
      React.createElement(
        'div',
        null,
        React.createElement(
          'h4',
          null,
          'Groups:'
        ),
        user.groups.map(this.renderGroups)
      ),
      React.createElement(
        'button',
        { className: 'delete', onClick: this.deleteUser.bind(this, user) },
        'Delete User'
      )
    );
  },

  render: function render() {
    return React.createElement(
      'div',
      { className: 'userList' },
      React.createElement(
        'div',
        { className: 'form' },
        React.createElement(
          'h1',
          null,
          'Add New User'
        ),
        React.createElement(
          'form',
          { onSubmit: this.addUser },
          React.createElement('input', { type: 'text', ref: 'newUser', placeholder: 'User Name',
            value: this.state.newUser, onChange: this.updateNewUser }),
          React.createElement(
            'select',
            { name: 'groups', ref: 'selectedGroup', defaultValue: '' },
            React.createElement(
              'option',
              { value: '' },
              'Please select a group...'
            ),
            this.state.groups.map(this.renderGroupDropDown)
          )
        )
      ),
      React.createElement(
        'div',
        { className: 'usersContainer' },
        this.state.users.map(this.renderUsers)
      )
    );
  }

});

module.exports = UsersList;

},{"./Store.js":"/home/chweeks/Desktop/projects/internations-react/app/Store.js","./actions.js":"/home/chweeks/Desktop/projects/internations-react/app/actions.js","react":"react"}],"/home/chweeks/Desktop/projects/internations-react/app/actions.js":[function(require,module,exports){
'use strict';

var flux = require('flux-react');

module.exports = flux.createActions(['addUser', 'addGroup', 'addUserToGroup', 'kickUserFromGroup', 'deleteUser', 'deleteGroup']);

},{"flux-react":"flux-react"}],"/home/chweeks/Desktop/projects/internations-react/app/main.js":[function(require,module,exports){
'use strict';

var React = require('react');
var App = require('./App.js');

React.render(React.createElement(App, null), document.getElementById("content"));

},{"./App.js":"/home/chweeks/Desktop/projects/internations-react/app/App.js","react":"react"}]},{},["/home/chweeks/Desktop/projects/internations-react/app/main.js"])
//# sourceMappingURL=data:application/json;charset:utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9icm93c2VyaWZ5L25vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCIvaG9tZS9jaHdlZWtzL0Rlc2t0b3AvcHJvamVjdHMvaW50ZXJuYXRpb25zLXJlYWN0L2FwcC9BcHAuanMiLCIvaG9tZS9jaHdlZWtzL0Rlc2t0b3AvcHJvamVjdHMvaW50ZXJuYXRpb25zLXJlYWN0L2FwcC9FZGl0R3JvdXBzLmpzIiwiL2hvbWUvY2h3ZWVrcy9EZXNrdG9wL3Byb2plY3RzL2ludGVybmF0aW9ucy1yZWFjdC9hcHAvR3JvdXBzTGlzdC5qcyIsIi9ob21lL2Nod2Vla3MvRGVza3RvcC9wcm9qZWN0cy9pbnRlcm5hdGlvbnMtcmVhY3QvYXBwL1N0b3JlLmpzIiwiL2hvbWUvY2h3ZWVrcy9EZXNrdG9wL3Byb2plY3RzL2ludGVybmF0aW9ucy1yZWFjdC9hcHAvVXNlcnNMaXN0LmpzIiwiL2hvbWUvY2h3ZWVrcy9EZXNrdG9wL3Byb2plY3RzL2ludGVybmF0aW9ucy1yZWFjdC9hcHAvYWN0aW9ucy5qcyIsIi9ob21lL2Nod2Vla3MvRGVza3RvcC9wcm9qZWN0cy9pbnRlcm5hdGlvbnMtcmVhY3QvYXBwL21haW4uanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7OztBQ0FBLElBQUksS0FBSyxHQUFHLE9BQU8sQ0FBQyxPQUFPLENBQUMsQ0FBQztBQUM3QixJQUFJLFNBQVMsR0FBRyxPQUFPLENBQUMsZ0JBQWdCLENBQUMsQ0FBQztBQUMxQyxJQUFJLFVBQVUsR0FBRyxPQUFPLENBQUMsaUJBQWlCLENBQUMsQ0FBQTtBQUMzQyxJQUFJLFVBQVUsR0FBRyxPQUFPLENBQUMsaUJBQWlCLENBQUMsQ0FBQTs7QUFFM0MsSUFBSSxHQUFHLEdBQUcsS0FBSyxDQUFDLFdBQVcsQ0FBQzs7O0FBRTNCLFFBQU0sRUFBRSxrQkFBVztBQUNoQixXQUNFOztRQUFLLFNBQVMsRUFBQyxXQUFXO01BQ3hCOztVQUFLLFNBQVMsRUFBQyxlQUFl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LEFBQUMsRUFBQyxRQUFRLEVBQUUsSUFBSSxDQUFDLGFBQWEsQUFBQyxHQUFFO1VBQzVEOztjQUFRLElBQUksRUFBQyxRQUFRLEVBQUMsR0FBRyxFQUFDLGVBQWUsRUFBQyxZQUFZLEVBQUMsRUFBRTtZQUN2RDs7Z0JBQVEsS0FBSyxFQUFDLEVBQUU7O2FBQWtDO1lBQ2pELElBQUksQ0FBQyxLQUFLLENBQUMsTUFBTSxDQUFDLEdBQUcsQ0FBQyxJQUFJLENBQUMsbUJBQW1CLENBQUM7V0FDekM7U0FDSjtPQUNIO01BQ047O1VBQUssU0FBUyxFQUFDLGdCQUFnQjtRQUM1QixJQUFJLENBQUMsS0FBSyxDQUFDLEtBQUssQ0FBQyxHQUFHLENBQUMsSUFBSSxDQUFDLFdBQVcsQ0FBQztPQUNuQztLQUNGLENBQ047R0FDSjs7Q0FFRCxDQUFDLENBQUM7O0FBRUgsTUFBTSxDQUFDLE9BQU8sR0FBRyxTQUFTLENBQUM7Ozs7O0FDdEczQixJQUFJLElBQUksR0FBRyxPQUFPLENBQUMsWUFBWSxDQUFDLENBQUM7O0FBRWpDLE1BQU0sQ0FBQyxPQUFPLEdBQUcsSUFBSSxDQUFDLGFBQWEsQ0FBQyxDQUNsQyxTQUFTLEVBQ1QsVUFBVSxFQUNWLGdCQUFnQixFQUNoQixtQkFBbUIsRUFDbkIsWUFBWSxFQUNaLGFBQWEsQ0FDZCxDQUFDLENBQUM7Ozs7O0FDVEgsSUFBSSxLQUFLLEdBQUcsT0FBTyxDQUFDLE9BQU8sQ0FBQyxDQUFDO0FBQzdCLElBQUksR0FBRyxHQUFHLE9BQU8sQ0FBQyxVQUFVLENBQUMsQ0FBQzs7QUFFOUIsS0FBSyxDQUFDLE1BQU0sQ0FBQyxvQkFBQyxHQUFHLE9BQUUsRUFBRSxRQUFRLENBQUMsY0FBYyxDQUFDLFNBQVMsQ0FBQyxDQUFDLENBQUMiLCJmaWxlIjoiZ2VuZXJhdGVkLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXNDb250ZW50IjpbIihmdW5jdGlvbiBlKHQsbixyKXtmdW5jdGlvbiBzKG8sdSl7aWYoIW5bb10pe2lmKCF0W29dKXt2YXIgYT10eXBlb2YgcmVxdWlyZT09XCJmdW5jdGlvblwiJiZyZXF1aXJlO2lmKCF1JiZhKXJldHVybiBhKG8sITApO2lmKGkpcmV0dXJuIGkobywhMCk7dmFyIGY9bmV3IEVycm9yKFwiQ2Fubm90IGZpbmQgbW9kdWxlICdcIitvK1wiJ1wiKTt0aHJvdyBmLmNvZGU9XCJNT0RVTEVfTk9UX0ZPVU5EXCIsZn12YXIgbD1uW29dPXtleHBvcnRzOnt9fTt0W29dWzBdLmNhbGwobC5leHBvcnRzLGZ1bmN0aW9uKGUpe3ZhciBuPXRbb11bMV1bZV07cmV0dXJuIHMobj9uOmUpfSxsLGwuZXhwb3J0cyxlLHQsbixyKX1yZXR1cm4gbltvXS5leHBvcnRzfXZhciBpPXR5cGVvZiByZXF1aXJlPT1cImZ1bmN0aW9uXCImJnJlcXVpcmU7Zm9yKHZhciBvPTA7bzxyLmxlbmd0aDtvKyspcyhyW29dKTtyZXR1cm4gc30pIiwidmFyIFJlYWN0ID0gcmVxdWlyZSgncmVhY3QnKTtcbnZhciBVc2Vyc0xpc3QgPSByZXF1aXJlKCcuL1VzZXJzTGlzdC5qcycpO1xudmFyIEdyb3Vwc0xpc3QgPSByZXF1aXJlKCcuL0dyb3Vwc0xpc3QuanMnKVxudmFyIEVkaXRHcm91cHMgPSByZXF1aXJlKCcuL0VkaXRHcm91cHMuanMnKVxuXG52YXIgQXBwID0gUmVhY3QuY3JlYXRlQ2xhc3Moe1xuXG5cdHJlbmRlcjogZnVuY3Rpb24oKSB7XG4gICAgcmV0dXJuKFxuICAgICAgPGRpdiBjbGFzc05hbWU9XCJjb250YWluZXJcIj5cbiAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJsaXN0Q29udGFpbmVyXCI+XG4gICAgICAgICAgPFVzZXJzTGlzdCAvPlxuICAgICAgICAgIDxHcm91cHNMaXN0IC8+XG4gICAgICAgIDwvZGl2PlxuICAgICAgICA8RWRpdEdyb3VwcyAvPlxuICAgICAgPC9kaXY+XG4gICAgKTtcblx0fVxuXG59KTtcblxubW9kdWxlLmV4cG9ydHMgPSBBcHA7XG4iLCJ2YXIgUmVhY3QgPSByZXF1aXJlKCdyZWFjdCcpO1xudmFyIFN0b3JlID0gcmVxdWlyZSgnLi9TdG9yZS5qcycpO1xudmFyIGFjdGlvbnMgPSByZXF1aXJlKCcuL2FjdGlvbnMuanMnKTtcblxudmFyIEVkaXRHcm91cHMgPSBSZWFjdC5jcmVhdGVDbGFzcyh7XG4gIGdldEluaXRpYWxTdGF0ZTogZnVuY3Rpb24oKSB7XG4gICAgcmV0dXJuIHtcbiAgICAgIHVzZXJzOiBTdG9yZS5nZXRVc2VycygpLFxuICAgICAgZ3JvdXBzOiBTdG9yZS5nZXRHcm91cHMoKSxcbiAgICAgIHVzZXI6IFwiXCJcbiAgICB9O1xuICB9LFxuXG4gIGNvbXBvbmVudFdpbGxNb3VudDogZnVuY3Rpb24oKSB7XG4gICAgU3RvcmUuYWRkQ2hhbmdlTGlzdGVuZXIodGhpcy5jaGFuZ2VTdGF0ZSk7XG4gIH0sXG5cbiAgY29tcG9uZW50V2lsbFVubW91bnQ6IGZ1bmN0aW9uICgpIHtcbiAgICBTdG9yZS5yZW1vdmVDaGFuZ2VMaXN0ZW5lcih0aGlzLmNoYW5nZVN0YXRlKTtcbiAgfSxcblxuICBjaGFuZ2VTdGF0ZTogZnVuY3Rpb24oKSB7XG4gICAgdGhpcy5zZXRTdGF0ZSh7XG4gICAgICB1c2VyczogU3RvcmUuZ2V0VXNlcnMoKSxcbiAgICAgIGdyb3VwczogU3RvcmUuZ2V0R3JvdXBzKClcbiAgICB9KTtcbiAgfSxcblxuICB1cGRhdGVVc2VyOiBmdW5jdGlvbihldmVudCkge1xuICAgIHRoaXMuc2V0U3RhdGUoe1xuICAgICB1c2VyOiBldmVudC50YXJnZXQudmFsdWVcbiAgICB9KVxuICB9LFxuXG4gIHJlbmRlckdyb3VwRHJvcERvd246IGZ1bmN0aW9uKGdyb3VwKSB7XG4gICAgcmV0dXJuKFxuICAgICAgPG9wdGlvbiBrZXk9e2dyb3VwLmlkfSB2YWx1ZT17Z3JvdXAubmFtZX0+e2dyb3VwLm5hbWV9PC9vcHRpb24+XG4gICAgKTtcbiAgfSxcblxuICByZW5kZXJHcm91cHM6IGZ1bmN0aW9uKHVzZXJHcm91cCwgaSkge1xuICAgIHJldHVybihcbiAgICAgIDxkaXYgY2xhc3NOYW1lPSdVc2VyR3JvdXAnIGtleT17aX0+XG4gICAgICAgIHt1c2VyR3JvdXB9XG4gICAgICA8L2Rpdj5cbiAgICApO1xuICB9LFxuXG4gIGFkZFVzZXJUb0dyb3VwOiBmdW5jdGlvbihldmVudCkge1xuICAgIGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XG4gICAgdmFyIHVzZXJOYW1lID0gdGhpcy5yZWZzLnVzZXIudmFsdWU7XG4gICAgdmFyIHNlbGVjdGVkR3JvdXAgPSB0aGlzLnJlZnMuc2VsZWN0ZWRHcm91cC52YWx1ZTtcbiAgICBhY3Rpb25zLmFkZFVzZXJUb0dyb3VwKHVzZXJOYW1lLCBzZWxlY3RlZEdyb3VwKTtcbiAgICB0aGlzLnNldFN0YXRlKHtcbiAgICAgIHVzZXI6ICcnXG4gICAgfSlcbiAgfSxcblxuICBraWNrVXNlckZyb21Hcm91cDogZnVuY3Rpb24oKSB7XG4gICAgdmFyIHVzZXJOYW1lID0gdGhpcy5yZWZzLnVzZXIudmFsdWU7XG4gICAgdmFyIHNlbGVjdGVkR3JvdXAgPSB0aGlzLnJlZnMuc2VsZWN0ZWRHcm91cC52YWx1ZTtcbiAgICBhY3Rpb25zLmtpY2tVc2VyRnJvbUdyb3VwKHVzZXJOYW1lLCBzZWxlY3RlZEdyb3VwKTtcbiAgICB0aGlzLnNldFN0YXRlKHtcbiAgICAgIHVzZXI6ICcnXG4gICAgfSlcbiAgfSxcblxuICByZW5kZXI6IGZ1bmN0aW9uKCkge1xuICAgIHJldHVybihcbiAgICAgIDxkaXYgY2xhc3NOYW1lPVwiZWRpdEZvcm1cIj5cbiAgICAgICAgPGgxPkVkaXQgR3JvdXBzPC9oMT5cbiAgICAgICAgPGlucHV0IHR5cGU9XCJ0ZXh0XCIgcmVmPVwidXNlclwiIHBsYWNlaG9sZGVyPVwiVXNlciBOYW1lXCJcbiAgICAgICAgICB2YWx1ZT17dGhpcy5zdGF0ZS51c2VyfSBvbkNoYW5nZT17dGhpcy51cGRhdGVVc2VyfS8+XG4gICAgICAgIDxzZWxlY3QgbmFtZT0nZ3JvdXBzJyByZWY9XCJzZWxlY3RlZEdyb3VwXCIgZGVmYXVsdFZhbHVlPVwiXCI+XG4gICAgICAgICAgPG9wdGlvbiB2YWx1ZT1cIlwiPlBsZWFzZSBzZWxlY3QgYSBncm91cC4uLjwvb3B0aW9uPlxuICAgICAgICAgIHt0aGlzLnN0YXRlLmdyb3Vwcy5tYXAodGhpcy5yZW5kZXJHcm91cERyb3BEb3duKX1cbiAgICAgICAgPC9zZWxlY3Q+XG4gICAgICAgIDxkaXY+XG4gICAgICAgICAgPGJ1dHRvbiBjbGFzc05hbWU9XCJhZGRVc2VyQnRuXCIgb25DbGljaz17dGhpcy5hZGRVc2VyVG9Hcm91cH0+XG4gICAgICAgICAgICBBZGQgVG8gR3JvdXBcbiAgICAgICAgICA8L2J1dHRvbj5cbiAgICAgICAgICA8YnV0dG9uIGNsYXNzTmFtZT1cInJlbW92ZVVzZXJCdG5cIiBvbkNsaWNrPXt0aGlzLmtpY2tVc2VyRnJvbUdyb3VwfT5cbiAgICAgICAgICAgIFJlbW92ZSBGcm9tIEdyb3VwXG4gICAgICAgICAgPC9idXR0b24+XG4gICAgICAgIDwvZGl2PlxuICAgICAgPC9kaXY+XG4gICAgKTtcbiAgfVxuXG59KTtcblxubW9kdWxlLmV4cG9ydHMgPSBFZGl0R3JvdXBzO1xuIiwidmFyIFJlYWN0ID0gcmVxdWlyZSgncmVhY3QnKTtcbnZhciBTdG9yZSA9IHJlcXVpcmUoJy4vU3RvcmUuanMnKTtcbnZhciBhY3Rpb25zID0gcmVxdWlyZSgnLi9hY3Rpb25zLmpzJyk7XG5cbnZhciBHcm91cHNMaXN0ID0gUmVhY3QuY3JlYXRlQ2xhc3Moe1xuICBnZXRJbml0aWFsU3RhdGU6IGZ1bmN0aW9uKCkge1xuICAgIHJldHVybiB7XG4gICAgICBncm91cHM6IFN0b3JlLmdldEdyb3VwcygpLFxuICAgICAgdXNlcnM6IFN0b3JlLmdldFVzZXJzKCksXG4gICAgICBuZXdHcm91cDogXCJcIlxuICAgIH07XG4gIH0sXG5cbiAgY29tcG9uZW50V2lsbE1vdW50OiBmdW5jdGlvbigpIHtcbiAgICBTdG9yZS5hZGRDaGFuZ2VMaXN0ZW5lcih0aGlzLmNoYW5nZVN0YXRlKTtcbiAgfSxcblxuICBjb21wb25lbnRXaWxsVW5tb3VudDogZnVuY3Rpb24gKCkge1xuICAgIFN0b3JlLnJlbW92ZUNoYW5nZUxpc3RlbmVyKHRoaXMuY2hhbmdlU3RhdGUpO1xuICB9LFxuXG4gIGNoYW5nZVN0YXRlOiBmdW5jdGlvbigpIHtcbiAgICB0aGlzLnNldFN0YXRlKHtcbiAgICAgIGdyb3VwczogU3RvcmUuZ2V0R3JvdXBzKCksXG4gICAgICB1c2VyczogU3RvcmUuZ2V0VXNlcnMoKVxuICAgIH0pO1xuICB9LFxuXG4gIHVwZGF0ZU5ld0dyb3VwOiBmdW5jdGlvbihldmVudCkge1xuICAgIHRoaXMuc2V0U3RhdGUoe1xuICAgICAgbmV3R3JvdXA6IGV2ZW50LnRhcmdldC52YWx1ZVxuICAgIH0pXG4gIH0sXG5cbiAgYWRkR3JvdXA6IGZ1bmN0aW9uKGV2ZW50KSB7XG4gICAgZXZlbnQucHJldmVudERlZmF1bHQoKTtcbiAgICB2YXIgaW5wdXQgPSB0aGlzLnJlZnMubmV3R3JvdXA7XG4gICAgYWN0aW9ucy5hZGRHcm91cChpbnB1dC52YWx1ZSk7XG4gICAgdGhpcy5zZXRTdGF0ZSh7XG4gICAgICBuZXdHcm91cDogJydcbiAgICB9KVxuICB9LFxuXG4gIGRlbGV0ZUdyb3VwOiBmdW5jdGlvbihncm91cCkge1xuICAgIGFjdGlvbnMuZGVsZXRlR3JvdXAoZ3JvdXApO1xuICB9LFxuXG4gIHJlbmRlckdyb3VwTWVtYmVyczogZnVuY3Rpb24oZ3JvdXBNZW1iZXIsIGkpIHtcbiAgICByZXR1cm4oXG4gICAgICA8ZGl2IGNsYXNzTmFtZT0nZ3JvdXBNZW1iZXInIGtleT17aX0+XG4gICAgICAgIHtncm91cE1lbWJlcn1cbiAgICAgIDwvZGl2PlxuICAgICk7XG4gIH0sXG5cbiAgcmVuZGVyR3JvdXBzOiBmdW5jdGlvbihncm91cCkge1xuICAgIHJldHVybiAoXG4gICAgICA8ZGl2IGNsYXNzTmFtZT0nZ3JvdXBDb250YWluZXInIGtleT17Z3JvdXAuaWR9PlxuICAgICAgICA8ZGl2PlxuICAgICAgICAgIDxoMz57Z3JvdXAubmFtZX08L2gzPlxuICAgICAgICA8L2Rpdj5cbiAgICAgICAgPGRpdiBjbGFzc05hbWU9J2dyb3VwTWVtYmVycyc+XG4gICAgICAgICAgPGg0Pk1lbWJlcnM6PC9oND5cbiAgICAgICAgICB7Z3JvdXAubWVtYmVycy5tYXAodGhpcy5yZW5kZXJHcm91cE1lbWJlcnMpfVxuICAgICAgICA8L2Rpdj5cbiAgICAgICAgPGJ1dHRvbiBjbGFzc05hbWU9J2RlbGV0ZSdvbkNsaWNrPXt0aGlzLmRlbGV0ZUdyb3VwLmJpbmQodGhpcywgZ3JvdXApfT5cbiAgICAgICAgICBEZWxldGUgR3JvdXBcbiAgICAgICAgPC9idXR0b24+XG4gICAgICA8L2Rpdj5cbiAgICApO1xuICB9LFxuXG5cdHJlbmRlcjogZnVuY3Rpb24oKSB7XG4gICAgcmV0dXJuKFxuICAgICAgPGRpdiBjbGFzc05hbWU9XCJncm91cExpc3RcIj5cbiAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJmb3JtXCI+XG4gICAgICAgICAgPGgxPkFkZCBOZXcgR3JvdXA8L2gxPlxuICAgICAgICAgIDxmb3JtIG9uU3VibWl0PXt0aGlzLmFkZEdyb3VwfT5cbiAgICAgICAgICAgIDxpbnB1dCB0eXBlPVwidGV4dFwiIHJlZj1cIm5ld0dyb3VwXCIgcGxhY2Vob2xkZXI9XCJHcm91cCBOYW1lXCJcbiAgICAgICAgICAgICAgdmFsdWU9e3RoaXMuc3RhdGUubmV3R3JvdXB9IG9uQ2hhbmdlPXt0aGlzLnVwZGF0ZU5ld0dyb3VwfS8+XG4gICAgICAgICAgPC9mb3JtPlxuICAgICAgICA8L2Rpdj5cbiAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJncm91cHNDb250YWluZXJcIj5cbiAgICAgICAgICB7dGhpcy5zdGF0ZS5ncm91cHMubWFwKHRoaXMucmVuZGVyR3JvdXBzKX1cbiAgICAgICAgPC9kaXY+XG4gICAgICA8L2Rpdj5cbiAgICApO1xuXHR9XG5cbn0pO1xuXG5tb2R1bGUuZXhwb3J0cyA9IEdyb3Vwc0xpc3Q7XG4iLCJ2YXIgZmx1eCA9IHJlcXVpcmUoJ2ZsdXgtcmVhY3QnKTtcbnZhciBhY3Rpb25zID0gcmVxdWlyZSgnLi9hY3Rpb25zLmpzJyk7XG5cbm1vZHVsZS5leHBvcnRzID0gZmx1eC5jcmVhdGVTdG9yZSh7XG4gIHVzZXJzOiBbe2lkOiAxLCBuYW1lOidDaHJpcyBXZWVrcycsIGdyb3VwczogWydJbnRlck5hdGlvbnMnLCAnTWFrZXJzIEFjYWRlbXknLCAnTGFuY2FzdGVyIFVuaXZlcnNpdHknXSB9XSxcblxuICBncm91cHM6IFt7aWQ6IDEsIG5hbWU6ICdJbnRlck5hdGlvbnMnLCBtZW1iZXJzOiBbJ0NocmlzIFdlZWtzJ10gfSxcbiAgICAgICAgICAge2lkOiAyLCBuYW1lOiAnTWFrZXJzIEFjYWRlbXknLCBtZW1iZXJzOiBbJ0NocmlzIFdlZWtzJ10gfSxcbiAgICAgICAgICAge2lkOiAzLCBuYW1lOiAnTGFuY2FzdGVyIFVuaXZlcnNpdHknLCBtZW1iZXJzOiBbJ0NocmlzIFdlZWtzJ10gfV0sXG5cbiAgYWN0aW9uczogW1xuICAgIGFjdGlvbnMuYWRkVXNlcixcbiAgICBhY3Rpb25zLmFkZEdyb3VwLFxuICAgIGFjdGlvbnMuYWRkVXNlclRvR3JvdXAsXG4gICAgYWN0aW9ucy5raWNrVXNlckZyb21Hcm91cCxcbiAgICBhY3Rpb25zLmRlbGV0ZVVzZXIsXG4gICAgYWN0aW9ucy5kZWxldGVHcm91cFxuICBdLFxuXG4gIGdldEdyb3VwQnlOYW1lOiBmdW5jdGlvbihuYW1lKXtcbiAgICAgZm9yKHZhciBpPTA7IGkgPCB0aGlzLmdyb3Vwcy5sZW5ndGg7IGkrKyl7XG4gICAgICAgaWYodGhpcy5ncm91cHNbaV0ubmFtZSA9PSBuYW1lKXtcbiAgICAgICAgIHJldHVybiB0aGlzLmdyb3Vwc1tpXVxuICAgICAgIH1cbiAgICAgfTtcbiAgfSxcblxuICBnZXRVc2VyQnlOYW1lOiBmdW5jdGlvbihuYW1lKXtcbiAgICAgZm9yKHZhciBpPTA7IGkgPCB0aGlzLnVzZXJzLmxlbmd0aDsgaSsrKXtcbiAgICAgICBpZih0aGlzLnVzZXJzW2ldLm5hbWUgPT0gbmFtZSl7XG4gICAgICAgICByZXR1cm4gdGhpcy51c2Vyc1tpXVxuICAgICAgIH1cbiAgICAgfTtcbiAgfSxcblxuICB1c2VyQWxyZWFkeUV4aXN0czogZnVuY3Rpb24odXNlck5hbWUpIHtcbiAgICBmb3IodmFyIGk9MDsgaSA8IHRoaXMudXNlcnMubGVuZ3RoOyBpKyspe1xuICAgICAgaWYodGhpcy51c2Vyc1tpXS5uYW1lID09IHVzZXJOYW1lKXtcbiAgICAgICAgcmV0dXJuIHRydWVcbiAgICAgIH1cbiAgICB9XG4gIH0sXG5cbiAgZ3JvdXBQcm92aWRlZDogZnVuY3Rpb24oZ3JvdXApIHtcbiAgICBpZihncm91cCA9PSAnJyl7XG4gICAgICByZXR1cm4gYWxlcnQoJ1BsZWFzZSBzZWxlY3QgYSBncm91cCcpXG4gICAgfVxuICB9LFxuXG4gIGlzQU1lbWJlcjogZnVuY3Rpb24odXNlck5hbWUsIGdyb3VwKSB7XG4gICAgZm9yKHZhciBpPTA7IGk8Z3JvdXAubWVtYmVycy5sZW5ndGg7IGkrKyl7XG4gICAgICBpZihncm91cC5tZW1iZXJzW2ldID09IHVzZXJOYW1lKXtcbiAgICAgICAgcmV0dXJuIHRydWVcbiAgICAgIH1cbiAgICB9XG4gIH0sXG5cbiAgZGVsZXRlVXNlckZyb21Vc2VyczogZnVuY3Rpb24odXNlcikge1xuICAgIGZvcih2YXIgaT0wOyBpIDwgdGhpcy51c2Vycy5sZW5ndGg7IGkrKyl7XG4gICAgICBpZih1c2VyLmlkID09IHRoaXMudXNlcnNbaV0uaWQpe1xuICAgICAgICB0aGlzLnVzZXJzLnNwbGljZShpLCAxKTtcbiAgICAgIH1cbiAgICB9O1xuICB9LFxuXG4gIGRlbGV0ZVVzZXJGcm9tQWxsR3JvdXBzOiBmdW5jdGlvbih1c2VyKSB7XG4gICAgZm9yKHZhciBpPTA7IGkgPCB0aGlzLmdyb3Vwcy5sZW5ndGg7IGkrKyl7XG4gICAgICBmb3IodmFyIGo9MDsgaiA8IHRoaXMuZ3JvdXBzW2ldLm1lbWJlcnMubGVuZ3RoOyBqKyspe1xuICAgICAgICBpZih1c2VyLm5hbWUgPT0gdGhpcy5ncm91cHNbaV0ubWVtYmVyc1tqXSl7XG4gICAgICAgICAgdGhpcy5ncm91cHNbaV0ubWVtYmVycy5zcGxpY2UoaiwgMSlcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH07XG4gIH0sXG5cbiAgZGVsZXRlVXNlckZyb21BR3JvdXA6IGZ1bmN0aW9uKHVzZXJOYW1lLCBncm91cE5hbWUpIHtcbiAgICB2YXIgZ3JvdXAgPSB0aGlzLmdldEdyb3VwQnlOYW1lKGdyb3VwTmFtZSk7XG4gICAgZm9yKHZhciBpPTA7IGkgPCBncm91cC5tZW1iZXJzLmxlbmd0aDsgaSsrKXtcbiAgICAgIGlmKGdyb3VwLm1lbWJlcnNbaV0gPT0gdXNlck5hbWUpe1xuICAgICAgICBncm91cC5tZW1iZXJzLnNwbGljZShpLDEpO1xuICAgICAgfVxuICAgIH07XG4gIH0sXG5cbiAgZGVsZXRlR3JvdXBGcm9tVXNlcjogZnVuY3Rpb24odXNlck5hbWUsIGdyb3VwTmFtZSkge1xuICAgIHZhciB1c2VyID0gdGhpcy5nZXRVc2VyQnlOYW1lKHVzZXJOYW1lKTtcbiAgICBmb3IodmFyIGk9MDsgaSA8IHVzZXIuZ3JvdXBzLmxlbmd0aDsgaSsrKXtcbiAgICAgIGlmKHVzZXIuZ3JvdXBzW2ldID09IGdyb3VwTmFtZSl7XG4gICAgICAgIHVzZXIuZ3JvdXBzLnNwbGljZShpLDEpO1xuICAgICAgfVxuICAgIH07XG4gIH0sXG5cbiAgYWRkVXNlcjogZnVuY3Rpb24odXNlck5hbWUsIGdyb3VwKSB7XG4gICAgaWYodGhpcy51c2VyQWxyZWFkeUV4aXN0cyh1c2VyTmFtZSkpeyByZXR1cm4gYWxlcnQoJ1RoYXQgdXNlciBhbHJlYWR5IGV4aXN0cycpIH07XG4gICAgdGhpcy5ncm91cFByb3ZpZGVkKGdyb3VwKVxuICAgIHRoaXMudXNlcnMucHVzaCh7IGlkOih0aGlzLnVzZXJzLmxlbmd0aCsxKSwgbmFtZTogdXNlck5hbWUsIGdyb3VwczogW2dyb3VwXX0pO1xuICAgIHRoaXMuZ2V0R3JvdXBCeU5hbWUoZ3JvdXApLm1lbWJlcnMucHVzaCh1c2VyTmFtZSk7XG4gICAgdGhpcy5lbWl0Q2hhbmdlKCk7XG4gIH0sXG5cbiAgYWRkR3JvdXA6IGZ1bmN0aW9uKGdyb3VwKSB7XG4gICAgdGhpcy5ncm91cHMucHVzaCh7IGlkOih0aGlzLmdyb3Vwcy5sZW5ndGgrMSksIG5hbWU6IGdyb3VwICwgbWVtYmVyczogW119KTtcbiAgICB0aGlzLmVtaXRDaGFuZ2UoKTtcbiAgfSxcblxuICBhZGRVc2VyVG9Hcm91cDogZnVuY3Rpb24odXNlck5hbWUsIGdyb3VwTmFtZSkge1xuICAgIHZhciBncm91cCA9IHRoaXMuZ2V0R3JvdXBCeU5hbWUoZ3JvdXBOYW1lKVxuICAgIHZhciB1c2VyID0gdGhpcy5nZXRVc2VyQnlOYW1lKHVzZXJOYW1lKVxuICAgIHRoaXMuZ3JvdXBQcm92aWRlZChncm91cCk7XG4gICAgaWYodGhpcy51c2VyQWxyZWFkeUV4aXN0cyh1c2VyTmFtZSkgIT0gdHJ1ZSl7XG4gICAgICByZXR1cm4gYWxlcnQodXNlck5hbWUrJyBkb2VzIG5vdCBleGlzdCcpXG4gICAgfTtcbiAgICBpZih0aGlzLmlzQU1lbWJlcih1c2VyTmFtZSwgZ3JvdXApKXtcbiAgICAgIHJldHVybiBhbGVydCh1c2VyTmFtZSsnIGlzIGFscmVhZHkgYSBtZW1iZXIgb2YgJytncm91cC5uYW1lKVxuICAgIH07XG4gICAgZ3JvdXAubWVtYmVycy5wdXNoKHVzZXIubmFtZSk7XG4gICAgdXNlci5ncm91cHMucHVzaChncm91cC5uYW1lKTtcbiAgICB0aGlzLmVtaXRDaGFuZ2UoKTtcbiAgfSxcblxuICBraWNrVXNlckZyb21Hcm91cDogZnVuY3Rpb24odXNlck5hbWUsIGdyb3VwTmFtZSkge1xuICAgIHRoaXMuZGVsZXRlVXNlckZyb21BR3JvdXAodXNlck5hbWUsIGdyb3VwTmFtZSk7XG4gICAgdGhpcy5kZWxldGVHcm91cEZyb21Vc2VyKHVzZXJOYW1lLCBncm91cE5hbWUpO1xuICAgIHRoaXMuZW1pdENoYW5nZSgpO1xuICB9LFxuXG4gIGRlbGV0ZVVzZXI6IGZ1bmN0aW9uKHVzZXIpIHtcbiAgICB0aGlzLmRlbGV0ZVVzZXJGcm9tVXNlcnModXNlcik7XG4gICAgdGhpcy5kZWxldGVVc2VyRnJvbUFsbEdyb3Vwcyh1c2VyKTtcbiAgICB0aGlzLmVtaXRDaGFuZ2UoKTtcbiAgfSxcblxuICBkZWxldGVHcm91cDogZnVuY3Rpb24oZ3JvdXApIHtcbiAgICBpZihncm91cC5tZW1iZXJzLmxlbmd0aCA9PSAwKXtcbiAgICAgIGZvcih2YXIgaT0wOyBpIDwgdGhpcy5ncm91cHMubGVuZ3RoOyBpKyspe1xuICAgICAgICBpZihncm91cC5pZCA9PSB0aGlzLmdyb3Vwc1tpXS5pZCl7XG4gICAgICAgICAgdGhpcy5ncm91cHMuc3BsaWNlKGksIDEpO1xuICAgICAgICAgIHRoaXMuZW1pdENoYW5nZSgpO1xuICAgICAgICB9XG4gICAgICB9O1xuICAgIH1cbiAgICBlbHNle1xuICAgICAgYWxlcnQoXCJDYW4gb25seSBkZWxldGUgZW1wdHkgZ3JvdXBzXCIpXG4gICAgfVxuICB9LFxuXG4gIGV4cG9ydHM6IHtcbiAgICBnZXRVc2VyczogZnVuY3Rpb24oKSB7XG4gICAgICByZXR1cm4gdGhpcy51c2VycztcbiAgICB9LFxuICAgIGdldEdyb3VwczogZnVuY3Rpb24oKSB7XG4gICAgICByZXR1cm4gdGhpcy5ncm91cHNcbiAgICB9XG4gIH1cbn0pO1xuIiwidmFyIFJlYWN0ID0gcmVxdWlyZSgncmVhY3QnKTtcbnZhciBTdG9yZSA9IHJlcXVpcmUoJy4vU3RvcmUuanMnKTtcbnZhciBhY3Rpb25zID0gcmVxdWlyZSgnLi9hY3Rpb25zLmpzJyk7XG5cbnZhciBVc2Vyc0xpc3QgPSBSZWFjdC5jcmVhdGVDbGFzcyh7XG4gIGdldEluaXRpYWxTdGF0ZTogZnVuY3Rpb24oKSB7XG4gICAgcmV0dXJuIHtcbiAgICAgIHVzZXJzOiBTdG9yZS5nZXRVc2VycygpLFxuICAgICAgZ3JvdXBzOiBTdG9yZS5nZXRHcm91cHMoKSxcbiAgICAgIG5ld1VzZXI6IFwiXCJcbiAgICB9O1xuICB9LFxuXG4gIGNvbXBvbmVudFdpbGxNb3VudDogZnVuY3Rpb24oKSB7XG4gICAgU3RvcmUuYWRkQ2hhbmdlTGlzdGVuZXIodGhpcy5jaGFuZ2VTdGF0ZSk7XG4gIH0sXG5cbiAgY29tcG9uZW50V2lsbFVubW91bnQ6IGZ1bmN0aW9uICgpIHtcbiAgICBTdG9yZS5yZW1vdmVDaGFuZ2VMaXN0ZW5lcih0aGlzLmNoYW5nZVN0YXRlKTtcbiAgfSxcblxuICBjaGFuZ2VTdGF0ZTogZnVuY3Rpb24oKSB7XG4gICAgdGhpcy5zZXRTdGF0ZSh7XG4gICAgICB1c2VyczogU3RvcmUuZ2V0VXNlcnMoKSxcbiAgICAgIGdyb3VwczogU3RvcmUuZ2V0R3JvdXBzKClcbiAgICB9KTtcbiAgfSxcblxuICB1cGRhdGVOZXdVc2VyOiBmdW5jdGlvbihldmVudCkge1xuICAgIHRoaXMuc2V0U3RhdGUoe1xuICAgICAgbmV3VXNlcjogZXZlbnQudGFyZ2V0LnZhbHVlXG4gICAgfSlcbiAgfSxcblxuICBhZGRVc2VyOiBmdW5jdGlvbihldmVudCkge1xuICAgIGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XG4gICAgdmFyIHVzZXJOYW1lID0gdGhpcy5yZWZzLm5ld1VzZXI7XG4gICAgdmFyIHNlbGVjdGVkR3JvdXAgPSB0aGlzLnJlZnMuc2VsZWN0ZWRHcm91cDtcbiAgICBhY3Rpb25zLmFkZFVzZXIodXNlck5hbWUudmFsdWUsIHNlbGVjdGVkR3JvdXAudmFsdWUpO1xuICAgIHRoaXMuc2V0U3RhdGUoe1xuICAgICAgbmV3VXNlcjogJydcbiAgICB9KVxuICB9LFxuXG4gIGRlbGV0ZVVzZXI6IGZ1bmN0aW9uKHVzZXIpIHtcbiAgICBhY3Rpb25zLmRlbGV0ZVVzZXIodXNlcik7XG4gIH0sXG5cbiAgcmVuZGVyR3JvdXBEcm9wRG93bjogZnVuY3Rpb24oZ3JvdXApIHtcbiAgICByZXR1cm4oXG4gICAgICA8b3B0aW9uIGtleT17Z3JvdXAuaWR9IHZhbHVlPXtncm91cC5uYW1lfT57Z3JvdXAubmFtZX08L29wdGlvbj5cbiAgICApO1xuICB9LFxuXG4gIHJlbmRlckdyb3VwczogZnVuY3Rpb24odXNlckdyb3VwLCBpKSB7XG4gICAgcmV0dXJuKFxuICAgICAgPGRpdiBjbGFzc05hbWU9J1VzZXJHcm91cCcga2V5PXtpfT5cbiAgICAgICAge3VzZXJHcm91cH1cbiAgICAgIDwvZGl2PlxuICAgICk7XG4gIH0sXG5cbiAgcmVuZGVyVXNlcnM6IGZ1bmN0aW9uKHVzZXIpIHtcbiAgICByZXR1cm4oXG4gICAgICA8ZGl2IGNsYXNzTmFtZT1cInVzZXJDb250YWluZXJcIiBrZXk9e3VzZXIuaWR9PlxuICAgICAgICA8ZGl2PlxuICAgICAgICAgIDxoMz57dXNlci5uYW1lfTwvaDM+XG4gICAgICAgIDwvZGl2PlxuICAgICAgICA8ZGl2PlxuICAgICAgICAgIDxoND5Hcm91cHM6PC9oND5cbiAgICAgICAgICB7dXNlci5ncm91cHMubWFwKHRoaXMucmVuZGVyR3JvdXBzKX1cbiAgICAgICAgPC9kaXY+XG4gICAgICAgIDxidXR0b24gY2xhc3NOYW1lPSdkZWxldGUnIG9uQ2xpY2s9e3RoaXMuZGVsZXRlVXNlci5iaW5kKHRoaXMsIHVzZXIpfT5cbiAgICAgICAgICBEZWxldGUgVXNlclxuICAgICAgICA8L2J1dHRvbj5cbiAgICAgIDwvZGl2PlxuICAgICk7XG4gIH0sXG5cblx0cmVuZGVyOiBmdW5jdGlvbigpIHtcbiAgICByZXR1cm4oXG4gICAgICA8ZGl2IGNsYXNzTmFtZT1cInVzZXJMaXN0XCI+XG4gICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiZm9ybVwiPlxuICAgICAgICAgIDxoMT5BZGQgTmV3IFVzZXI8L2gxPlxuICAgICAgICAgIDxmb3JtIG9uU3VibWl0PXt0aGlzLmFkZFVzZXJ9PlxuICAgICAgICAgICAgPGlucHV0IHR5cGU9XCJ0ZXh0XCIgcmVmPVwibmV3VXNlclwiIHBsYWNlaG9sZGVyPVwiVXNlciBOYW1lXCJcbiAgICAgICAgICAgICAgdmFsdWU9e3RoaXMuc3RhdGUubmV3VXNlcn0gb25DaGFuZ2U9e3RoaXMudXBkYXRlTmV3VXNlcn0vPlxuICAgICAgICAgICAgPHNlbGVjdCBuYW1lPSdncm91cHMnIHJlZj1cInNlbGVjdGVkR3JvdXBcIiBkZWZhdWx0VmFsdWU9XCJcIj5cbiAgICAgICAgICAgICAgPG9wdGlvbiB2YWx1ZT1cIlwiPlBsZWFzZSBzZWxlY3QgYSBncm91cC4uLjwvb3B0aW9uPlxuICAgICAgICAgICAgICB7dGhpcy5zdGF0ZS5ncm91cHMubWFwKHRoaXMucmVuZGVyR3JvdXBEcm9wRG93bil9XG4gICAgICAgICAgICA8L3NlbGVjdD5cbiAgICAgICAgICA8L2Zvcm0+XG4gICAgICAgIDwvZGl2PlxuICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cInVzZXJzQ29udGFpbmVyXCI+XG4gICAgICAgICAge3RoaXMuc3RhdGUudXNlcnMubWFwKHRoaXMucmVuZGVyVXNlcnMpfVxuICAgICAgICA8L2Rpdj5cbiAgICAgIDwvZGl2PlxuICAgICk7XG5cdH1cblxufSk7XG5cbm1vZHVsZS5leHBvcnRzID0gVXNlcnNMaXN0O1xuIiwidmFyIGZsdXggPSByZXF1aXJlKCdmbHV4LXJlYWN0Jyk7XG5cbm1vZHVsZS5leHBvcnRzID0gZmx1eC5jcmVhdGVBY3Rpb25zKFtcbiAgJ2FkZFVzZXInLFxuICAnYWRkR3JvdXAnLFxuICAnYWRkVXNlclRvR3JvdXAnLFxuICAna2lja1VzZXJGcm9tR3JvdXAnLFxuICAnZGVsZXRlVXNlcicsXG4gICdkZWxldGVHcm91cCdcbl0pO1xuIiwidmFyIFJlYWN0ID0gcmVxdWlyZSgncmVhY3QnKTtcbnZhciBBcHAgPSByZXF1aXJlKCcuL0FwcC5qcycpO1xuXG5SZWFjdC5yZW5kZXIoPEFwcC8+LCBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcImNvbnRlbnRcIikpO1xuIl19
