<template>
  <div class="result">
    <template v-if="start">
      <result-button-group :type="type" @setType="setType" />
      <result-person-number v-if="type === 'number'" :count="count" />
      <result-chart
        v-if="type === 'graph'"
        :chartLabels="chartLabels"
        :chartValues="chartValues"
      />
      <result-mapping
        v-if="type === 'mapping'"
        :count="count"
        :settings="settings"
      />
    </template>
    <template v-else>
      <p class="result__title ma-4">Monitor</p>
      <div class="start-button">
        <v-btn icon @click="test">
          <v-icon size="100" color="deep-purple">
            mdi-play-circle-outline
          </v-icon>
        </v-btn>
      </div>
    </template>
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
      start: false,
      type: 'number',
      count: null,
      projectName: null,
      settings: null,
      results: null,
      interval: null,
      delayTime: 5,
      chartLabels: [],
      chartValues: [],
    }
  },
  mounted() {
    this.setSettings()
    this.setResult()
  },
  destroyed() {
    this.stop()
  },
  methods: {
    setSettings() {
      const projectId = this.$route.params.projectId
      const ref = this.$firebase.database().ref(`project/${projectId}`)
      ref.on('value', (snapshot) => {
        if (!snapshot?.val()) return
        const project = snapshot.val()
        this.projectName = project.name
        this.settings = project.setting
      })
    },
    setResult() {
      const today = new Date()
      const year = today.getFullYear()
      const month = ('0' + String(today.getMonth() + 1)).slice(-2)
      const day = ('0' + String(today.getDate())).slice(-2)

      const date = `${year}-${month}-${day}`
      const ref = this.$firebase.database().ref(`results/${date}`)
      ref.on('value', (snapshot) => {
        if (!snapshot?.val()) return
        this.results = snapshot.val()
      })
    },
    setType(type) {
      this.type = type
    },
    test() {
      this.start = true
      this.interval = setInterval(() => {
        const today = new Date()
        today.setSeconds(today.getSeconds() - this.delayTime)
        const time = `${today.getHours()}:${today.getMinutes()}:${today.getSeconds()}`

        const result = this.results[time]
        if (!result) return
        let count = 0
        result.data.forEach((data) => {
          if (data[0] === 'person') count++
        })
        this.count = count
        this.chartLabels.push(time)
        this.chartValues.push(this.count)

        if (this.chartLabels.length > 50) this.chartLabels.shift()
        if (this.chartValues.length > 50) this.chartValues.shift()
      }, 1000)
    },
    stop() {
      clearInterval(this.interval)
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

.start-button {
  margin: 150px 0 0 0;
  text-align: center;
}
</style>
