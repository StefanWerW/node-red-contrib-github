#node-red-contrib-github
Interacts with Github using [node-red](http://nodered.org/) and Internet of things.

This is a wrapper around [github-api](https://www.npmjs.com/package/github-api). Check it out for more info.

##Install


Run the following command in the root directory of your Node-RED install, usually
this is ~/.node-red .

        npm install node-red-contrib-github

##Usage


Provides a node to interact with Github repositories


###Repo

Github Repo node. Can be used to search either:

 - Show repo information
 - Get contents from a certain path
 - Read content at a certain path
 - Write: Store content at a certain path. If the file specified in the path exists, the content is updated. If the file doesn't exist, it's created on the fly
 - Delete a repository
 - Fork repository.
 - List forks.
 - Retrieve all available branches (aka heads) of a repository
 - Get contributors list with additions, deletions, and commit counts


 ###User API

  - List repositories of the authenticated user, including private repositories and repositories in which the user is a collaborator and not an owner
  - List organizations the authenticated user belongs to
  - List authenticated user's gists
  - List unread notifications for the authenticated user
  - Show user information for a particular username. Also works for organizations. Pass in a falsy value (null, '', etc) for 'username' to retrieve user information for the currently authorized user
  - List public repositories for a particular user
  - List starred repositories for a particular user
  - Create a new repo for the authenticated user
  - List repositories for a particular organization. Includes private repositories if you are authorized.
  - List all gists of a particular user. If username is ommitted gists of the current authenticated user are returned


##TODO

Features to be implemented

###Repo


 - Create new branch for repo
 - List Pull Requests
 - Get details of a Pull Request
 - Create Pull Request
 - Get list of statuses for a particular commit
 - Move a file from A to B
 - Remove a file
 - Get information about a particular commit
 - getTree
 - retrieve the reference blob or tree sha
 - get the corresponding commit sha
 - Create a new reference
 - Delete a reference
 - Check if a repository is starred
 - Star a repository
 - Unstar a repository


###Gist API
 - Everything
