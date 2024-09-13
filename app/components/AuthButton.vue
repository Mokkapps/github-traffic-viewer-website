<script lang="ts" setup>
const { showAuthModal } = useAuth()
</script>

<template>
  <AuthState>
    <template #default="{ loggedIn, clear }">
      <UButton v-if="loggedIn" color="gray" size="md" :ui="{ rounded: 'rounded-full' }" @click="clear">
        Logout
      </UButton>
      <UButton v-else color="gray" size="md" :ui="{ rounded: 'rounded-full' }" @click="showAuthModal = true">
        Login</UButton
      >
    </template>
    <template #placeholder>
      <button disabled>Loading...</button>
    </template>
  </AuthState>
</template>
