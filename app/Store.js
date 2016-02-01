var flux = require('flux-react');
var actions = require('./actions.js');

module.exports = flux.createStore({
  users: [{id: 1, name:'Chris Weeks', groups: ['InterNations', 'Makers Academy', 'Lancaster University'] },
          {id: 2, name:'Nathaniel Green', groups: ['InterNations', 'Makers Academy', 'Lancaster University'] },
          {id: 3, name:'Aaron Kendall', groups: ['InterNations', 'Makers Academy'] }],

  groups: [{id: 1, name: 'InterNations', members: ['Chris Weeks'] },
           {id: 2, name: 'Makers Academy', members: ['Chris Weeks', 'Nathaniel Green', 'Aaron Kendall'] },
           {id: 3, name: 'Lancaster University', members: ['Chris Weeks', 'Nathaniel Green'] }],

  actions: [
    actions.addUser,
    actions.addGroup,
    actions.addUserToGroup,
    actions.deleteUser
  ],

  getGroupByName: function(name){
     for(var i=0; i < this.groups.length; i++){
       if(this.groups[i].name == name){
         return this.groups[i]
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
    var groupObject = this.getGroupByName(group)
    for(var i=0; i<groupObject.members.length; i++){
      if(groupObject.members[i] == userName){
        return true
      }
    }
  },

  addUser: function(userName, group) {
    if(this.userAlreadyExists(userName)){ return alert('That user already exists') };
    this.groupProvided(group)
    this.users.push({ id:(this.users.length+1), name: userName, groups: group});
    this.getGroupByName(group).members.push(userName);
    this.emitChange();
  },

  addUserToGroup: function(userName, group) {
    this.groupProvided(group);
    if(this.userAlreadyExists(userName) != true){
      return alert(userName+' does not exist')
    };
    if(this.isAMember(userName, group)){
      return alert(userName+' is already a member of '+group)
    };
    this.getGroupByName(group).members.push(userName);
    this.emitChange();
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
