<template>
  <div class="view">
    <p class="view__number">
      {{ count || '-' }}
    </p>
    <v-layout style="width: 100%">
      <!-- <img class="view__image" :src="resultImage" /> -->
      <chart
        v-if="chartValues.length > 0"
        ref="chart"
        :labels="chartLabels"
        :data="chartValues"
        :options="chartOptions"
        :colors="chartColors"
        :styles="{ height: '50%', width: '45%', margin: 'auto' }"
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
  computed: {
    // resultImage() {
    //   console.log(this.imageName)
    //   if (!this.imageName) return require(`@/assets/result/wall.jpeg`)
    //   return require(`@/assets/result/${this.imageName}`)
    // },
  },
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
.view {
  width: 100%;
  text-align: center;
  margin: 60px;
  &__number {
    font-size: 120px;
    font-weight: bold;
    font-family: serif;
    font-style: italic;
    margin: 0 0 24px 0;
  }
  &__image {
    height: 100%;
    width: 43%;
    margin: 0 24px 0 0;
  }
}
</style>
