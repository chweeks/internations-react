var flux = require('flux-react');
var actions = require('./actions.js');

module.exports = flux.createStore({
  users: [{id: 1, name:'Chris', groups: [] }],
  groups: [{id: 1, name: 'InterNations', members: [] }],
  actions: [
    actions.addUser,
    actions.addGroup,
    actions.deleteUser
  ],

  getGroupByName: function(name){
     for(var i=0; i < this.groups.length; i++){
       if(this.groups[i].name == name){
         return this.groups[i]
       }
     };
  },

  addUser: function(userName, group) {
    if(group) {
      this.users.push({ id:(this.users.length+1), name: userName, groups: group});
      this.getGroupByName(group).members.push(userName);
      this.emitChange();
    }
    else {
      alert('User must belong to a group')
    };
  },

  addGroup: function(group) {
    this.groups.push({ id:(this.groups.length+1), name: group , members: []});
    this.emitChange();
  },

  deleteUserFromUsers: function(user) {
    for(var i=0; i < this.users.length; i++){
      if(user.id == this.users[i].id){
        this.users.splice(i, 1);
      }
    };
  },

  deleteUserFromGroups: function(user) {
    for(var i=0; i < this.groups.length; i++){
      for(var j=0; j < this.groups[i].members.length; j++){
        if(user.name == this.groups[i].members[j]){
          this.groups[i].members.splice(j, 1)
        }
      }
    };
  },

  deleteUser: function(user) {
    this.deleteUserFromUsers(user);
    this.deleteUserFromGroups(user);
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
