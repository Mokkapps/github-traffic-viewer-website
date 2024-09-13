export default oauthGitHubEventHandler({
  config: {
    scope: ['repo', 'metadata:read', 'administration:read'],
  },
  async onSuccess(event, { user, tokens }) {
    await setUserSession(event, {
      user: {
        githubId: user.id,
        githubUsername: user.login,
        githubAccessToken: tokens.access_token,
      },
    })
    return sendRedirect(event, '/traffic-data')
  },
  // Optional, will return a json error and 401 status code by default
  onError(event, error) {
    console.error('GitHub OAuth error:', error)
    return sendRedirect(event, '/')
  },
})
