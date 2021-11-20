<template>
  <section class="web-gl">
    <v-layout justify-end align-center>
      <v-btn @click="test">test</v-btn>
      <v-btn @click="stop">stop</v-btn>
    </v-layout>
    <canvas ref="canvas" class="web-gl__canvas"></canvas>
  </section>
</template>

<script>
import WebGL from '~/assets/gl/webGL'
import eventBus from '~/utils/event-bus'

export default {
  data() {
    return {
      count: 0,
      projectName: null,
      settings: null,
      results: null,
      interval: null,
      delayTime: 5,
    }
  },
  mounted() {
    this.setSettings()
    this.setResult()
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
        this.setWebGl()
      })
    },
    setResult() {
      const today = new Date()
      const year = today.getFullYear()
      const month = ('0' + String(today.getMonth() + 1)).slice(-2)
      // こっちが正しい
      // const day = ('0' + String(today.getDate())).slice(-2)
      // テスト用
      const day = '06'
      const date = `${year}-${month}-${day}`
      const ref = this.$firebase.database().ref(`results/${date}`)
      ref.on('value', (snapshot) => {
        if (!snapshot?.val()) return
        this.results = snapshot.val()
      })
    },
    setWebGl() {
      if (!this.webGL) {
        this.webGL = new WebGL({
          $canvas: this.$refs.canvas,
          settings: this.settings,
          character: {
            number: 0,
          },
        })
      }
    },
    test() {
      let count = 0
      this.interval = setInterval(() => {
        // こっちがただしい
        // const today = new Date()
        // today.setSeconds(today.getSeconds() - this.delayTime);
        // const time = `${today.getHours()}:${today.getMinutes()}:${today.getSeconds()}`

        // テスト用
        const time = `19:32:${30 + count}`
        const result = this.results[time]
        this.count = result.data.length
        eventBus.$emit('setCoordinate', result.data)
        count++
      }, 1000)
    },
    stop() {
      eventBus.$emit('stop')
      clearInterval(this.interval)
    },
  },
}
</script>

<style>
.web-gl {
  width: 100%;
  height: 100%;
  background: #eaf2f5;
}
</style>
