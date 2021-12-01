<template>
  <div class="chart">
    <p class="chart__title">Chart</p>
    <chart
      v-if="chartValues.length > 0"
      ref="chart"
      :labels="chartLabels"
      :data="chartValues"
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
    chartLabels: {
      type: Array,
      default: () => [],
    },
    chartValues: {
      type: Array,
      default: () => [],
    },
  },
  data() {
    return {
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
  mounted() {
    this.setChartData()
  },
  methods: {
    setChartData() {
      for (let i = 0; i < 50; i++) {
        this.chartColors.push(this.chartBaseColor[0])
      }
    },
  },
}
</script>

<style lang="scss">
.chart {
  text-align: center;
  margin: 60px 0 0 0;
  &__title {
    text-align: center;
    font-size: 52px;
    font-weight: bold;
    font-family: serif;
    margin: 0 0 60px 0 !important;
  }
}
</style>
