import base64 from 'base-64';

const GITHUB_API_URL = 'https://api.github.com';
const REPOS_PER_PAGE = 100;
const DEFAULT_PAGE = 1;

const fetchRepoTraffic = async (username, token) => {
  // eslint-disable-next-line no-shadow
  const fetchGithubTrafficViews = (username, repoName) =>
    new Promise((resolve, reject) => {
      fetch(
        `${GITHUB_API_URL}/repos/${username}/${repoName}/traffic/views?per=week`,
        {
          headers: {
            Accept: 'application/vnd.github.v3+json',
            Authorization: 'Basic ' + base64.encode(username + ':' + token),
          },
        }
      )
        .then((res) => res.json())
        .then((data) => {
          resolve({
            name: repoName,
            data,
          });
        })
        .catch((err) => reject(err));
    });

  // eslint-disable-next-line no-undef
  return fetch(
    `${GITHUB_API_URL}/users/${username}/repos?per_page=${REPOS_PER_PAGE}&page=${DEFAULT_PAGE}`
  )
    .then((res) => res.json())
    .then((repos) => {
      const repoNames = repos
        .filter((repo) => !repo.fork)
        .map((repo) => repo.name);

      return Promise.all(
        repoNames.map((name) => fetchGithubTrafficViews(username, name))
      );
    });
};

export default fetchRepoTraffic;
