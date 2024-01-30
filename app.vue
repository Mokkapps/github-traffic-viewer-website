<script setup>
useHead({
  title: 'GitHub Traffic Viewer',
  meta: [{ name: 'viewport', content: 'width=device-width, initial-scale=1' }],
  link: [{ rel: 'icon', href: '/favicon.ico' }],
  htmlAttrs: {
    lang: 'en',
  },
})

useSeoMeta({
  description: 'A website that shows a list of traffic graphs of your own GitHub repositories.',
})
</script>

<template>
  <NuxtLayout>
    <NuxtPage />
    <UNotifications />
  </NuxtLayout>
</template>
