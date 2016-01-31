(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({"/home/chweeks/Desktop/projects/internations-react/app/App.js":[function(require,module,exports){
'use strict';

var React = require('react');
var UsersList = require('./UsersList.js');

var App = React.createClass({
  displayName: 'App',

  render: function render() {
    return React.createElement(UsersList, null);
  }

});

module.exports = App;

},{"./UsersList.js":"/home/chweeks/Desktop/projects/internations-react/app/UsersList.js","react":"react"}],"/home/chweeks/Desktop/projects/internations-react/app/Store.js":[function(require,module,exports){
'use strict';

var flux = require('flux-react');
var actions = require('./actions.js');

module.exports = flux.createStore({
  users: [{ id: 1, name: 'Chris' }, { id: 2, name: 'Harry' }, { id: 3, name: 'Weeks' }],
  groups: [],
  actions: [actions.addUser, actions.addGroup],
  addUser: function addUser(user) {
    this.users.push({ id: this.users.length + 1, name: user });
    this.emitChange();
  },
  addGroup: function addGroup(group) {
    this.groups.push({ id: this.groups.length + 1, name: group });
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
      users: Store.getUsers()
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
        React.createElement('input', { type: 'text', ref: 'newUser', placeholder: 'User Name', value: this.state.newUser, onChange: this.updateNewUser })
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
//# sourceMappingURL=data:application/json;charset:utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9icm93c2VyaWZ5L25vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCIvaG9tZS9jaHdlZWtzL0Rlc2t0b3AvcHJvamVjdHMvaW50ZXJuYXRpb25zLXJlYWN0L2FwcC9BcHAuanMiLCIvaG9tZS9jaHdlZWtzL0Rlc2t0b3AvcHJvamVjdHMvaW50ZXJuYXRpb25zLXJlYWN0L2FwcC9TdG9yZS5qcyIsIi9ob21lL2Nod2Vla3MvRGVza3RvcC9wcm9qZWN0cy9pbnRlcm5hdGlvbnMtcmVhY3QvYXBwL1VzZXJzTGlzdC5qcyIsIi9ob21lL2Nod2Vla3MvRGVza3RvcC9wcm9qZWN0cy9pbnRlcm5hdGlvbnMtcmVhY3QvYXBwL2FjdGlvbnMuanMiLCIvaG9tZS9jaHdlZWtzL0Rlc2t0b3AvcHJvamVjdHMvaW50ZXJuYXRpb25zLXJlYWN0L2FwcC9tYWluLmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBOzs7QUNBQSxJQUFJLEtBQUssR0FBRyxPQUFPLENBQUMsT0FBTyxDQUFDLENBQUM7QUFDN0IsSUFBSSxTQUFTLEdBQUcsT0FBTyxDQUFDLGdCQUFnQixDQUFDLENBQUM7O0FBRTFDLElBQUksR0FBRyxHQUFHLEtBQUssQ0FBQyxXQUFXLENBQUM7OztBQUUzQixRQUFNLEVBQUUsa0JBQVc7QUFDaEIsV0FDRSxvQkFBQyxTQUFTLE9BQUcsQ0FDYjtHQUNKOztDQUVELENBQUMsQ0FBQzs7QUFFSCxNQUFNLENBQUMsT0FBTyxHQUFHLEdBQUcsQ0FBQzs7Ozs7QUNickIsSUFBSSxJQUFJLEdBQUcsT0FBTyxDQUFDLFlBQVksQ0FBQyxDQUFDO0FBQ2pDLElBQUksT0FBTyxHQUFHLE9BQU8sQ0FBQyxjQUFjLENBQUMsQ0FBQzs7QUFFdEMsTUFBTSxDQUFDLE9BQU8sR0FBRyxJQUFJLENBQUMsV0FBVyxDQUFDO0FBQ2hDLE9BQUssRUFBRSxDQUFDLEVBQUMsRUFBRSxFQUFFLENBQUMsRUFBRSxJQUFJLEVBQUMsT0FBTyxF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QUFxQjtNQUNyQjs7VUFBTSxRQUFRLEVBQUUsSUFBSSxDQUFDLE9BQU8sQUFBQztRQUMzQiwrQkFBTyxJQUFJLEVBQUMsTUFBTSxFQUFDLEdBQUcsRUFBQyxTQUFTLEVBQUMsV0FBVyxFQUFDLFdBQVcsRUFBQyxLQUFLLEVBQUUsSUFBSSxDQUFDLEtBQUssQ0FBQyxPQUFPLEFBQUMsRUFBQyxRQUFRLEVBQUUsSUFBSSxDQUFDLGFBQWEsQUFBQyxHQUFFO09BQzlHO01BQ04sSUFBSSxDQUFDLEtBQUssQ0FBQyxLQUFLLENBQUMsR0FBRyxDQUFDLElBQUksQ0FBQyxXQUFXLENBQUM7S0FDbkMsQ0FDTjtHQUNKOztDQUVELENBQUMsQ0FBQzs7QUFFSCxNQUFNLENBQUMsT0FBTyxHQUFHLFNBQVMsQ0FBQzs7Ozs7QUM3RDNCLElBQUksSUFBSSxHQUFHLE9BQU8sQ0FBQyxZQUFZLENBQUMsQ0FBQzs7QUFFakMsTUFBTSxDQUFDLE9BQU8sR0FBRyxJQUFJLENBQUMsYUFBYSxDQUFDLENBQ2xDLFNBQVMsRUFDVCxVQUFVLENBQ1gsQ0FBQyxDQUFDOzs7OztBQ0xILElBQUksS0FBSyxHQUFHLE9BQU8sQ0FBQyxPQUFPLENBQUMsQ0FBQztBQUM3QixJQUFJLEdBQUcsR0FBRyxPQUFPLENBQUMsVUFBVSxDQUFDLENBQUM7O0FBRTlCLEtBQUssQ0FBQyxNQUFNLENBQUMsb0JBQUMsR0FBRyxPQUFFLEVBQUUsUUFBUSxDQUFDLGNBQWMsQ0FBQyxTQUFTLENBQUMsQ0FBQyxDQUFDIiwiZmlsZSI6ImdlbmVyYXRlZC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzQ29udGVudCI6WyIoZnVuY3Rpb24gZSh0LG4scil7ZnVuY3Rpb24gcyhvLHUpe2lmKCFuW29dKXtpZighdFtvXSl7dmFyIGE9dHlwZW9mIHJlcXVpcmU9PVwiZnVuY3Rpb25cIiYmcmVxdWlyZTtpZighdSYmYSlyZXR1cm4gYShvLCEwKTtpZihpKXJldHVybiBpKG8sITApO3ZhciBmPW5ldyBFcnJvcihcIkNhbm5vdCBmaW5kIG1vZHVsZSAnXCIrbytcIidcIik7dGhyb3cgZi5jb2RlPVwiTU9EVUxFX05PVF9GT1VORFwiLGZ9dmFyIGw9bltvXT17ZXhwb3J0czp7fX07dFtvXVswXS5jYWxsKGwuZXhwb3J0cyxmdW5jdGlvbihlKXt2YXIgbj10W29dWzFdW2VdO3JldHVybiBzKG4/bjplKX0sbCxsLmV4cG9ydHMsZSx0LG4scil9cmV0dXJuIG5bb10uZXhwb3J0c312YXIgaT10eXBlb2YgcmVxdWlyZT09XCJmdW5jdGlvblwiJiZyZXF1aXJlO2Zvcih2YXIgbz0wO288ci5sZW5ndGg7bysrKXMocltvXSk7cmV0dXJuIHN9KSIsInZhciBSZWFjdCA9IHJlcXVpcmUoJ3JlYWN0Jyk7XG52YXIgVXNlcnNMaXN0ID0gcmVxdWlyZSgnLi9Vc2Vyc0xpc3QuanMnKTtcblxudmFyIEFwcCA9IFJlYWN0LmNyZWF0ZUNsYXNzKHtcblxuXHRyZW5kZXI6IGZ1bmN0aW9uKCkge1xuICAgIHJldHVybihcbiAgICAgIDxVc2Vyc0xpc3QgLz5cbiAgICApO1xuXHR9XG5cbn0pO1xuXG5tb2R1bGUuZXhwb3J0cyA9IEFwcDtcbiIsInZhciBmbHV4ID0gcmVxdWlyZSgnZmx1eC1yZWFjdCcpO1xudmFyIGFjdGlvbnMgPSByZXF1aXJlKCcuL2FjdGlvbnMuanMnKTtcblxubW9kdWxlLmV4cG9ydHMgPSBmbHV4LmNyZWF0ZVN0b3JlKHtcbiAgdXNlcnM6IFt7aWQ6IDEsIG5hbWU6J0NocmlzJ30sIHtpZDogMiwgbmFtZTonSGFycnknfSwge2lkOiAzLCBuYW1lOidXZWVrcyd9XSxcbiAgZ3JvdXBzOiBbXSxcbiAgYWN0aW9uczogW1xuICAgIGFjdGlvbnMuYWRkVXNlcixcbiAgICBhY3Rpb25zLmFkZEdyb3VwXG4gIF0sXG4gIGFkZFVzZXI6IGZ1bmN0aW9uKHVzZXIpIHtcbiAgICB0aGlzLnVzZXJzLnB1c2goeyBpZDoodGhpcy51c2Vycy5sZW5ndGgrMSksIG5hbWU6IHVzZXIgfSk7XG4gICAgdGhpcy5lbWl0Q2hhbmdlKCk7XG4gIH0sXG4gIGFkZEdyb3VwOiBmdW5jdGlvbihncm91cCkge1xuICAgIHRoaXMuZ3JvdXBzLnB1c2goeyBpZDoodGhpcy5ncm91cHMubGVuZ3RoKzEpLCBuYW1lOiBncm91cCB9KTtcbiAgICB0aGlzLmVtaXRDaGFuZ2UoKTtcbiAgfSxcbiAgZXhwb3J0czoge1xuICAgIGdldFVzZXJzOiBmdW5jdGlvbigpIHtcbiAgICAgIHJldHVybiB0aGlzLnVzZXJzO1xuICAgIH0sXG4gICAgZ2V0R3JvdXBzOiBmdW5jdGlvbigpIHtcbiAgICAgIHJldHVybiB0aGlzLmdyb3Vwc1xuICAgIH1cbiAgfVxufSk7XG4iLCJ2YXIgUmVhY3QgPSByZXF1aXJlKCdyZWFjdCcpO1xudmFyIFN0b3JlID0gcmVxdWlyZSgnLi9TdG9yZS5qcycpO1xudmFyIGFjdGlvbnMgPSByZXF1aXJlKCcuL2FjdGlvbnMuanMnKTtcblxudmFyIFVzZXJzTGlzdCA9IFJlYWN0LmNyZWF0ZUNsYXNzKHtcbiAgZ2V0SW5pdGlhbFN0YXRlOiBmdW5jdGlvbigpIHtcbiAgICByZXR1cm4ge1xuICAgICAgdXNlcnM6IFN0b3JlLmdldFVzZXJzKCksXG4gICAgICBuZXdVc2VyOiBcIlwiXG4gICAgfTtcbiAgfSxcblxuICBjb21wb25lbnRXaWxsTW91bnQ6IGZ1bmN0aW9uKCkge1xuICAgIFN0b3JlLmFkZENoYW5nZUxpc3RlbmVyKHRoaXMuY2hhbmdlU3RhdGUpO1xuICB9LFxuXG4gIGNvbXBvbmVudFdpbGxVbm1vdW50OiBmdW5jdGlvbiAoKSB7XG4gICAgU3RvcmUucmVtb3ZlQ2hhbmdlTGlzdGVuZXIodGhpcy5jaGFuZ2VTdGF0ZSk7XG4gIH0sXG5cbiAgY2hhbmdlU3RhdGU6IGZ1bmN0aW9uKCkge1xuICAgIHRoaXMuc2V0U3RhdGUoe1xuICAgICAgdXNlcnM6IFN0b3JlLmdldFVzZXJzKClcbiAgICB9KTtcbiAgfSxcblxuICB1cGRhdGVOZXdVc2VyOiBmdW5jdGlvbihldmVudCkge1xuICAgIHRoaXMuc2V0U3RhdGUoe1xuICAgICAgbmV3VXNlcjogZXZlbnQudGFyZ2V0LnZhbHVlXG4gICAgfSlcbiAgfSxcblxuICBhZGRVc2VyOiBmdW5jdGlvbihldmVudCkge1xuICAgIGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XG4gICAgdmFyIGlucHV0ID0gdGhpcy5yZWZzLm5ld1VzZXI7XG4gICAgYWN0aW9ucy5hZGRVc2VyKGlucHV0LnZhbHVlKTtcbiAgICB0aGlzLnNldFN0YXRlKHtcbiAgICAgIG5ld1VzZXI6ICcnXG4gICAgfSlcbiAgfSxcblxuICByZW5kZXJVc2VyczogZnVuY3Rpb24odXNlcikge1xuICAgIHJldHVybiAoXG4gICAgICA8ZGl2IGtleT17dXNlci5pZH0+e3VzZXIubmFtZX08L2Rpdj5cbiAgICApO1xuICB9LFxuXG5cdHJlbmRlcjogZnVuY3Rpb24oKSB7XG4gICAgcmV0dXJuKFxuICAgICAgPGRpdj5cbiAgICAgICAgPGgxPkFkZCBOZXcgVXNlcjwvaDE+XG4gICAgICAgIDxmb3JtIG9uU3VibWl0PXt0aGlzLmFkZFVzZXJ9PlxuICAgICAgICAgIDxpbnB1dCB0eXBlPVwidGV4dFwiIHJlZj1cIm5ld1VzZXJcIiBwbGFjZWhvbGRlcj1cIlVzZXIgTmFtZVwiIHZhbHVlPXt0aGlzLnN0YXRlLm5ld1VzZXJ9IG9uQ2hhbmdlPXt0aGlzLnVwZGF0ZU5ld1VzZXJ9Lz5cbiAgICAgICAgPC9mb3JtPlxuICAgICAgICB7dGhpcy5zdGF0ZS51c2Vycy5tYXAodGhpcy5yZW5kZXJVc2Vycyl9XG4gICAgICA8L2Rpdj5cbiAgICApO1xuXHR9XG5cbn0pO1xuXG5tb2R1bGUuZXhwb3J0cyA9IFVzZXJzTGlzdDtcbiIsInZhciBmbHV4ID0gcmVxdWlyZSgnZmx1eC1yZWFjdCcpO1xuXG5tb2R1bGUuZXhwb3J0cyA9IGZsdXguY3JlYXRlQWN0aW9ucyhbXG4gICdhZGRVc2VyJyxcbiAgJ2FkZEdyb3VwJ1xuXSk7XG4iLCJ2YXIgUmVhY3QgPSByZXF1aXJlKCdyZWFjdCcpO1xudmFyIEFwcCA9IHJlcXVpcmUoJy4vQXBwLmpzJyk7XG5cblJlYWN0LnJlbmRlcig8QXBwLz4sIGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwiY29udGVudFwiKSk7XG4iXX0=
