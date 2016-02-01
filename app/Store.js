var flux = require('flux-react');
var actions = require('./actions.js');

module.exports = flux.createStore({
  users: [{id: 1, name:'Chris Weeks', groups: ['InterNations', 'Makers Academy', 'Lancaster University'] },
          {id: 2, name:'Nathaniel Green', groups: ['Makers Academy', 'Lancaster University'] },
          {id: 3, name:'Aaron Kendall', groups: ['Makers Academy'] }],

  groups: [{id: 1, name: 'InterNations', members: ['Chris Weeks'] },
           {id: 2, name: 'Makers Academy', members: ['Chris Weeks', 'Nathaniel Green', 'Aaron Kendall'] },
           {id: 3, name: 'Lancaster University', members: ['Chris Weeks', 'Nathaniel Green'] }],

  actions: [
    actions.addUser,
    actions.addGroup,
    actions.addUserToGroup,
    actions.kickUserFromGroup,
    actions.deleteUser,
    actions.deleteGroup
  ],

  getGroupByName: function(name){
     for(var i=0; i < this.groups.length; i++){
       if(this.groups[i].name == name){
         return this.groups[i]
       }
     };
  },

  getUserByName: function(name){
     for(var i=0; i < this.groups.length; i++){
       if(this.users[i].name == name){
         return this.users[i]
       }
     };
  },

  userAlreadyExists: function(userName) {
    for(var i=0; i < this.users.length; i++){
      if(this.users[i].name == userName){
        return true
      }
    }
  },

  groupProvided: function(group) {
    if(group == ''){
      return alert('Please select a group')
    }
  },

  isAMember: function(userName, group) {
    for(var i=0; i<group.members.length; i++){
      if(group.members[i] == userName){
        return true
      }
    }
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

  deleteUserFromGroup: function(userName, groupName) {
    var group = this.getGroupByName(groupName);
    for(var i=0; i < group.members.length; i++){
      if(group.members[i] == userName){
        group.members.splice(i,1);
      }
    };
  },

  deleteGroupFromUser: function(userName, groupName) {
    var user = this.getUserByName(userName);
    for(var i=0; i < user.groups.length; i++){
      if(user.groups[i] == groupName){
        user.groups.splice(i,1);
      }
    };
  },

  addUser: function(userName, group) {
    if(this.userAlreadyExists(userName)){ return alert('That user already exists') };
    this.groupProvided(group)
    this.users.push({ id:(this.users.length+1), name: userName, groups: group});
    this.getGroupByName(group).members.push(userName);
    this.emitChange();
  },

  addGroup: function(group) {
    this.groups.push({ id:(this.groups.length+1), name: group , members: []});
    this.emitChange();
  },

  addUserToGroup: function(userName, groupName) {
    var group = this.getGroupByName(groupName)
    var user = this.getUserByName(userName)
    this.groupProvided(group);
    if(this.userAlreadyExists(userName) != true){
      return alert(userName+' does not exist')
    };
    if(this.isAMember(userName, group)){
      return alert(userName+' is already a member of '+group.name)
    };
    group.members.push(user.name);
    user.groups.push(group.name);
    this.emitChange();
  },

  kickUserFromGroup: function(userName, groupName) {
    this.deleteUserFromGroup(userName, groupName);
    this.deleteGroupFromUser(userName, groupName);
    this.emitChange();
  },

  deleteUser: function(user) {
    this.deleteUserFromUsers(user);
    this.deleteUserFromGroups(user);
    this.emitChange();
  },

  deleteGroup: function(group) {
    if(group.members.length == 0){
      for(var i=0; i < this.groups.length; i++){
        if(group.id == this.groups[i].id){
          this.groups.splice(i, 1);
          this.emitChange();
        }
      };
    }
    else{
      alert("Can only delete empty groups")
    }
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
