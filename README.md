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



##TODO

Features to be implemented

###Repo

 - Fork repository.
 - List forks.
 - Create new branch for repo
 - List Pull Requests
 - Get details of a Pull Request
 - Create Pull Request
 - Retrieve all available branches (aka heads) of a repository
 - Get list of statuses for a particular commit
 - Move a file from A to B
 - Remove a file
 - Get information about a particular commit
 - getTree
 - retrieve the reference blob or tree sha
 - get the corresponding commit sha
 - Create a new reference
 - Delete a reference
 - Get contributors list with additions, deletions, and commit counts
 - Check if a repository is starred
 - Star a repository
 - Unstar a repository

###User API

 - Everything


###Gist API
 - Everything
