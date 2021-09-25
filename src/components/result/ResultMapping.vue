<template>
  <section>
    <div class="mapping">
      <div class="video">
        <video id="video" src="@/assets/sample/out.mp4" controls />
      </div>
      <div class="canvas" :style="{ height, width }">
        <div v-for="(map, index) in mapping" :key="index">
          <div
            class="box"
            :style="{
              'margin-top': String(map.center[1]) + 'px',
              'margin-left': String(map.center[0]) + 'px',
              width: map.width + 'px',
              height: String(map.area / map.width) + 'px',
            }"
          />
          <!-- {{ map }} -->
        </div>
      </div>
      <v-btn @click="start">start</v-btn>
      <v-btn @click="stop">stop</v-btn>
      <v-btn @click="clear">clear</v-btn>
      <v-btn @click="capture">キャプチャ</v-btn>
    </div>
    <div>
      <div style="text-align: center">
        <canvas id="canvas" style="display: none" />
        <result-glfx
          v-if="captureImage"
          :captureImage="captureImage"
          :width="captureWidth"
          :height="captureHeight"
        />
      </div>
    </div>
  </section>
</template>

<script>
import ResultGlfx from './ResultGlfx.vue'

export default {
  components: {
    ResultGlfx,
  },
  data() {
    return {
      width: '960px',
      height: '540px',
      date: '2021-09-05',
      count: 0,
      time: '17:13:08',
      result: null,
      interval: null,
      captureImage: null,
      captureWidth: null,
      captureHeight: null,
    }
  },
  computed: {
    mapping() {
      if (!this.result) return
      return this.result[this.countTimer]
    },
    countTimer() {
      // const splitTime = this.time.split(':')
      const dt = new Date()
      dt.setHours(17)
      dt.setMinutes(13)
      dt.setSeconds(8 + this.count)

      const hour = ('0' + dt.getHours()).slice(-2)
      const minute = ('0' + dt.getMinutes()).slice(-2)
      const second = ('0' + dt.getSeconds()).slice(-2)
      return `${hour}:${minute}:${second}`
    },
  },
  mounted() {
    // this.setDateTime()
    this.setResult()
  },
  methods: {
    setResult() {
      const ref = this.$firebase.database().ref(`results/${this.date}`)
      ref.on('value', (snapshot) => {
        if (!snapshot?.val()) return
        this.result = snapshot.val()
      })
    },
    setDateTime() {
      const datetime = new Date()
      const year = datetime.getUTCFullYear()
      const month = ('0' + (datetime.getUTCMonth() + 1)).slice(-2)
      const day = ('0' + datetime.getUTCDate()).slice(-2)
      this.date = `${year}-${month}-${day}`

      const hour = ('0' + datetime.getUTCHours()).slice(-2)
      const minute = ('0' + datetime.getUTCMinutes()).slice(-2)
      const second = ('0' + datetime.getUTCSeconds()).slice(-2)
      this.time = `${hour}:${minute}:${second}`
    },
    start() {
      this.interval = setInterval(() => {
        this.count += 1
      }, 1000)
    },
    stop() {
      clearInterval(this.interval)
    },
    clear() {
      clearInterval(this.interval)
      this.count = 0
    },
    capture() {
      const video = document.getElementById('video')
      const canvas = document.getElementById('canvas')
      canvas.setAttribute('width', video.clientWidth)
      canvas.setAttribute('height', video.clientHeight)
      canvas
        .getContext('2d')
        .drawImage(video, 0, 0, video.clientWidth, video.clientHeight)
      this.captureImage = canvas.toDataURL()
      this.captureWidth = video.clientWidth
      this.captureHeight = video.clientHeight
    },
  },
}
</script>

<style lang="scss">
.mapping {
  text-align: center;
}

.video {
  text-align: center;
}

.canvas {
  margin: 50px auto;
  border: solid thin #000;
}

.box {
  position: absolute;
  border: solid thin #000;
}
</style>
