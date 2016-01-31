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
        group.name
      ),
      React.createElement(
        'select',
        { name: 'users' },
        this.state.users.map(this.renderUserDropDown)
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
  actions: [actions.addUser, actions.addGroup, actions.addUserToGroup, actions.addGroupToUser],
  addUser: function addUser(user) {
    this.users.push({ id: this.users.length + 1, name: user });
    this.emitChange();
  },
  addGroup: function addGroup(group) {
    this.groups.push({ id: this.groups.length + 1, name: group, members: [] });
    this.emitChange();
  },
  addUserToGroup: function addUserToGroup(user, group) {
    this.group.members.push(user);
    this.emitChange();
  },
  addGroupToUser: function addGroupToUser(group, user) {
    this.user.groups.push(group);
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
    var input = this.refs.newUser;
    actions.addUser(input.value);
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
      user.name
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
          { name: 'groups', defaultValue: 'InterNations' },
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

module.exports = flux.createActions(['addUser', 'addGroup', 'addUserToGroup', 'addGroupToUser']);

},{"flux-react":"flux-react"}],"/home/chweeks/Desktop/projects/internations-react/app/main.js":[function(require,module,exports){
'use strict';

var React = require('react');
var App = require('./App.js');

React.render(React.createElement(App, null), document.getElementById("content"));

},{"./App.js":"/home/chweeks/Desktop/projects/internations-react/app/App.js","react":"react"}]},{},["/home/chweeks/Desktop/projects/internations-react/app/main.js"])
//# sourceMappingURL=data:application/json;charset:utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9icm93c2VyaWZ5L25vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCIvaG9tZS9jaHdlZWtzL0Rlc2t0b3AvcHJvamVjdHMvaW50ZXJuYXRpb25zLXJlYWN0L2FwcC9BcHAuanMiLCIvaG9tZS9jaHdlZWtzL0Rlc2t0b3AvcHJvamVjdHMvaW50ZXJuYXRpb25zLXJlYWN0L2FwcC9Hcm91cHNMaXN0LmpzIiwiL2hvbWUvY2h3ZWVrcy9EZXNrdG9wL3Byb2plY3RzL2ludGVybmF0aW9ucy1yZWFjdC9hcHAvU3RvcmUuanMiLCIvaG9tZS9jaHdlZWtzL0Rlc2t0b3AvcHJvamVjdHMvaW50ZXJuYXRpb25zLXJlYWN0L2FwcC9Vc2Vyc0xpc3QuanMiLCIvaG9tZS9jaHdlZWtzL0Rlc2t0b3AvcHJvamVjdHMvaW50ZXJuYXRpb25zLXJlYWN0L2FwcC9hY3Rpb25zLmpzIiwiL2hvbWUvY2h3ZWVrcy9EZXNrdG9wL3Byb2plY3RzL2ludGVybmF0aW9ucy1yZWFjdC9hcHAvbWFpbi5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTs7O0FDQUEsSUFBSSxLQUFLLEdBQUcsT0FBTyxDQUFDLE9BQU8sQ0FBQyxDQUFDO0FBQzdCLElBQUksU0FBUyxHQUFHLE9BQU8sQ0FBQyxnQkFBZ0IsQ0FBQyxDQUFDO0FBQzFDLElBQUksVUFBVSxHQUFHLE9BQU8sQ0FBQyxpQkFBaUIsQ0FBQyxDQUFBOztBQUUzQyxJQUFJLEdBQUcsR0FBRyxLQUFLLENBQUMsV0FBVyxDQUFDOzs7QUFFM0IsUUFBTSxFQUFFLGtCQUFXO0FBQ2hCLFdBQ0U7OztNQUNFLG9CQUFDLFNBQVMsT0FBRztNQUNiLG9CQUFDLFVBQVUsT0FBRztLQUNWLENBQ047R0FDSjs7Q0FFRCxDQUFDLENBQUM7O0FBRUgsTUFBTSxDQUFDLE9BQU8sR0FBRyxHQUFHLENBQUM7Ozs7O0FDakJyQixJQUFJLEtBQUssR0FBRyxPQUFPLENBQUMsT0FBTyxDQUFDLENBQUM7QUFD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QWM7VUFDOUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxNQUFNLENBQUMsR0FBRyxDQUFDLElBQUksQ0FBQyxtQkFBbUIsQ0FBQztTQUN6QztPQUNKO01BQ04sSUFBSSxDQUFDLEtBQUssQ0FBQyxLQUFLLENBQUMsR0FBRyxDQUFDLElBQUksQ0FBQyxXQUFXLENBQUM7S0FDbkMsQ0FDTjtHQUNKOztDQUVELENBQUMsQ0FBQzs7QUFFSCxNQUFNLENBQUMsT0FBTyxHQUFHLFNBQVMsQ0FBQzs7Ozs7QUMzRTNCLElBQUksSUFBSSxHQUFHLE9BQU8sQ0FBQyxZQUFZLENBQUMsQ0FBQzs7QUFFakMsTUFBTSxDQUFDLE9BQU8sR0FBRyxJQUFJLENBQUMsYUFBYSxDQUFDLENBQ2xDLFNBQVMsRUFDVCxVQUFVLEVBQ1YsZ0JBQWdCLEVBQ2hCLGdCQUFnQixDQUNqQixDQUFDLENBQUM7Ozs7O0FDUEgsSUFBSSxLQUFLLEdBQUcsT0FBTyxDQUFDLE9BQU8sQ0FBQyxDQUFDO0FBQzdCLElBQUksR0FBRyxHQUFHLE9BQU8sQ0FBQyxVQUFVLENBQUMsQ0FBQzs7QUFFOUIsS0FBSyxDQUFDLE1BQU0sQ0FBQyxvQkFBQyxHQUFHLE9BQUUsRUFBRSxRQUFRLENBQUMsY0FBYyxDQUFDLFNBQVMsQ0FBQyxDQUFDLENBQUMiLCJmaWxlIjoiZ2VuZXJhdGVkLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXNDb250ZW50IjpbIihmdW5jdGlvbiBlKHQsbixyKXtmdW5jdGlvbiBzKG8sdSl7aWYoIW5bb10pe2lmKCF0W29dKXt2YXIgYT10eXBlb2YgcmVxdWlyZT09XCJmdW5jdGlvblwiJiZyZXF1aXJlO2lmKCF1JiZhKXJldHVybiBhKG8sITApO2lmKGkpcmV0dXJuIGkobywhMCk7dmFyIGY9bmV3IEVycm9yKFwiQ2Fubm90IGZpbmQgbW9kdWxlICdcIitvK1wiJ1wiKTt0aHJvdyBmLmNvZGU9XCJNT0RVTEVfTk9UX0ZPVU5EXCIsZn12YXIgbD1uW29dPXtleHBvcnRzOnt9fTt0W29dWzBdLmNhbGwobC5leHBvcnRzLGZ1bmN0aW9uKGUpe3ZhciBuPXRbb11bMV1bZV07cmV0dXJuIHMobj9uOmUpfSxsLGwuZXhwb3J0cyxlLHQsbixyKX1yZXR1cm4gbltvXS5leHBvcnRzfXZhciBpPXR5cGVvZiByZXF1aXJlPT1cImZ1bmN0aW9uXCImJnJlcXVpcmU7Zm9yKHZhciBvPTA7bzxyLmxlbmd0aDtvKyspcyhyW29dKTtyZXR1cm4gc30pIiwidmFyIFJlYWN0ID0gcmVxdWlyZSgncmVhY3QnKTtcbnZhciBVc2Vyc0xpc3QgPSByZXF1aXJlKCcuL1VzZXJzTGlzdC5qcycpO1xudmFyIEdyb3Vwc0xpc3QgPSByZXF1aXJlKCcuL0dyb3Vwc0xpc3QuanMnKVxuXG52YXIgQXBwID0gUmVhY3QuY3JlYXRlQ2xhc3Moe1xuXG5cdHJlbmRlcjogZnVuY3Rpb24oKSB7XG4gICAgcmV0dXJuKFxuICAgICAgPGRpdj5cbiAgICAgICAgPFVzZXJzTGlzdCAvPlxuICAgICAgICA8R3JvdXBzTGlzdCAvPlxuICAgICAgPC9kaXY+XG4gICAgKTtcblx0fVxuXG59KTtcblxubW9kdWxlLmV4cG9ydHMgPSBBcHA7XG4iLCJ2YXIgUmVhY3QgPSByZXF1aXJlKCdyZWFjdCcpO1xudmFyIFN0b3JlID0gcmVxdWlyZSgnLi9TdG9yZS5qcycpO1xudmFyIGFjdGlvbnMgPSByZXF1aXJlKCcuL2FjdGlvbnMuanMnKTtcblxudmFyIEdyb3Vwc0xpc3QgPSBSZWFjdC5jcmVhdGVDbGFzcyh7XG4gIGdldEluaXRpYWxTdGF0ZTogZnVuY3Rpb24oKSB7XG4gICAgcmV0dXJuIHtcbiAgICAgIGdyb3VwczogU3RvcmUuZ2V0R3JvdXBzKCksXG4gICAgICB1c2VyczogU3RvcmUuZ2V0VXNlcnMoKSxcbiAgICAgIG5ld0dyb3VwOiBcIlwiXG4gICAgfTtcbiAgfSxcblxuICBjb21wb25lbnRXaWxsTW91bnQ6IGZ1bmN0aW9uKCkge1xuICAgIFN0b3JlLmFkZENoYW5nZUxpc3RlbmVyKHRoaXMuY2hhbmdlU3RhdGUpO1xuICB9LFxuXG4gIGNvbXBvbmVudFdpbGxVbm1vdW50OiBmdW5jdGlvbiAoKSB7XG4gICAgU3RvcmUucmVtb3ZlQ2hhbmdlTGlzdGVuZXIodGhpcy5jaGFuZ2VTdGF0ZSk7XG4gIH0sXG5cbiAgY2hhbmdlU3RhdGU6IGZ1bmN0aW9uKCkge1xuICAgIHRoaXMuc2V0U3RhdGUoe1xuICAgICAgZ3JvdXBzOiBTdG9yZS5nZXRHcm91cHMoKSxcbiAgICAgIHVzZXJzOiBTdG9yZS5nZXRVc2VycygpXG4gICAgfSk7XG4gIH0sXG5cbiAgdXBkYXRlTmV3R3JvdXA6IGZ1bmN0aW9uKGV2ZW50KSB7XG4gICAgdGhpcy5zZXRTdGF0ZSh7XG4gICAgICBuZXdHcm91cDogZXZlbnQudGFyZ2V0LnZhbHVlXG4gICAgfSlcbiAgfSxcblxuICBhZGRHcm91cDogZnVuY3Rpb24oZXZlbnQpIHtcbiAgICBldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xuICAgIHZhciBpbnB1dCA9IHRoaXMucmVmcy5uZXdHcm91cDtcbiAgICBhY3Rpb25zLmFkZEdyb3VwKGlucHV0LnZhbHVlKTtcbiAgICB0aGlzLnNldFN0YXRlKHtcbiAgICAgIG5ld0dyb3VwOiAnJ1xuICAgIH0pXG4gIH0sXG5cbiAgcmVuZGVyVXNlckRyb3BEb3duOiBmdW5jdGlvbih1c2VyKSB7XG4gICAgcmV0dXJuKFxuICAgICAgPG9wdGlvbiBrZXk9e3VzZXIuaWR9IHZhbHVlPXt1c2VyLm5hbWV9Pnt1c2VyLm5hbWV9PC9vcHRpb24+XG4gICAgKTtcbiAgfSxcblxuICByZW5kZXJHcm91cHM6IGZ1bmN0aW9uKGdyb3VwKSB7XG4gICAgcmV0dXJuIChcbiAgICAgIDxkaXYga2V5PXtncm91cC5pZH0+XG4gICAgICAgIDxzcGFuPntncm91cC5uYW1lfTwvc3Bhbj5cbiAgICAgICAgPHNlbGVjdCBuYW1lPSd1c2Vycyc+XG4gICAgICAgICAge3RoaXMuc3RhdGUudXNlcnMubWFwKHRoaXMucmVuZGVyVXNlckRyb3BEb3duKX1cbiAgICAgICAgPC9zZWxlY3Q+XG4gICAgICA8L2Rpdj5cbiAgICApO1xuICB9LFxuXG5cdHJlbmRlcjogZnVuY3Rpb24oKSB7XG4gICAgcmV0dXJuKFxuICAgICAgPGRpdj5cbiAgICAgICAgPGgxPkFkZCBOZXcgR3JvdXA8L2gxPlxuICAgICAgICA8Zm9ybSBvblN1Ym1pdD17dGhpcy5hZGRHcm91cH0+XG4gICAgICAgICAgPGlucHV0IHR5cGU9XCJ0ZXh0XCIgcmVmPVwibmV3R3JvdXBcIiBwbGFjZWhvbGRlcj1cIkdyb3VwIE5hbWVcIlxuICAgICAgICAgICAgdmFsdWU9e3RoaXMuc3RhdGUubmV3R3JvdXB9IG9uQ2hhbmdlPXt0aGlzLnVwZGF0ZU5ld0dyb3VwfS8+XG4gICAgICAgIDwvZm9ybT5cbiAgICAgICAge3RoaXMuc3RhdGUuZ3JvdXBzLm1hcCh0aGlzLnJlbmRlckdyb3Vwcyl9XG4gICAgICA8L2Rpdj5cbiAgICApO1xuXHR9XG5cbn0pO1xuXG5tb2R1bGUuZXhwb3J0cyA9IEdyb3Vwc0xpc3Q7XG4iLCJ2YXIgZmx1eCA9IHJlcXVpcmUoJ2ZsdXgtcmVhY3QnKTtcbnZhciBhY3Rpb25zID0gcmVxdWlyZSgnLi9hY3Rpb25zLmpzJyk7XG5cbm1vZHVsZS5leHBvcnRzID0gZmx1eC5jcmVhdGVTdG9yZSh7XG4gIHVzZXJzOiBbe2lkOiAxLCBuYW1lOidDaHJpcycsIGdyb3VwczogW10gfV0sXG4gIGdyb3VwczogW3tpZDogMSwgbmFtZTogJ0ludGVyTmF0aW9ucycsIG1lbWJlcnM6IFtdfV0sXG4gIGFjdGlvbnM6IFtcbiAgICBhY3Rpb25zLmFkZFVzZXIsXG4gICAgYWN0aW9ucy5hZGRHcm91cCxcbiAgICBhY3Rpb25zLmFkZFVzZXJUb0dyb3VwLFxuICAgIGFjdGlvbnMuYWRkR3JvdXBUb1VzZXJcbiAgXSxcbiAgYWRkVXNlcjogZnVuY3Rpb24odXNlcikge1xuICAgIHRoaXMudXNlcnMucHVzaCh7IGlkOih0aGlzLnVzZXJzLmxlbmd0aCsxKSwgbmFtZTogdXNlciB9KTtcbiAgICB0aGlzLmVtaXRDaGFuZ2UoKTtcbiAgfSxcbiAgYWRkR3JvdXA6IGZ1bmN0aW9uKGdyb3VwKSB7XG4gICAgdGhpcy5ncm91cHMucHVzaCh7IGlkOih0aGlzLmdyb3Vwcy5sZW5ndGgrMSksIG5hbWU6IGdyb3VwICwgbWVtYmVyczogW119KTtcbiAgICB0aGlzLmVtaXRDaGFuZ2UoKTtcbiAgfSxcbiAgYWRkVXNlclRvR3JvdXA6IGZ1bmN0aW9uKHVzZXIsIGdyb3VwKSB7XG4gICAgdGhpcy5ncm91cC5tZW1iZXJzLnB1c2godXNlcik7XG4gICAgdGhpcy5lbWl0Q2hhbmdlKCk7XG4gIH0sXG4gIGFkZEdyb3VwVG9Vc2VyOiBmdW5jdGlvbihncm91cCwgdXNlcikge1xuICAgIHRoaXMudXNlci5ncm91cHMucHVzaChncm91cCk7XG4gICAgdGhpcy5lbWl0Q2hhbmdlKCk7XG4gIH0sXG4gIGV4cG9ydHM6IHtcbiAgICBnZXRVc2VyczogZnVuY3Rpb24oKSB7XG4gICAgICByZXR1cm4gdGhpcy51c2VycztcbiAgICB9LFxuICAgIGdldEdyb3VwczogZnVuY3Rpb24oKSB7XG4gICAgICByZXR1cm4gdGhpcy5ncm91cHNcbiAgICB9XG4gIH1cbn0pO1xuIiwidmFyIFJlYWN0ID0gcmVxdWlyZSgncmVhY3QnKTtcbnZhciBTdG9yZSA9IHJlcXVpcmUoJy4vU3RvcmUuanMnKTtcbnZhciBhY3Rpb25zID0gcmVxdWlyZSgnLi9hY3Rpb25zLmpzJyk7XG5cbnZhciBVc2Vyc0xpc3QgPSBSZWFjdC5jcmVhdGVDbGFzcyh7XG4gIGdldEluaXRpYWxTdGF0ZTogZnVuY3Rpb24oKSB7XG4gICAgcmV0dXJuIHtcbiAgICAgIHVzZXJzOiBTdG9yZS5nZXRVc2VycygpLFxuICAgICAgZ3JvdXBzOiBTdG9yZS5nZXRHcm91cHMoKSxcbiAgICAgIG5ld1VzZXI6IFwiXCJcbiAgICB9O1xuICB9LFxuXG4gIGNvbXBvbmVudFdpbGxNb3VudDogZnVuY3Rpb24oKSB7XG4gICAgU3RvcmUuYWRkQ2hhbmdlTGlzdGVuZXIodGhpcy5jaGFuZ2VTdGF0ZSk7XG4gIH0sXG5cbiAgY29tcG9uZW50V2lsbFVubW91bnQ6IGZ1bmN0aW9uICgpIHtcbiAgICBTdG9yZS5yZW1vdmVDaGFuZ2VMaXN0ZW5lcih0aGlzLmNoYW5nZVN0YXRlKTtcbiAgfSxcblxuICBjaGFuZ2VTdGF0ZTogZnVuY3Rpb24oKSB7XG4gICAgdGhpcy5zZXRTdGF0ZSh7XG4gICAgICB1c2VyczogU3RvcmUuZ2V0VXNlcnMoKSxcbiAgICAgIGdyb3VwczogU3RvcmUuZ2V0R3JvdXBzKClcbiAgICB9KTtcbiAgfSxcblxuICB1cGRhdGVOZXdVc2VyOiBmdW5jdGlvbihldmVudCkge1xuICAgIHRoaXMuc2V0U3RhdGUoe1xuICAgICAgbmV3VXNlcjogZXZlbnQudGFyZ2V0LnZhbHVlXG4gICAgfSlcbiAgfSxcblxuICBhZGRVc2VyOiBmdW5jdGlvbihldmVudCkge1xuICAgIGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XG4gICAgdmFyIGlucHV0ID0gdGhpcy5yZWZzLm5ld1VzZXI7XG4gICAgYWN0aW9ucy5hZGRVc2VyKGlucHV0LnZhbHVlKTtcbiAgICB0aGlzLnNldFN0YXRlKHtcbiAgICAgIG5ld1VzZXI6ICcnXG4gICAgfSlcbiAgfSxcblxuICByZW5kZXJHcm91cERyb3BEb3duOiBmdW5jdGlvbihncm91cCkge1xuICAgIHJldHVybihcbiAgICAgIDxvcHRpb24ga2V5PXtncm91cC5pZH0gdmFsdWU9e2dyb3VwLm5hbWV9Pntncm91cC5uYW1lfTwvb3B0aW9uPlxuICAgICk7XG4gIH0sXG5cbiAgcmVuZGVyVXNlcnM6IGZ1bmN0aW9uKHVzZXIpIHtcbiAgICByZXR1cm4oXG4gICAgICA8ZGl2IGtleT17dXNlci5pZH0+XG4gICAgICAgIHt1c2VyLm5hbWV9XG4gICAgICA8L2Rpdj5cbiAgICApO1xuICB9LFxuXG5cdHJlbmRlcjogZnVuY3Rpb24oKSB7XG4gICAgcmV0dXJuKFxuICAgICAgPGRpdj5cbiAgICAgICAgPGgxPkFkZCBOZXcgVXNlcjwvaDE+XG4gICAgICAgIDxmb3JtIG9uU3VibWl0PXt0aGlzLmFkZFVzZXJ9PlxuICAgICAgICAgIDxpbnB1dCB0eXBlPVwidGV4dFwiIHJlZj1cIm5ld1VzZXJcIiBwbGFjZWhvbGRlcj1cIlVzZXIgTmFtZVwiXG4gICAgICAgICAgICB2YWx1ZT17dGhpcy5zdGF0ZS5uZXdVc2VyfSBvbkNoYW5nZT17dGhpcy51cGRhdGVOZXdVc2VyfS8+XG4gICAgICAgICAgPHNlbGVjdCBuYW1lPSdncm91cHMnIGRlZmF1bHRWYWx1ZT0nSW50ZXJOYXRpb25zJz5cbiAgICAgICAgICAgIHt0aGlzLnN0YXRlLmdyb3Vwcy5tYXAodGhpcy5yZW5kZXJHcm91cERyb3BEb3duKX1cbiAgICAgICAgICA8L3NlbGVjdD5cbiAgICAgICAgPC9mb3JtPlxuICAgICAgICB7dGhpcy5zdGF0ZS51c2Vycy5tYXAodGhpcy5yZW5kZXJVc2Vycyl9XG4gICAgICA8L2Rpdj5cbiAgICApO1xuXHR9XG5cbn0pO1xuXG5tb2R1bGUuZXhwb3J0cyA9IFVzZXJzTGlzdDtcbiIsInZhciBmbHV4ID0gcmVxdWlyZSgnZmx1eC1yZWFjdCcpO1xuXG5tb2R1bGUuZXhwb3J0cyA9IGZsdXguY3JlYXRlQWN0aW9ucyhbXG4gICdhZGRVc2VyJyxcbiAgJ2FkZEdyb3VwJyxcbiAgJ2FkZFVzZXJUb0dyb3VwJyxcbiAgJ2FkZEdyb3VwVG9Vc2VyJ1xuXSk7XG4iLCJ2YXIgUmVhY3QgPSByZXF1aXJlKCdyZWFjdCcpO1xudmFyIEFwcCA9IHJlcXVpcmUoJy4vQXBwLmpzJyk7XG5cblJlYWN0LnJlbmRlcig8QXBwLz4sIGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwiY29udGVudFwiKSk7XG4iXX0=
