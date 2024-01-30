<script setup>
const links = [
  {
    label: 'Privacy Policy',
    to: '/privacy-policy',
  },
]
</script>

<template>
  <UFooter :links="links">
    <template #left>
      Created by
      <NuxtLink to="https://mokkapps.de" target="_blank" external class="text-primary cursor-pointer">
        Michael Hoffmann
      </NuxtLink>
    </template>
  </UFooter>
</template>
