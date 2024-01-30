<script lang="ts" setup>
defineEmits(['login'])
</script>

<template>
  <div class="p-8 flex flex-col gap-4">
    <UIcon name="i-heroicons-user-circle" class="text-4xl text-primary" />
    <span class="font-bold text-2xl">Login</span>
    <span class="text-gray-500 dark:text-gray-400"
      >Login to your GitHub account to be able to view your traffic data.</span
    >
    <UButton icon="i-simple-icons-github" class="space-y-3" block size="xl" color="white" @click="$emit('login')">
      GitHub
    </UButton>
  </div>
</template>
