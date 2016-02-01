## InterNations User Management

Built using flux-react.

### Development
* Run `npm install`
* Run `gulp`
* Start a webservice in the `build` folder, f.ex. `python -m SimpleHTTPServer`
* Go to `localhost:8000` to display the app

Endpoints:

Retrieve all users and groups
https://internations.com/api/users
https://internations.com/api/groups

Create new user and new group
https://internations.com/api/users/new
https://internations.com/api/groups/new

Retrieve a specific users groups
https://internations.com/api/users/{user.id}/groups

Retrieve a specific groups members
https://internations.com/api/groups/{group.id}/members

Get, update, or delete a specific user or group
https://internations.com/api/users/{user.id}
https://internations.com/api/groups/{group.id}
