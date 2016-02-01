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

  actions: [actions.addUser, actions.addGroup, actions.addUserToGroup, actions.kickUserFromGroup, actions.deleteUser],

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

module.exports = flux.createActions(['addUser', 'addGroup', 'addUserToGroup', 'kickUserFromGroup', 'deleteUser']);

},{"flux-react":"flux-react"}],"/home/chweeks/Desktop/projects/internations-react/app/main.js":[function(require,module,exports){
'use strict';

var React = require('react');
var App = require('./App.js');

React.render(React.createElement(App, null), document.getElementById("content"));

},{"./App.js":"/home/chweeks/Desktop/projects/internations-react/app/App.js","react":"react"}]},{},["/home/chweeks/Desktop/projects/internations-react/app/main.js"])
//# sourceMappingURL=data:application/json;charset:utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9icm93c2VyaWZ5L25vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCIvaG9tZS9jaHdlZWtzL0Rlc2t0b3AvcHJvamVjdHMvaW50ZXJuYXRpb25zLXJlYWN0L2FwcC9BcHAuanMiLCIvaG9tZS9jaHdlZWtzL0Rlc2t0b3AvcHJvamVjdHMvaW50ZXJuYXRpb25zLXJlYWN0L2FwcC9FZGl0R3JvdXBzLmpzIiwiL2hvbWUvY2h3ZWVrcy9EZXNrdG9wL3Byb2plY3RzL2ludGVybmF0aW9ucy1yZWFjdC9hcHAvR3JvdXBzTGlzdC5qcyIsIi9ob21lL2Nod2Vla3MvRGVza3RvcC9wcm9qZWN0cy9pbnRlcm5hdGlvbnMtcmVhY3QvYXBwL1N0b3JlLmpzIiwiL2hvbWUvY2h3ZWVrcy9EZXNrdG9wL3Byb2plY3RzL2ludGVybmF0aW9ucy1yZWFjdC9hcHAvVXNlcnNMaXN0LmpzIiwiL2hvbWUvY2h3ZWVrcy9EZXNrdG9wL3Byb2plY3RzL2ludGVybmF0aW9ucy1yZWFjdC9hcHAvYWN0aW9ucy5qcyIsIi9ob21lL2Nod2Vla3MvRGVza3RvcC9wcm9qZWN0cy9pbnRlcm5hdGlvbnMtcmVhY3QvYXBwL21haW4uanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7OztBQ0FBLElBQUksS0FBSyxHQUFHLE9BQU8sQ0FBQyxPQUFPLENBQUMsQ0FBQztBQUM3QixJQUFJLFNBQVMsR0FBRyxPQUFPLENBQUMsZ0JBQWdCLENBQUMsQ0FBQztBQUMxQyxJQUFJLFVBQVUsR0FBRyxPQUFPLENBQUMsaUJBQWlCLENBQUMsQ0FBQTtBQUMzQyxJQUFJLFVBQVUsR0FBRyxPQUFPLENBQUMsaUJBQWlCLENBQUMsQ0FBQTs7QUFFM0MsSUFBSSxHQUFHLEdBQUcsS0FBSyxDQUFDLFdBQVcsQ0FBQzs7O0FBRTNCLFFBQU0sRUFBRSxrQkFBVztBQUNoQixXQUNFOzs7TUFDRSxvQkFBQyxTQUFTLE9BQUc7TUFDYixvQkFBQyxVQUFVLE9BQUc7TUFD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R0FBRyxPQUFPLENBQUMsT0FBTyxDQUFDLENBQUM7QUFDN0IsSUFBSSxHQUFHLEdBQUcsT0FBTyxDQUFDLFVBQVUsQ0FBQyxDQUFDOztBQUU5QixLQUFLLENBQUMsTUFBTSxDQUFDLG9CQUFDLEdBQUcsT0FBRSxFQUFFLFFBQVEsQ0FBQyxjQUFjLENBQUMsU0FBUyxDQUFDLENBQUMsQ0FBQyIsImZpbGUiOiJnZW5lcmF0ZWQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlc0NvbnRlbnQiOlsiKGZ1bmN0aW9uIGUodCxuLHIpe2Z1bmN0aW9uIHMobyx1KXtpZighbltvXSl7aWYoIXRbb10pe3ZhciBhPXR5cGVvZiByZXF1aXJlPT1cImZ1bmN0aW9uXCImJnJlcXVpcmU7aWYoIXUmJmEpcmV0dXJuIGEobywhMCk7aWYoaSlyZXR1cm4gaShvLCEwKTt2YXIgZj1uZXcgRXJyb3IoXCJDYW5ub3QgZmluZCBtb2R1bGUgJ1wiK28rXCInXCIpO3Rocm93IGYuY29kZT1cIk1PRFVMRV9OT1RfRk9VTkRcIixmfXZhciBsPW5bb109e2V4cG9ydHM6e319O3Rbb11bMF0uY2FsbChsLmV4cG9ydHMsZnVuY3Rpb24oZSl7dmFyIG49dFtvXVsxXVtlXTtyZXR1cm4gcyhuP246ZSl9LGwsbC5leHBvcnRzLGUsdCxuLHIpfXJldHVybiBuW29dLmV4cG9ydHN9dmFyIGk9dHlwZW9mIHJlcXVpcmU9PVwiZnVuY3Rpb25cIiYmcmVxdWlyZTtmb3IodmFyIG89MDtvPHIubGVuZ3RoO28rKylzKHJbb10pO3JldHVybiBzfSkiLCJ2YXIgUmVhY3QgPSByZXF1aXJlKCdyZWFjdCcpO1xudmFyIFVzZXJzTGlzdCA9IHJlcXVpcmUoJy4vVXNlcnNMaXN0LmpzJyk7XG52YXIgR3JvdXBzTGlzdCA9IHJlcXVpcmUoJy4vR3JvdXBzTGlzdC5qcycpXG52YXIgRWRpdEdyb3VwcyA9IHJlcXVpcmUoJy4vRWRpdEdyb3Vwcy5qcycpXG5cbnZhciBBcHAgPSBSZWFjdC5jcmVhdGVDbGFzcyh7XG5cblx0cmVuZGVyOiBmdW5jdGlvbigpIHtcbiAgICByZXR1cm4oXG4gICAgICA8ZGl2PlxuICAgICAgICA8VXNlcnNMaXN0IC8+XG4gICAgICAgIDxHcm91cHNMaXN0IC8+XG4gICAgICAgIDxFZGl0R3JvdXBzIC8+XG4gICAgICA8L2Rpdj5cbiAgICApO1xuXHR9XG5cbn0pO1xuXG5tb2R1bGUuZXhwb3J0cyA9IEFwcDtcbiIsInZhciBSZWFjdCA9IHJlcXVpcmUoJ3JlYWN0Jyk7XG52YXIgU3RvcmUgPSByZXF1aXJlKCcuL1N0b3JlLmpzJyk7XG52YXIgYWN0aW9ucyA9IHJlcXVpcmUoJy4vYWN0aW9ucy5qcycpO1xuXG52YXIgRWRpdEdyb3VwcyA9IFJlYWN0LmNyZWF0ZUNsYXNzKHtcbiAgZ2V0SW5pdGlhbFN0YXRlOiBmdW5jdGlvbigpIHtcbiAgICByZXR1cm4ge1xuICAgICAgdXNlcnM6IFN0b3JlLmdldFVzZXJzKCksXG4gICAgICBncm91cHM6IFN0b3JlLmdldEdyb3VwcygpLFxuICAgICAgdXNlcjogXCJcIlxuICAgIH07XG4gIH0sXG5cbiAgY29tcG9uZW50V2lsbE1vdW50OiBmdW5jdGlvbigpIHtcbiAgICBTdG9yZS5hZGRDaGFuZ2VMaXN0ZW5lcih0aGlzLmNoYW5nZVN0YXRlKTtcbiAgfSxcblxuICBjb21wb25lbnRXaWxsVW5tb3VudDogZnVuY3Rpb24gKCkge1xuICAgIFN0b3JlLnJlbW92ZUNoYW5nZUxpc3RlbmVyKHRoaXMuY2hhbmdlU3RhdGUpO1xuICB9LFxuXG4gIGNoYW5nZVN0YXRlOiBmdW5jdGlvbigpIHtcbiAgICB0aGlzLnNldFN0YXRlKHtcbiAgICAgIHVzZXJzOiBTdG9yZS5nZXRVc2VycygpLFxuICAgICAgZ3JvdXBzOiBTdG9yZS5nZXRHcm91cHMoKVxuICAgIH0pO1xuICB9LFxuXG4gIHVwZGF0ZVVzZXI6IGZ1bmN0aW9uKGV2ZW50KSB7XG4gICAgdGhpcy5zZXRTdGF0ZSh7XG4gICAgIHVzZXI6IGV2ZW50LnRhcmdldC52YWx1ZVxuICAgIH0pXG4gIH0sXG5cbiAgcmVuZGVyR3JvdXBEcm9wRG93bjogZnVuY3Rpb24oZ3JvdXApIHtcbiAgICByZXR1cm4oXG4gICAgICA8b3B0aW9uIGtleT17Z3JvdXAuaWR9IHZhbHVlPXtncm91cC5uYW1lfT57Z3JvdXAubmFtZX08L29wdGlvbj5cbiAgICApO1xuICB9LFxuXG4gIHJlbmRlckdyb3VwczogZnVuY3Rpb24odXNlckdyb3VwLCBpKSB7XG4gICAgcmV0dXJuKFxuICAgICAgPGRpdiBjbGFzc05hbWU9J1VzZXJHcm91cCcga2V5PXtpfT5cbiAgICAgICAge3VzZXJHcm91cH1cbiAgICAgIDwvZGl2PlxuICAgICk7XG4gIH0sXG5cbiAgYWRkVXNlclRvR3JvdXA6IGZ1bmN0aW9uKGV2ZW50KSB7XG4gICAgZXZlbnQucHJldmVudERlZmF1bHQoKTtcbiAgICB2YXIgdXNlck5hbWUgPSB0aGlzLnJlZnMudXNlci52YWx1ZTtcbiAgICB2YXIgc2VsZWN0ZWRHcm91cCA9IHRoaXMucmVmcy5zZWxlY3RlZEdyb3VwLnZhbHVlO1xuICAgIGFjdGlvbnMuYWRkVXNlclRvR3JvdXAodXNlck5hbWUsIHNlbGVjdGVkR3JvdXApO1xuICAgIHRoaXMuc2V0U3RhdGUoe1xuICAgICAgdXNlcjogJydcbiAgICB9KVxuICB9LFxuXG4gIGtpY2tVc2VyRnJvbUdyb3VwOiBmdW5jdGlvbigpIHtcbiAgICB2YXIgdXNlck5hbWUgPSB0aGlzLnJlZnMudXNlci52YWx1ZTtcbiAgICB2YXIgc2VsZWN0ZWRHcm91cCA9IHRoaXMucmVmcy5zZWxlY3RlZEdyb3VwLnZhbHVlO1xuICAgIGFjdGlvbnMua2lja1VzZXJGcm9tR3JvdXAodXNlck5hbWUsIHNlbGVjdGVkR3JvdXApO1xuICAgIHRoaXMuc2V0U3RhdGUoe1xuICAgICAgdXNlcjogJydcbiAgICB9KVxuICB9LFxuXG4gIHJlbmRlcjogZnVuY3Rpb24oKSB7XG4gICAgcmV0dXJuKFxuICAgICAgPGRpdiBjbGFzc05hbWU9XCJmb3JtXCI+XG4gICAgICAgIDxoMT5FZGl0IEdyb3VwczwvaDE+XG4gICAgICAgIDxpbnB1dCB0eXBlPVwidGV4dFwiIHJlZj1cInVzZXJcIiBwbGFjZWhvbGRlcj1cIlVzZXIgTmFtZVwiXG4gICAgICAgICAgdmFsdWU9e3RoaXMuc3RhdGUudXNlcn0gb25DaGFuZ2U9e3RoaXMudXBkYXRlVXNlcn0vPlxuICAgICAgICA8c2VsZWN0IG5hbWU9J2dyb3VwcycgcmVmPVwic2VsZWN0ZWRHcm91cFwiIGRlZmF1bHRWYWx1ZT1cIlwiPlxuICAgICAgICAgIDxvcHRpb24gdmFsdWU9XCJcIj5QbGVhc2Ugc2VsZWN0IGEgZ3JvdXAuLi48L29wdGlvbj5cbiAgICAgICAgICB7dGhpcy5zdGF0ZS5ncm91cHMubWFwKHRoaXMucmVuZGVyR3JvdXBEcm9wRG93bil9XG4gICAgICAgIDwvc2VsZWN0PlxuICAgICAgICA8ZGl2PlxuICAgICAgICAgIDxidXR0b24gb25DbGljaz17dGhpcy5hZGRVc2VyVG9Hcm91cH0+QWRkIFRvIEdyb3VwPC9idXR0b24+XG4gICAgICAgICAgPGJ1dHRvbiBvbkNsaWNrPXt0aGlzLmtpY2tVc2VyRnJvbUdyb3VwfT5SZW1vdmUgRnJvbSBHcm91cDwvYnV0dG9uPlxuICAgICAgICA8L2Rpdj5cbiAgICAgIDwvZGl2PlxuICAgICk7XG4gIH1cblxufSk7XG5cbm1vZHVsZS5leHBvcnRzID0gRWRpdEdyb3VwcztcbiIsInZhciBSZWFjdCA9IHJlcXVpcmUoJ3JlYWN0Jyk7XG52YXIgU3RvcmUgPSByZXF1aXJlKCcuL1N0b3JlLmpzJyk7XG52YXIgYWN0aW9ucyA9IHJlcXVpcmUoJy4vYWN0aW9ucy5qcycpO1xuXG52YXIgR3JvdXBzTGlzdCA9IFJlYWN0LmNyZWF0ZUNsYXNzKHtcbiAgZ2V0SW5pdGlhbFN0YXRlOiBmdW5jdGlvbigpIHtcbiAgICByZXR1cm4ge1xuICAgICAgZ3JvdXBzOiBTdG9yZS5nZXRHcm91cHMoKSxcbiAgICAgIHVzZXJzOiBTdG9yZS5nZXRVc2VycygpLFxuICAgICAgbmV3R3JvdXA6IFwiXCJcbiAgICB9O1xuICB9LFxuXG4gIGNvbXBvbmVudFdpbGxNb3VudDogZnVuY3Rpb24oKSB7XG4gICAgU3RvcmUuYWRkQ2hhbmdlTGlzdGVuZXIodGhpcy5jaGFuZ2VTdGF0ZSk7XG4gIH0sXG5cbiAgY29tcG9uZW50V2lsbFVubW91bnQ6IGZ1bmN0aW9uICgpIHtcbiAgICBTdG9yZS5yZW1vdmVDaGFuZ2VMaXN0ZW5lcih0aGlzLmNoYW5nZVN0YXRlKTtcbiAgfSxcblxuICBjaGFuZ2VTdGF0ZTogZnVuY3Rpb24oKSB7XG4gICAgdGhpcy5zZXRTdGF0ZSh7XG4gICAgICBncm91cHM6IFN0b3JlLmdldEdyb3VwcygpLFxuICAgICAgdXNlcnM6IFN0b3JlLmdldFVzZXJzKClcbiAgICB9KTtcbiAgfSxcblxuICB1cGRhdGVOZXdHcm91cDogZnVuY3Rpb24oZXZlbnQpIHtcbiAgICB0aGlzLnNldFN0YXRlKHtcbiAgICAgIG5ld0dyb3VwOiBldmVudC50YXJnZXQudmFsdWVcbiAgICB9KVxuICB9LFxuXG4gIGFkZEdyb3VwOiBmdW5jdGlvbihldmVudCkge1xuICAgIGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XG4gICAgdmFyIGlucHV0ID0gdGhpcy5yZWZzLm5ld0dyb3VwO1xuICAgIGFjdGlvbnMuYWRkR3JvdXAoaW5wdXQudmFsdWUpO1xuICAgIHRoaXMuc2V0U3RhdGUoe1xuICAgICAgbmV3R3JvdXA6ICcnXG4gICAgfSlcbiAgfSxcblxuICByZW5kZXJHcm91cE1lbWJlcnM6IGZ1bmN0aW9uKGdyb3VwTWVtYmVyLCBpKSB7XG4gICAgcmV0dXJuKFxuICAgICAgPGRpdiBjbGFzc05hbWU9J2dyb3VwTWVtYmVyJyBrZXk9e2l9PlxuICAgICAgICB7Z3JvdXBNZW1iZXJ9XG4gICAgICA8L2Rpdj5cbiAgICApO1xuICB9LFxuXG4gIHJlbmRlckdyb3VwczogZnVuY3Rpb24oZ3JvdXApIHtcbiAgICByZXR1cm4gKFxuICAgICAgPGRpdiBjbGFzc05hbWU9J2dyb3VwQ29udGFpbmVyJyBrZXk9e2dyb3VwLmlkfT5cbiAgICAgICAgPGRpdj5cbiAgICAgICAgICA8aDM+e2dyb3VwLm5hbWV9PC9oMz5cbiAgICAgICAgPC9kaXY+XG4gICAgICAgIDxkaXYgY2xhc3NOYW1lPSdncm91cE1lbWJlcnMnPlxuICAgICAgICAgIHtncm91cC5tZW1iZXJzLm1hcCh0aGlzLnJlbmRlckdyb3VwTWVtYmVycyl9XG4gICAgICAgIDwvZGl2PlxuICAgICAgPC9kaXY+XG4gICAgKTtcbiAgfSxcblxuXHRyZW5kZXI6IGZ1bmN0aW9uKCkge1xuICAgIHJldHVybihcbiAgICAgIDxkaXY+XG4gICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiZm9ybVwiPlxuICAgICAgICAgIDxoMT5BZGQgTmV3IEdyb3VwPC9oMT5cbiAgICAgICAgICA8Zm9ybSBvblN1Ym1pdD17dGhpcy5hZGRHcm91cH0+XG4gICAgICAgICAgICA8aW5wdXQgdHlwZT1cInRleHRcIiByZWY9XCJuZXdHcm91cFwiIHBsYWNlaG9sZGVyPVwiR3JvdXAgTmFtZVwiXG4gICAgICAgICAgICAgIHZhbHVlPXt0aGlzLnN0YXRlLm5ld0dyb3VwfSBvbkNoYW5nZT17dGhpcy51cGRhdGVOZXdHcm91cH0vPlxuICAgICAgICAgIDwvZm9ybT5cbiAgICAgICAgPC9kaXY+XG4gICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiZ3JvdXBzQ29udGFpbmVyXCI+XG4gICAgICAgICAge3RoaXMuc3RhdGUuZ3JvdXBzLm1hcCh0aGlzLnJlbmRlckdyb3Vwcyl9XG4gICAgICAgIDwvZGl2PlxuICAgICAgPC9kaXY+XG4gICAgKTtcblx0fVxuXG59KTtcblxubW9kdWxlLmV4cG9ydHMgPSBHcm91cHNMaXN0O1xuIiwidmFyIGZsdXggPSByZXF1aXJlKCdmbHV4LXJlYWN0Jyk7XG52YXIgYWN0aW9ucyA9IHJlcXVpcmUoJy4vYWN0aW9ucy5qcycpO1xuXG5tb2R1bGUuZXhwb3J0cyA9IGZsdXguY3JlYXRlU3RvcmUoe1xuICB1c2VyczogW3tpZDogMSwgbmFtZTonQ2hyaXMgV2Vla3MnLCBncm91cHM6IFsnSW50ZXJOYXRpb25zJywgJ01ha2VycyBBY2FkZW15JywgJ0xhbmNhc3RlciBVbml2ZXJzaXR5J10gfSxcbiAgICAgICAgICB7aWQ6IDIsIG5hbWU6J05hdGhhbmllbCBHcmVlbicsIGdyb3VwczogWydNYWtlcnMgQWNhZGVteScsICdMYW5jYXN0ZXIgVW5pdmVyc2l0eSddIH0sXG4gICAgICAgICAge2lkOiAzLCBuYW1lOidBYXJvbiBLZW5kYWxsJywgZ3JvdXBzOiBbJ01ha2VycyBBY2FkZW15J10gfV0sXG5cbiAgZ3JvdXBzOiBbe2lkOiAxLCBuYW1lOiAnSW50ZXJOYXRpb25zJywgbWVtYmVyczogWydDaHJpcyBXZWVrcyddIH0sXG4gICAgICAgICAgIHtpZDogMiwgbmFtZTogJ01ha2VycyBBY2FkZW15JywgbWVtYmVyczogWydDaHJpcyBXZWVrcycsICdOYXRoYW5pZWwgR3JlZW4nLCAnQWFyb24gS2VuZGFsbCddIH0sXG4gICAgICAgICAgIHtpZDogMywgbmFtZTogJ0xhbmNhc3RlciBVbml2ZXJzaXR5JywgbWVtYmVyczogWydDaHJpcyBXZWVrcycsICdOYXRoYW5pZWwgR3JlZW4nXSB9XSxcblxuICBhY3Rpb25zOiBbXG4gICAgYWN0aW9ucy5hZGRVc2VyLFxuICAgIGFjdGlvbnMuYWRkR3JvdXAsXG4gICAgYWN0aW9ucy5hZGRVc2VyVG9Hcm91cCxcbiAgICBhY3Rpb25zLmtpY2tVc2VyRnJvbUdyb3VwLFxuICAgIGFjdGlvbnMuZGVsZXRlVXNlclxuICBdLFxuXG4gIGdldEdyb3VwQnlOYW1lOiBmdW5jdGlvbihuYW1lKXtcbiAgICAgZm9yKHZhciBpPTA7IGkgPCB0aGlzLmdyb3Vwcy5sZW5ndGg7IGkrKyl7XG4gICAgICAgaWYodGhpcy5ncm91cHNbaV0ubmFtZSA9PSBuYW1lKXtcbiAgICAgICAgIHJldHVybiB0aGlzLmdyb3Vwc1tpXVxuICAgICAgIH1cbiAgICAgfTtcbiAgfSxcblxuICBnZXRVc2VyQnlOYW1lOiBmdW5jdGlvbihuYW1lKXtcbiAgICAgZm9yKHZhciBpPTA7IGkgPCB0aGlzLmdyb3Vwcy5sZW5ndGg7IGkrKyl7XG4gICAgICAgaWYodGhpcy51c2Vyc1tpXS5uYW1lID09IG5hbWUpe1xuICAgICAgICAgcmV0dXJuIHRoaXMudXNlcnNbaV1cbiAgICAgICB9XG4gICAgIH07XG4gIH0sXG5cbiAgdXNlckFscmVhZHlFeGlzdHM6IGZ1bmN0aW9uKHVzZXJOYW1lKSB7XG4gICAgZm9yKHZhciBpPTA7IGkgPCB0aGlzLnVzZXJzLmxlbmd0aDsgaSsrKXtcbiAgICAgIGlmKHRoaXMudXNlcnNbaV0ubmFtZSA9PSB1c2VyTmFtZSl7XG4gICAgICAgIHJldHVybiB0cnVlXG4gICAgICB9XG4gICAgfVxuICB9LFxuXG4gIGdyb3VwUHJvdmlkZWQ6IGZ1bmN0aW9uKGdyb3VwKSB7XG4gICAgaWYoZ3JvdXAgPT0gJycpe1xuICAgICAgcmV0dXJuIGFsZXJ0KCdQbGVhc2Ugc2VsZWN0IGEgZ3JvdXAnKVxuICAgIH1cbiAgfSxcblxuICBpc0FNZW1iZXI6IGZ1bmN0aW9uKHVzZXJOYW1lLCBncm91cCkge1xuICAgIGZvcih2YXIgaT0wOyBpPGdyb3VwLm1lbWJlcnMubGVuZ3RoOyBpKyspe1xuICAgICAgaWYoZ3JvdXAubWVtYmVyc1tpXSA9PSB1c2VyTmFtZSl7XG4gICAgICAgIHJldHVybiB0cnVlXG4gICAgICB9XG4gICAgfVxuICB9LFxuXG4gIGRlbGV0ZVVzZXJGcm9tVXNlcnM6IGZ1bmN0aW9uKHVzZXIpIHtcbiAgICBmb3IodmFyIGk9MDsgaSA8IHRoaXMudXNlcnMubGVuZ3RoOyBpKyspe1xuICAgICAgaWYodXNlci5pZCA9PSB0aGlzLnVzZXJzW2ldLmlkKXtcbiAgICAgICAgdGhpcy51c2Vycy5zcGxpY2UoaSwgMSk7XG4gICAgICB9XG4gICAgfTtcbiAgfSxcblxuICBkZWxldGVVc2VyRnJvbUdyb3VwczogZnVuY3Rpb24odXNlcikge1xuICAgIGZvcih2YXIgaT0wOyBpIDwgdGhpcy5ncm91cHMubGVuZ3RoOyBpKyspe1xuICAgICAgZm9yKHZhciBqPTA7IGogPCB0aGlzLmdyb3Vwc1tpXS5tZW1iZXJzLmxlbmd0aDsgaisrKXtcbiAgICAgICAgaWYodXNlci5uYW1lID09IHRoaXMuZ3JvdXBzW2ldLm1lbWJlcnNbal0pe1xuICAgICAgICAgIHRoaXMuZ3JvdXBzW2ldLm1lbWJlcnMuc3BsaWNlKGosIDEpXG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9O1xuICB9LFxuXG4gIGRlbGV0ZVVzZXJGcm9tR3JvdXA6IGZ1bmN0aW9uKHVzZXJOYW1lLCBncm91cE5hbWUpIHtcbiAgICB2YXIgZ3JvdXAgPSB0aGlzLmdldEdyb3VwQnlOYW1lKGdyb3VwTmFtZSk7XG4gICAgZm9yKHZhciBpPTA7IGkgPCBncm91cC5tZW1iZXJzLmxlbmd0aDsgaSsrKXtcbiAgICAgIGlmKGdyb3VwLm1lbWJlcnNbaV0gPT0gdXNlck5hbWUpe1xuICAgICAgICBncm91cC5tZW1iZXJzLnNwbGljZShpLDEpO1xuICAgICAgfVxuICAgIH07XG4gIH0sXG5cbiAgZGVsZXRlR3JvdXBGcm9tVXNlcjogZnVuY3Rpb24odXNlck5hbWUsIGdyb3VwTmFtZSkge1xuICAgIHZhciB1c2VyID0gdGhpcy5nZXRVc2VyQnlOYW1lKHVzZXJOYW1lKTtcbiAgICBmb3IodmFyIGk9MDsgaSA8IHVzZXIuZ3JvdXBzLmxlbmd0aDsgaSsrKXtcbiAgICAgIGlmKHVzZXIuZ3JvdXBzW2ldID09IGdyb3VwTmFtZSl7XG4gICAgICAgIHVzZXIuZ3JvdXBzLnNwbGljZShpLDEpO1xuICAgICAgfVxuICAgIH07XG4gIH0sXG5cbiAgYWRkVXNlcjogZnVuY3Rpb24odXNlck5hbWUsIGdyb3VwKSB7XG4gICAgaWYodGhpcy51c2VyQWxyZWFkeUV4aXN0cyh1c2VyTmFtZSkpeyByZXR1cm4gYWxlcnQoJ1RoYXQgdXNlciBhbHJlYWR5IGV4aXN0cycpIH07XG4gICAgdGhpcy5ncm91cFByb3ZpZGVkKGdyb3VwKVxuICAgIHRoaXMudXNlcnMucHVzaCh7IGlkOih0aGlzLnVzZXJzLmxlbmd0aCsxKSwgbmFtZTogdXNlck5hbWUsIGdyb3VwczogZ3JvdXB9KTtcbiAgICB0aGlzLmdldEdyb3VwQnlOYW1lKGdyb3VwKS5tZW1iZXJzLnB1c2godXNlck5hbWUpO1xuICAgIHRoaXMuZW1pdENoYW5nZSgpO1xuICB9LFxuXG4gIGFkZEdyb3VwOiBmdW5jdGlvbihncm91cCkge1xuICAgIHRoaXMuZ3JvdXBzLnB1c2goeyBpZDoodGhpcy5ncm91cHMubGVuZ3RoKzEpLCBuYW1lOiBncm91cCAsIG1lbWJlcnM6IFtdfSk7XG4gICAgdGhpcy5lbWl0Q2hhbmdlKCk7XG4gIH0sXG5cbiAgYWRkVXNlclRvR3JvdXA6IGZ1bmN0aW9uKHVzZXJOYW1lLCBncm91cE5hbWUpIHtcbiAgICB2YXIgZ3JvdXAgPSB0aGlzLmdldEdyb3VwQnlOYW1lKGdyb3VwTmFtZSlcbiAgICB2YXIgdXNlciA9IHRoaXMuZ2V0VXNlckJ5TmFtZSh1c2VyTmFtZSlcbiAgICB0aGlzLmdyb3VwUHJvdmlkZWQoZ3JvdXApO1xuICAgIGlmKHRoaXMudXNlckFscmVhZHlFeGlzdHModXNlck5hbWUpICE9IHRydWUpe1xuICAgICAgcmV0dXJuIGFsZXJ0KHVzZXJOYW1lKycgZG9lcyBub3QgZXhpc3QnKVxuICAgIH07XG4gICAgaWYodGhpcy5pc0FNZW1iZXIodXNlck5hbWUsIGdyb3VwKSl7XG4gICAgICByZXR1cm4gYWxlcnQodXNlck5hbWUrJyBpcyBhbHJlYWR5IGEgbWVtYmVyIG9mICcrZ3JvdXAubmFtZSlcbiAgICB9O1xuICAgIGdyb3VwLm1lbWJlcnMucHVzaCh1c2VyLm5hbWUpO1xuICAgIHVzZXIuZ3JvdXBzLnB1c2goZ3JvdXAubmFtZSk7XG4gICAgdGhpcy5lbWl0Q2hhbmdlKCk7XG4gIH0sXG5cbiAga2lja1VzZXJGcm9tR3JvdXA6IGZ1bmN0aW9uKHVzZXJOYW1lLCBncm91cE5hbWUpIHtcbiAgICB0aGlzLmRlbGV0ZVVzZXJGcm9tR3JvdXAodXNlck5hbWUsIGdyb3VwTmFtZSk7XG4gICAgdGhpcy5kZWxldGVHcm91cEZyb21Vc2VyKHVzZXJOYW1lLCBncm91cE5hbWUpO1xuICAgIHRoaXMuZW1pdENoYW5nZSgpO1xuICB9LFxuXG4gIGRlbGV0ZVVzZXI6IGZ1bmN0aW9uKHVzZXIpIHtcbiAgICB0aGlzLmRlbGV0ZVVzZXJGcm9tVXNlcnModXNlcik7XG4gICAgdGhpcy5kZWxldGVVc2VyRnJvbUdyb3Vwcyh1c2VyKTtcbiAgICB0aGlzLmVtaXRDaGFuZ2UoKTtcbiAgfSxcblxuICBleHBvcnRzOiB7XG4gICAgZ2V0VXNlcnM6IGZ1bmN0aW9uKCkge1xuICAgICAgcmV0dXJuIHRoaXMudXNlcnM7XG4gICAgfSxcbiAgICBnZXRHcm91cHM6IGZ1bmN0aW9uKCkge1xuICAgICAgcmV0dXJuIHRoaXMuZ3JvdXBzXG4gICAgfVxuICB9XG59KTtcbiIsInZhciBSZWFjdCA9IHJlcXVpcmUoJ3JlYWN0Jyk7XG52YXIgU3RvcmUgPSByZXF1aXJlKCcuL1N0b3JlLmpzJyk7XG52YXIgYWN0aW9ucyA9IHJlcXVpcmUoJy4vYWN0aW9ucy5qcycpO1xuXG52YXIgVXNlcnNMaXN0ID0gUmVhY3QuY3JlYXRlQ2xhc3Moe1xuICBnZXRJbml0aWFsU3RhdGU6IGZ1bmN0aW9uKCkge1xuICAgIHJldHVybiB7XG4gICAgICB1c2VyczogU3RvcmUuZ2V0VXNlcnMoKSxcbiAgICAgIGdyb3VwczogU3RvcmUuZ2V0R3JvdXBzKCksXG4gICAgICBuZXdVc2VyOiBcIlwiXG4gICAgfTtcbiAgfSxcblxuICBjb21wb25lbnRXaWxsTW91bnQ6IGZ1bmN0aW9uKCkge1xuICAgIFN0b3JlLmFkZENoYW5nZUxpc3RlbmVyKHRoaXMuY2hhbmdlU3RhdGUpO1xuICB9LFxuXG4gIGNvbXBvbmVudFdpbGxVbm1vdW50OiBmdW5jdGlvbiAoKSB7XG4gICAgU3RvcmUucmVtb3ZlQ2hhbmdlTGlzdGVuZXIodGhpcy5jaGFuZ2VTdGF0ZSk7XG4gIH0sXG5cbiAgY2hhbmdlU3RhdGU6IGZ1bmN0aW9uKCkge1xuICAgIHRoaXMuc2V0U3RhdGUoe1xuICAgICAgdXNlcnM6IFN0b3JlLmdldFVzZXJzKCksXG4gICAgICBncm91cHM6IFN0b3JlLmdldEdyb3VwcygpXG4gICAgfSk7XG4gIH0sXG5cbiAgdXBkYXRlTmV3VXNlcjogZnVuY3Rpb24oZXZlbnQpIHtcbiAgICB0aGlzLnNldFN0YXRlKHtcbiAgICAgIG5ld1VzZXI6IGV2ZW50LnRhcmdldC52YWx1ZVxuICAgIH0pXG4gIH0sXG5cbiAgYWRkVXNlcjogZnVuY3Rpb24oZXZlbnQpIHtcbiAgICBldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xuICAgIHZhciB1c2VyTmFtZSA9IHRoaXMucmVmcy5uZXdVc2VyLnZhbHVlO1xuICAgIHZhciBzZWxlY3RlZEdyb3VwID0gdGhpcy5yZWZzLnNlbGVjdGVkR3JvdXAudmFsdWU7XG4gICAgYWN0aW9ucy5hZGRVc2VyKHVzZXJOYW1lLCBzZWxlY3RlZEdyb3VwKTtcbiAgICB0aGlzLnNldFN0YXRlKHtcbiAgICAgIG5ld1VzZXI6ICcnXG4gICAgfSlcbiAgfSxcblxuICBkZWxldGVVc2VyOiBmdW5jdGlvbih1c2VyKSB7XG4gICAgYWN0aW9ucy5kZWxldGVVc2VyKHVzZXIpO1xuICB9LFxuXG4gIHJlbmRlckdyb3VwRHJvcERvd246IGZ1bmN0aW9uKGdyb3VwKSB7XG4gICAgcmV0dXJuKFxuICAgICAgPG9wdGlvbiBrZXk9e2dyb3VwLmlkfSB2YWx1ZT17Z3JvdXAubmFtZX0+e2dyb3VwLm5hbWV9PC9vcHRpb24+XG4gICAgKTtcbiAgfSxcblxuICByZW5kZXJHcm91cHM6IGZ1bmN0aW9uKHVzZXJHcm91cCwgaSkge1xuICAgIHJldHVybihcbiAgICAgIDxkaXYgY2xhc3NOYW1lPSdVc2VyR3JvdXAnIGtleT17aX0+XG4gICAgICAgIHt1c2VyR3JvdXB9XG4gICAgICA8L2Rpdj5cbiAgICApO1xuICB9LFxuXG4gIHJlbmRlclVzZXJzOiBmdW5jdGlvbih1c2VyKSB7XG4gICAgcmV0dXJuKFxuICAgICAgPGRpdiBjbGFzc05hbWU9XCJ1c2VyQ29udGFpbmVyXCIga2V5PXt1c2VyLmlkfT5cbiAgICAgICAgPGRpdj5cbiAgICAgICAgICA8aDM+e3VzZXIubmFtZX08L2gzPlxuICAgICAgICA8L2Rpdj5cbiAgICAgICAgPGRpdj57dXNlci5ncm91cHMubWFwKHRoaXMucmVuZGVyR3JvdXBzKX08L2Rpdj5cbiAgICAgICAgPGJ1dHRvbiBvbkNsaWNrPXt0aGlzLmRlbGV0ZVVzZXIuYmluZCh0aGlzLCB1c2VyKX0+RGVsZXRlIFVzZXI8L2J1dHRvbj5cbiAgICAgIDwvZGl2PlxuICAgICk7XG4gIH0sXG5cblx0cmVuZGVyOiBmdW5jdGlvbigpIHtcbiAgICByZXR1cm4oXG4gICAgICA8ZGl2PlxuICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImZvcm1cIj5cbiAgICAgICAgICA8aDE+QWRkIE5ldyBVc2VyPC9oMT5cbiAgICAgICAgICA8Zm9ybSBvblN1Ym1pdD17dGhpcy5hZGRVc2VyfT5cbiAgICAgICAgICAgIDxpbnB1dCB0eXBlPVwidGV4dFwiIHJlZj1cIm5ld1VzZXJcIiBwbGFjZWhvbGRlcj1cIlVzZXIgTmFtZVwiXG4gICAgICAgICAgICAgIHZhbHVlPXt0aGlzLnN0YXRlLm5ld1VzZXJ9IG9uQ2hhbmdlPXt0aGlzLnVwZGF0ZU5ld1VzZXJ9Lz5cbiAgICAgICAgICAgIDxzZWxlY3QgbmFtZT0nZ3JvdXBzJyByZWY9XCJzZWxlY3RlZEdyb3VwXCIgZGVmYXVsdFZhbHVlPVwiXCI+XG4gICAgICAgICAgICAgIDxvcHRpb24gdmFsdWU9XCJcIj5QbGVhc2Ugc2VsZWN0IGEgZ3JvdXAuLi48L29wdGlvbj5cbiAgICAgICAgICAgICAge3RoaXMuc3RhdGUuZ3JvdXBzLm1hcCh0aGlzLnJlbmRlckdyb3VwRHJvcERvd24pfVxuICAgICAgICAgICAgPC9zZWxlY3Q+XG4gICAgICAgICAgPC9mb3JtPlxuICAgICAgICA8L2Rpdj5cbiAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJ1c2Vyc0NvbnRhaW5lclwiPlxuICAgICAgICAgIHt0aGlzLnN0YXRlLnVzZXJzLm1hcCh0aGlzLnJlbmRlclVzZXJzKX1cbiAgICAgICAgPC9kaXY+XG4gICAgICA8L2Rpdj5cbiAgICApO1xuXHR9XG5cbn0pO1xuXG5tb2R1bGUuZXhwb3J0cyA9IFVzZXJzTGlzdDtcbiIsInZhciBmbHV4ID0gcmVxdWlyZSgnZmx1eC1yZWFjdCcpO1xuXG5tb2R1bGUuZXhwb3J0cyA9IGZsdXguY3JlYXRlQWN0aW9ucyhbXG4gICdhZGRVc2VyJyxcbiAgJ2FkZEdyb3VwJyxcbiAgJ2FkZFVzZXJUb0dyb3VwJyxcbiAgJ2tpY2tVc2VyRnJvbUdyb3VwJyxcbiAgJ2RlbGV0ZVVzZXInXG5dKTtcbiIsInZhciBSZWFjdCA9IHJlcXVpcmUoJ3JlYWN0Jyk7XG52YXIgQXBwID0gcmVxdWlyZSgnLi9BcHAuanMnKTtcblxuUmVhY3QucmVuZGVyKDxBcHAvPiwgZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJjb250ZW50XCIpKTtcbiJdfQ==
