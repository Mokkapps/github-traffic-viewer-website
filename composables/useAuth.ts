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

  const refresh = async () => {
    const session = await supabase.auth.refreshSession()
    githubAccessToken.value = session.data?.session?.provider_token ?? ''
    githubUserName.value = session.data?.user?.user_metadata?.user_name ?? ''
  }

  supabase.auth.onAuthStateChange((authState, session) => {
    githubAccessToken.value = session?.provider_token ?? ''
    githubUserName.value = session?.user?.user_metadata?.user_name ?? ''
  })

  return {
    githubAccessToken,
    githubUserName,
    showAuthModal,
    refresh,
    login,
    logout,
  }
}
