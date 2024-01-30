<script lang="ts" setup>
const { showAuthModal, login } = useAuth()
</script>

<template>
  <UModal v-model="showAuthModal">
    <AuthContainer @login="login" />
  </UModal>
</template>
