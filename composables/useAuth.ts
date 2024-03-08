const showAuthModal = ref(false)
const githubAccessToken = ref('')
const githubUserName = ref('')

export const useAuth = () => {
  const supabase = useSupabaseClient()

  const signinRedirect = async () => {
    return supabase.auth.signInWithOAuth({
      provider: 'github',
      options: {
        redirectTo: '/traffic-data',
        scopes: 'repo metadata:read administration:read',
      },
    })
  }

  const login = async () => {
    return signinRedirect()
  }

  const logout = async () => {
    const { error } = await supabase.auth.signOut()
    if (error) {
      throw createError('Failed to logout')
    }
    githubAccessToken.value = ''
    githubUserName.value = ''
    await navigateTo('/')
  }

  supabase.auth.onAuthStateChange((authState, session) => {
    if (session?.provider_token) {
      githubAccessToken.value = session.provider_token
    }
    if (session?.user?.user_metadata?.user_name) {
      githubUserName.value = session.user.user_metadata.user_name
    }
  })

  return {
    githubAccessToken,
    githubUserName,
    showAuthModal,
    login,
    logout,
  }
}
