const core = require("@actions/core");

const CommentIssueAction = require('./common/net/github/commentIssue/action');

async function run() {
    try {
      const inputs = {
        token: core.getInput('token'),
        owner: core.getInput('owner'),
        repository: core.getInput('repository'),
        issue: core.getInput('issue'),
        body: core.getInput('body')
      };
      const repo = await getSanitizedRepo(inputs.repository)

      await new CommentIssueAction(inputs.owner, repo, inputs.issue, inputs.body, inputs.token).execute();
    } catch (error) {
        console.log(error);
        process.exit(1);
    }
}

async function getSanitizedRepo(rawRepo) {
    const repository = rawRepo
      ? rawRepo
      : process.env.GITHUB_REPOSITORY;
    const repo = repository.split("/");
    console.log(`repository: ${repo}`);
    return repo;
}

run();