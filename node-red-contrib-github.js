
module.exports = function(RED) {
    "use strict";

    function GithubNode(n) {
        RED.nodes.createNode(this,n);
        this.name = n.name;
    }
    RED.nodes.registerType("github-credentials",GithubNode,{
      credentials: {
        token: {type: "password"}
      }
    });

    //REPO NODE
    function GithubRepo(n){
        RED.nodes.createNode(this,n);
        this.github = n.github;
        this.username = n.username;
        this.usernameType = n.usernameType;
        this.repository = n.repository;
        this.repositoryType = n.repositoryType;
        this.action = n.action;
        this.branch = n.branch;
        this.branchType = n.branchType;
        this.path = n.path;
        this.pathType = n.pathType;
        this.contents = n.contents;
        this.contentsType = n.contentsType;
        this.pathto = n.pathto;
        this.pathtoType = n.pathtoType;
        var github = new (require('github-api'))({
          token: RED.nodes.getNode(n.github).credentials.token,
          auth: "oauth"
        });
        this.status({});
        var node = this;
        this.on('input', function(msg) {
            node.status({fill:"blue",shape:"ring",text:node.action});
            var username_f = RED.util.evaluateNodeProperty(node.username,node.usernameType,node,msg);
            var repository_f = RED.util.evaluateNodeProperty(node.repository,node.repositoryType,node,msg);
            var repo = github.getRepo(username_f, repository_f);

            function callbackErrData(err, data){
                if(err){
                    node.status({fill:"red",shape:"dot",text:"Error: " + node.action});
                    node.error(err);
                }else{
                    msg.payload = data;
                    node.status({});
                    node.send(msg);
                }
            }
            function callbackErr(err) {
                if(err){
                    node.status({fill:"red",shape:"dot",text:"Error" + node.action});
                    node.error(err);
                }else{
                    node.status({});
                }
            }

            if(node.action == "show"){
                repo.show(callbackErrData);
            }else if (node.action == "fork"){
                repo.fork(callbackErr);
            }else if (node.action == "contributors"){
                repo.contributors(callbackErrData);
            }else if (node.action == "listforks"){
                repo.listForks(callbackErrData);
            }else if (node.action == "listbraches"){
                repo.listBranches(callbackErrData);
            }else if (node.action == "delete") {
                repo.deleteRepo(callbackErrData);
            }else if (node.action == "contents") {
                var branch_f = RED.util.evaluateNodeProperty(node.branch,node.branchType,node,msg);
                var path_f = RED.util.evaluateNodeProperty(node.path,node.pathType,node,msg);
                repo.contents(branch_f, path_f, callbackErrData);
            }else if(node.action == "read"){
                var branch_f = RED.util.evaluateNodeProperty(node.branch,node.branchType,node,msg);
                var path_f = RED.util.evaluateNodeProperty(node.path,node.pathType,node,msg);
                repo.read(branch_f, path_f, callbackErrData);
            }else if (node.action == "write") {
                var branch_f = RED.util.evaluateNodeProperty(node.branch,node.branchType,node,msg);
                var path_f = RED.util.evaluateNodeProperty(node.path,node.pathType,node,msg);
                var contents_f = RED.util.evaluateNodeProperty(node.contents,node.contentsType,node,msg);
                var options = {};
                repo.write(branch_f, path_f, contents_f, 'Add ' + path_f, options, callbackErr);
            }else if (node.action == "move") {
                var branch_f = RED.util.evaluateNodeProperty(node.branch,node.branchType,node,msg);
                var path_f = RED.util.evaluateNodeProperty(node.path,node.pathType,node,msg);
                var pathto_f = RED.util.evaluateNodeProperty(node.pathto,node.pathtoType,node,msg);
                repo.move(branch_f, path_f, pathto_f, callbackErr);
            }else if (node.action == "remove") {
                var branch_f = RED.util.evaluateNodeProperty(node.branch,node.branchType,node,msg);
                var path_f = RED.util.evaluateNodeProperty(node.path,node.pathType,node,msg);
                repo.remove(branch_f, path_f, callbackErr);
            }
        });
    }
    RED.nodes.registerType("github-repo", GithubRepo);



    function GithubUser(n){
        RED.nodes.createNode(this,n);

        this.action = n.action;
        this.options = n.options;
        this.optionsType = n.optionsType;
        this.username = n.username;
        this.usernameType = n.usernameType;
        this.orgname = n.orgname;
        this.orgnameType = n.orgnameType;

        var github = new (require('github-api'))({
            token: RED.nodes.getNode(n.github).credentials.token,
            auth: "oauth"
        });
        var user = github.getUser();
        var node = this;
        this.on('input', function(msg) {
            function callbackErrData(err, data){
                if(err){
                    node.error(err);
                }else{
                    msg.payload = data;
                    node.send(msg);
                }
            }

            if(node.action == "repos"){
                var options_f = RED.util.evaluateNodeProperty(node.options,node.optionsType,node,msg);
                user.repos(options_f, callbackErrData);
            }else if (node.action == "orgs") {
                user.orgs(callbackErrData);
            }else if (node.action == "gists") {
                user.gists(callbackErrData);
            }else if (node.action == "notifications") {
                var options_f = RED.util.evaluateNodeProperty(node.options,node.optionsType,node,msg);
                user.notifications(options_f, callbackErrData);
            }else if (node.action == "show") {
                var username_f = RED.util.evaluateNodeProperty(node.username,node.usernameType,node,msg);
                user.show(username_f, callbackErrData);
            }else if (node.action == "userrepos") {
                var username_f = RED.util.evaluateNodeProperty(node.username,node.usernameType,node,msg);
                user.userRepos(username_f, callbackErrData);
            }else if (node.action == "userstarred") {
                var username_f = RED.util.evaluateNodeProperty(node.username,node.usernameType,node,msg);
                user.userStarred(username_f, callbackErrData);
            }else if (node.action == "createrepo") {
                var options_f = RED.util.evaluateNodeProperty(node.options,node.optionsType,node,msg);
                user.createRepo(options_f, callbackErrData);
            }else if (node.aciton == "orgrepos") {
                var orgname_f = RED.util.evaluateNodeProperty(node.orgname,node.orgnameType,node,msg);
                user.orgRepos(orgname_f, callbackErrData);
            }else if (node.action == "usergists") {
                var username_f = RED.util.evaluateNodeProperty(node.username,node.usernameType,node,msg);
                user.userGists(username_f, callbackErrData);
            }

        });
    }
    RED.nodes.registerType("github-user", GithubUser);
}
