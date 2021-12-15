<template>
  <div class="monitor-view">
    <template v-if="start">
      <monitor-view
        :count="count"
        :imageName="imageName"
        :chartLabels="chartLabels"
        :chartValues="chartValues"
      />
    </template>
    <template v-else>
      <div class="start-button">
        <v-btn icon @click="updateLocal">
          <v-icon size="100" color="deep-purple">
            mdi-play-circle-outline
          </v-icon>
        </v-btn>
      </div>
    </template>
  </div>
</template>

<script>
import axios from 'axios'
import MonitorView from './MonitorView.vue'

export default {
  components: {
    MonitorView,
  },
  props: {},
  data() {
    return {
      start: false,
      count: null,
      imageName: null,
      results: null,
      interval: null,
      delayTime: 2,
      chartLabels: [],
      chartValues: [],
      startFiltering: false,
      startTime: null,
    }
  },
  mounted() {
    this.startTime = new Date()
    // this.setResult()
    // this.startTime = new Date('2021-12-15 17:36:00')
    // const num = 1990
    // for (let i = 0; i < num; i++) {
    //   if (!i) {
    //     this.chartLabels.push(String('17:36:00'))
    //   } else {
    //     this.chartLabels.push(String('18:36:00'))
    //   }
    //   const value = Math.floor(Math.random() * num)
    //   this.chartValues.push(value)
    // }
  },
  destroyed() {
    this.stop()
  },
  methods: {
    // setResult() {
    //   const today = new Date()
    //   const year = today.getFullYear()
    //   const month = ('0' + String(today.getMonth() + 1)).slice(-2)
    //   const day = ('0' + String(today.getDate())).slice(-2)

    //   const date = `${year}-${month}-${day}`
    //   const ref = this.$firebase.database().ref(`results/${date}`)
    //   ref.on('value', (snapshot) => {
    //     if (!snapshot?.val()) return
    //     this.results = snapshot.val()
    //   })
    // },
    // test() {
    //   this.start = true
    //   // this.chartLabels = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9']
    //   // this.chartValues = [10, 12, 13, 22, 30, 1, 5, 6, 2, 9]
    //   this.interval = setInterval(() => {
    //     const today = new Date()
    //     today.setSeconds(today.getSeconds() - this.delayTime)
    //     const hours = ('0' + String(today.getHours())).slice(-2)
    //     const minutes = ('0' + String(today.getMinutes())).slice(-2)
    //     const seconds = ('0' + String(today.getSeconds())).slice(-2)
    //     const time = `${hours}:${minutes}:${seconds}`

    //     this.imageName = `result-${hours}-${minutes}-${seconds}.jpg`
    //     const result = this.results[time]
    //     if (!result) return
    //     let count = 0
    //     result.data.forEach((data) => {
    //       if (data[0] === 'person') count++
    //     })
    //     this.count = count
    //     this.chartLabels.push(time)
    //     this.chartValues.push(this.count)

    //     if (this.chartLabels.length > 10800) this.chartLabels.shift()
    //     if (this.chartValues.length > 10800) this.chartValues.shift()
    //   }, 1000)
    // },
    updateLocal() {
      this.start = true
      this.interval = setInterval(() => {
        axios.get('http://localhost:3500/').then((res) => {
          if (!res) return
          const result = res.data
          if (!result) return
          let count = 0
          result.data.forEach((data) => {
            if (data[0] === 'person') count++
          })
          this.count = count

          if (this.startFiltering) return
          const now = new Date()
          now.setSeconds(now.getSeconds() - this.delayTime)
          const hours = ('0' + String(now.getHours())).slice(-2)
          const minutes = ('0' + String(now.getMinutes())).slice(-2)
          const seconds = ('0' + String(now.getSeconds())).slice(-2)
          const time = `${hours}:${minutes}:${seconds}`

          this.chartLabels.push(time)
          this.chartValues.push(this.count)

          let diff = now.getTime() - this.startTime.getTime()
          if (diff) diff = Math.abs(diff) / (60 * 60 * 1000)
          if (diff > 3) {
            this.chartLabels.splice(0, 100)
            this.chartValues.splice(0, 100)
            this.startTime = new Date(
              `${now.getFullYear()}-${now.getMonth() + 1}-${now.getDate()} ${
                this.chartLabels[0]
              }`
            )
          }

          if (this.chartLabels.length > 2000) {
            this.filterHalfData()
          }
        })
      }, 1000)
    },
    filterHalfData() {
      this.startFiltering = true
      this.chartLabels = this.chartLabels.filter(
        (label, index) => index % 2 === 0
      )
      this.chartValues = this.chartValues.filter(
        (value, index) => index % 2 === 0
      )
      this.startFiltering = false
    },
    stop() {
      clearInterval(this.interval)
    },
  },
}
</script>

<style lang="scss">
.monitor-view {
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
