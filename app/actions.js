var flux = require('flux-react');

module.exports = flux.createActions([
  'addUser',
  'addGroup',
  'addUserToGroup',
  'kickUserFromGroup',
  'deleteUser',
  'deleteGroup'
]);
