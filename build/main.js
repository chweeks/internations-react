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
      null,
      React.createElement(UsersList, null),
      React.createElement(GroupsList, null),
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
      { className: 'form' },
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
          { onClick: this.addUserToGroup },
          'Add To Group'
        ),
        React.createElement(
          'button',
          { onClick: this.kickUserFromGroup },
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
        group.members.map(this.renderGroupMembers)
      ),
      React.createElement(
        'button',
        { onClick: this.deleteGroup.bind(this, group) },
        'Delete Group'
      )
    );
  },

  render: function render() {
    return React.createElement(
      'div',
      null,
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
  users: [{ id: 1, name: 'Chris Weeks', groups: ['InterNations', 'Makers Academy', 'Lancaster University'] }, { id: 2, name: 'Nathaniel Green', groups: ['Makers Academy', 'Lancaster University'] }, { id: 3, name: 'Aaron Kendall', groups: ['Makers Academy'] }],

  groups: [{ id: 1, name: 'InterNations', members: ['Chris Weeks'] }, { id: 2, name: 'Makers Academy', members: ['Chris Weeks', 'Nathaniel Green', 'Aaron Kendall'] }, { id: 3, name: 'Lancaster University', members: ['Chris Weeks', 'Nathaniel Green'] }],

  actions: [actions.addUser, actions.addGroup, actions.addUserToGroup, actions.kickUserFromGroup, actions.deleteUser, actions.deleteGroup],

  getGroupByName: function getGroupByName(name) {
    for (var i = 0; i < this.groups.length; i++) {
      if (this.groups[i].name == name) {
        return this.groups[i];
      }
    };
  },

  getUserByName: function getUserByName(name) {
    for (var i = 0; i < this.groups.length; i++) {
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

  deleteUserFromGroups: function deleteUserFromGroups(user) {
    for (var i = 0; i < this.groups.length; i++) {
      for (var j = 0; j < this.groups[i].members.length; j++) {
        if (user.name == this.groups[i].members[j]) {
          this.groups[i].members.splice(j, 1);
        }
      }
    };
  },

  deleteUserFromGroup: function deleteUserFromGroup(userName, groupName) {
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
    this.users.push({ id: this.users.length + 1, name: userName, groups: group });
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
    this.deleteUserFromGroup(userName, groupName);
    this.deleteGroupFromUser(userName, groupName);
    this.emitChange();
  },

  deleteUser: function deleteUser(user) {
    this.deleteUserFromUsers(user);
    this.deleteUserFromGroups(user);
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
    var userName = this.refs.newUser.value;
    var selectedGroup = this.refs.selectedGroup.value;
    actions.addUser(userName, selectedGroup);
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
        user.groups.map(this.renderGroups)
      ),
      React.createElement(
        'button',
        { onClick: this.deleteUser.bind(this, user) },
        'Delete User'
      )
    );
  },

  render: function render() {
    return React.createElement(
      'div',
      null,
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
//# sourceMappingURL=data:application/json;charset:utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9icm93c2VyaWZ5L25vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCIvaG9tZS9jaHdlZWtzL0Rlc2t0b3AvcHJvamVjdHMvaW50ZXJuYXRpb25zLXJlYWN0L2FwcC9BcHAuanMiLCIvaG9tZS9jaHdlZWtzL0Rlc2t0b3AvcHJvamVjdHMvaW50ZXJuYXRpb25zLXJlYWN0L2FwcC9FZGl0R3JvdXBzLmpzIiwiL2hvbWUvY2h3ZWVrcy9EZXNrdG9wL3Byb2plY3RzL2ludGVybmF0aW9ucy1yZWFjdC9hcHAvR3JvdXBzTGlzdC5qcyIsIi9ob21lL2Nod2Vla3MvRGVza3RvcC9wcm9qZWN0cy9pbnRlcm5hdGlvbnMtcmVhY3QvYXBwL1N0b3JlLmpzIiwiL2hvbWUvY2h3ZWVrcy9EZXNrdG9wL3Byb2plY3RzL2ludGVybmF0aW9ucy1yZWFjdC9hcHAvVXNlcnNMaXN0LmpzIiwiL2hvbWUvY2h3ZWVrcy9EZXNrdG9wL3Byb2plY3RzL2ludGVybmF0aW9ucy1yZWFjdC9hcHAvYWN0aW9ucy5qcyIsIi9ob21lL2Nod2Vla3MvRGVza3RvcC9wcm9qZWN0cy9pbnRlcm5hdGlvbnMtcmVhY3QvYXBwL21haW4uanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7OztBQ0FBLElBQUksS0FBSyxHQUFHLE9BQU8sQ0FBQyxPQUFPLENBQUMsQ0FBQztBQUM3QixJQUFJLFNBQVMsR0FBRyxPQUFPLENBQUMsZ0JBQWdCLENBQUMsQ0FBQztBQUMxQyxJQUFJLFVBQVUsR0FBRyxPQUFPLENBQUMsaUJBQWlCLENBQUMsQ0FBQTtBQUMzQyxJQUFJLFVBQVUsR0FBRyxPQUFPLENBQUMsaUJBQWlCLENBQUMsQ0FBQTs7QUFFM0MsSUFBSSxHQUFHLEdBQUcsS0FBSyxDQUFDLFdBQVcsQ0FBQzs7O0FBRTNCLFFBQU0sRUFBRSxrQkFBVztBQUNoQixXQUNFOzs7TUFDRSxvQkFBQyxTQUFTLE9BQUc7TUFDYixvQkFBQyxVQUFVLE9BQUc7TUFD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QUMsT0FBTyxBQUFDLEVBQUMsUUFBUSxFQUFFLElBQUksQ0FBQyxhQUFhLEFBQUMsR0FBRTtVQUM1RDs7Y0FBUSxJQUFJLEVBQUMsUUFBUSxFQUFDLEdBQUcsRUFBQyxlQUFlLEVBQUMsWUFBWSxFQUFDLEVBQUU7WUFDdkQ7O2dCQUFRLEtBQUssRUFBQyxFQUFFOzthQUFrQztZQUNqRCxJQUFJLENBQUMsS0FBSyxDQUFDLE1BQU0sQ0FBQyxHQUFHLENBQUMsSUFBSSxDQUFDLG1CQUFtQixDQUFDO1dBQ3pDO1NBQ0o7T0FDSDtNQUNOOztVQUFLLFNBQVMsRUFBQyxnQkFBZ0I7UUFDNUIsSUFBSSxDQUFDLEtBQUssQ0FBQyxLQUFLLENBQUMsR0FBRyxDQUFDLElBQUksQ0FBQyxXQUFXLENBQUM7T0FDbkM7S0FDRixDQUNOO0dBQ0o7O0NBRUQsQ0FBQyxDQUFDOztBQUVILE1BQU0sQ0FBQyxPQUFPLEdBQUcsU0FBUyxDQUFDOzs7OztBQ2pHM0IsSUFBSSxJQUFJLEdBQUcsT0FBTyxDQUFDLFlBQVksQ0FBQyxDQUFDOztBQUVqQyxNQUFNLENBQUMsT0FBTyxHQUFHLElBQUksQ0FBQyxhQUFhLENBQUMsQ0FDbEMsU0FBUyxFQUNULFVBQVUsRUFDVixnQkFBZ0IsRUFDaEIsbUJBQW1CLEVBQ25CLFlBQVksRUFDWixhQUFhLENBQ2QsQ0FBQyxDQUFDOzs7OztBQ1RILElBQUksS0FBSyxHQUFHLE9BQU8sQ0FBQyxPQUFPLENBQUMsQ0FBQztBQUM3QixJQUFJLEdBQUcsR0FBRyxPQUFPLENBQUMsVUFBVSxDQUFDLENBQUM7O0FBRTlCLEtBQUssQ0FBQyxNQUFNLENBQUMsb0JBQUMsR0FBRyxPQUFFLEVBQUUsUUFBUSxDQUFDLGNBQWMsQ0FBQyxTQUFTLENBQUMsQ0FBQyxDQUFDIiwiZmlsZSI6ImdlbmVyYXRlZC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzQ29udGVudCI6WyIoZnVuY3Rpb24gZSh0LG4scil7ZnVuY3Rpb24gcyhvLHUpe2lmKCFuW29dKXtpZighdFtvXSl7dmFyIGE9dHlwZW9mIHJlcXVpcmU9PVwiZnVuY3Rpb25cIiYmcmVxdWlyZTtpZighdSYmYSlyZXR1cm4gYShvLCEwKTtpZihpKXJldHVybiBpKG8sITApO3ZhciBmPW5ldyBFcnJvcihcIkNhbm5vdCBmaW5kIG1vZHVsZSAnXCIrbytcIidcIik7dGhyb3cgZi5jb2RlPVwiTU9EVUxFX05PVF9GT1VORFwiLGZ9dmFyIGw9bltvXT17ZXhwb3J0czp7fX07dFtvXVswXS5jYWxsKGwuZXhwb3J0cyxmdW5jdGlvbihlKXt2YXIgbj10W29dWzFdW2VdO3JldHVybiBzKG4/bjplKX0sbCxsLmV4cG9ydHMsZSx0LG4scil9cmV0dXJuIG5bb10uZXhwb3J0c312YXIgaT10eXBlb2YgcmVxdWlyZT09XCJmdW5jdGlvblwiJiZyZXF1aXJlO2Zvcih2YXIgbz0wO288ci5sZW5ndGg7bysrKXMocltvXSk7cmV0dXJuIHN9KSIsInZhciBSZWFjdCA9IHJlcXVpcmUoJ3JlYWN0Jyk7XG52YXIgVXNlcnNMaXN0ID0gcmVxdWlyZSgnLi9Vc2Vyc0xpc3QuanMnKTtcbnZhciBHcm91cHNMaXN0ID0gcmVxdWlyZSgnLi9Hcm91cHNMaXN0LmpzJylcbnZhciBFZGl0R3JvdXBzID0gcmVxdWlyZSgnLi9FZGl0R3JvdXBzLmpzJylcblxudmFyIEFwcCA9IFJlYWN0LmNyZWF0ZUNsYXNzKHtcblxuXHRyZW5kZXI6IGZ1bmN0aW9uKCkge1xuICAgIHJldHVybihcbiAgICAgIDxkaXY+XG4gICAgICAgIDxVc2Vyc0xpc3QgLz5cbiAgICAgICAgPEdyb3Vwc0xpc3QgLz5cbiAgICAgICAgPEVkaXRHcm91cHMgLz5cbiAgICAgIDwvZGl2PlxuICAgICk7XG5cdH1cblxufSk7XG5cbm1vZHVsZS5leHBvcnRzID0gQXBwO1xuIiwidmFyIFJlYWN0ID0gcmVxdWlyZSgncmVhY3QnKTtcbnZhciBTdG9yZSA9IHJlcXVpcmUoJy4vU3RvcmUuanMnKTtcbnZhciBhY3Rpb25zID0gcmVxdWlyZSgnLi9hY3Rpb25zLmpzJyk7XG5cbnZhciBFZGl0R3JvdXBzID0gUmVhY3QuY3JlYXRlQ2xhc3Moe1xuICBnZXRJbml0aWFsU3RhdGU6IGZ1bmN0aW9uKCkge1xuICAgIHJldHVybiB7XG4gICAgICB1c2VyczogU3RvcmUuZ2V0VXNlcnMoKSxcbiAgICAgIGdyb3VwczogU3RvcmUuZ2V0R3JvdXBzKCksXG4gICAgICB1c2VyOiBcIlwiXG4gICAgfTtcbiAgfSxcblxuICBjb21wb25lbnRXaWxsTW91bnQ6IGZ1bmN0aW9uKCkge1xuICAgIFN0b3JlLmFkZENoYW5nZUxpc3RlbmVyKHRoaXMuY2hhbmdlU3RhdGUpO1xuICB9LFxuXG4gIGNvbXBvbmVudFdpbGxVbm1vdW50OiBmdW5jdGlvbiAoKSB7XG4gICAgU3RvcmUucmVtb3ZlQ2hhbmdlTGlzdGVuZXIodGhpcy5jaGFuZ2VTdGF0ZSk7XG4gIH0sXG5cbiAgY2hhbmdlU3RhdGU6IGZ1bmN0aW9uKCkge1xuICAgIHRoaXMuc2V0U3RhdGUoe1xuICAgICAgdXNlcnM6IFN0b3JlLmdldFVzZXJzKCksXG4gICAgICBncm91cHM6IFN0b3JlLmdldEdyb3VwcygpXG4gICAgfSk7XG4gIH0sXG5cbiAgdXBkYXRlVXNlcjogZnVuY3Rpb24oZXZlbnQpIHtcbiAgICB0aGlzLnNldFN0YXRlKHtcbiAgICAgdXNlcjogZXZlbnQudGFyZ2V0LnZhbHVlXG4gICAgfSlcbiAgfSxcblxuICByZW5kZXJHcm91cERyb3BEb3duOiBmdW5jdGlvbihncm91cCkge1xuICAgIHJldHVybihcbiAgICAgIDxvcHRpb24ga2V5PXtncm91cC5pZH0gdmFsdWU9e2dyb3VwLm5hbWV9Pntncm91cC5uYW1lfTwvb3B0aW9uPlxuICAgICk7XG4gIH0sXG5cbiAgcmVuZGVyR3JvdXBzOiBmdW5jdGlvbih1c2VyR3JvdXAsIGkpIHtcbiAgICByZXR1cm4oXG4gICAgICA8ZGl2IGNsYXNzTmFtZT0nVXNlckdyb3VwJyBrZXk9e2l9PlxuICAgICAgICB7dXNlckdyb3VwfVxuICAgICAgPC9kaXY+XG4gICAgKTtcbiAgfSxcblxuICBhZGRVc2VyVG9Hcm91cDogZnVuY3Rpb24oZXZlbnQpIHtcbiAgICBldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xuICAgIHZhciB1c2VyTmFtZSA9IHRoaXMucmVmcy51c2VyLnZhbHVlO1xuICAgIHZhciBzZWxlY3RlZEdyb3VwID0gdGhpcy5yZWZzLnNlbGVjdGVkR3JvdXAudmFsdWU7XG4gICAgYWN0aW9ucy5hZGRVc2VyVG9Hcm91cCh1c2VyTmFtZSwgc2VsZWN0ZWRHcm91cCk7XG4gICAgdGhpcy5zZXRTdGF0ZSh7XG4gICAgICB1c2VyOiAnJ1xuICAgIH0pXG4gIH0sXG5cbiAga2lja1VzZXJGcm9tR3JvdXA6IGZ1bmN0aW9uKCkge1xuICAgIHZhciB1c2VyTmFtZSA9IHRoaXMucmVmcy51c2VyLnZhbHVlO1xuICAgIHZhciBzZWxlY3RlZEdyb3VwID0gdGhpcy5yZWZzLnNlbGVjdGVkR3JvdXAudmFsdWU7XG4gICAgYWN0aW9ucy5raWNrVXNlckZyb21Hcm91cCh1c2VyTmFtZSwgc2VsZWN0ZWRHcm91cCk7XG4gICAgdGhpcy5zZXRTdGF0ZSh7XG4gICAgICB1c2VyOiAnJ1xuICAgIH0pXG4gIH0sXG5cbiAgcmVuZGVyOiBmdW5jdGlvbigpIHtcbiAgICByZXR1cm4oXG4gICAgICA8ZGl2IGNsYXNzTmFtZT1cImZvcm1cIj5cbiAgICAgICAgPGgxPkVkaXQgR3JvdXBzPC9oMT5cbiAgICAgICAgPGlucHV0IHR5cGU9XCJ0ZXh0XCIgcmVmPVwidXNlclwiIHBsYWNlaG9sZGVyPVwiVXNlciBOYW1lXCJcbiAgICAgICAgICB2YWx1ZT17dGhpcy5zdGF0ZS51c2VyfSBvbkNoYW5nZT17dGhpcy51cGRhdGVVc2VyfS8+XG4gICAgICAgIDxzZWxlY3QgbmFtZT0nZ3JvdXBzJyByZWY9XCJzZWxlY3RlZEdyb3VwXCIgZGVmYXVsdFZhbHVlPVwiXCI+XG4gICAgICAgICAgPG9wdGlvbiB2YWx1ZT1cIlwiPlBsZWFzZSBzZWxlY3QgYSBncm91cC4uLjwvb3B0aW9uPlxuICAgICAgICAgIHt0aGlzLnN0YXRlLmdyb3Vwcy5tYXAodGhpcy5yZW5kZXJHcm91cERyb3BEb3duKX1cbiAgICAgICAgPC9zZWxlY3Q+XG4gICAgICAgIDxkaXY+XG4gICAgICAgICAgPGJ1dHRvbiBvbkNsaWNrPXt0aGlzLmFkZFVzZXJUb0dyb3VwfT5BZGQgVG8gR3JvdXA8L2J1dHRvbj5cbiAgICAgICAgICA8YnV0dG9uIG9uQ2xpY2s9e3RoaXMua2lja1VzZXJGcm9tR3JvdXB9PlJlbW92ZSBGcm9tIEdyb3VwPC9idXR0b24+XG4gICAgICAgIDwvZGl2PlxuICAgICAgPC9kaXY+XG4gICAgKTtcbiAgfVxuXG59KTtcblxubW9kdWxlLmV4cG9ydHMgPSBFZGl0R3JvdXBzO1xuIiwidmFyIFJlYWN0ID0gcmVxdWlyZSgncmVhY3QnKTtcbnZhciBTdG9yZSA9IHJlcXVpcmUoJy4vU3RvcmUuanMnKTtcbnZhciBhY3Rpb25zID0gcmVxdWlyZSgnLi9hY3Rpb25zLmpzJyk7XG5cbnZhciBHcm91cHNMaXN0ID0gUmVhY3QuY3JlYXRlQ2xhc3Moe1xuICBnZXRJbml0aWFsU3RhdGU6IGZ1bmN0aW9uKCkge1xuICAgIHJldHVybiB7XG4gICAgICBncm91cHM6IFN0b3JlLmdldEdyb3VwcygpLFxuICAgICAgdXNlcnM6IFN0b3JlLmdldFVzZXJzKCksXG4gICAgICBuZXdHcm91cDogXCJcIlxuICAgIH07XG4gIH0sXG5cbiAgY29tcG9uZW50V2lsbE1vdW50OiBmdW5jdGlvbigpIHtcbiAgICBTdG9yZS5hZGRDaGFuZ2VMaXN0ZW5lcih0aGlzLmNoYW5nZVN0YXRlKTtcbiAgfSxcblxuICBjb21wb25lbnRXaWxsVW5tb3VudDogZnVuY3Rpb24gKCkge1xuICAgIFN0b3JlLnJlbW92ZUNoYW5nZUxpc3RlbmVyKHRoaXMuY2hhbmdlU3RhdGUpO1xuICB9LFxuXG4gIGNoYW5nZVN0YXRlOiBmdW5jdGlvbigpIHtcbiAgICB0aGlzLnNldFN0YXRlKHtcbiAgICAgIGdyb3VwczogU3RvcmUuZ2V0R3JvdXBzKCksXG4gICAgICB1c2VyczogU3RvcmUuZ2V0VXNlcnMoKVxuICAgIH0pO1xuICB9LFxuXG4gIHVwZGF0ZU5ld0dyb3VwOiBmdW5jdGlvbihldmVudCkge1xuICAgIHRoaXMuc2V0U3RhdGUoe1xuICAgICAgbmV3R3JvdXA6IGV2ZW50LnRhcmdldC52YWx1ZVxuICAgIH0pXG4gIH0sXG5cbiAgYWRkR3JvdXA6IGZ1bmN0aW9uKGV2ZW50KSB7XG4gICAgZXZlbnQucHJldmVudERlZmF1bHQoKTtcbiAgICB2YXIgaW5wdXQgPSB0aGlzLnJlZnMubmV3R3JvdXA7XG4gICAgYWN0aW9ucy5hZGRHcm91cChpbnB1dC52YWx1ZSk7XG4gICAgdGhpcy5zZXRTdGF0ZSh7XG4gICAgICBuZXdHcm91cDogJydcbiAgICB9KVxuICB9LFxuXG4gIGRlbGV0ZUdyb3VwOiBmdW5jdGlvbihncm91cCkge1xuICAgIGFjdGlvbnMuZGVsZXRlR3JvdXAoZ3JvdXApO1xuICB9LFxuXG4gIHJlbmRlckdyb3VwTWVtYmVyczogZnVuY3Rpb24oZ3JvdXBNZW1iZXIsIGkpIHtcbiAgICByZXR1cm4oXG4gICAgICA8ZGl2IGNsYXNzTmFtZT0nZ3JvdXBNZW1iZXInIGtleT17aX0+XG4gICAgICAgIHtncm91cE1lbWJlcn1cbiAgICAgIDwvZGl2PlxuICAgICk7XG4gIH0sXG5cbiAgcmVuZGVyR3JvdXBzOiBmdW5jdGlvbihncm91cCkge1xuICAgIHJldHVybiAoXG4gICAgICA8ZGl2IGNsYXNzTmFtZT0nZ3JvdXBDb250YWluZXInIGtleT17Z3JvdXAuaWR9PlxuICAgICAgICA8ZGl2PlxuICAgICAgICAgIDxoMz57Z3JvdXAubmFtZX08L2gzPlxuICAgICAgICA8L2Rpdj5cbiAgICAgICAgPGRpdiBjbGFzc05hbWU9J2dyb3VwTWVtYmVycyc+XG4gICAgICAgICAge2dyb3VwLm1lbWJlcnMubWFwKHRoaXMucmVuZGVyR3JvdXBNZW1iZXJzKX1cbiAgICAgICAgPC9kaXY+XG4gICAgICAgIDxidXR0b24gb25DbGljaz17dGhpcy5kZWxldGVHcm91cC5iaW5kKHRoaXMsIGdyb3VwKX0+RGVsZXRlIEdyb3VwPC9idXR0b24+XG4gICAgICA8L2Rpdj5cbiAgICApO1xuICB9LFxuXG5cdHJlbmRlcjogZnVuY3Rpb24oKSB7XG4gICAgcmV0dXJuKFxuICAgICAgPGRpdj5cbiAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJmb3JtXCI+XG4gICAgICAgICAgPGgxPkFkZCBOZXcgR3JvdXA8L2gxPlxuICAgICAgICAgIDxmb3JtIG9uU3VibWl0PXt0aGlzLmFkZEdyb3VwfT5cbiAgICAgICAgICAgIDxpbnB1dCB0eXBlPVwidGV4dFwiIHJlZj1cIm5ld0dyb3VwXCIgcGxhY2Vob2xkZXI9XCJHcm91cCBOYW1lXCJcbiAgICAgICAgICAgICAgdmFsdWU9e3RoaXMuc3RhdGUubmV3R3JvdXB9IG9uQ2hhbmdlPXt0aGlzLnVwZGF0ZU5ld0dyb3VwfS8+XG4gICAgICAgICAgPC9mb3JtPlxuICAgICAgICA8L2Rpdj5cbiAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJncm91cHNDb250YWluZXJcIj5cbiAgICAgICAgICB7dGhpcy5zdGF0ZS5ncm91cHMubWFwKHRoaXMucmVuZGVyR3JvdXBzKX1cbiAgICAgICAgPC9kaXY+XG4gICAgICA8L2Rpdj5cbiAgICApO1xuXHR9XG5cbn0pO1xuXG5tb2R1bGUuZXhwb3J0cyA9IEdyb3Vwc0xpc3Q7XG4iLCJ2YXIgZmx1eCA9IHJlcXVpcmUoJ2ZsdXgtcmVhY3QnKTtcbnZhciBhY3Rpb25zID0gcmVxdWlyZSgnLi9hY3Rpb25zLmpzJyk7XG5cbm1vZHVsZS5leHBvcnRzID0gZmx1eC5jcmVhdGVTdG9yZSh7XG4gIHVzZXJzOiBbe2lkOiAxLCBuYW1lOidDaHJpcyBXZWVrcycsIGdyb3VwczogWydJbnRlck5hdGlvbnMnLCAnTWFrZXJzIEFjYWRlbXknLCAnTGFuY2FzdGVyIFVuaXZlcnNpdHknXSB9LFxuICAgICAgICAgIHtpZDogMiwgbmFtZTonTmF0aGFuaWVsIEdyZWVuJywgZ3JvdXBzOiBbJ01ha2VycyBBY2FkZW15JywgJ0xhbmNhc3RlciBVbml2ZXJzaXR5J10gfSxcbiAgICAgICAgICB7aWQ6IDMsIG5hbWU6J0Fhcm9uIEtlbmRhbGwnLCBncm91cHM6IFsnTWFrZXJzIEFjYWRlbXknXSB9XSxcblxuICBncm91cHM6IFt7aWQ6IDEsIG5hbWU6ICdJbnRlck5hdGlvbnMnLCBtZW1iZXJzOiBbJ0NocmlzIFdlZWtzJ10gfSxcbiAgICAgICAgICAge2lkOiAyLCBuYW1lOiAnTWFrZXJzIEFjYWRlbXknLCBtZW1iZXJzOiBbJ0NocmlzIFdlZWtzJywgJ05hdGhhbmllbCBHcmVlbicsICdBYXJvbiBLZW5kYWxsJ10gfSxcbiAgICAgICAgICAge2lkOiAzLCBuYW1lOiAnTGFuY2FzdGVyIFVuaXZlcnNpdHknLCBtZW1iZXJzOiBbJ0NocmlzIFdlZWtzJywgJ05hdGhhbmllbCBHcmVlbiddIH1dLFxuXG4gIGFjdGlvbnM6IFtcbiAgICBhY3Rpb25zLmFkZFVzZXIsXG4gICAgYWN0aW9ucy5hZGRHcm91cCxcbiAgICBhY3Rpb25zLmFkZFVzZXJUb0dyb3VwLFxuICAgIGFjdGlvbnMua2lja1VzZXJGcm9tR3JvdXAsXG4gICAgYWN0aW9ucy5kZWxldGVVc2VyLFxuICAgIGFjdGlvbnMuZGVsZXRlR3JvdXBcbiAgXSxcblxuICBnZXRHcm91cEJ5TmFtZTogZnVuY3Rpb24obmFtZSl7XG4gICAgIGZvcih2YXIgaT0wOyBpIDwgdGhpcy5ncm91cHMubGVuZ3RoOyBpKyspe1xuICAgICAgIGlmKHRoaXMuZ3JvdXBzW2ldLm5hbWUgPT0gbmFtZSl7XG4gICAgICAgICByZXR1cm4gdGhpcy5ncm91cHNbaV1cbiAgICAgICB9XG4gICAgIH07XG4gIH0sXG5cbiAgZ2V0VXNlckJ5TmFtZTogZnVuY3Rpb24obmFtZSl7XG4gICAgIGZvcih2YXIgaT0wOyBpIDwgdGhpcy5ncm91cHMubGVuZ3RoOyBpKyspe1xuICAgICAgIGlmKHRoaXMudXNlcnNbaV0ubmFtZSA9PSBuYW1lKXtcbiAgICAgICAgIHJldHVybiB0aGlzLnVzZXJzW2ldXG4gICAgICAgfVxuICAgICB9O1xuICB9LFxuXG4gIHVzZXJBbHJlYWR5RXhpc3RzOiBmdW5jdGlvbih1c2VyTmFtZSkge1xuICAgIGZvcih2YXIgaT0wOyBpIDwgdGhpcy51c2Vycy5sZW5ndGg7IGkrKyl7XG4gICAgICBpZih0aGlzLnVzZXJzW2ldLm5hbWUgPT0gdXNlck5hbWUpe1xuICAgICAgICByZXR1cm4gdHJ1ZVxuICAgICAgfVxuICAgIH1cbiAgfSxcblxuICBncm91cFByb3ZpZGVkOiBmdW5jdGlvbihncm91cCkge1xuICAgIGlmKGdyb3VwID09ICcnKXtcbiAgICAgIHJldHVybiBhbGVydCgnUGxlYXNlIHNlbGVjdCBhIGdyb3VwJylcbiAgICB9XG4gIH0sXG5cbiAgaXNBTWVtYmVyOiBmdW5jdGlvbih1c2VyTmFtZSwgZ3JvdXApIHtcbiAgICBmb3IodmFyIGk9MDsgaTxncm91cC5tZW1iZXJzLmxlbmd0aDsgaSsrKXtcbiAgICAgIGlmKGdyb3VwLm1lbWJlcnNbaV0gPT0gdXNlck5hbWUpe1xuICAgICAgICByZXR1cm4gdHJ1ZVxuICAgICAgfVxuICAgIH1cbiAgfSxcblxuICBkZWxldGVVc2VyRnJvbVVzZXJzOiBmdW5jdGlvbih1c2VyKSB7XG4gICAgZm9yKHZhciBpPTA7IGkgPCB0aGlzLnVzZXJzLmxlbmd0aDsgaSsrKXtcbiAgICAgIGlmKHVzZXIuaWQgPT0gdGhpcy51c2Vyc1tpXS5pZCl7XG4gICAgICAgIHRoaXMudXNlcnMuc3BsaWNlKGksIDEpO1xuICAgICAgfVxuICAgIH07XG4gIH0sXG5cbiAgZGVsZXRlVXNlckZyb21Hcm91cHM6IGZ1bmN0aW9uKHVzZXIpIHtcbiAgICBmb3IodmFyIGk9MDsgaSA8IHRoaXMuZ3JvdXBzLmxlbmd0aDsgaSsrKXtcbiAgICAgIGZvcih2YXIgaj0wOyBqIDwgdGhpcy5ncm91cHNbaV0ubWVtYmVycy5sZW5ndGg7IGorKyl7XG4gICAgICAgIGlmKHVzZXIubmFtZSA9PSB0aGlzLmdyb3Vwc1tpXS5tZW1iZXJzW2pdKXtcbiAgICAgICAgICB0aGlzLmdyb3Vwc1tpXS5tZW1iZXJzLnNwbGljZShqLCAxKVxuICAgICAgICB9XG4gICAgICB9XG4gICAgfTtcbiAgfSxcblxuICBkZWxldGVVc2VyRnJvbUdyb3VwOiBmdW5jdGlvbih1c2VyTmFtZSwgZ3JvdXBOYW1lKSB7XG4gICAgdmFyIGdyb3VwID0gdGhpcy5nZXRHcm91cEJ5TmFtZShncm91cE5hbWUpO1xuICAgIGZvcih2YXIgaT0wOyBpIDwgZ3JvdXAubWVtYmVycy5sZW5ndGg7IGkrKyl7XG4gICAgICBpZihncm91cC5tZW1iZXJzW2ldID09IHVzZXJOYW1lKXtcbiAgICAgICAgZ3JvdXAubWVtYmVycy5zcGxpY2UoaSwxKTtcbiAgICAgIH1cbiAgICB9O1xuICB9LFxuXG4gIGRlbGV0ZUdyb3VwRnJvbVVzZXI6IGZ1bmN0aW9uKHVzZXJOYW1lLCBncm91cE5hbWUpIHtcbiAgICB2YXIgdXNlciA9IHRoaXMuZ2V0VXNlckJ5TmFtZSh1c2VyTmFtZSk7XG4gICAgZm9yKHZhciBpPTA7IGkgPCB1c2VyLmdyb3Vwcy5sZW5ndGg7IGkrKyl7XG4gICAgICBpZih1c2VyLmdyb3Vwc1tpXSA9PSBncm91cE5hbWUpe1xuICAgICAgICB1c2VyLmdyb3Vwcy5zcGxpY2UoaSwxKTtcbiAgICAgIH1cbiAgICB9O1xuICB9LFxuXG4gIGFkZFVzZXI6IGZ1bmN0aW9uKHVzZXJOYW1lLCBncm91cCkge1xuICAgIGlmKHRoaXMudXNlckFscmVhZHlFeGlzdHModXNlck5hbWUpKXsgcmV0dXJuIGFsZXJ0KCdUaGF0IHVzZXIgYWxyZWFkeSBleGlzdHMnKSB9O1xuICAgIHRoaXMuZ3JvdXBQcm92aWRlZChncm91cClcbiAgICB0aGlzLnVzZXJzLnB1c2goeyBpZDoodGhpcy51c2Vycy5sZW5ndGgrMSksIG5hbWU6IHVzZXJOYW1lLCBncm91cHM6IGdyb3VwfSk7XG4gICAgdGhpcy5nZXRHcm91cEJ5TmFtZShncm91cCkubWVtYmVycy5wdXNoKHVzZXJOYW1lKTtcbiAgICB0aGlzLmVtaXRDaGFuZ2UoKTtcbiAgfSxcblxuICBhZGRHcm91cDogZnVuY3Rpb24oZ3JvdXApIHtcbiAgICB0aGlzLmdyb3Vwcy5wdXNoKHsgaWQ6KHRoaXMuZ3JvdXBzLmxlbmd0aCsxKSwgbmFtZTogZ3JvdXAgLCBtZW1iZXJzOiBbXX0pO1xuICAgIHRoaXMuZW1pdENoYW5nZSgpO1xuICB9LFxuXG4gIGFkZFVzZXJUb0dyb3VwOiBmdW5jdGlvbih1c2VyTmFtZSwgZ3JvdXBOYW1lKSB7XG4gICAgdmFyIGdyb3VwID0gdGhpcy5nZXRHcm91cEJ5TmFtZShncm91cE5hbWUpXG4gICAgdmFyIHVzZXIgPSB0aGlzLmdldFVzZXJCeU5hbWUodXNlck5hbWUpXG4gICAgdGhpcy5ncm91cFByb3ZpZGVkKGdyb3VwKTtcbiAgICBpZih0aGlzLnVzZXJBbHJlYWR5RXhpc3RzKHVzZXJOYW1lKSAhPSB0cnVlKXtcbiAgICAgIHJldHVybiBhbGVydCh1c2VyTmFtZSsnIGRvZXMgbm90IGV4aXN0JylcbiAgICB9O1xuICAgIGlmKHRoaXMuaXNBTWVtYmVyKHVzZXJOYW1lLCBncm91cCkpe1xuICAgICAgcmV0dXJuIGFsZXJ0KHVzZXJOYW1lKycgaXMgYWxyZWFkeSBhIG1lbWJlciBvZiAnK2dyb3VwLm5hbWUpXG4gICAgfTtcbiAgICBncm91cC5tZW1iZXJzLnB1c2godXNlci5uYW1lKTtcbiAgICB1c2VyLmdyb3Vwcy5wdXNoKGdyb3VwLm5hbWUpO1xuICAgIHRoaXMuZW1pdENoYW5nZSgpO1xuICB9LFxuXG4gIGtpY2tVc2VyRnJvbUdyb3VwOiBmdW5jdGlvbih1c2VyTmFtZSwgZ3JvdXBOYW1lKSB7XG4gICAgdGhpcy5kZWxldGVVc2VyRnJvbUdyb3VwKHVzZXJOYW1lLCBncm91cE5hbWUpO1xuICAgIHRoaXMuZGVsZXRlR3JvdXBGcm9tVXNlcih1c2VyTmFtZSwgZ3JvdXBOYW1lKTtcbiAgICB0aGlzLmVtaXRDaGFuZ2UoKTtcbiAgfSxcblxuICBkZWxldGVVc2VyOiBmdW5jdGlvbih1c2VyKSB7XG4gICAgdGhpcy5kZWxldGVVc2VyRnJvbVVzZXJzKHVzZXIpO1xuICAgIHRoaXMuZGVsZXRlVXNlckZyb21Hcm91cHModXNlcik7XG4gICAgdGhpcy5lbWl0Q2hhbmdlKCk7XG4gIH0sXG5cbiAgZGVsZXRlR3JvdXA6IGZ1bmN0aW9uKGdyb3VwKSB7XG4gICAgaWYoZ3JvdXAubWVtYmVycy5sZW5ndGggPT0gMCl7XG4gICAgICBmb3IodmFyIGk9MDsgaSA8IHRoaXMuZ3JvdXBzLmxlbmd0aDsgaSsrKXtcbiAgICAgICAgaWYoZ3JvdXAuaWQgPT0gdGhpcy5ncm91cHNbaV0uaWQpe1xuICAgICAgICAgIHRoaXMuZ3JvdXBzLnNwbGljZShpLCAxKTtcbiAgICAgICAgICB0aGlzLmVtaXRDaGFuZ2UoKTtcbiAgICAgICAgfVxuICAgICAgfTtcbiAgICB9XG4gICAgZWxzZXtcbiAgICAgIGFsZXJ0KFwiQ2FuIG9ubHkgZGVsZXRlIGVtcHR5IGdyb3Vwc1wiKVxuICAgIH1cbiAgfSxcblxuICBleHBvcnRzOiB7XG4gICAgZ2V0VXNlcnM6IGZ1bmN0aW9uKCkge1xuICAgICAgcmV0dXJuIHRoaXMudXNlcnM7XG4gICAgfSxcbiAgICBnZXRHcm91cHM6IGZ1bmN0aW9uKCkge1xuICAgICAgcmV0dXJuIHRoaXMuZ3JvdXBzXG4gICAgfVxuICB9XG59KTtcbiIsInZhciBSZWFjdCA9IHJlcXVpcmUoJ3JlYWN0Jyk7XG52YXIgU3RvcmUgPSByZXF1aXJlKCcuL1N0b3JlLmpzJyk7XG52YXIgYWN0aW9ucyA9IHJlcXVpcmUoJy4vYWN0aW9ucy5qcycpO1xuXG52YXIgVXNlcnNMaXN0ID0gUmVhY3QuY3JlYXRlQ2xhc3Moe1xuICBnZXRJbml0aWFsU3RhdGU6IGZ1bmN0aW9uKCkge1xuICAgIHJldHVybiB7XG4gICAgICB1c2VyczogU3RvcmUuZ2V0VXNlcnMoKSxcbiAgICAgIGdyb3VwczogU3RvcmUuZ2V0R3JvdXBzKCksXG4gICAgICBuZXdVc2VyOiBcIlwiXG4gICAgfTtcbiAgfSxcblxuICBjb21wb25lbnRXaWxsTW91bnQ6IGZ1bmN0aW9uKCkge1xuICAgIFN0b3JlLmFkZENoYW5nZUxpc3RlbmVyKHRoaXMuY2hhbmdlU3RhdGUpO1xuICB9LFxuXG4gIGNvbXBvbmVudFdpbGxVbm1vdW50OiBmdW5jdGlvbiAoKSB7XG4gICAgU3RvcmUucmVtb3ZlQ2hhbmdlTGlzdGVuZXIodGhpcy5jaGFuZ2VTdGF0ZSk7XG4gIH0sXG5cbiAgY2hhbmdlU3RhdGU6IGZ1bmN0aW9uKCkge1xuICAgIHRoaXMuc2V0U3RhdGUoe1xuICAgICAgdXNlcnM6IFN0b3JlLmdldFVzZXJzKCksXG4gICAgICBncm91cHM6IFN0b3JlLmdldEdyb3VwcygpXG4gICAgfSk7XG4gIH0sXG5cbiAgdXBkYXRlTmV3VXNlcjogZnVuY3Rpb24oZXZlbnQpIHtcbiAgICB0aGlzLnNldFN0YXRlKHtcbiAgICAgIG5ld1VzZXI6IGV2ZW50LnRhcmdldC52YWx1ZVxuICAgIH0pXG4gIH0sXG5cbiAgYWRkVXNlcjogZnVuY3Rpb24oZXZlbnQpIHtcbiAgICBldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xuICAgIHZhciB1c2VyTmFtZSA9IHRoaXMucmVmcy5uZXdVc2VyLnZhbHVlO1xuICAgIHZhciBzZWxlY3RlZEdyb3VwID0gdGhpcy5yZWZzLnNlbGVjdGVkR3JvdXAudmFsdWU7XG4gICAgYWN0aW9ucy5hZGRVc2VyKHVzZXJOYW1lLCBzZWxlY3RlZEdyb3VwKTtcbiAgICB0aGlzLnNldFN0YXRlKHtcbiAgICAgIG5ld1VzZXI6ICcnXG4gICAgfSlcbiAgfSxcblxuICBkZWxldGVVc2VyOiBmdW5jdGlvbih1c2VyKSB7XG4gICAgYWN0aW9ucy5kZWxldGVVc2VyKHVzZXIpO1xuICB9LFxuXG4gIHJlbmRlckdyb3VwRHJvcERvd246IGZ1bmN0aW9uKGdyb3VwKSB7XG4gICAgcmV0dXJuKFxuICAgICAgPG9wdGlvbiBrZXk9e2dyb3VwLmlkfSB2YWx1ZT17Z3JvdXAubmFtZX0+e2dyb3VwLm5hbWV9PC9vcHRpb24+XG4gICAgKTtcbiAgfSxcblxuICByZW5kZXJHcm91cHM6IGZ1bmN0aW9uKHVzZXJHcm91cCwgaSkge1xuICAgIHJldHVybihcbiAgICAgIDxkaXYgY2xhc3NOYW1lPSdVc2VyR3JvdXAnIGtleT17aX0+XG4gICAgICAgIHt1c2VyR3JvdXB9XG4gICAgICA8L2Rpdj5cbiAgICApO1xuICB9LFxuXG4gIHJlbmRlclVzZXJzOiBmdW5jdGlvbih1c2VyKSB7XG4gICAgcmV0dXJuKFxuICAgICAgPGRpdiBjbGFzc05hbWU9XCJ1c2VyQ29udGFpbmVyXCIga2V5PXt1c2VyLmlkfT5cbiAgICAgICAgPGRpdj5cbiAgICAgICAgICA8aDM+e3VzZXIubmFtZX08L2gzPlxuICAgICAgICA8L2Rpdj5cbiAgICAgICAgPGRpdj57dXNlci5ncm91cHMubWFwKHRoaXMucmVuZGVyR3JvdXBzKX08L2Rpdj5cbiAgICAgICAgPGJ1dHRvbiBvbkNsaWNrPXt0aGlzLmRlbGV0ZVVzZXIuYmluZCh0aGlzLCB1c2VyKX0+RGVsZXRlIFVzZXI8L2J1dHRvbj5cbiAgICAgIDwvZGl2PlxuICAgICk7XG4gIH0sXG5cblx0cmVuZGVyOiBmdW5jdGlvbigpIHtcbiAgICByZXR1cm4oXG4gICAgICA8ZGl2PlxuICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImZvcm1cIj5cbiAgICAgICAgICA8aDE+QWRkIE5ldyBVc2VyPC9oMT5cbiAgICAgICAgICA8Zm9ybSBvblN1Ym1pdD17dGhpcy5hZGRVc2VyfT5cbiAgICAgICAgICAgIDxpbnB1dCB0eXBlPVwidGV4dFwiIHJlZj1cIm5ld1VzZXJcIiBwbGFjZWhvbGRlcj1cIlVzZXIgTmFtZVwiXG4gICAgICAgICAgICAgIHZhbHVlPXt0aGlzLnN0YXRlLm5ld1VzZXJ9IG9uQ2hhbmdlPXt0aGlzLnVwZGF0ZU5ld1VzZXJ9Lz5cbiAgICAgICAgICAgIDxzZWxlY3QgbmFtZT0nZ3JvdXBzJyByZWY9XCJzZWxlY3RlZEdyb3VwXCIgZGVmYXVsdFZhbHVlPVwiXCI+XG4gICAgICAgICAgICAgIDxvcHRpb24gdmFsdWU9XCJcIj5QbGVhc2Ugc2VsZWN0IGEgZ3JvdXAuLi48L29wdGlvbj5cbiAgICAgICAgICAgICAge3RoaXMuc3RhdGUuZ3JvdXBzLm1hcCh0aGlzLnJlbmRlckdyb3VwRHJvcERvd24pfVxuICAgICAgICAgICAgPC9zZWxlY3Q+XG4gICAgICAgICAgPC9mb3JtPlxuICAgICAgICA8L2Rpdj5cbiAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJ1c2Vyc0NvbnRhaW5lclwiPlxuICAgICAgICAgIHt0aGlzLnN0YXRlLnVzZXJzLm1hcCh0aGlzLnJlbmRlclVzZXJzKX1cbiAgICAgICAgPC9kaXY+XG4gICAgICA8L2Rpdj5cbiAgICApO1xuXHR9XG5cbn0pO1xuXG5tb2R1bGUuZXhwb3J0cyA9IFVzZXJzTGlzdDtcbiIsInZhciBmbHV4ID0gcmVxdWlyZSgnZmx1eC1yZWFjdCcpO1xuXG5tb2R1bGUuZXhwb3J0cyA9IGZsdXguY3JlYXRlQWN0aW9ucyhbXG4gICdhZGRVc2VyJyxcbiAgJ2FkZEdyb3VwJyxcbiAgJ2FkZFVzZXJUb0dyb3VwJyxcbiAgJ2tpY2tVc2VyRnJvbUdyb3VwJyxcbiAgJ2RlbGV0ZVVzZXInLFxuICAnZGVsZXRlR3JvdXAnXG5dKTtcbiIsInZhciBSZWFjdCA9IHJlcXVpcmUoJ3JlYWN0Jyk7XG52YXIgQXBwID0gcmVxdWlyZSgnLi9BcHAuanMnKTtcblxuUmVhY3QucmVuZGVyKDxBcHAvPiwgZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJjb250ZW50XCIpKTtcbiJdfQ==
