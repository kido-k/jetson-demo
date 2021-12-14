<template>
  <div class="monitor-view">
    <p class="monitor-view__number">
      <span class="monitor-view__number__count">{{ count || '-' }}</span>
      <span class="monitor-view__number__unit">人</span>
    </p>
    <v-layout style="width: 100%">
      <chart
        v-if="chartValues.length > 0"
        ref="chart"
        :labels="chartLabels"
        :data="chartValues"
        :options="chartOptions"
        :colors="chartColors"
        :styles="{ height: '60%', width: '95%' }"
      />
    </v-layout>
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
    imageName: {
      type: String,
      default: null,
    },
    count: {
      type: Number,
      default: null,
    },
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
          xAxes: [
            // Ｘ軸設定
            {
              scaleLabel: {
                fontSize: 48,
              },
              ticks: {
                min: 0,
                stepSize: 1,
                fontSize: 32,
              },
            },
          ],
          yAxes: [
            {
              scaleLabel: {
                fontSize: 48,
              },
              ticks: {
                min: 0,
                stepSize: 1,
                fontSize: 48,
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
.monitor-view {
  width: 100%;
  height: 100vh;
  text-align: center;
  &__number {
    font-size: 180px;
    font-weight: bold;
    margin: 0 0 24px 0;
    height: 30%;
    &__count {
      text-align: center;
    }
    &__unit {
      font-size: 80px;
      font-weight: bold;
      font-family: serif;
    }
  }
}
</style>
