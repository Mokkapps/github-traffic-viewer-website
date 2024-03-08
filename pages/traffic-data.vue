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

definePageMeta({
  layout: 'dashboard',
  middleware: ['auth'],
})

defineOgImageComponent('NuxtSeo', {
  title: 'GitHub Traffic Viewer',
  description: 'Instant analytics for views of your repositories empowering you to optimize them effortlessly.',
  theme: '#0F172A',
  colorMode: 'dark',
})
</script>

<template>
  <UDashboardLayout>
    <UDashboardPanel :width="350" :resizable="{ min: 300, max: 600 }" collapsible>
      <UDashboardSidebar>
        <template #header>
          <NuxtLink to="/" class="text-lg font-bold py-2.5">GitHub Traffic Viewer</NuxtLink>
        </template>

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
            <AuthButton />
            <UColorModeButton />
            <RepoButton />
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
