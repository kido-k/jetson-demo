<template>
  <div class="result">
    <p class="result__title ma-4">Monitor</p>
    <result-button-group :showGraph="showGraph" @setShowGraph="setShowGraph" />
    <result-chart v-if="showGraph" :results="results" />
    <result-person-number v-if="!showGraph" :results="results" />
  </div>
</template>

<script>
import ResultChart from './ResultChart.vue'
import ResultButtonGroup from './ResultButtonGroup.vue'
import ResultPersonNumber from './ResultPersonNumber.vue'

export default {
  components: {
    ResultChart,
    ResultButtonGroup,
    ResultPersonNumber,
  },
  props: {},
  data() {
    return {
      results: null,
      showGraph: false,
    }
  },
  computed: {},
  mounted() {
    this.setResultItems()
  },
  methods: {
    setResultItems() {
      const ref = this.$firebase.database().ref(`results/current`)
      ref.on('value', (snapshot) => {
        if (!snapshot || !snapshot.val()) return
        this.results = snapshot.val()
      })
    },
    setShowGraph(bool) {
      this.showGraph = bool
    },
  },
}
</script>

<style lang="scss">
.result {
  &__title {
    text-align: center;
    font-size: 52px;
    font-weight: bold;
    font-family: serif;
  }
}
</style>
