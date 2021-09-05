<script>
import { Bar } from 'vue-chartjs'

export default {
  extends: Bar,
  props: {
    labels: {
      type: Array,
      default: () => [],
    },
    data: {
      type: Array,
      default: () => [],
    },
    options: {
      type: Object,
      default: () => ({}),
    },
    colors: {
      type: Array,
      default: () => [],
    },
  },
  data() {
    return {
      chartData: {},
    }
  },
  watch: {
    data: {
      handler() {
        this.setChartData()
        this.$data._chart.update(this.chartData, this.options)
      },
      deep: true,
    },
  },
  mounted() {
    this.setChartData()
    this.renderChart(this.chartData, this.options)
  },
  methods: {
    setChartData() {
      this.chartData.labels = this.labels
      this.chartData.datasets = [
        { data: this.data, backgroundColor: this.colors },
      ]
    },
  },
}
</script>
