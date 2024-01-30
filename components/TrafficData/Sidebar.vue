<script lang="ts" setup>
interface Props {
  isLoadingTrafficData: boolean
  repositories: Array<RepositoryViewModel>
}
defineProps<Props>()

type Emits = {
  select: [string]
}
defineEmits<Emits>()

const repoNameInput = defineModel('name')
const showForkedRepos = defineModel('showForkedRepos')
const showPrivateRepos = defineModel('showPrivateRepos')
const trafficTimeFrame = defineModel('trafficTimeFrame')

const trafficTimeFrameOptions = [
  {
    value: 'day',
    label: 'Per day',
  },
  {
    value: 'week',
    label: 'Per week',
  },
]
</script>

<template>
  <div class="flex flex-col gap-4 col-span-3 py-8 px-4 border-r border-gray-200 dark:border-gray-600 overflow-auto">
    <UFormGroup label="Repo Name">
      <UInput
        v-model="repoNameInput"
        icon="i-heroicons-magnifying-glass"
        :disabled="isLoadingTrafficData"
        placeholder="Search..."
        autocomplete="off"
        :ui="{ icon: { trailing: { pointer: '' } } }"
      >
        <template #trailing>
          <UButton
            v-show="repoNameInput !== ''"
            color="gray"
            variant="link"
            icon="i-heroicons-x-mark-20-solid"
            :padded="false"
            @click="repoNameInput = ''"
          />
        </template>
      </UInput>
    </UFormGroup>
    <UFormGroup label="Show forked repositories">
      <UToggle v-model="showForkedRepos" color="primary" :disabled="isLoadingTrafficData" />
    </UFormGroup>
    <UFormGroup label="Show private repositories">
      <UToggle v-model="showPrivateRepos" color="primary" :disabled="isLoadingTrafficData" />
    </UFormGroup>
    <URadioGroup v-model="trafficTimeFrame" legend="Traffic Time Frame" :options="trafficTimeFrameOptions" />
    <UDivider />
    <ul class="max-h-[600px] overflow-auto">
      <p class="mb-4">Your repositories:</p>
      <li v-for="repo of repositories" :key="repo.id" class="flex items-center gap-2 mb-1">
        <UButton variant="link" :disabled="isLoadingTrafficData" @click="$emit('select', repo.id)">
          {{ repo.name }}
        </UButton>
        <UBadge v-if="repo.isFork" variant="outline" color="white" size="xs">Fork</UBadge>
        <UBadge v-if="repo.isPrivate" variant="outline" color="white" size="xs">Private</UBadge>
      </li>
    </ul>
  </div>
</template>
