<script lang="ts" setup>
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js'
import { Line } from 'vue-chartjs'

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend)

interface Props {
  repository: RepositoryViewModel
}
const props = defineProps<Props>()

const lineOptions = {
  scales: {
    y: {
      grid: {
        color: 'rgb(156 163 175)',
      },
    },
    x: {
      grid: {
        color: 'rgb(156 163 175)',
      },
    },
  },
}

const lineChartData = computed(() => {
  const labels = props.repository.trafficData.views.map((view) => view.timestamp)
  const data = props.repository.trafficData.views.map((view) => view.count)

  return {
    labels,
    datasets: [
      {
        label: 'Views',
        data,
        borderColor: '#2BD3EE',
        backgroundColor: '#2BD3EE',
        fill: false,
      },
    ],
  }
})
</script>

<template>
  <UCard>
    <template #header>
      <h2 class="text-2xl font-bold">{{ props.repository.name }}</h2>
    </template>
    <Line :data="lineChartData" :options="lineOptions" class="rounded-md p-4" />
  </UCard>
</template>
