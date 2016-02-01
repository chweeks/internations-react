(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({"/home/chweeks/Desktop/projects/internations-react/app/App.js":[function(require,module,exports){
'use strict';

var React = require('react');
var UsersList = require('./UsersList.js');
var GroupsList = require('./GroupsList.js');

var App = React.createClass({
  displayName: 'App',

  render: function render() {
    return React.createElement(
      'div',
      null,
      React.createElement(UsersList, null),
      React.createElement(GroupsList, null)
    );
  }

});

module.exports = App;

},{"./GroupsList.js":"/home/chweeks/Desktop/projects/internations-react/app/GroupsList.js","./UsersList.js":"/home/chweeks/Desktop/projects/internations-react/app/UsersList.js","react":"react"}],"/home/chweeks/Desktop/projects/internations-react/app/GroupsList.js":[function(require,module,exports){
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

  renderUserDropDown: function renderUserDropDown(user) {
    return React.createElement(
      'option',
      { key: user.id, value: user.name },
      user.name
    );
  },

  renderGroups: function renderGroups(group) {
    return React.createElement(
      'div',
      { key: group.id },
      React.createElement(
        'span',
        null,
        group.name,
        ': ',
        group.members
      )
    );
  },

  render: function render() {
    return React.createElement(
      'div',
      null,
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
      ),
      this.state.groups.map(this.renderGroups)
    );
  }

});

module.exports = GroupsList;

},{"./Store.js":"/home/chweeks/Desktop/projects/internations-react/app/Store.js","./actions.js":"/home/chweeks/Desktop/projects/internations-react/app/actions.js","react":"react"}],"/home/chweeks/Desktop/projects/internations-react/app/Store.js":[function(require,module,exports){
'use strict';

var flux = require('flux-react');
var actions = require('./actions.js');

module.exports = flux.createStore({
  users: [{ id: 1, name: 'Chris', groups: [] }],
  groups: [{ id: 1, name: 'InterNations', members: [] }],
  actions: [actions.addUser, actions.addGroup, actions.deleteUser],

  getGroupByName: function getGroupByName(name) {
    for (var i = 0; i < this.groups.length; i++) {
      if (this.groups[i].name == name) {
        return this.groups[i];
      }
    };
  },

  addUser: function addUser(userName, group) {
    if (group) {
      this.users.push({ id: this.users.length + 1, name: userName, groups: group });
      this.getGroupByName(group).members.push(userName);
      this.emitChange();
    } else {
      alert('User must belong to a group');
    };
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

  renderUsers: function renderUsers(user) {
    return React.createElement(
      'div',
      { key: user.id },
      user.name,
      ':',
      user.groups,
      React.createElement('button', { onClick: this.deleteUser.bind(this, user) })
    );
  },

  render: function render() {
    return React.createElement(
      'div',
      null,
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
      ),
      this.state.users.map(this.renderUsers)
    );
  }

});

module.exports = UsersList;

},{"./Store.js":"/home/chweeks/Desktop/projects/internations-react/app/Store.js","./actions.js":"/home/chweeks/Desktop/projects/internations-react/app/actions.js","react":"react"}],"/home/chweeks/Desktop/projects/internations-react/app/actions.js":[function(require,module,exports){
'use strict';

var flux = require('flux-react');

module.exports = flux.createActions(['addUser', 'addGroup', 'deleteUser']);

},{"flux-react":"flux-react"}],"/home/chweeks/Desktop/projects/internations-react/app/main.js":[function(require,module,exports){
'use strict';

var React = require('react');
var App = require('./App.js');

React.render(React.createElement(App, null), document.getElementById("content"));

},{"./App.js":"/home/chweeks/Desktop/projects/internations-react/app/App.js","react":"react"}]},{},["/home/chweeks/Desktop/projects/internations-react/app/main.js"])
//# sourceMappingURL=data:application/json;charset:utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9icm93c2VyaWZ5L25vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCIvaG9tZS9jaHdlZWtzL0Rlc2t0b3AvcHJvamVjdHMvaW50ZXJuYXRpb25zLXJlYWN0L2FwcC9BcHAuanMiLCIvaG9tZS9jaHdlZWtzL0Rlc2t0b3AvcHJvamVjdHMvaW50ZXJuYXRpb25zLXJlYWN0L2FwcC9Hcm91cHNMaXN0LmpzIiwiL2hvbWUvY2h3ZWVrcy9EZXNrdG9wL3Byb2plY3RzL2ludGVybmF0aW9ucy1yZWFjdC9hcHAvU3RvcmUuanMiLCIvaG9tZS9jaHdlZWtzL0Rlc2t0b3AvcHJvamVjdHMvaW50ZXJuYXRpb25zLXJlYWN0L2FwcC9Vc2Vyc0xpc3QuanMiLCIvaG9tZS9jaHdlZWtzL0Rlc2t0b3AvcHJvamVjdHMvaW50ZXJuYXRpb25zLXJlYWN0L2FwcC9hY3Rpb25zLmpzIiwiL2hvbWUvY2h3ZWVrcy9EZXNrdG9wL3Byb2plY3RzL2ludGVybmF0aW9ucy1yZWFjdC9hcHAvbWFpbi5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTs7O0FDQUEsSUFBSSxLQUFLLEdBQUcsT0FBTyxDQUFDLE9BQU8sQ0FBQyxDQUFDO0FBQzdCLElBQUksU0FBUyxHQUFHLE9BQU8sQ0FBQyxnQkFBZ0IsQ0FBQyxDQUFDO0FBQzFDLElBQUksVUFBVSxHQUFHLE9BQU8sQ0FBQyxpQkFBaUIsQ0FBQyxDQUFBOztBQUUzQyxJQUFJLEdBQUcsR0FBRyxLQUFLLENBQUMsV0FBVyxDQUFDOzs7QUFFM0IsUUFBTSxFQUFFLGtCQUFXO0FBQ2hCLFdBQ0U7OztNQUNFLG9CQUFDLFNBQVMsT0FBRztNQUNiLG9CQUFDLFVBQVUsT0FBRztLQUNWLENBQ047R0FDSjs7Q0FFRCxDQUFDLENBQUM7O0FBRUgsTUFBTSxDQUFDLE9BQU8sR0FBRyxHQUFHLENBQUM7Ozs7O0FDakJyQixJQUFJLEtBQUssR0FBRyxPQUFPLENBQUMsT0FBTyxDQUFDLENBQUM7QUFD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Z2VuZXJhdGVkLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXNDb250ZW50IjpbIihmdW5jdGlvbiBlKHQsbixyKXtmdW5jdGlvbiBzKG8sdSl7aWYoIW5bb10pe2lmKCF0W29dKXt2YXIgYT10eXBlb2YgcmVxdWlyZT09XCJmdW5jdGlvblwiJiZyZXF1aXJlO2lmKCF1JiZhKXJldHVybiBhKG8sITApO2lmKGkpcmV0dXJuIGkobywhMCk7dmFyIGY9bmV3IEVycm9yKFwiQ2Fubm90IGZpbmQgbW9kdWxlICdcIitvK1wiJ1wiKTt0aHJvdyBmLmNvZGU9XCJNT0RVTEVfTk9UX0ZPVU5EXCIsZn12YXIgbD1uW29dPXtleHBvcnRzOnt9fTt0W29dWzBdLmNhbGwobC5leHBvcnRzLGZ1bmN0aW9uKGUpe3ZhciBuPXRbb11bMV1bZV07cmV0dXJuIHMobj9uOmUpfSxsLGwuZXhwb3J0cyxlLHQsbixyKX1yZXR1cm4gbltvXS5leHBvcnRzfXZhciBpPXR5cGVvZiByZXF1aXJlPT1cImZ1bmN0aW9uXCImJnJlcXVpcmU7Zm9yKHZhciBvPTA7bzxyLmxlbmd0aDtvKyspcyhyW29dKTtyZXR1cm4gc30pIiwidmFyIFJlYWN0ID0gcmVxdWlyZSgncmVhY3QnKTtcbnZhciBVc2Vyc0xpc3QgPSByZXF1aXJlKCcuL1VzZXJzTGlzdC5qcycpO1xudmFyIEdyb3Vwc0xpc3QgPSByZXF1aXJlKCcuL0dyb3Vwc0xpc3QuanMnKVxuXG52YXIgQXBwID0gUmVhY3QuY3JlYXRlQ2xhc3Moe1xuXG5cdHJlbmRlcjogZnVuY3Rpb24oKSB7XG4gICAgcmV0dXJuKFxuICAgICAgPGRpdj5cbiAgICAgICAgPFVzZXJzTGlzdCAvPlxuICAgICAgICA8R3JvdXBzTGlzdCAvPlxuICAgICAgPC9kaXY+XG4gICAgKTtcblx0fVxuXG59KTtcblxubW9kdWxlLmV4cG9ydHMgPSBBcHA7XG4iLCJ2YXIgUmVhY3QgPSByZXF1aXJlKCdyZWFjdCcpO1xudmFyIFN0b3JlID0gcmVxdWlyZSgnLi9TdG9yZS5qcycpO1xudmFyIGFjdGlvbnMgPSByZXF1aXJlKCcuL2FjdGlvbnMuanMnKTtcblxudmFyIEdyb3Vwc0xpc3QgPSBSZWFjdC5jcmVhdGVDbGFzcyh7XG4gIGdldEluaXRpYWxTdGF0ZTogZnVuY3Rpb24oKSB7XG4gICAgcmV0dXJuIHtcbiAgICAgIGdyb3VwczogU3RvcmUuZ2V0R3JvdXBzKCksXG4gICAgICB1c2VyczogU3RvcmUuZ2V0VXNlcnMoKSxcbiAgICAgIG5ld0dyb3VwOiBcIlwiXG4gICAgfTtcbiAgfSxcblxuICBjb21wb25lbnRXaWxsTW91bnQ6IGZ1bmN0aW9uKCkge1xuICAgIFN0b3JlLmFkZENoYW5nZUxpc3RlbmVyKHRoaXMuY2hhbmdlU3RhdGUpO1xuICB9LFxuXG4gIGNvbXBvbmVudFdpbGxVbm1vdW50OiBmdW5jdGlvbiAoKSB7XG4gICAgU3RvcmUucmVtb3ZlQ2hhbmdlTGlzdGVuZXIodGhpcy5jaGFuZ2VTdGF0ZSk7XG4gIH0sXG5cbiAgY2hhbmdlU3RhdGU6IGZ1bmN0aW9uKCkge1xuICAgIHRoaXMuc2V0U3RhdGUoe1xuICAgICAgZ3JvdXBzOiBTdG9yZS5nZXRHcm91cHMoKSxcbiAgICAgIHVzZXJzOiBTdG9yZS5nZXRVc2VycygpXG4gICAgfSk7XG4gIH0sXG5cbiAgdXBkYXRlTmV3R3JvdXA6IGZ1bmN0aW9uKGV2ZW50KSB7XG4gICAgdGhpcy5zZXRTdGF0ZSh7XG4gICAgICBuZXdHcm91cDogZXZlbnQudGFyZ2V0LnZhbHVlXG4gICAgfSlcbiAgfSxcblxuICBhZGRHcm91cDogZnVuY3Rpb24oZXZlbnQpIHtcbiAgICBldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xuICAgIHZhciBpbnB1dCA9IHRoaXMucmVmcy5uZXdHcm91cDtcbiAgICBhY3Rpb25zLmFkZEdyb3VwKGlucHV0LnZhbHVlKTtcbiAgICB0aGlzLnNldFN0YXRlKHtcbiAgICAgIG5ld0dyb3VwOiAnJ1xuICAgIH0pXG4gIH0sXG5cbiAgcmVuZGVyVXNlckRyb3BEb3duOiBmdW5jdGlvbih1c2VyKSB7XG4gICAgcmV0dXJuKFxuICAgICAgPG9wdGlvbiBrZXk9e3VzZXIuaWR9IHZhbHVlPXt1c2VyLm5hbWV9Pnt1c2VyLm5hbWV9PC9vcHRpb24+XG4gICAgKTtcbiAgfSxcblxuICByZW5kZXJHcm91cHM6IGZ1bmN0aW9uKGdyb3VwKSB7XG4gICAgcmV0dXJuIChcbiAgICAgIDxkaXYga2V5PXtncm91cC5pZH0+XG4gICAgICAgIDxzcGFuPntncm91cC5uYW1lfToge2dyb3VwLm1lbWJlcnN9PC9zcGFuPlxuICAgICAgPC9kaXY+XG4gICAgKTtcbiAgfSxcblxuXHRyZW5kZXI6IGZ1bmN0aW9uKCkge1xuICAgIHJldHVybihcbiAgICAgIDxkaXY+XG4gICAgICAgIDxoMT5BZGQgTmV3IEdyb3VwPC9oMT5cbiAgICAgICAgPGZvcm0gb25TdWJtaXQ9e3RoaXMuYWRkR3JvdXB9PlxuICAgICAgICAgIDxpbnB1dCB0eXBlPVwidGV4dFwiIHJlZj1cIm5ld0dyb3VwXCIgcGxhY2Vob2xkZXI9XCJHcm91cCBOYW1lXCJcbiAgICAgICAgICAgIHZhbHVlPXt0aGlzLnN0YXRlLm5ld0dyb3VwfSBvbkNoYW5nZT17dGhpcy51cGRhdGVOZXdHcm91cH0vPlxuICAgICAgICA8L2Zvcm0+XG4gICAgICAgIHt0aGlzLnN0YXRlLmdyb3Vwcy5tYXAodGhpcy5yZW5kZXJHcm91cHMpfVxuICAgICAgPC9kaXY+XG4gICAgKTtcblx0fVxuXG59KTtcblxubW9kdWxlLmV4cG9ydHMgPSBHcm91cHNMaXN0O1xuIiwidmFyIGZsdXggPSByZXF1aXJlKCdmbHV4LXJlYWN0Jyk7XG52YXIgYWN0aW9ucyA9IHJlcXVpcmUoJy4vYWN0aW9ucy5qcycpO1xuXG5tb2R1bGUuZXhwb3J0cyA9IGZsdXguY3JlYXRlU3RvcmUoe1xuICB1c2VyczogW3tpZDogMSwgbmFtZTonQ2hyaXMnLCBncm91cHM6IFtdIH1dLFxuICBncm91cHM6IFt7aWQ6IDEsIG5hbWU6ICdJbnRlck5hdGlvbnMnLCBtZW1iZXJzOiBbXSB9XSxcbiAgYWN0aW9uczogW1xuICAgIGFjdGlvbnMuYWRkVXNlcixcbiAgICBhY3Rpb25zLmFkZEdyb3VwLFxuICAgIGFjdGlvbnMuZGVsZXRlVXNlclxuICBdLFxuXG4gIGdldEdyb3VwQnlOYW1lOiBmdW5jdGlvbihuYW1lKXtcbiAgICAgZm9yKHZhciBpPTA7IGkgPCB0aGlzLmdyb3Vwcy5sZW5ndGg7IGkrKyl7XG4gICAgICAgaWYodGhpcy5ncm91cHNbaV0ubmFtZSA9PSBuYW1lKXtcbiAgICAgICAgIHJldHVybiB0aGlzLmdyb3Vwc1tpXVxuICAgICAgIH1cbiAgICAgfTtcbiAgfSxcblxuICBhZGRVc2VyOiBmdW5jdGlvbih1c2VyTmFtZSwgZ3JvdXApIHtcbiAgICBpZihncm91cCkge1xuICAgICAgdGhpcy51c2Vycy5wdXNoKHsgaWQ6KHRoaXMudXNlcnMubGVuZ3RoKzEpLCBuYW1lOiB1c2VyTmFtZSwgZ3JvdXBzOiBncm91cH0pO1xuICAgICAgdGhpcy5nZXRHcm91cEJ5TmFtZShncm91cCkubWVtYmVycy5wdXNoKHVzZXJOYW1lKTtcbiAgICAgIHRoaXMuZW1pdENoYW5nZSgpO1xuICAgIH1cbiAgICBlbHNlIHtcbiAgICAgIGFsZXJ0KCdVc2VyIG11c3QgYmVsb25nIHRvIGEgZ3JvdXAnKVxuICAgIH07XG4gIH0sXG5cbiAgYWRkR3JvdXA6IGZ1bmN0aW9uKGdyb3VwKSB7XG4gICAgdGhpcy5ncm91cHMucHVzaCh7IGlkOih0aGlzLmdyb3Vwcy5sZW5ndGgrMSksIG5hbWU6IGdyb3VwICwgbWVtYmVyczogW119KTtcbiAgICB0aGlzLmVtaXRDaGFuZ2UoKTtcbiAgfSxcblxuICBkZWxldGVVc2VyRnJvbVVzZXJzOiBmdW5jdGlvbih1c2VyKSB7XG4gICAgZm9yKHZhciBpPTA7IGkgPCB0aGlzLnVzZXJzLmxlbmd0aDsgaSsrKXtcbiAgICAgIGlmKHVzZXIuaWQgPT0gdGhpcy51c2Vyc1tpXS5pZCl7XG4gICAgICAgIHRoaXMudXNlcnMuc3BsaWNlKGksIDEpO1xuICAgICAgfVxuICAgIH07XG4gIH0sXG5cbiAgZGVsZXRlVXNlckZyb21Hcm91cHM6IGZ1bmN0aW9uKHVzZXIpIHtcbiAgICBmb3IodmFyIGk9MDsgaSA8IHRoaXMuZ3JvdXBzLmxlbmd0aDsgaSsrKXtcbiAgICAgIGZvcih2YXIgaj0wOyBqIDwgdGhpcy5ncm91cHNbaV0ubWVtYmVycy5sZW5ndGg7IGorKyl7XG4gICAgICAgIGlmKHVzZXIubmFtZSA9PSB0aGlzLmdyb3Vwc1tpXS5tZW1iZXJzW2pdKXtcbiAgICAgICAgICB0aGlzLmdyb3Vwc1tpXS5tZW1iZXJzLnNwbGljZShqLCAxKVxuICAgICAgICB9XG4gICAgICB9XG4gICAgfTtcbiAgfSxcblxuICBkZWxldGVVc2VyOiBmdW5jdGlvbih1c2VyKSB7XG4gICAgdGhpcy5kZWxldGVVc2VyRnJvbVVzZXJzKHVzZXIpO1xuICAgIHRoaXMuZGVsZXRlVXNlckZyb21Hcm91cHModXNlcik7XG4gICAgdGhpcy5lbWl0Q2hhbmdlKCk7XG4gIH0sXG5cbiAgZXhwb3J0czoge1xuICAgIGdldFVzZXJzOiBmdW5jdGlvbigpIHtcbiAgICAgIHJldHVybiB0aGlzLnVzZXJzO1xuICAgIH0sXG4gICAgZ2V0R3JvdXBzOiBmdW5jdGlvbigpIHtcbiAgICAgIHJldHVybiB0aGlzLmdyb3Vwc1xuICAgIH1cbiAgfVxufSk7XG4iLCJ2YXIgUmVhY3QgPSByZXF1aXJlKCdyZWFjdCcpO1xudmFyIFN0b3JlID0gcmVxdWlyZSgnLi9TdG9yZS5qcycpO1xudmFyIGFjdGlvbnMgPSByZXF1aXJlKCcuL2FjdGlvbnMuanMnKTtcblxudmFyIFVzZXJzTGlzdCA9IFJlYWN0LmNyZWF0ZUNsYXNzKHtcbiAgZ2V0SW5pdGlhbFN0YXRlOiBmdW5jdGlvbigpIHtcbiAgICByZXR1cm4ge1xuICAgICAgdXNlcnM6IFN0b3JlLmdldFVzZXJzKCksXG4gICAgICBncm91cHM6IFN0b3JlLmdldEdyb3VwcygpLFxuICAgICAgbmV3VXNlcjogXCJcIlxuICAgIH07XG4gIH0sXG5cbiAgY29tcG9uZW50V2lsbE1vdW50OiBmdW5jdGlvbigpIHtcbiAgICBTdG9yZS5hZGRDaGFuZ2VMaXN0ZW5lcih0aGlzLmNoYW5nZVN0YXRlKTtcbiAgfSxcblxuICBjb21wb25lbnRXaWxsVW5tb3VudDogZnVuY3Rpb24gKCkge1xuICAgIFN0b3JlLnJlbW92ZUNoYW5nZUxpc3RlbmVyKHRoaXMuY2hhbmdlU3RhdGUpO1xuICB9LFxuXG4gIGNoYW5nZVN0YXRlOiBmdW5jdGlvbigpIHtcbiAgICB0aGlzLnNldFN0YXRlKHtcbiAgICAgIHVzZXJzOiBTdG9yZS5nZXRVc2VycygpLFxuICAgICAgZ3JvdXBzOiBTdG9yZS5nZXRHcm91cHMoKVxuICAgIH0pO1xuICB9LFxuXG4gIHVwZGF0ZU5ld1VzZXI6IGZ1bmN0aW9uKGV2ZW50KSB7XG4gICAgdGhpcy5zZXRTdGF0ZSh7XG4gICAgICBuZXdVc2VyOiBldmVudC50YXJnZXQudmFsdWVcbiAgICB9KVxuICB9LFxuXG4gIGFkZFVzZXI6IGZ1bmN0aW9uKGV2ZW50KSB7XG4gICAgZXZlbnQucHJldmVudERlZmF1bHQoKTtcbiAgICB2YXIgdXNlck5hbWUgPSB0aGlzLnJlZnMubmV3VXNlci52YWx1ZTtcbiAgICB2YXIgc2VsZWN0ZWRHcm91cCA9IHRoaXMucmVmcy5zZWxlY3RlZEdyb3VwLnZhbHVlO1xuICAgIGFjdGlvbnMuYWRkVXNlcih1c2VyTmFtZSwgc2VsZWN0ZWRHcm91cCk7XG4gICAgdGhpcy5zZXRTdGF0ZSh7XG4gICAgICBuZXdVc2VyOiAnJ1xuICAgIH0pXG4gIH0sXG5cbiAgZGVsZXRlVXNlcjogZnVuY3Rpb24odXNlcikge1xuICAgIGFjdGlvbnMuZGVsZXRlVXNlcih1c2VyKTtcbiAgfSxcblxuICByZW5kZXJHcm91cERyb3BEb3duOiBmdW5jdGlvbihncm91cCkge1xuICAgIHJldHVybihcbiAgICAgIDxvcHRpb24ga2V5PXtncm91cC5pZH0gdmFsdWU9e2dyb3VwLm5hbWV9Pntncm91cC5uYW1lfTwvb3B0aW9uPlxuICAgICk7XG4gIH0sXG5cbiAgcmVuZGVyVXNlcnM6IGZ1bmN0aW9uKHVzZXIpIHtcbiAgICByZXR1cm4oXG4gICAgICA8ZGl2IGtleT17dXNlci5pZH0+XG4gICAgICAgIHt1c2VyLm5hbWV9Ont1c2VyLmdyb3Vwc31cbiAgICAgICAgPGJ1dHRvbiBvbkNsaWNrPXt0aGlzLmRlbGV0ZVVzZXIuYmluZCh0aGlzLCB1c2VyKX0+PC9idXR0b24+XG4gICAgICA8L2Rpdj5cbiAgICApO1xuICB9LFxuXG5cdHJlbmRlcjogZnVuY3Rpb24oKSB7XG4gICAgcmV0dXJuKFxuICAgICAgPGRpdj5cbiAgICAgICAgPGgxPkFkZCBOZXcgVXNlcjwvaDE+XG4gICAgICAgIDxmb3JtIG9uU3VibWl0PXt0aGlzLmFkZFVzZXJ9PlxuICAgICAgICAgIDxpbnB1dCB0eXBlPVwidGV4dFwiIHJlZj1cIm5ld1VzZXJcIiBwbGFjZWhvbGRlcj1cIlVzZXIgTmFtZVwiXG4gICAgICAgICAgICB2YWx1ZT17dGhpcy5zdGF0ZS5uZXdVc2VyfSBvbkNoYW5nZT17dGhpcy51cGRhdGVOZXdVc2VyfS8+XG4gICAgICAgICAgPHNlbGVjdCBuYW1lPSdncm91cHMnIHJlZj1cInNlbGVjdGVkR3JvdXBcIiBkZWZhdWx0VmFsdWU9XCJcIj5cbiAgICAgICAgICAgIDxvcHRpb24gdmFsdWU9XCJcIj5QbGVhc2Ugc2VsZWN0IGEgZ3JvdXAuLi48L29wdGlvbj5cbiAgICAgICAgICAgIHt0aGlzLnN0YXRlLmdyb3Vwcy5tYXAodGhpcy5yZW5kZXJHcm91cERyb3BEb3duKX1cbiAgICAgICAgICA8L3NlbGVjdD5cbiAgICAgICAgPC9mb3JtPlxuICAgICAgICB7dGhpcy5zdGF0ZS51c2Vycy5tYXAodGhpcy5yZW5kZXJVc2Vycyl9XG4gICAgICA8L2Rpdj5cbiAgICApO1xuXHR9XG5cbn0pO1xuXG5tb2R1bGUuZXhwb3J0cyA9IFVzZXJzTGlzdDtcbiIsInZhciBmbHV4ID0gcmVxdWlyZSgnZmx1eC1yZWFjdCcpO1xuXG5tb2R1bGUuZXhwb3J0cyA9IGZsdXguY3JlYXRlQWN0aW9ucyhbXG4gICdhZGRVc2VyJyxcbiAgJ2FkZEdyb3VwJyxcbiAgJ2RlbGV0ZVVzZXInXG5dKTtcbiIsInZhciBSZWFjdCA9IHJlcXVpcmUoJ3JlYWN0Jyk7XG52YXIgQXBwID0gcmVxdWlyZSgnLi9BcHAuanMnKTtcblxuUmVhY3QucmVuZGVyKDxBcHAvPiwgZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJjb250ZW50XCIpKTtcbiJdfQ==
