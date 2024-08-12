<script lang="ts" setup>
const { logout, showAuthModal } = useAuth()
const user = useSupabaseUser()

const authButtonText = computed(() => {
  if (user.value) {
    return 'Logout'
  }

  return 'Login'
})

const onAuthButtonClick = async () => {
  if (user.value) {
    await logout()
  } else {
    showAuthModal.value = true
  }
}
</script>

<template>
  <UButton color="gray" size="md" :ui="{ rounded: 'rounded-full' }" @click="onAuthButtonClick">
    {{ authButtonText }}
  </UButton>
</template>

<style></style>
