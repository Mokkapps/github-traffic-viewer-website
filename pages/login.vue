<script setup lang="ts">
import siteMetadata from '~/sitemetadata'

const { login } = useAuth()

defineOgImageComponent('NuxtSeo', {
  title: siteMetadata.projectName,
  description: siteMetadata.description,
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
~/siteMetadata
