<template>
  <div class="result">
    <p class="result__title ma-4">Monitor</p>
    <result-button-group :type="type" @setType="setType" />
    <result-person-number v-if="type === 'number'" :currents="currents" />
    <result-chart v-if="type === 'graph'" :currents="currents" />
    <result-mapping v-if="type === 'mapping'" />
  </div>
</template>

<script>
import ResultButtonGroup from './ResultButtonGroup.vue'
import ResultPersonNumber from './ResultPersonNumber.vue'
import ResultChart from './ResultChart.vue'
import ResultMapping from './ResultMapping.vue'

export default {
  components: {
    ResultButtonGroup,
    ResultPersonNumber,
    ResultChart,
    ResultMapping,
  },
  props: {},
  data() {
    return {
      type: 'number',
      currents: null,
    }
  },
  computed: {},
  mounted() {
    this.setCurrentItems()
  },
  methods: {
    setCurrentItems() {
      const ref = this.$firebase.database().ref(`results/current`)
      ref.on('value', (snapshot) => {
        if (!snapshot || !snapshot.val()) return
        this.currents = snapshot.val()
      })
    },
    setType(type) {
      this.type = type
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
