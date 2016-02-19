
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
      var github = new (require('github-api'))({
        token: RED.nodes.getNode(n.github).credentials.token,
        auth: "oauth"
      });
      var node = this;
      this.on('input', function(msg) {

          var username_f = RED.util.evaluateNodeProperty(node.username,node.usernameType,node,msg);
          var repository_f = RED.util.evaluateNodeProperty(node.repository,node.repositoryType,node,msg);
          var repo = github.getRepo(username_f, repository_f);

          function callbackErrData(err, data){
              if(err){
                  node.error(err);
              }else{
                  msg.payload = data;
                  node.send(msg);
              }
          }
          function callbackErr(err) {
              if(err) node.error(err)
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
              repo.write(branch_f, path_f, contents_f, 'YOUR_COMMIT_MESSAGE', options, callbackErr);
          }
      });
    }
    RED.nodes.registerType("github-repo", GithubRepo);
}
