const axios = require('axios');

class CommentIssueAction {
    constructor (owner, repo, issue, body, token) {
      this.owner = owner;
      this.repo = repo;
      this.issue = issue;
      this.body = body;
      this.token = token;
    }
  
    async execute() {
        let config = {
            headers: {
                'Authorization': `token ${this.token}`,
            }
        }

        let data = {
            'body': this.body
        }

        const response = await axios.post(`https://api.github.com/repos/${this.owner}/${this.repo}/issues/${this.issue}/comments`, data, config);
        //console.log('Full response:\n');
        //console.log(response)
        //console.log('\n')
        return response;
    }
}

module.exports = CommentIssueAction;