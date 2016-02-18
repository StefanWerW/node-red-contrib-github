
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
      this.usernameprop = n.usernameprop;
      this.reponame = n.repository;
      this.repoprop = n.repoprop;
      var github = new (require('github-api'))({
        token: RED.nodes.getNode(n.github).credentials.token,
        auth: "oauth"
      });
      var node = this;
      this.on('input', function(msg) {
        //is using user prop?
        var username_f = "";
        if(node.usernameprop){
          if(msg[node.username]){
            username_f = msg[node.username];
          }else{
            node.error("Property", node.username, "not fund on msg");
            return;
          }
        }else{
          if(node.username && node.username!=""){
            username_f = node.username;
          }else{
            node.error("No username defined");
            return;
          }
        }

        var reponame_f = "";
        if(node.repoprop){
            if(msg[node.reponame]){
                reponame_f = msg[node.reponame];
            }else{
                node.error("Property", node.reponame, "not fund on msg");
                return;
            }
        }else{
            if(node.reponame && node.reponame!=""){
                reponame_f = node.reponame;
            }else{
                node.error("No repo name defined");
                return;
            }
        }

        var repo = github.getRepo(username_f, reponame_f);
        repo.show(function(err, repo) {
            if(err){
                node.error(err);
            }else{
                msg.payload = repo;
                node.send(msg);
            }
        });
      });
    }
    RED.nodes.registerType("github-repo", GithubRepo);
}
