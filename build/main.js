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
  actions: [actions.addUser, actions.addGroup],

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
      user.groups
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

module.exports = flux.createActions(['addUser', 'addGroup']);

},{"flux-react":"flux-react"}],"/home/chweeks/Desktop/projects/internations-react/app/main.js":[function(require,module,exports){
'use strict';

var React = require('react');
var App = require('./App.js');

React.render(React.createElement(App, null), document.getElementById("content"));

},{"./App.js":"/home/chweeks/Desktop/projects/internations-react/app/App.js","react":"react"}]},{},["/home/chweeks/Desktop/projects/internations-react/app/main.js"])
//# sourceMappingURL=data:application/json;charset:utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9icm93c2VyaWZ5L25vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCIvaG9tZS9jaHdlZWtzL0Rlc2t0b3AvcHJvamVjdHMvaW50ZXJuYXRpb25zLXJlYWN0L2FwcC9BcHAuanMiLCIvaG9tZS9jaHdlZWtzL0Rlc2t0b3AvcHJvamVjdHMvaW50ZXJuYXRpb25zLXJlYWN0L2FwcC9Hcm91cHNMaXN0LmpzIiwiL2hvbWUvY2h3ZWVrcy9EZXNrdG9wL3Byb2plY3RzL2ludGVybmF0aW9ucy1yZWFjdC9hcHAvU3RvcmUuanMiLCIvaG9tZS9jaHdlZWtzL0Rlc2t0b3AvcHJvamVjdHMvaW50ZXJuYXRpb25zLXJlYWN0L2FwcC9Vc2Vyc0xpc3QuanMiLCIvaG9tZS9jaHdlZWtzL0Rlc2t0b3AvcHJvamVjdHMvaW50ZXJuYXRpb25zLXJlYWN0L2FwcC9hY3Rpb25zLmpzIiwiL2hvbWUvY2h3ZWVrcy9EZXNrdG9wL3Byb2plY3RzL2ludGVybmF0aW9ucy1yZWFjdC9hcHAvbWFpbi5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTs7O0FDQUEsSUFBSSxLQUFLLEdBQUcsT0FBTyxDQUFDLE9BQU8sQ0FBQyxDQUFDO0FBQzdCLElBQUksU0FBUyxHQUFHLE9BQU8sQ0FBQyxnQkFBZ0IsQ0FBQyxDQUFDO0FBQzFDLElBQUksVUFBVSxHQUFHLE9BQU8sQ0FBQyxpQkFBaUIsQ0FBQyxDQUFBOztBQUUzQyxJQUFJLEdBQUcsR0FBRyxLQUFLLENBQUMsV0FBVyxDQUFDOzs7QUFFM0IsUUFBTSxFQUFFLGtCQUFXO0FBQ2hCLFdBQ0U7OztNQUNFLG9CQUFDLFNBQVMsT0FBRztNQUNiLG9CQUFDLFVBQVUsT0FBRztLQUNWLENBQ047R0FDSjs7Q0FFRCxDQUFDLENBQUM7O0FBRUgsTUFBTSxDQUFDLE9BQU8sR0FBRyxHQUFHLENBQUM7Ozs7O0FDakJyQixJQUFJLEtBQUssR0FBRyxPQUFPLENBQUMsT0FBTyxDQUFDLENBQUM7QUFD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O0FBQ3RELGVBQUssRUFBRSxJQUFJLENBQUMsS0FBSyxDQUFDLE9BQU8sQUFBQyxFQUFDLFFBQVEsRUFBRSxJQUFJLENBQUMsYUFBYSxBQUFDLEdBQUU7UUFDNUQ7O1lBQVEsSUFBSSxFQUFDLFFBQVEsRUFBQyxHQUFHLEVBQUMsZUFBZSxFQUFDLFlBQVksRUFBQyxFQUFFO1VBQ3ZEOztjQUFRLEtBQUssRUFBQyxFQUFFOztXQUFrQztVQUNqRCxJQUFJLENBQUMsS0FBSyxDQUFDLE1BQU0sQ0FBQyxHQUFHLENBQUMsSUFBSSxDQUFDLG1CQUFtQixDQUFDO1NBQ3pDO09BQ0o7TUFDTixJQUFJLENBQUMsS0FBSyxDQUFDLEtBQUssQ0FBQyxHQUFHLENBQUMsSUFBSSxDQUFDLFdBQVcsQ0FBQztLQUNuQyxDQUNOO0dBQ0o7O0NBRUQsQ0FBQyxDQUFDOztBQUVILE1BQU0sQ0FBQyxPQUFPLEdBQUcsU0FBUyxDQUFDOzs7OztBQzdFM0IsSUFBSSxJQUFJLEdBQUcsT0FBTyxDQUFDLFlBQVksQ0FBQyxDQUFDOztBQUVqQyxNQUFNLENBQUMsT0FBTyxHQUFHLElBQUksQ0FBQyxhQUFhLENBQUMsQ0FDbEMsU0FBUyxFQUNULFVBQVUsQ0FDWCxDQUFDLENBQUM7Ozs7O0FDTEgsSUFBSSxLQUFLLEdBQUcsT0FBTyxDQUFDLE9BQU8sQ0FBQyxDQUFDO0FBQzdCLElBQUksR0FBRyxHQUFHLE9BQU8sQ0FBQyxVQUFVLENBQUMsQ0FBQzs7QUFFOUIsS0FBSyxDQUFDLE1BQU0sQ0FBQyxvQkFBQyxHQUFHLE9BQUUsRUFBRSxRQUFRLENBQUMsY0FBYyxDQUFDLFNBQVMsQ0FBQyxDQUFDLENBQUMiLCJmaWxlIjoiZ2VuZXJhdGVkLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXNDb250ZW50IjpbIihmdW5jdGlvbiBlKHQsbixyKXtmdW5jdGlvbiBzKG8sdSl7aWYoIW5bb10pe2lmKCF0W29dKXt2YXIgYT10eXBlb2YgcmVxdWlyZT09XCJmdW5jdGlvblwiJiZyZXF1aXJlO2lmKCF1JiZhKXJldHVybiBhKG8sITApO2lmKGkpcmV0dXJuIGkobywhMCk7dmFyIGY9bmV3IEVycm9yKFwiQ2Fubm90IGZpbmQgbW9kdWxlICdcIitvK1wiJ1wiKTt0aHJvdyBmLmNvZGU9XCJNT0RVTEVfTk9UX0ZPVU5EXCIsZn12YXIgbD1uW29dPXtleHBvcnRzOnt9fTt0W29dWzBdLmNhbGwobC5leHBvcnRzLGZ1bmN0aW9uKGUpe3ZhciBuPXRbb11bMV1bZV07cmV0dXJuIHMobj9uOmUpfSxsLGwuZXhwb3J0cyxlLHQsbixyKX1yZXR1cm4gbltvXS5leHBvcnRzfXZhciBpPXR5cGVvZiByZXF1aXJlPT1cImZ1bmN0aW9uXCImJnJlcXVpcmU7Zm9yKHZhciBvPTA7bzxyLmxlbmd0aDtvKyspcyhyW29dKTtyZXR1cm4gc30pIiwidmFyIFJlYWN0ID0gcmVxdWlyZSgncmVhY3QnKTtcbnZhciBVc2Vyc0xpc3QgPSByZXF1aXJlKCcuL1VzZXJzTGlzdC5qcycpO1xudmFyIEdyb3Vwc0xpc3QgPSByZXF1aXJlKCcuL0dyb3Vwc0xpc3QuanMnKVxuXG52YXIgQXBwID0gUmVhY3QuY3JlYXRlQ2xhc3Moe1xuXG5cdHJlbmRlcjogZnVuY3Rpb24oKSB7XG4gICAgcmV0dXJuKFxuICAgICAgPGRpdj5cbiAgICAgICAgPFVzZXJzTGlzdCAvPlxuICAgICAgICA8R3JvdXBzTGlzdCAvPlxuICAgICAgPC9kaXY+XG4gICAgKTtcblx0fVxuXG59KTtcblxubW9kdWxlLmV4cG9ydHMgPSBBcHA7XG4iLCJ2YXIgUmVhY3QgPSByZXF1aXJlKCdyZWFjdCcpO1xudmFyIFN0b3JlID0gcmVxdWlyZSgnLi9TdG9yZS5qcycpO1xudmFyIGFjdGlvbnMgPSByZXF1aXJlKCcuL2FjdGlvbnMuanMnKTtcblxudmFyIEdyb3Vwc0xpc3QgPSBSZWFjdC5jcmVhdGVDbGFzcyh7XG4gIGdldEluaXRpYWxTdGF0ZTogZnVuY3Rpb24oKSB7XG4gICAgcmV0dXJuIHtcbiAgICAgIGdyb3VwczogU3RvcmUuZ2V0R3JvdXBzKCksXG4gICAgICB1c2VyczogU3RvcmUuZ2V0VXNlcnMoKSxcbiAgICAgIG5ld0dyb3VwOiBcIlwiXG4gICAgfTtcbiAgfSxcblxuICBjb21wb25lbnRXaWxsTW91bnQ6IGZ1bmN0aW9uKCkge1xuICAgIFN0b3JlLmFkZENoYW5nZUxpc3RlbmVyKHRoaXMuY2hhbmdlU3RhdGUpO1xuICB9LFxuXG4gIGNvbXBvbmVudFdpbGxVbm1vdW50OiBmdW5jdGlvbiAoKSB7XG4gICAgU3RvcmUucmVtb3ZlQ2hhbmdlTGlzdGVuZXIodGhpcy5jaGFuZ2VTdGF0ZSk7XG4gIH0sXG5cbiAgY2hhbmdlU3RhdGU6IGZ1bmN0aW9uKCkge1xuICAgIHRoaXMuc2V0U3RhdGUoe1xuICAgICAgZ3JvdXBzOiBTdG9yZS5nZXRHcm91cHMoKSxcbiAgICAgIHVzZXJzOiBTdG9yZS5nZXRVc2VycygpXG4gICAgfSk7XG4gIH0sXG5cbiAgdXBkYXRlTmV3R3JvdXA6IGZ1bmN0aW9uKGV2ZW50KSB7XG4gICAgdGhpcy5zZXRTdGF0ZSh7XG4gICAgICBuZXdHcm91cDogZXZlbnQudGFyZ2V0LnZhbHVlXG4gICAgfSlcbiAgfSxcblxuICBhZGRHcm91cDogZnVuY3Rpb24oZXZlbnQpIHtcbiAgICBldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xuICAgIHZhciBpbnB1dCA9IHRoaXMucmVmcy5uZXdHcm91cDtcbiAgICBhY3Rpb25zLmFkZEdyb3VwKGlucHV0LnZhbHVlKTtcbiAgICB0aGlzLnNldFN0YXRlKHtcbiAgICAgIG5ld0dyb3VwOiAnJ1xuICAgIH0pXG4gIH0sXG5cbiAgcmVuZGVyVXNlckRyb3BEb3duOiBmdW5jdGlvbih1c2VyKSB7XG4gICAgcmV0dXJuKFxuICAgICAgPG9wdGlvbiBrZXk9e3VzZXIuaWR9IHZhbHVlPXt1c2VyLm5hbWV9Pnt1c2VyLm5hbWV9PC9vcHRpb24+XG4gICAgKTtcbiAgfSxcblxuICByZW5kZXJHcm91cHM6IGZ1bmN0aW9uKGdyb3VwKSB7XG4gICAgcmV0dXJuIChcbiAgICAgIDxkaXYga2V5PXtncm91cC5pZH0+XG4gICAgICAgIDxzcGFuPntncm91cC5uYW1lfToge2dyb3VwLm1lbWJlcnN9PC9zcGFuPlxuICAgICAgPC9kaXY+XG4gICAgKTtcbiAgfSxcblxuXHRyZW5kZXI6IGZ1bmN0aW9uKCkge1xuICAgIHJldHVybihcbiAgICAgIDxkaXY+XG4gICAgICAgIDxoMT5BZGQgTmV3IEdyb3VwPC9oMT5cbiAgICAgICAgPGZvcm0gb25TdWJtaXQ9e3RoaXMuYWRkR3JvdXB9PlxuICAgICAgICAgIDxpbnB1dCB0eXBlPVwidGV4dFwiIHJlZj1cIm5ld0dyb3VwXCIgcGxhY2Vob2xkZXI9XCJHcm91cCBOYW1lXCJcbiAgICAgICAgICAgIHZhbHVlPXt0aGlzLnN0YXRlLm5ld0dyb3VwfSBvbkNoYW5nZT17dGhpcy51cGRhdGVOZXdHcm91cH0vPlxuICAgICAgICA8L2Zvcm0+XG4gICAgICAgIHt0aGlzLnN0YXRlLmdyb3Vwcy5tYXAodGhpcy5yZW5kZXJHcm91cHMpfVxuICAgICAgPC9kaXY+XG4gICAgKTtcblx0fVxuXG59KTtcblxubW9kdWxlLmV4cG9ydHMgPSBHcm91cHNMaXN0O1xuIiwidmFyIGZsdXggPSByZXF1aXJlKCdmbHV4LXJlYWN0Jyk7XG52YXIgYWN0aW9ucyA9IHJlcXVpcmUoJy4vYWN0aW9ucy5qcycpO1xuXG5tb2R1bGUuZXhwb3J0cyA9IGZsdXguY3JlYXRlU3RvcmUoe1xuICB1c2VyczogW3tpZDogMSwgbmFtZTonQ2hyaXMnLCBncm91cHM6IFtdIH1dLFxuICBncm91cHM6IFt7aWQ6IDEsIG5hbWU6ICdJbnRlck5hdGlvbnMnLCBtZW1iZXJzOiBbXX1dLFxuICBhY3Rpb25zOiBbXG4gICAgYWN0aW9ucy5hZGRVc2VyLFxuICAgIGFjdGlvbnMuYWRkR3JvdXAsXG4gIF0sXG5cbiAgZ2V0R3JvdXBCeU5hbWU6IGZ1bmN0aW9uKG5hbWUpe1xuICAgICBmb3IodmFyIGk9MDsgaSA8IHRoaXMuZ3JvdXBzLmxlbmd0aDsgaSsrKXtcbiAgICAgICBpZih0aGlzLmdyb3Vwc1tpXS5uYW1lID09IG5hbWUpe1xuICAgICAgICAgcmV0dXJuIHRoaXMuZ3JvdXBzW2ldXG4gICAgICAgfVxuICAgICB9O1xuICB9LFxuXG4gIGFkZFVzZXI6IGZ1bmN0aW9uKHVzZXJOYW1lLCBncm91cCkge1xuICAgIGlmKGdyb3VwKSB7XG4gICAgICB0aGlzLnVzZXJzLnB1c2goeyBpZDoodGhpcy51c2Vycy5sZW5ndGgrMSksIG5hbWU6IHVzZXJOYW1lLCBncm91cHM6IGdyb3VwfSk7XG4gICAgICB0aGlzLmdldEdyb3VwQnlOYW1lKGdyb3VwKS5tZW1iZXJzLnB1c2godXNlck5hbWUpO1xuICAgICAgdGhpcy5lbWl0Q2hhbmdlKCk7XG4gICAgfVxuICAgIGVsc2Uge1xuICAgICAgYWxlcnQoJ1VzZXIgbXVzdCBiZWxvbmcgdG8gYSBncm91cCcpXG4gICAgfTtcbiAgfSxcblxuICBhZGRHcm91cDogZnVuY3Rpb24oZ3JvdXApIHtcbiAgICB0aGlzLmdyb3Vwcy5wdXNoKHsgaWQ6KHRoaXMuZ3JvdXBzLmxlbmd0aCsxKSwgbmFtZTogZ3JvdXAgLCBtZW1iZXJzOiBbXX0pO1xuICAgIHRoaXMuZW1pdENoYW5nZSgpO1xuICB9LFxuXG4gIGV4cG9ydHM6IHtcbiAgICBnZXRVc2VyczogZnVuY3Rpb24oKSB7XG4gICAgICByZXR1cm4gdGhpcy51c2VycztcbiAgICB9LFxuICAgIGdldEdyb3VwczogZnVuY3Rpb24oKSB7XG4gICAgICByZXR1cm4gdGhpcy5ncm91cHNcbiAgICB9XG4gIH1cbn0pO1xuIiwidmFyIFJlYWN0ID0gcmVxdWlyZSgncmVhY3QnKTtcbnZhciBTdG9yZSA9IHJlcXVpcmUoJy4vU3RvcmUuanMnKTtcbnZhciBhY3Rpb25zID0gcmVxdWlyZSgnLi9hY3Rpb25zLmpzJyk7XG5cbnZhciBVc2Vyc0xpc3QgPSBSZWFjdC5jcmVhdGVDbGFzcyh7XG4gIGdldEluaXRpYWxTdGF0ZTogZnVuY3Rpb24oKSB7XG4gICAgcmV0dXJuIHtcbiAgICAgIHVzZXJzOiBTdG9yZS5nZXRVc2VycygpLFxuICAgICAgZ3JvdXBzOiBTdG9yZS5nZXRHcm91cHMoKSxcbiAgICAgIG5ld1VzZXI6IFwiXCJcbiAgICB9O1xuICB9LFxuXG4gIGNvbXBvbmVudFdpbGxNb3VudDogZnVuY3Rpb24oKSB7XG4gICAgU3RvcmUuYWRkQ2hhbmdlTGlzdGVuZXIodGhpcy5jaGFuZ2VTdGF0ZSk7XG4gIH0sXG5cbiAgY29tcG9uZW50V2lsbFVubW91bnQ6IGZ1bmN0aW9uICgpIHtcbiAgICBTdG9yZS5yZW1vdmVDaGFuZ2VMaXN0ZW5lcih0aGlzLmNoYW5nZVN0YXRlKTtcbiAgfSxcblxuICBjaGFuZ2VTdGF0ZTogZnVuY3Rpb24oKSB7XG4gICAgdGhpcy5zZXRTdGF0ZSh7XG4gICAgICB1c2VyczogU3RvcmUuZ2V0VXNlcnMoKSxcbiAgICAgIGdyb3VwczogU3RvcmUuZ2V0R3JvdXBzKClcbiAgICB9KTtcbiAgfSxcblxuICB1cGRhdGVOZXdVc2VyOiBmdW5jdGlvbihldmVudCkge1xuICAgIHRoaXMuc2V0U3RhdGUoe1xuICAgICAgbmV3VXNlcjogZXZlbnQudGFyZ2V0LnZhbHVlXG4gICAgfSlcbiAgfSxcblxuICBhZGRVc2VyOiBmdW5jdGlvbihldmVudCkge1xuICAgIGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XG4gICAgdmFyIHVzZXJOYW1lID0gdGhpcy5yZWZzLm5ld1VzZXIudmFsdWU7XG4gICAgdmFyIHNlbGVjdGVkR3JvdXAgPSB0aGlzLnJlZnMuc2VsZWN0ZWRHcm91cC52YWx1ZTtcbiAgICBhY3Rpb25zLmFkZFVzZXIodXNlck5hbWUsIHNlbGVjdGVkR3JvdXApO1xuICAgIHRoaXMuc2V0U3RhdGUoe1xuICAgICAgbmV3VXNlcjogJydcbiAgICB9KVxuICB9LFxuXG4gIHJlbmRlckdyb3VwRHJvcERvd246IGZ1bmN0aW9uKGdyb3VwKSB7XG4gICAgcmV0dXJuKFxuICAgICAgPG9wdGlvbiBrZXk9e2dyb3VwLmlkfSB2YWx1ZT17Z3JvdXAubmFtZX0+e2dyb3VwLm5hbWV9PC9vcHRpb24+XG4gICAgKTtcbiAgfSxcblxuICByZW5kZXJVc2VyczogZnVuY3Rpb24odXNlcikge1xuICAgIHJldHVybihcbiAgICAgIDxkaXYga2V5PXt1c2VyLmlkfT5cbiAgICAgICAge3VzZXIubmFtZX06e3VzZXIuZ3JvdXBzfVxuICAgICAgPC9kaXY+XG4gICAgKTtcbiAgfSxcblxuXHRyZW5kZXI6IGZ1bmN0aW9uKCkge1xuICAgIHJldHVybihcbiAgICAgIDxkaXY+XG4gICAgICAgIDxoMT5BZGQgTmV3IFVzZXI8L2gxPlxuICAgICAgICA8Zm9ybSBvblN1Ym1pdD17dGhpcy5hZGRVc2VyfT5cbiAgICAgICAgICA8aW5wdXQgdHlwZT1cInRleHRcIiByZWY9XCJuZXdVc2VyXCIgcGxhY2Vob2xkZXI9XCJVc2VyIE5hbWVcIlxuICAgICAgICAgICAgdmFsdWU9e3RoaXMuc3RhdGUubmV3VXNlcn0gb25DaGFuZ2U9e3RoaXMudXBkYXRlTmV3VXNlcn0vPlxuICAgICAgICAgIDxzZWxlY3QgbmFtZT0nZ3JvdXBzJyByZWY9XCJzZWxlY3RlZEdyb3VwXCIgZGVmYXVsdFZhbHVlPVwiXCI+XG4gICAgICAgICAgICA8b3B0aW9uIHZhbHVlPVwiXCI+UGxlYXNlIHNlbGVjdCBhIGdyb3VwLi4uPC9vcHRpb24+XG4gICAgICAgICAgICB7dGhpcy5zdGF0ZS5ncm91cHMubWFwKHRoaXMucmVuZGVyR3JvdXBEcm9wRG93bil9XG4gICAgICAgICAgPC9zZWxlY3Q+XG4gICAgICAgIDwvZm9ybT5cbiAgICAgICAge3RoaXMuc3RhdGUudXNlcnMubWFwKHRoaXMucmVuZGVyVXNlcnMpfVxuICAgICAgPC9kaXY+XG4gICAgKTtcblx0fVxuXG59KTtcblxubW9kdWxlLmV4cG9ydHMgPSBVc2Vyc0xpc3Q7XG4iLCJ2YXIgZmx1eCA9IHJlcXVpcmUoJ2ZsdXgtcmVhY3QnKTtcblxubW9kdWxlLmV4cG9ydHMgPSBmbHV4LmNyZWF0ZUFjdGlvbnMoW1xuICAnYWRkVXNlcicsXG4gICdhZGRHcm91cCcsXG5dKTtcbiIsInZhciBSZWFjdCA9IHJlcXVpcmUoJ3JlYWN0Jyk7XG52YXIgQXBwID0gcmVxdWlyZSgnLi9BcHAuanMnKTtcblxuUmVhY3QucmVuZGVyKDxBcHAvPiwgZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJjb250ZW50XCIpKTtcbiJdfQ==
