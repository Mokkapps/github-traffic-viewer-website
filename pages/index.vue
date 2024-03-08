<script lang="ts" setup>
import siteMetadata from '~/siteMetadata'

defineOgImageComponent('NuxtSeo', {
  title: siteMetadata.projectName,
  description: siteMetadata.description,
  theme: '#0F172A',
  colorMode: 'dark',
})
</script>

<template>
  <div>
    <ULandingHero :title="siteMetadata.projectName" :description="siteMetadata.description">
      <template #links>
        <UButton to="/traffic-data" size="xl">Get started - It's free</UButton>
      </template>

      <template #default>
        <img
          src="https://mokkapps.twic.pics/github-traffic-viewer/hero-v2.png?twic=v1/cover=2048"
          class="w-full rounded-md shadow-xl ring-1 ring-gray-300 dark:ring-gray-700 p-4"
        />
      </template>
    </ULandingHero>
  </div>
</template>
~/siteMetadata
