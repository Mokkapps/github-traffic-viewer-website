const traffic = require('github-traffic')

const GITHUB_API_URL = 'https://api.github.com'

export const fetchRepoTraffic = async (username, token) => {
  const options = {
    username,
    token,
  }

  const fetchGithubTrafficViews = (repo, options) => {
    return new Promise((resolve, reject) => {
      traffic.views(repo, { ...options }, (err, results) => {
        if (err) {
          console.error(err)
          reject(err)
        }
        resolve({ ...results, name: repo })
      })
    })
  }

  return fetch(`${GITHUB_API_URL}/users/${username}/repos`)
    .then(res => res.json())
    .then(repos => {
      const repoNames = repos
        .filter(repo => !repo.fork)
        .map(repo => `${username}/${repo.name}`)

      return Promise.all(
        repoNames.map(name => fetchGithubTrafficViews(name, { ...options }))
      )
    })
}
