declare module '#auth-utils' {
  interface User {
    // Add your own fields
  }

  interface UserSession {
    user: {
      githubId: number
      githubUsername: string
      githubAccessToken: string
    }
  }
}

export {}
