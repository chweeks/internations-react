var flux = require('flux-react');
var actions = require('./actions.js');

module.exports = flux.createStore({
  users: [],
  groups: [],
  actions: [
    actions.addUser,
    actions.addGroup
  ],
  addUser: function(user) {
    this.users.push(user);
    this.emitChange();
  },
  addGroup: function(group) {
    this.groups.push(group);
    this.emitChange();
  },
  exports: {
    getUsers: function() {
      return this.users;
    },
    getGroups: function() {
      return this.groups
    }
  }
});
