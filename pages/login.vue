<script setup lang="ts">
const { login } = useAuth()

defineOgImageComponent('NuxtSeo', {
  title: 'GitHub Traffic Viewer',
  description: 'Instant analytics for views of your repositories empowering you to optimize them effortlessly.',
  theme: '#0F172A',
  colorMode: 'dark',
})
</script>

<template>
  <UPageBody>
    <UPageHeader title="Login" description="Login to your GitHub account to be able to view your traffic data." />
    <UButton icon="i-simple-icons-github" class="space-y-3" block size="xl" color="white" @click="login">
      GitHub
    </UButton>
  </UPageBody>
</template>
