<script lang="ts" setup>
const { githubAccessToken, githubUserName } = useAuth()
const route = useRoute()
const router = useRouter()

const REPOS_PER_PAGE = 100

const githubApiRepositoriesPage = ref(1)
const showForkedRepos = ref(false)
const showPrivateRepos = ref(false)
const trafficTimeFrame = ref<'day' | 'week'>('week')
const selectedRepositoryId = ref<number | null>(null)
const searchRepositoryName = ref('')

const selectedRepositoryData = computed(() => {
  if (!filteredRepositoriesData.value) {
    return undefined
  }

  return filteredRepositoriesData.value.find((repo) => repo.id === selectedRepositoryId.value)
})

const filteredRepositoriesData = computed(() => {
  if (!reposData.value) {
    return []
  }

  return reposData.value.filter((repo) => {
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

const {
  data: reposData,
  error: reposError,
  pending: isLoadingTrafficData,
} = useAsyncData(
  'traffic-data',
  async () => {
    if (!githubUserName.value) {
      return
    }

    if (!githubAccessToken.value) {
      throw new Error('No GitHub access token found.')
    }

    const headers = {
      Accept: 'application/vnd.github+json',
      'X-GitHub-Api-Version': '2022-11-28',
      Authorization: `Bearer ${githubAccessToken.value}`,
    }

    // https://docs.github.com/en/rest/repos/repos?apiVersion=2022-11-28#list-repositories-for-the-authenticated-user
    const repos = await $fetch<Array<GithubRepositoryDTO>>(
      `https://api.github.com/user/repos?per_page=${REPOS_PER_PAGE}&page=${githubApiRepositoriesPage.value}`,
      { headers },
    )

    const mappedRepos: Array<Pick<RepositoryViewModel, 'id' | 'isFork' | 'isPrivate' | 'name'>> = repos.map((repo) => ({
      name: repo.name,
      isFork: repo.fork,
      isPrivate: repo.private,
      id: repo.id,
    }))

    return Promise.all(
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
  },
  { watch: [githubUserName, githubApiRepositoriesPage, githubAccessToken, trafficTimeFrame] },
)

watch(reposData, () => {
  if (reposData.value && !selectedRepositoryId.value) {
    selectedRepositoryId.value = reposData.value[0].id
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

definePageMeta({
  middleware: ['auth'],
})
</script>

<template>
  <UPageBody>
    <UPageHeader
      title="Your GitHub Traffic Data"
      description="A list of all your GitHub repositories and their traffic data."
    />
    <div class="grid grid-cols-12">
      <TrafficDataSidebar
        v-model:show-forked-repos="showForkedRepos"
        v-model:show-private-repos="showPrivateRepos"
        v-model:name="searchRepositoryName"
        v-model:traffic-time-frame="trafficTimeFrame"
        :is-loading-traffic-data="isLoadingTrafficData"
        :repositories="filteredRepositoriesData"
        @select="selectedRepositoryId = $event"
      />
      <div class="col-span-9 p-8">
        <RepoTrafficChart v-if="selectedRepositoryData" :repository="selectedRepositoryData" />
        <UCard v-else-if="isLoadingTrafficData" class="mt-10">
          <template #header>
            <USkeleton class="h-4 w-[250px]" />
          </template>
          <USkeleton class="h-4 w-[200px]" />
        </UCard>
        <UAlert
          v-else-if="reposError"
          class="mt-10"
          icon="i-heroicons-exclamation-circle"
          color="red"
          variant="outline"
          title="An error occurred"
          :description="reposError.message"
        />
      </div>
    </div>
  </UPageBody>
</template>
