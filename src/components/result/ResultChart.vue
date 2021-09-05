<template>
  <div class="chart">
    <chart
      v-if="chartData.length > 0"
      ref="chart"
      :labels="chartLabels"
      :data="chartData"
      :options="chartOptions"
      :colors="chartColors"
      :styles="{ height: '50%', width: '80%', margin: 'auto' }"
    />
  </div>
</template>

<script>
import Chart from '@/components/common/Chart.vue'
import color from '@/assets/const/color.js'

export default {
  components: {
    Chart,
  },
  props: {
    results: {
      type: Object,
      default: () => ({}),
    },
  },
  data() {
    return {
      chartData: [],
      chartLabels: [],
      chartColors: [],
      chartBaseColor: color.chartBaseColor,
      chartOptions: {
        maintainAspectRatio: false,
        animation: {
          duration: 0,
          easing: '',
        },
        hover: {
          animationDuration: 0,
        },
        responsiveAnimationDuration: 0,
        legend: {
          display: false,
        },
        scales: {
          yAxes: [
            {
              ticks: {
                min: 0,
                stepSize: 1,
              },
            },
          ],
        },
      },
    }
  },
  computed: {},
  watch: {
    results: {
      handler() {
        this.setChartData()
      },
      deep: true,
    },
  },
  mounted() {
    this.setChartData()
  },
  methods: {
    setChartData() {
      this.chartLabels = Object.keys(this.results) || []
      this.chartData = []
      Object.keys(this.results).forEach((key) => {
        this.chartData.push(this.results[key])
      })
      this.chartColors = this.chartBaseColor.slice(0, this.chartLabels.length)
    },
  },
}
</script>

<style lang="scss">
.chart {
  text-align: center;
  margin: 120px 0 0 0;
}
</style>
