<script lang="ts" setup>
const { showAuthModal } = useAuth()
</script>

<template>
  <UModal v-model="showAuthModal">
    <AuthContainer />
  </UModal>
</template>
