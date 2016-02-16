
module.exports = function(RED) {
    "use strict";
    var github-api = require('github-api');

    function GithubNode(n) {
        RED.nodes.createNode(this,n);
        this.screen_name = n.screen_name;
    }
    RED.nodes.registerType("github-credentials",GithubNode,{
        credentials: {
            screen_name: {type:"text"},
            access_token: {type: "password"}
        }
    });

    //REPO NODE
    function GithubRepo(n){
      RED.nodes.createNode(this,config);
      var node = this;
      node.on('input', function(msg) {

      });
    }
    RED.nodes.registerType("github-repo", GithubRepo);
}
