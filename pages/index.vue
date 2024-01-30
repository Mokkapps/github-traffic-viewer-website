<template>
  <div>
    <ULandingHero
      title="GitHub Traffic Viewer"
      description="Instant analytics for views of your repositories empowering you to optimize them effortlessly."
    >
      <template #links>
        <UButton to="/traffic-data" size="lg" icon="i-heroicons-play-solid"> Try it now </UButton>
      </template>

      <template #default>
        <img
          src="https://mokkapps.twic.pics/github-traffic-viewer/hero.png?twic=v1/cover=1024"
          class="w-full rounded-md shadow-xl ring-1 ring-gray-300 dark:ring-gray-700 p-4"
        />
      </template>
    </ULandingHero>
  </div>
</template>
