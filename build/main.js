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

  render: function render() {
    return React.createElement(
      'div',
      { className: 'form' },
      React.createElement(
        'h1',
        null,
        'Add User to Group'
      ),
      React.createElement(
        'form',
        { onSubmit: this.addUserToGroup },
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
  users: [{ id: 1, name: 'Chris Weeks', groups: ['InterNations', 'Makers Academy', 'Lancaster University'] }, { id: 2, name: 'Nathaniel Green', groups: ['InterNations', 'Makers Academy', 'Lancaster University'] }, { id: 3, name: 'Aaron Kendall', groups: ['InterNations', 'Makers Academy'] }],

  groups: [{ id: 1, name: 'InterNations', members: ['Chris Weeks'] }, { id: 2, name: 'Makers Academy', members: ['Chris Weeks', 'Nathaniel Green', 'Aaron Kendall'] }, { id: 3, name: 'Lancaster University', members: ['Chris Weeks', 'Nathaniel Green'] }],

  actions: [actions.addUser, actions.addGroup, actions.addUserToGroup, actions.deleteUser],

  getGroupByName: function getGroupByName(name) {
    for (var i = 0; i < this.groups.length; i++) {
      if (this.groups[i].name == name) {
        return this.groups[i];
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
    var groupObject = this.getGroupByName(group);
    for (var i = 0; i < groupObject.members.length; i++) {
      if (groupObject.members[i] == userName) {
        return true;
      }
    }
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

  addUserToGroup: function addUserToGroup(userName, group) {
    this.groupProvided(group);
    if (this.userAlreadyExists(userName) != true) {
      return alert(userName + ' does not exist');
    };
    if (this.isAMember(userName, group)) {
      return alert(userName + ' is already a member of ' + group);
    };
    this.getGroupByName(group).members.push(userName);
    this.emitChange();
  },

  addGroup: function addGroup(group) {
    this.groups.push({ id: this.groups.length + 1, name: group, members: [] });
    this.emitChange();
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
        user.groups
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

module.exports = flux.createActions(['addUser', 'addGroup', 'addUserToGroup', 'deleteUser']);

},{"flux-react":"flux-react"}],"/home/chweeks/Desktop/projects/internations-react/app/main.js":[function(require,module,exports){
'use strict';

var React = require('react');
var App = require('./App.js');

React.render(React.createElement(App, null), document.getElementById("content"));

},{"./App.js":"/home/chweeks/Desktop/projects/internations-react/app/App.js","react":"react"}]},{},["/home/chweeks/Desktop/projects/internations-react/app/main.js"])
//# sourceMappingURL=data:application/json;charset:utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9icm93c2VyaWZ5L25vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCIvaG9tZS9jaHdlZWtzL0Rlc2t0b3AvcHJvamVjdHMvaW50ZXJuYXRpb25zLXJlYWN0L2FwcC9BcHAuanMiLCIvaG9tZS9jaHdlZWtzL0Rlc2t0b3AvcHJvamVjdHMvaW50ZXJuYXRpb25zLXJlYWN0L2FwcC9FZGl0R3JvdXBzLmpzIiwiL2hvbWUvY2h3ZWVrcy9EZXNrdG9wL3Byb2plY3RzL2ludGVybmF0aW9ucy1yZWFjdC9hcHAvR3JvdXBzTGlzdC5qcyIsIi9ob21lL2Nod2Vla3MvRGVza3RvcC9wcm9qZWN0cy9pbnRlcm5hdGlvbnMtcmVhY3QvYXBwL1N0b3JlLmpzIiwiL2hvbWUvY2h3ZWVrcy9EZXNrdG9wL3Byb2plY3RzL2ludGVybmF0aW9ucy1yZWFjdC9hcHAvVXNlcnNMaXN0LmpzIiwiL2hvbWUvY2h3ZWVrcy9EZXNrdG9wL3Byb2plY3RzL2ludGVybmF0aW9ucy1yZWFjdC9hcHAvYWN0aW9ucy5qcyIsIi9ob21lL2Nod2Vla3MvRGVza3RvcC9wcm9qZWN0cy9pbnRlcm5hdGlvbnMtcmVhY3QvYXBwL21haW4uanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7OztBQ0FBLElBQUksS0FBSyxHQUFHLE9BQU8sQ0FBQyxPQUFPLENBQUMsQ0FBQztBQUM3QixJQUFJLFNBQVMsR0FBRyxPQUFPLENBQUMsZ0JBQWdCLENBQUMsQ0FBQztBQUMxQyxJQUFJLFVBQVUsR0FBRyxPQUFPLENBQUMsaUJBQWlCLENBQUMsQ0FBQTtBQUMzQyxJQUFJLFVBQVUsR0FBRyxPQUFPLENBQUMsaUJBQWlCLENBQUMsQ0FBQTs7QUFFM0MsSUFBSSxHQUFHLEdBQUcsS0FBSyxDQUFDLFdBQVcsQ0FBQzs7O0FBRTNCLFFBQU0sRUFBRSxrQkFBVztBQUNoQixXQUNFOzs7TUFDRSxvQkFBQyxTQUFTLE9BQUc7TUFDYixvQkFBQyxVQUFVLE9BQUc7TUFD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TUFBTSxDQUFDLE9BQU8sR0FBRyxTQUFTLENBQUM7Ozs7O0FDakczQixJQUFJLElBQUksR0FBRyxPQUFPLENBQUMsWUFBWSxDQUFDLENBQUM7O0FBRWpDLE1BQU0sQ0FBQyxPQUFPLEdBQUcsSUFBSSxDQUFDLGFBQWEsQ0FBQyxDQUNsQyxTQUFTLEVBQ1QsVUFBVSxFQUNWLGdCQUFnQixFQUNoQixZQUFZLENBQ2IsQ0FBQyxDQUFDOzs7OztBQ1BILElBQUksS0FBSyxHQUFHLE9BQU8sQ0FBQyxPQUFPLENBQUMsQ0FBQztBQUM3QixJQUFJLEdBQUcsR0FBRyxPQUFPLENBQUMsVUFBVSxDQUFDLENBQUM7O0FBRTlCLEtBQUssQ0FBQyxNQUFNLENBQUMsb0JBQUMsR0FBRyxPQUFFLEVBQUUsUUFBUSxDQUFDLGNBQWMsQ0FBQyxTQUFTLENBQUMsQ0FBQyxDQUFDIiwiZmlsZSI6ImdlbmVyYXRlZC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzQ29udGVudCI6WyIoZnVuY3Rpb24gZSh0LG4scil7ZnVuY3Rpb24gcyhvLHUpe2lmKCFuW29dKXtpZighdFtvXSl7dmFyIGE9dHlwZW9mIHJlcXVpcmU9PVwiZnVuY3Rpb25cIiYmcmVxdWlyZTtpZighdSYmYSlyZXR1cm4gYShvLCEwKTtpZihpKXJldHVybiBpKG8sITApO3ZhciBmPW5ldyBFcnJvcihcIkNhbm5vdCBmaW5kIG1vZHVsZSAnXCIrbytcIidcIik7dGhyb3cgZi5jb2RlPVwiTU9EVUxFX05PVF9GT1VORFwiLGZ9dmFyIGw9bltvXT17ZXhwb3J0czp7fX07dFtvXVswXS5jYWxsKGwuZXhwb3J0cyxmdW5jdGlvbihlKXt2YXIgbj10W29dWzFdW2VdO3JldHVybiBzKG4/bjplKX0sbCxsLmV4cG9ydHMsZSx0LG4scil9cmV0dXJuIG5bb10uZXhwb3J0c312YXIgaT10eXBlb2YgcmVxdWlyZT09XCJmdW5jdGlvblwiJiZyZXF1aXJlO2Zvcih2YXIgbz0wO288ci5sZW5ndGg7bysrKXMocltvXSk7cmV0dXJuIHN9KSIsInZhciBSZWFjdCA9IHJlcXVpcmUoJ3JlYWN0Jyk7XG52YXIgVXNlcnNMaXN0ID0gcmVxdWlyZSgnLi9Vc2Vyc0xpc3QuanMnKTtcbnZhciBHcm91cHNMaXN0ID0gcmVxdWlyZSgnLi9Hcm91cHNMaXN0LmpzJylcbnZhciBFZGl0R3JvdXBzID0gcmVxdWlyZSgnLi9FZGl0R3JvdXBzLmpzJylcblxudmFyIEFwcCA9IFJlYWN0LmNyZWF0ZUNsYXNzKHtcblxuXHRyZW5kZXI6IGZ1bmN0aW9uKCkge1xuICAgIHJldHVybihcbiAgICAgIDxkaXY+XG4gICAgICAgIDxVc2Vyc0xpc3QgLz5cbiAgICAgICAgPEdyb3Vwc0xpc3QgLz5cbiAgICAgICAgPEVkaXRHcm91cHMgLz5cbiAgICAgIDwvZGl2PlxuICAgICk7XG5cdH1cblxufSk7XG5cbm1vZHVsZS5leHBvcnRzID0gQXBwO1xuIiwidmFyIFJlYWN0ID0gcmVxdWlyZSgncmVhY3QnKTtcbnZhciBTdG9yZSA9IHJlcXVpcmUoJy4vU3RvcmUuanMnKTtcbnZhciBhY3Rpb25zID0gcmVxdWlyZSgnLi9hY3Rpb25zLmpzJyk7XG5cbnZhciBFZGl0R3JvdXBzID0gUmVhY3QuY3JlYXRlQ2xhc3Moe1xuICBnZXRJbml0aWFsU3RhdGU6IGZ1bmN0aW9uKCkge1xuICAgIHJldHVybiB7XG4gICAgICB1c2VyczogU3RvcmUuZ2V0VXNlcnMoKSxcbiAgICAgIGdyb3VwczogU3RvcmUuZ2V0R3JvdXBzKCksXG4gICAgICB1c2VyOiBcIlwiXG4gICAgfTtcbiAgfSxcblxuICBjb21wb25lbnRXaWxsTW91bnQ6IGZ1bmN0aW9uKCkge1xuICAgIFN0b3JlLmFkZENoYW5nZUxpc3RlbmVyKHRoaXMuY2hhbmdlU3RhdGUpO1xuICB9LFxuXG4gIGNvbXBvbmVudFdpbGxVbm1vdW50OiBmdW5jdGlvbiAoKSB7XG4gICAgU3RvcmUucmVtb3ZlQ2hhbmdlTGlzdGVuZXIodGhpcy5jaGFuZ2VTdGF0ZSk7XG4gIH0sXG5cbiAgY2hhbmdlU3RhdGU6IGZ1bmN0aW9uKCkge1xuICAgIHRoaXMuc2V0U3RhdGUoe1xuICAgICAgdXNlcnM6IFN0b3JlLmdldFVzZXJzKCksXG4gICAgICBncm91cHM6IFN0b3JlLmdldEdyb3VwcygpXG4gICAgfSk7XG4gIH0sXG5cbiAgdXBkYXRlVXNlcjogZnVuY3Rpb24oZXZlbnQpIHtcbiAgICB0aGlzLnNldFN0YXRlKHtcbiAgICAgdXNlcjogZXZlbnQudGFyZ2V0LnZhbHVlXG4gICAgfSlcbiAgfSxcblxuICByZW5kZXJHcm91cERyb3BEb3duOiBmdW5jdGlvbihncm91cCkge1xuICAgIHJldHVybihcbiAgICAgIDxvcHRpb24ga2V5PXtncm91cC5pZH0gdmFsdWU9e2dyb3VwLm5hbWV9Pntncm91cC5uYW1lfTwvb3B0aW9uPlxuICAgICk7XG4gIH0sXG5cbiAgcmVuZGVyR3JvdXBzOiBmdW5jdGlvbih1c2VyR3JvdXAsIGkpIHtcbiAgICByZXR1cm4oXG4gICAgICA8ZGl2IGNsYXNzTmFtZT0nVXNlckdyb3VwJyBrZXk9e2l9PlxuICAgICAgICB7dXNlckdyb3VwfVxuICAgICAgPC9kaXY+XG4gICAgKTtcbiAgfSxcblxuICBhZGRVc2VyVG9Hcm91cDogZnVuY3Rpb24oZXZlbnQpIHtcbiAgICBldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xuICAgIHZhciB1c2VyTmFtZSA9IHRoaXMucmVmcy51c2VyLnZhbHVlO1xuICAgIHZhciBzZWxlY3RlZEdyb3VwID0gdGhpcy5yZWZzLnNlbGVjdGVkR3JvdXAudmFsdWU7XG4gICAgYWN0aW9ucy5hZGRVc2VyVG9Hcm91cCh1c2VyTmFtZSwgc2VsZWN0ZWRHcm91cCk7XG4gICAgdGhpcy5zZXRTdGF0ZSh7XG4gICAgICB1c2VyOiAnJ1xuICAgIH0pXG4gIH0sXG5cbiAgcmVuZGVyOiBmdW5jdGlvbigpIHtcbiAgICByZXR1cm4oXG4gICAgICA8ZGl2IGNsYXNzTmFtZT1cImZvcm1cIj5cbiAgICAgICAgPGgxPkFkZCBVc2VyIHRvIEdyb3VwPC9oMT5cbiAgICAgICAgPGZvcm0gb25TdWJtaXQ9e3RoaXMuYWRkVXNlclRvR3JvdXB9PlxuICAgICAgICAgIDxpbnB1dCB0eXBlPVwidGV4dFwiIHJlZj1cInVzZXJcIiBwbGFjZWhvbGRlcj1cIlVzZXIgTmFtZVwiXG4gICAgICAgICAgICB2YWx1ZT17dGhpcy5zdGF0ZS51c2VyfSBvbkNoYW5nZT17dGhpcy51cGRhdGVVc2VyfS8+XG4gICAgICAgICAgPHNlbGVjdCBuYW1lPSdncm91cHMnIHJlZj1cInNlbGVjdGVkR3JvdXBcIiBkZWZhdWx0VmFsdWU9XCJcIj5cbiAgICAgICAgICAgIDxvcHRpb24gdmFsdWU9XCJcIj5QbGVhc2Ugc2VsZWN0IGEgZ3JvdXAuLi48L29wdGlvbj5cbiAgICAgICAgICAgIHt0aGlzLnN0YXRlLmdyb3Vwcy5tYXAodGhpcy5yZW5kZXJHcm91cERyb3BEb3duKX1cbiAgICAgICAgICA8L3NlbGVjdD5cbiAgICAgICAgPC9mb3JtPlxuICAgICAgPC9kaXY+XG4gICAgKTtcbiAgfVxuXG59KTtcblxubW9kdWxlLmV4cG9ydHMgPSBFZGl0R3JvdXBzO1xuIiwidmFyIFJlYWN0ID0gcmVxdWlyZSgncmVhY3QnKTtcbnZhciBTdG9yZSA9IHJlcXVpcmUoJy4vU3RvcmUuanMnKTtcbnZhciBhY3Rpb25zID0gcmVxdWlyZSgnLi9hY3Rpb25zLmpzJyk7XG5cbnZhciBHcm91cHNMaXN0ID0gUmVhY3QuY3JlYXRlQ2xhc3Moe1xuICBnZXRJbml0aWFsU3RhdGU6IGZ1bmN0aW9uKCkge1xuICAgIHJldHVybiB7XG4gICAgICBncm91cHM6IFN0b3JlLmdldEdyb3VwcygpLFxuICAgICAgdXNlcnM6IFN0b3JlLmdldFVzZXJzKCksXG4gICAgICBuZXdHcm91cDogXCJcIlxuICAgIH07XG4gIH0sXG5cbiAgY29tcG9uZW50V2lsbE1vdW50OiBmdW5jdGlvbigpIHtcbiAgICBTdG9yZS5hZGRDaGFuZ2VMaXN0ZW5lcih0aGlzLmNoYW5nZVN0YXRlKTtcbiAgfSxcblxuICBjb21wb25lbnRXaWxsVW5tb3VudDogZnVuY3Rpb24gKCkge1xuICAgIFN0b3JlLnJlbW92ZUNoYW5nZUxpc3RlbmVyKHRoaXMuY2hhbmdlU3RhdGUpO1xuICB9LFxuXG4gIGNoYW5nZVN0YXRlOiBmdW5jdGlvbigpIHtcbiAgICB0aGlzLnNldFN0YXRlKHtcbiAgICAgIGdyb3VwczogU3RvcmUuZ2V0R3JvdXBzKCksXG4gICAgICB1c2VyczogU3RvcmUuZ2V0VXNlcnMoKVxuICAgIH0pO1xuICB9LFxuXG4gIHVwZGF0ZU5ld0dyb3VwOiBmdW5jdGlvbihldmVudCkge1xuICAgIHRoaXMuc2V0U3RhdGUoe1xuICAgICAgbmV3R3JvdXA6IGV2ZW50LnRhcmdldC52YWx1ZVxuICAgIH0pXG4gIH0sXG5cbiAgYWRkR3JvdXA6IGZ1bmN0aW9uKGV2ZW50KSB7XG4gICAgZXZlbnQucHJldmVudERlZmF1bHQoKTtcbiAgICB2YXIgaW5wdXQgPSB0aGlzLnJlZnMubmV3R3JvdXA7XG4gICAgYWN0aW9ucy5hZGRHcm91cChpbnB1dC52YWx1ZSk7XG4gICAgdGhpcy5zZXRTdGF0ZSh7XG4gICAgICBuZXdHcm91cDogJydcbiAgICB9KVxuICB9LFxuXG4gIHJlbmRlckdyb3VwTWVtYmVyczogZnVuY3Rpb24oZ3JvdXBNZW1iZXIsIGkpIHtcbiAgICByZXR1cm4oXG4gICAgICA8ZGl2IGNsYXNzTmFtZT0nZ3JvdXBNZW1iZXInIGtleT17aX0+XG4gICAgICAgIHtncm91cE1lbWJlcn1cbiAgICAgIDwvZGl2PlxuICAgICk7XG4gIH0sXG5cbiAgcmVuZGVyR3JvdXBzOiBmdW5jdGlvbihncm91cCkge1xuICAgIHJldHVybiAoXG4gICAgICA8ZGl2IGNsYXNzTmFtZT0nZ3JvdXBDb250YWluZXInIGtleT17Z3JvdXAuaWR9PlxuICAgICAgICA8ZGl2PlxuICAgICAgICAgIDxoMz57Z3JvdXAubmFtZX08L2gzPlxuICAgICAgICA8L2Rpdj5cbiAgICAgICAgPGRpdiBjbGFzc05hbWU9J2dyb3VwTWVtYmVycyc+XG4gICAgICAgICAge2dyb3VwLm1lbWJlcnMubWFwKHRoaXMucmVuZGVyR3JvdXBNZW1iZXJzKX1cbiAgICAgICAgPC9kaXY+XG4gICAgICA8L2Rpdj5cbiAgICApO1xuICB9LFxuXG5cdHJlbmRlcjogZnVuY3Rpb24oKSB7XG4gICAgcmV0dXJuKFxuICAgICAgPGRpdj5cbiAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJmb3JtXCI+XG4gICAgICAgICAgPGgxPkFkZCBOZXcgR3JvdXA8L2gxPlxuICAgICAgICAgIDxmb3JtIG9uU3VibWl0PXt0aGlzLmFkZEdyb3VwfT5cbiAgICAgICAgICAgIDxpbnB1dCB0eXBlPVwidGV4dFwiIHJlZj1cIm5ld0dyb3VwXCIgcGxhY2Vob2xkZXI9XCJHcm91cCBOYW1lXCJcbiAgICAgICAgICAgICAgdmFsdWU9e3RoaXMuc3RhdGUubmV3R3JvdXB9IG9uQ2hhbmdlPXt0aGlzLnVwZGF0ZU5ld0dyb3VwfS8+XG4gICAgICAgICAgPC9mb3JtPlxuICAgICAgICA8L2Rpdj5cbiAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJncm91cHNDb250YWluZXJcIj5cbiAgICAgICAgICB7dGhpcy5zdGF0ZS5ncm91cHMubWFwKHRoaXMucmVuZGVyR3JvdXBzKX1cbiAgICAgICAgPC9kaXY+XG4gICAgICA8L2Rpdj5cbiAgICApO1xuXHR9XG5cbn0pO1xuXG5tb2R1bGUuZXhwb3J0cyA9IEdyb3Vwc0xpc3Q7XG4iLCJ2YXIgZmx1eCA9IHJlcXVpcmUoJ2ZsdXgtcmVhY3QnKTtcbnZhciBhY3Rpb25zID0gcmVxdWlyZSgnLi9hY3Rpb25zLmpzJyk7XG5cbm1vZHVsZS5leHBvcnRzID0gZmx1eC5jcmVhdGVTdG9yZSh7XG4gIHVzZXJzOiBbe2lkOiAxLCBuYW1lOidDaHJpcyBXZWVrcycsIGdyb3VwczogWydJbnRlck5hdGlvbnMnLCAnTWFrZXJzIEFjYWRlbXknLCAnTGFuY2FzdGVyIFVuaXZlcnNpdHknXSB9LFxuICAgICAgICAgIHtpZDogMiwgbmFtZTonTmF0aGFuaWVsIEdyZWVuJywgZ3JvdXBzOiBbJ0ludGVyTmF0aW9ucycsICdNYWtlcnMgQWNhZGVteScsICdMYW5jYXN0ZXIgVW5pdmVyc2l0eSddIH0sXG4gICAgICAgICAge2lkOiAzLCBuYW1lOidBYXJvbiBLZW5kYWxsJywgZ3JvdXBzOiBbJ0ludGVyTmF0aW9ucycsICdNYWtlcnMgQWNhZGVteSddIH1dLFxuXG4gIGdyb3VwczogW3tpZDogMSwgbmFtZTogJ0ludGVyTmF0aW9ucycsIG1lbWJlcnM6IFsnQ2hyaXMgV2Vla3MnXSB9LFxuICAgICAgICAgICB7aWQ6IDIsIG5hbWU6ICdNYWtlcnMgQWNhZGVteScsIG1lbWJlcnM6IFsnQ2hyaXMgV2Vla3MnLCAnTmF0aGFuaWVsIEdyZWVuJywgJ0Fhcm9uIEtlbmRhbGwnXSB9LFxuICAgICAgICAgICB7aWQ6IDMsIG5hbWU6ICdMYW5jYXN0ZXIgVW5pdmVyc2l0eScsIG1lbWJlcnM6IFsnQ2hyaXMgV2Vla3MnLCAnTmF0aGFuaWVsIEdyZWVuJ10gfV0sXG5cbiAgYWN0aW9uczogW1xuICAgIGFjdGlvbnMuYWRkVXNlcixcbiAgICBhY3Rpb25zLmFkZEdyb3VwLFxuICAgIGFjdGlvbnMuYWRkVXNlclRvR3JvdXAsXG4gICAgYWN0aW9ucy5kZWxldGVVc2VyXG4gIF0sXG5cbiAgZ2V0R3JvdXBCeU5hbWU6IGZ1bmN0aW9uKG5hbWUpe1xuICAgICBmb3IodmFyIGk9MDsgaSA8IHRoaXMuZ3JvdXBzLmxlbmd0aDsgaSsrKXtcbiAgICAgICBpZih0aGlzLmdyb3Vwc1tpXS5uYW1lID09IG5hbWUpe1xuICAgICAgICAgcmV0dXJuIHRoaXMuZ3JvdXBzW2ldXG4gICAgICAgfVxuICAgICB9O1xuICB9LFxuXG4gIHVzZXJBbHJlYWR5RXhpc3RzOiBmdW5jdGlvbih1c2VyTmFtZSkge1xuICAgIGZvcih2YXIgaT0wOyBpIDwgdGhpcy51c2Vycy5sZW5ndGg7IGkrKyl7XG4gICAgICBpZih0aGlzLnVzZXJzW2ldLm5hbWUgPT0gdXNlck5hbWUpe1xuICAgICAgICByZXR1cm4gdHJ1ZVxuICAgICAgfVxuICAgIH1cbiAgfSxcblxuICBncm91cFByb3ZpZGVkOiBmdW5jdGlvbihncm91cCkge1xuICAgIGlmKGdyb3VwID09ICcnKXtcbiAgICAgIHJldHVybiBhbGVydCgnUGxlYXNlIHNlbGVjdCBhIGdyb3VwJylcbiAgICB9XG4gIH0sXG5cbiAgaXNBTWVtYmVyOiBmdW5jdGlvbih1c2VyTmFtZSwgZ3JvdXApIHtcbiAgICB2YXIgZ3JvdXBPYmplY3QgPSB0aGlzLmdldEdyb3VwQnlOYW1lKGdyb3VwKVxuICAgIGZvcih2YXIgaT0wOyBpPGdyb3VwT2JqZWN0Lm1lbWJlcnMubGVuZ3RoOyBpKyspe1xuICAgICAgaWYoZ3JvdXBPYmplY3QubWVtYmVyc1tpXSA9PSB1c2VyTmFtZSl7XG4gICAgICAgIHJldHVybiB0cnVlXG4gICAgICB9XG4gICAgfVxuICB9LFxuXG4gIGFkZFVzZXI6IGZ1bmN0aW9uKHVzZXJOYW1lLCBncm91cCkge1xuICAgIGlmKHRoaXMudXNlckFscmVhZHlFeGlzdHModXNlck5hbWUpKXsgcmV0dXJuIGFsZXJ0KCdUaGF0IHVzZXIgYWxyZWFkeSBleGlzdHMnKSB9O1xuICAgIHRoaXMuZ3JvdXBQcm92aWRlZChncm91cClcbiAgICB0aGlzLnVzZXJzLnB1c2goeyBpZDoodGhpcy51c2Vycy5sZW5ndGgrMSksIG5hbWU6IHVzZXJOYW1lLCBncm91cHM6IGdyb3VwfSk7XG4gICAgdGhpcy5nZXRHcm91cEJ5TmFtZShncm91cCkubWVtYmVycy5wdXNoKHVzZXJOYW1lKTtcbiAgICB0aGlzLmVtaXRDaGFuZ2UoKTtcbiAgfSxcblxuICBhZGRVc2VyVG9Hcm91cDogZnVuY3Rpb24odXNlck5hbWUsIGdyb3VwKSB7XG4gICAgdGhpcy5ncm91cFByb3ZpZGVkKGdyb3VwKTtcbiAgICBpZih0aGlzLnVzZXJBbHJlYWR5RXhpc3RzKHVzZXJOYW1lKSAhPSB0cnVlKXtcbiAgICAgIHJldHVybiBhbGVydCh1c2VyTmFtZSsnIGRvZXMgbm90IGV4aXN0JylcbiAgICB9O1xuICAgIGlmKHRoaXMuaXNBTWVtYmVyKHVzZXJOYW1lLCBncm91cCkpe1xuICAgICAgcmV0dXJuIGFsZXJ0KHVzZXJOYW1lKycgaXMgYWxyZWFkeSBhIG1lbWJlciBvZiAnK2dyb3VwKVxuICAgIH07XG4gICAgdGhpcy5nZXRHcm91cEJ5TmFtZShncm91cCkubWVtYmVycy5wdXNoKHVzZXJOYW1lKTtcbiAgICB0aGlzLmVtaXRDaGFuZ2UoKTtcbiAgfSxcblxuICBhZGRHcm91cDogZnVuY3Rpb24oZ3JvdXApIHtcbiAgICB0aGlzLmdyb3Vwcy5wdXNoKHsgaWQ6KHRoaXMuZ3JvdXBzLmxlbmd0aCsxKSwgbmFtZTogZ3JvdXAgLCBtZW1iZXJzOiBbXX0pO1xuICAgIHRoaXMuZW1pdENoYW5nZSgpO1xuICB9LFxuXG4gIGRlbGV0ZVVzZXJGcm9tVXNlcnM6IGZ1bmN0aW9uKHVzZXIpIHtcbiAgICBmb3IodmFyIGk9MDsgaSA8IHRoaXMudXNlcnMubGVuZ3RoOyBpKyspe1xuICAgICAgaWYodXNlci5pZCA9PSB0aGlzLnVzZXJzW2ldLmlkKXtcbiAgICAgICAgdGhpcy51c2Vycy5zcGxpY2UoaSwgMSk7XG4gICAgICB9XG4gICAgfTtcbiAgfSxcblxuICBkZWxldGVVc2VyRnJvbUdyb3VwczogZnVuY3Rpb24odXNlcikge1xuICAgIGZvcih2YXIgaT0wOyBpIDwgdGhpcy5ncm91cHMubGVuZ3RoOyBpKyspe1xuICAgICAgZm9yKHZhciBqPTA7IGogPCB0aGlzLmdyb3Vwc1tpXS5tZW1iZXJzLmxlbmd0aDsgaisrKXtcbiAgICAgICAgaWYodXNlci5uYW1lID09IHRoaXMuZ3JvdXBzW2ldLm1lbWJlcnNbal0pe1xuICAgICAgICAgIHRoaXMuZ3JvdXBzW2ldLm1lbWJlcnMuc3BsaWNlKGosIDEpXG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9O1xuICB9LFxuXG4gIGRlbGV0ZVVzZXI6IGZ1bmN0aW9uKHVzZXIpIHtcbiAgICB0aGlzLmRlbGV0ZVVzZXJGcm9tVXNlcnModXNlcik7XG4gICAgdGhpcy5kZWxldGVVc2VyRnJvbUdyb3Vwcyh1c2VyKTtcbiAgICB0aGlzLmVtaXRDaGFuZ2UoKTtcbiAgfSxcblxuICBleHBvcnRzOiB7XG4gICAgZ2V0VXNlcnM6IGZ1bmN0aW9uKCkge1xuICAgICAgcmV0dXJuIHRoaXMudXNlcnM7XG4gICAgfSxcbiAgICBnZXRHcm91cHM6IGZ1bmN0aW9uKCkge1xuICAgICAgcmV0dXJuIHRoaXMuZ3JvdXBzXG4gICAgfVxuICB9XG59KTtcbiIsInZhciBSZWFjdCA9IHJlcXVpcmUoJ3JlYWN0Jyk7XG52YXIgU3RvcmUgPSByZXF1aXJlKCcuL1N0b3JlLmpzJyk7XG52YXIgYWN0aW9ucyA9IHJlcXVpcmUoJy4vYWN0aW9ucy5qcycpO1xuXG52YXIgVXNlcnNMaXN0ID0gUmVhY3QuY3JlYXRlQ2xhc3Moe1xuICBnZXRJbml0aWFsU3RhdGU6IGZ1bmN0aW9uKCkge1xuICAgIHJldHVybiB7XG4gICAgICB1c2VyczogU3RvcmUuZ2V0VXNlcnMoKSxcbiAgICAgIGdyb3VwczogU3RvcmUuZ2V0R3JvdXBzKCksXG4gICAgICBuZXdVc2VyOiBcIlwiXG4gICAgfTtcbiAgfSxcblxuICBjb21wb25lbnRXaWxsTW91bnQ6IGZ1bmN0aW9uKCkge1xuICAgIFN0b3JlLmFkZENoYW5nZUxpc3RlbmVyKHRoaXMuY2hhbmdlU3RhdGUpO1xuICB9LFxuXG4gIGNvbXBvbmVudFdpbGxVbm1vdW50OiBmdW5jdGlvbiAoKSB7XG4gICAgU3RvcmUucmVtb3ZlQ2hhbmdlTGlzdGVuZXIodGhpcy5jaGFuZ2VTdGF0ZSk7XG4gIH0sXG5cbiAgY2hhbmdlU3RhdGU6IGZ1bmN0aW9uKCkge1xuICAgIHRoaXMuc2V0U3RhdGUoe1xuICAgICAgdXNlcnM6IFN0b3JlLmdldFVzZXJzKCksXG4gICAgICBncm91cHM6IFN0b3JlLmdldEdyb3VwcygpXG4gICAgfSk7XG4gIH0sXG5cbiAgdXBkYXRlTmV3VXNlcjogZnVuY3Rpb24oZXZlbnQpIHtcbiAgICB0aGlzLnNldFN0YXRlKHtcbiAgICAgIG5ld1VzZXI6IGV2ZW50LnRhcmdldC52YWx1ZVxuICAgIH0pXG4gIH0sXG5cbiAgYWRkVXNlcjogZnVuY3Rpb24oZXZlbnQpIHtcbiAgICBldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xuICAgIHZhciB1c2VyTmFtZSA9IHRoaXMucmVmcy5uZXdVc2VyLnZhbHVlO1xuICAgIHZhciBzZWxlY3RlZEdyb3VwID0gdGhpcy5yZWZzLnNlbGVjdGVkR3JvdXAudmFsdWU7XG4gICAgYWN0aW9ucy5hZGRVc2VyKHVzZXJOYW1lLCBzZWxlY3RlZEdyb3VwKTtcbiAgICB0aGlzLnNldFN0YXRlKHtcbiAgICAgIG5ld1VzZXI6ICcnXG4gICAgfSlcbiAgfSxcblxuICBkZWxldGVVc2VyOiBmdW5jdGlvbih1c2VyKSB7XG4gICAgYWN0aW9ucy5kZWxldGVVc2VyKHVzZXIpO1xuICB9LFxuXG4gIHJlbmRlckdyb3VwRHJvcERvd246IGZ1bmN0aW9uKGdyb3VwKSB7XG4gICAgcmV0dXJuKFxuICAgICAgPG9wdGlvbiBrZXk9e2dyb3VwLmlkfSB2YWx1ZT17Z3JvdXAubmFtZX0+e2dyb3VwLm5hbWV9PC9vcHRpb24+XG4gICAgKTtcbiAgfSxcblxuICByZW5kZXJHcm91cHM6IGZ1bmN0aW9uKHVzZXJHcm91cCwgaSkge1xuICAgIHJldHVybihcbiAgICAgIDxkaXYgY2xhc3NOYW1lPSdVc2VyR3JvdXAnIGtleT17aX0+XG4gICAgICAgIHt1c2VyR3JvdXB9XG4gICAgICA8L2Rpdj5cbiAgICApO1xuICB9LFxuXG4gIHJlbmRlclVzZXJzOiBmdW5jdGlvbih1c2VyKSB7XG4gICAgcmV0dXJuKFxuICAgICAgPGRpdiBjbGFzc05hbWU9XCJ1c2VyQ29udGFpbmVyXCIga2V5PXt1c2VyLmlkfT5cbiAgICAgICAgPGRpdj5cbiAgICAgICAgICA8aDM+e3VzZXIubmFtZX08L2gzPlxuICAgICAgICA8L2Rpdj5cbiAgICAgICAgPGRpdj57dXNlci5ncm91cHN9PC9kaXY+XG4gICAgICAgIDxidXR0b24gb25DbGljaz17dGhpcy5kZWxldGVVc2VyLmJpbmQodGhpcywgdXNlcil9PkRlbGV0ZSBVc2VyPC9idXR0b24+XG4gICAgICA8L2Rpdj5cbiAgICApO1xuICB9LFxuXG5cdHJlbmRlcjogZnVuY3Rpb24oKSB7XG4gICAgcmV0dXJuKFxuICAgICAgPGRpdj5cbiAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJmb3JtXCI+XG4gICAgICAgICAgPGgxPkFkZCBOZXcgVXNlcjwvaDE+XG4gICAgICAgICAgPGZvcm0gb25TdWJtaXQ9e3RoaXMuYWRkVXNlcn0+XG4gICAgICAgICAgICA8aW5wdXQgdHlwZT1cInRleHRcIiByZWY9XCJuZXdVc2VyXCIgcGxhY2Vob2xkZXI9XCJVc2VyIE5hbWVcIlxuICAgICAgICAgICAgICB2YWx1ZT17dGhpcy5zdGF0ZS5uZXdVc2VyfSBvbkNoYW5nZT17dGhpcy51cGRhdGVOZXdVc2VyfS8+XG4gICAgICAgICAgICA8c2VsZWN0IG5hbWU9J2dyb3VwcycgcmVmPVwic2VsZWN0ZWRHcm91cFwiIGRlZmF1bHRWYWx1ZT1cIlwiPlxuICAgICAgICAgICAgICA8b3B0aW9uIHZhbHVlPVwiXCI+UGxlYXNlIHNlbGVjdCBhIGdyb3VwLi4uPC9vcHRpb24+XG4gICAgICAgICAgICAgIHt0aGlzLnN0YXRlLmdyb3Vwcy5tYXAodGhpcy5yZW5kZXJHcm91cERyb3BEb3duKX1cbiAgICAgICAgICAgIDwvc2VsZWN0PlxuICAgICAgICAgIDwvZm9ybT5cbiAgICAgICAgPC9kaXY+XG4gICAgICAgIDxkaXYgY2xhc3NOYW1lPVwidXNlcnNDb250YWluZXJcIj5cbiAgICAgICAgICB7dGhpcy5zdGF0ZS51c2Vycy5tYXAodGhpcy5yZW5kZXJVc2Vycyl9XG4gICAgICAgIDwvZGl2PlxuICAgICAgPC9kaXY+XG4gICAgKTtcblx0fVxuXG59KTtcblxubW9kdWxlLmV4cG9ydHMgPSBVc2Vyc0xpc3Q7XG4iLCJ2YXIgZmx1eCA9IHJlcXVpcmUoJ2ZsdXgtcmVhY3QnKTtcblxubW9kdWxlLmV4cG9ydHMgPSBmbHV4LmNyZWF0ZUFjdGlvbnMoW1xuICAnYWRkVXNlcicsXG4gICdhZGRHcm91cCcsXG4gICdhZGRVc2VyVG9Hcm91cCcsXG4gICdkZWxldGVVc2VyJ1xuXSk7XG4iLCJ2YXIgUmVhY3QgPSByZXF1aXJlKCdyZWFjdCcpO1xudmFyIEFwcCA9IHJlcXVpcmUoJy4vQXBwLmpzJyk7XG5cblJlYWN0LnJlbmRlcig8QXBwLz4sIGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwiY29udGVudFwiKSk7XG4iXX0=
