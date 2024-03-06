<script lang="ts" setup>
const {
  showForkedRepos,
  showPrivateRepos,
  searchRepositoryName,
  headerText,
  selectedRepositoryData,
  repositories,
  trafficTimeFrame,
  isLoadingTrafficData,
  error,
  selectedRepositoryId,
} = useTrafficData()

const links = [
  {
    id: 'home',
    label: 'Home',
    icon: 'i-heroicons-home',
    to: '/',
    tooltip: {
      text: 'Home',
      shortcuts: ['G', 'H'],
    },
  },
]

definePageMeta({
  layout: 'dashboard',
  middleware: ['auth'],
})
</script>

<template>
  <UDashboardLayout>
    <UDashboardPanel :width="350" :resizable="{ min: 300, max: 600 }" collapsible>
      <UDashboardSidebar>
        <template #header>
          <span class="text-lg font-bold p-2.5">GitHub Traffic Viewer</span>
        </template>

        <UDashboardSidebarLinks :links="links" />

        <UDivider />

        <TrafficDataSidebar
          v-model:show-forked-repos="showForkedRepos"
          v-model:show-private-repos="showPrivateRepos"
          v-model:name="searchRepositoryName"
          v-model:traffic-time-frame="trafficTimeFrame"
          :is-loading-traffic-data="isLoadingTrafficData"
          :repositories="repositories"
          @select="selectedRepositoryId = $event"
        />
      </UDashboardSidebar>
    </UDashboardPanel>

    <UDashboardPage>
      <UDashboardPanel grow>
        <UDashboardNavbar :title="headerText">
          <template #right>
            <UColorModeButton />

            <UButton
              to="https://github.com/Mokkapps/github-traffic-viewer-website"
              target="_blank"
              icon="i-simple-icons-github"
              aria-label="GitHub"
              color="gray"
              variant="ghost"
            />
          </template>
        </UDashboardNavbar>

        <UDashboardPanelContent>
          <div class="col-span-9 p-8">
            <UCard v-if="isLoadingTrafficData">
              <div class="flex flex-col gap-10">
                <USkeleton class="h-6 w-[300px]" />
                <div class="flex flex-col gap-8">
                  <USkeleton v-for="n of 13" :key="n" class="h-4 w-full" />
                </div>
              </div>
            </UCard>
            <RepoTrafficChart v-else-if="selectedRepositoryData" :repository="selectedRepositoryData" />
            <UAlert
              v-else-if="error"
              class="mt-10"
              icon="i-heroicons-exclamation-circle"
              color="red"
              variant="outline"
              title="An error occurred"
              :description="error.message"
            />
          </div>
        </UDashboardPanelContent>
      </UDashboardPanel>
    </UDashboardPage>
  </UDashboardLayout>
</template>
