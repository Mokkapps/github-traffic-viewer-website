<script lang="ts" setup>
interface Props {
  isLoadingTrafficData: boolean
  repositories: Array<RepositoryViewModel>
}
defineProps<Props>()

type Emits = {
  select: [number]
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
  <div class="flex flex-col gap-4 col-span-3 overflow-auto">
    <UFormGroup label="Show forked repositories">
      <UToggle v-model="showForkedRepos" color="primary" :disabled="isLoadingTrafficData" />
    </UFormGroup>
    <UFormGroup label="Show private repositories">
      <UToggle v-model="showPrivateRepos" color="primary" :disabled="isLoadingTrafficData" />
    </UFormGroup>
    <URadioGroup v-model="trafficTimeFrame" legend="Traffic Time Frame" :options="trafficTimeFrameOptions" />
    <UDivider />
    <UFormGroup label="Your repositories">
      <UInput
        v-model="repoNameInput"
        icon="i-heroicons-magnifying-glass"
        :disabled="isLoadingTrafficData"
        placeholder="Search..."
        autocomplete="off"
        class="mt-2 mx-1"
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
      <ul class="overflow-auto">
        <UDivider class="mt-4 mb-2" />
        <li v-for="repo of repositories" :key="repo.id" class="flex items-center gap-2 mb-1">
          <UButton variant="link" :disabled="isLoadingTrafficData" @click="$emit('select', repo.id)">
            {{ repo.name }}
          </UButton>
          <UBadge v-if="repo.isFork" variant="outline" color="white" size="xs">Fork</UBadge>
          <UBadge v-if="repo.isPrivate" variant="outline" color="white" size="xs">Private</UBadge>
        </li>
      </ul>
    </UFormGroup>
  </div>
</template>
