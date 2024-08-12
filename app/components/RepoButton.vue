<script setup lang="ts">
import siteMetadata from '~/siteMetadata'
</script>

<template>
  <UButton
    :to="siteMetadata.repoUrl"
    target="_blank"
    icon="i-simple-icons-github"
    aria-label="GitHub"
    color="gray"
    variant="ghost"
  />
</template>
