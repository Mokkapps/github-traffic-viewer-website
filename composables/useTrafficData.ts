export const useTrafficData = () => {
  const { githubAccessToken, githubUserName, refresh } = useAuth()
  const route = useRoute()
  const router = useRouter()

  const showForkedRepos = ref(false)
  const showPrivateRepos = ref(false)
  const trafficTimeFrame = ref<'day' | 'week'>('week')
  const selectedRepositoryId = ref<number | null>(null)
  const searchRepositoryName = ref('')

  const { data, error, status } = useAsyncData(
    'traffic-data',
    async () => {
      if (!githubUserName.value) {
        return
      }

      if (!githubAccessToken.value) {
        await refresh()
        if (!githubAccessToken.value) {
          throw new Error('No GitHub access token found. Please try to login again.')
        }
      }

      const headers = {
        Accept: 'application/vnd.github+json',
        'X-GitHub-Api-Version': '2022-11-28',
        Authorization: `Bearer ${githubAccessToken.value}`,
      }

      const REPOS_PER_PAGE = 100
      const NEXT_PATTERN = /(?<=<)([\S]*)(?=>; rel="Next")/i
      let pagesRemaining = true
      let repos: Array<GithubRepositoryDTO> = []

      // https://docs.github.com/en/rest/repos/repos?apiVersion=2022-11-28#list-repositories-for-the-authenticated-user
      let url = `https://api.github.com/user/repos?per_page=${REPOS_PER_PAGE}&page=1`

      while (pagesRemaining) {
        console.log('fetching repos', url)
        const reposResponse = await $fetch.raw(url, { headers })

        repos = [...repos, ...(reposResponse._data as Array<GithubRepositoryDTO>)]

        const linkHeader = reposResponse.headers.get('link')

        pagesRemaining = linkHeader && linkHeader.includes('rel="next"')

        if (pagesRemaining) {
          url = linkHeader.match(NEXT_PATTERN)[0]
        }
      }

      const mappedRepos: Array<Pick<RepositoryViewModel, 'id' | 'isFork' | 'isPrivate' | 'name'>> = repos.map(
        (repo) => ({
          name: repo.name,
          isFork: repo.fork,
          isPrivate: repo.private,
          id: repo.id,
        }),
      )

      const results = await Promise.allSettled(
        mappedRepos.map(async (mappedRepo) => {
          // https://docs.github.com/en/rest/metrics/traffic?apiVersion=2022-11-28#get-page-views
          const trafficData = await $fetch<TrafficData>(
            `https://api.github.com/repos/${githubUserName.value}/${mappedRepo.name}/traffic/views?per=${trafficTimeFrame.value}`,
            {
              headers,
            },
          )
          return {
            ...mappedRepo,
            trafficData,
          }
        }),
      )

      return results
        .filter((result) => result.status === 'fulfilled')
        .map((result) => result.value as RepositoryViewModel)
    },
    { watch: [githubUserName, githubAccessToken, trafficTimeFrame] },
  )

  const isLoadingTrafficData = computed(() => status.value === 'pending')

  const headerText = computed(() => `Traffic data for your GitHub user "${githubUserName.value}"`)

  const selectedRepositoryData = computed(() => {
    if (!filteredRepositoriesData.value) {
      return undefined
    }

    return filteredRepositoriesData.value.find((repo) => repo.id === selectedRepositoryId.value)
  })

  const filteredRepositoriesData = computed(() => {
    if (!data.value) {
      return []
    }

    return data.value.filter((repo) => {
      if (
        searchRepositoryName.value !== '' &&
        !repo.name.toLowerCase().includes(searchRepositoryName.value.toLowerCase())
      ) {
        return false
      }

      if (!showForkedRepos.value && repo.isFork) {
        return false
      }

      if (!showPrivateRepos.value && repo.isPrivate) {
        return false
      }

      return true
    })
  })

  watch(data, () => {
    if (data.value && !selectedRepositoryId.value) {
      selectedRepositoryId.value = data.value[0].id
    }
  })

  watch(
    selectedRepositoryId,
    (newSelectedRepositoryId) => {
      router.push({
        query: {
          ...route.query,
          selectedRepositoryId: newSelectedRepositoryId,
        },
      })
    },
    { immediate: true },
  )

  watch(
    showForkedRepos,
    (newShowForkedRepos) => {
      router.push({
        query: {
          ...route.query,
          showForkedRepos: newShowForkedRepos ? 'true' : undefined,
        },
      })
    },
    { immediate: true },
  )

  watch(
    showPrivateRepos,
    (newShowPrivateRepos) => {
      router.push({
        query: {
          ...route.query,
          showPrivateRepos: newShowPrivateRepos ? 'true' : undefined,
        },
      })
    },
    { immediate: true },
  )

  watch(
    searchRepositoryName,
    (newSearchName) => {
      router.push({
        query: {
          ...route.query,
          q: newSearchName || '',
        },
      })
    },
    { immediate: true },
  )

  watch(
    trafficTimeFrame,
    (newTrafficTimeFrame) => {
      router.push({
        query: {
          ...route.query,
          trafficTimeFrame: newTrafficTimeFrame,
        },
      })
    },
    { immediate: true },
  )

  onBeforeMount(() => {
    if (route.query.selectedRepositoryId) {
      selectedRepositoryId.value = Number(route.query.selectedRepositoryId)
    }
    if (route.query.showForkedRepos) {
      showForkedRepos.value = route.query.showForkedRepos === 'true'
    }
    if (route.query.showPrivateRepos) {
      showPrivateRepos.value = route.query.showPrivateRepos === 'true'
    }
    if (route.query.trafficTimeFrame) {
      trafficTimeFrame.value = route.query.trafficTimeFrame as 'day' | 'week'
    }
    if (route.query.q) {
      searchRepositoryName.value = route.query.q as string
    }
  })

  return {
    showForkedRepos,
    showPrivateRepos,
    searchRepositoryName,
    headerText,
    trafficTimeFrame,
    selectedRepositoryData,
    repositories: filteredRepositoriesData,
    isLoadingTrafficData,
    error,
    selectedRepositoryId,
  }
}
