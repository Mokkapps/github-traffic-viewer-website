const traffic = require('github-traffic');

const GITHUB_API_URL = 'https://api.github.com';
const REPOS_PER_PAGE = 100;
const DEFAULT_PAGE = 1;

const fetchRepoTraffic = async (username, token) => {
  const options = {
    username,
    token,
  };

  // eslint-disable-next-line no-shadow
  const fetchGithubTrafficViews = (repo, options) =>
    new Promise((resolve, reject) => {
      traffic.views(repo, { ...options }, (err, results) => {
        if (err) {
          console.error(err);
          reject(err);
        }
        resolve({ ...results, name: repo });
      });
    });

  // eslint-disable-next-line no-undef
  return fetch(
    `${GITHUB_API_URL}/users/${username}/repos?per_page=${REPOS_PER_PAGE}&page=${DEFAULT_PAGE}`
  )
    .then(res => res.json())
    .then(repos => {
      const repoNames = repos
        .filter(repo => !repo.fork)
        .map(repo => `${username}/${repo.name}`);

      return Promise.all(
        repoNames.map(name => fetchGithubTrafficViews(name, { ...options }))
      );
    });
};

export default fetchRepoTraffic;
