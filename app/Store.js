var flux = require('flux-react');
var actions = require('./actions.js');

module.exports = flux.createStore({
  users: [{id: 1, name:'Chris', groups: [] }],
  groups: [{id: 1, name: 'InterNations', members: []}],
  actions: [
    actions.addUser,
    actions.addGroup,
    actions.addUserToGroup,
    actions.addGroupToUser
  ],
  addUser: function(user) {
    this.users.push({ id:(this.users.length+1), name: user });
    this.emitChange();
  },
  addGroup: function(group) {
    this.groups.push({ id:(this.groups.length+1), name: group , members: []});
    this.emitChange();
  },
  addUserToGroup: function(user, group) {
    this.group.members.push(user);
    this.emitChange();
  },
  addGroupToUser: function(group, user) {
    this.user.groups.push(group);
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
