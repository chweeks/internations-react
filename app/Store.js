var flux = require('flux-react');
var actions = require('./actions.js');

module.exports = flux.createStore({
  users: [{id: 1, name:'Chris'}, {id: 2, name:'Harry'}, {id: 3, name:'Weeks'}],
  groups: [],
  actions: [
    actions.addUser,
    actions.addGroup
  ],
  addUser: function(user) {
    this.users.push({ id:(this.users.length+1), name:user });
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
