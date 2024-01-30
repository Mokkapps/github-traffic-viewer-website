<script setup lang="ts">
const { logout, showAuthModal } = useAuth()
const user = useSupabaseUser()

const links = [
  {
    label: 'Traffic Data',
    icon: 'i-heroicons-presentation-chart-line',
    to: '/traffic-data',
  },
]

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
  <UHeader :links="links">
    <template #logo><span class="text-sm md:text-xl">GitHub Traffic Viewer</span></template>

    <template #right>
      <UButton @click="onAuthButtonClick" color="gray" size="md" :ui="{ rounded: 'rounded-full' }">
        {{ authButtonText }}
      </UButton>

      <UColorModeButton />

      <UButton
        to="https://github.com/Mokkapps/github-traffic-viewer-website"
        target="_blank"
        icon="i-simple-icons-github"
        aria-label="GitHub"
        color="gray"
        variant="ghost"
      />
    </template>
  </UHeader>
</template>
