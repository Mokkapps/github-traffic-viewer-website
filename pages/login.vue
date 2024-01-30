<script setup lang="ts">
const { login } = useAuth()
</script>

<template>
  <UPageBody>
    <UPageHeader title="Login" description="Login to your GitHub account to be able to view your traffic data." />
    <UButton icon="i-simple-icons-github" class="space-y-3" block size="xl" color="white" @click="login">
      GitHub
    </UButton>
  </UPageBody>
</template>
