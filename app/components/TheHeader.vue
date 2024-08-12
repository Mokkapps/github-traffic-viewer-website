<script setup lang="ts">
const links = [
  {
    label: 'Traffic Data',
    icon: 'i-heroicons-presentation-chart-line',
    to: '/traffic-data',
  },
]
</script>

<template>
  <UHeader :links="links">
    <template #logo>
      <span class="text-sm md:text-xl">GitHub Traffic Viewer</span>
    </template>

    <template #right>
      <AuthButton />
      <UColorModeButton />
      <RepoButton />
    </template>
  </UHeader>
</template>
