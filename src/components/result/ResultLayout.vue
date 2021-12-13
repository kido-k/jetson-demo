<template>
  <div class="result">
    <template v-if="start">
      <result-button-group :type="type" @setType="setType" />
      <result-view
        v-if="type === 'view'"
        :count="count"
        :imageName="imageName"
        :chartLabels="chartLabels"
        :chartValues="chartValues"
      />
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
      <result-three v-if="type === '3d'" :count="count" :settings="settings" />
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
import ResultView from './ResultView.vue'
import ResultPersonNumber from './ResultPersonNumber.vue'
import ResultChart from './ResultChart.vue'
import ResultMapping from './ResultMapping.vue'
import ResultThree from './ResultThree.vue'

export default {
  components: {
    ResultButtonGroup,
    ResultView,
    ResultPersonNumber,
    ResultChart,
    ResultMapping,
    ResultThree,
  },
  props: {},
  data() {
    return {
      start: false,
      type: 'view',
      count: null,
      imageName: null,
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
      // this.chartLabels = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9']
      // this.chartValues = [10, 12, 13, 22, 30, 1, 5, 6, 2, 9]
      this.interval = setInterval(() => {
        const today = new Date()
        today.setSeconds(today.getSeconds() - this.delayTime)
        const hours = ('0' + String(today.getHours())).slice(-2)
        const minutes = ('0' + String(today.getMinutes())).slice(-2)
        const seconds = ('0' + String(today.getSeconds())).slice(-2)
        const time = `${hours}:${minutes}:${seconds}`

        this.imageName = `result-${hours}-${minutes}-${seconds}.jpg`
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
